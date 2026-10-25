"use client";

import {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  ArrowLeftRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  Mail,
  MousePointer2,
  Paperclip,
  Pause,
  PenLine,
  Play,
  ScanText,
  Send,
  Sparkles,
  Upload,
  UserCheck,
  Users,
  Vote,
} from "lucide-react";

import SectionHeader from "../section-header";
import { routes } from "@/config/routes";
import { trackMeetingClick } from "@/lib/analytics";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";

type Who = "you" | "sttok";

/**
 * Lo que se ve dentro de un paso. Cada elemento se revela en uno o varios
 * compases: una escritura que cae en el montón, una tarea que se marca, un
 * botón que se pulsa. El medidor y los contadores no tienen compás propio:
 * avanzan con las tareas del mismo paso.
 */
type Element =
  | { t: "deck"; items: string[] }
  | { t: "file"; text: string }
  | { t: "note"; text: string; tone?: "warn" }
  | { t: "task"; text: string; ms?: number }
  | { t: "check"; text: string }
  | { t: "auto"; text: string }
  | { t: "mail"; to: string; toHint?: string; subject: string; attachment: string }
  | { t: "button"; text: string; done: string; big?: boolean }
  | { t: "vote"; text: string; for: number; against: number; abstain: number }
  | { t: "options"; items: string[]; selected: number }
  | {
      t: "delegations";
      items: { from: string; text: string }[];
      more?: string;
      signed: string;
    }
  | { t: "saved"; text: string }
  | { t: "ticker"; items: string[]; done: string }
  | { t: "link"; text: string; href: string }
  | { t: "signers"; items: { initials: string; text: string; checked?: boolean }[] }
  | {
      t: "result";
      icon: string;
      text: string;
      value?: string;
      avatars?: string[];
      link?: { text: string; href: string };
    }
  | { t: "meter"; text: string; to: number; decimals: number; suffix: string }
  | { t: "counters"; items: { label: string; to: number }[] };

interface Step {
  who: Who;
  icon: string;
  label: string;
  elements: Element[];
}

interface LogLine {
  step: number;
  who: Who;
  time: string;
  event: string;
  data: string;
}

interface Flow {
  tab: string;
  headline: string;
  link: { text: string; href: string };
  steps: Step[];
  log: LogLine[];
}

/** Paso en curso y número de compases ya revelados dentro de él. */
interface Pos {
  step: number;
  beat: number;
}

const Icons: Record<string, ComponentType<{ className?: string }>> = {
  ArrowLeftRight,
  BookOpenCheck,
  CalendarDays,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  PenLine,
  ScanText,
  Send,
  Sparkles,
  Upload,
  UserCheck,
  Users,
  Vote,
};

// Estado final: todos los pasos hechos. Es lo que pinta el servidor, para que
// el texto completo de cada pestaña viaje en el HTML.
const FINAL: Pos = { step: 99, beat: 0 };

/** Compases de un elemento. */
const beatsIn = (e: Element) => {
  if (e.t === "deck" || e.t === "delegations" || e.t === "ticker")
    return e.items.length;
  if (e.t === "signers") return 1 + e.items.filter((i) => i.checked).length;
  if (e.t === "meter" || e.t === "counters" || e.t === "link") return 0;
  return 1;
};
const beatsOf = (s: Step) => s.elements.reduce((n, e) => n + beatsIn(e), 0);

/** Elemento al que pertenece el compás `beat` de un paso. */
const elementAt = (s: Step, beat: number) => {
  let acc = 0;
  for (const e of s.elements) {
    acc += beatsIn(e);
    if (beat < acc) return e;
  }
  return s.elements[s.elements.length - 1];
};

// Ritmo pausado: da tiempo a leer cada cosa antes de la siguiente.
const pauseFor = (e: Element) => {
  if (e.t === "task" && e.ms) return e.ms;
  switch (e.t) {
    case "deck":
      return 420;
    case "file":
      return 380;
    case "signers":
      return 900;
    case "delegations":
      return 700;
    case "ticker":
      return 650;
    case "button":
      return e.big ? 1600 : 1100;
    case "task":
    case "check":
      return 750;
    default:
      return 950;
  }
};
const STEP_GAP = 1400;
const END_HOLD = 6500;

const appear = (on: boolean) =>
  cn(
    "transition-all duration-500 ease-out motion-reduce:transition-none",
    on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5",
  );

const WhoPill: FC<{ who: Who; text: string }> = ({ who, text }) => (
  <span
    className={cn(
      "rounded-full px-2 py-0.5 text-[11px] font-medium",
      who === "sttok"
        ? "bg-brand/10 text-brand"
        : "bg-[#fef8e4] text-[#8a6300] dark:bg-amber-400/10 dark:text-amber-300",
    )}
  >
    {text}
  </span>
);

const Spinner = () => (
  <span
    aria-hidden
    className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-[1.5px] border-brand border-t-transparent"
  />
);

const Done = () => (
  <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#0c8e68] text-white">
    <Check aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
  </span>
);

/** Las escrituras caen una a una y se abren en abanico, como una baraja. */
const Deck: FC<{ items: string[]; n: number }> = ({ items, n }) => {
  const mid = (items.length - 1) / 2;
  return (
    <li className="relative mb-2 h-[150px]">
      {items.map((it, j) => {
        const on = j < n;
        const [year, kind] = it.split(" · ");
        const style: CSSProperties = {
          transform: on
            ? `translateX(${(j - mid) * 16}px) rotate(${(j - mid) * 6}deg)`
            : `translate(${(j - mid) * 16}px, -28px) rotate(0deg)`,
        };
        return (
          <div
            key={j}
            style={style}
            className={cn(
              "absolute bottom-0 left-1/2 -ml-[46px] flex h-[124px] w-[92px] origin-bottom flex-col rounded-lg border border-border bg-white p-2 shadow-sm transition-all duration-500 ease-out motion-reduce:transition-none dark:bg-zinc-900",
              on ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="self-start rounded bg-red-50 px-1 text-[9px] font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
              PDF
            </span>
            <span aria-hidden className="mt-2 space-y-1">
              <span className="block h-1 w-full rounded bg-muted" />
              <span className="block h-1 w-4/5 rounded bg-muted" />
              <span className="block h-1 w-3/5 rounded bg-muted" />
            </span>
            <span className="mt-auto text-[10px] leading-tight text-foreground">
              <span className="block font-medium">{year}</span>
              <span className="block text-muted-foreground">{kind}</span>
            </span>
          </div>
        );
      })}
    </li>
  );
};

/** Botón que pulsa el usuario. El grande lleva un cursor que llega y hace clic. */
const ActionButton: FC<{
  e: Extract<Element, { t: "button" }>;
  revealed: boolean;
  next: boolean;
}> = ({ e, revealed, next }) => {
  if (revealed) {
    return (
      <span
        className={cn(
          "inline-flex animate-pop items-center justify-center gap-1.5 rounded-full bg-[#e6fcf6] font-medium text-[#097556] motion-reduce:animate-none dark:bg-[#0c8e68]/15 dark:text-[#7fe8c7]",
          e.big ? "w-full py-2.5 text-sm" : "px-3 py-1.5 text-xs",
        )}
      >
        <Check aria-hidden className="h-3.5 w-3.5" />
        {e.done}
      </span>
    );
  }
  return (
    <span className={cn("relative", e.big ? "block" : "inline-block")}>
      <span
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-300",
          e.big ? "w-full py-2.5 text-sm" : "px-3 py-1.5 text-xs",
          next
            ? "bg-foreground text-background shadow-md ring-4 ring-foreground/10"
            : "border border-border text-foreground",
          next && e.big && "animate-press motion-reduce:animate-none",
        )}
      >
        {e.big && <Send aria-hidden className="h-3.5 w-3.5" />}
        {e.text}
      </span>
      {next && e.big && (
        <MousePointer2
          aria-hidden
          className="pointer-events-none absolute left-[58%] top-[55%] h-5 w-5 animate-cursor fill-white text-foreground drop-shadow motion-reduce:hidden"
        />
      )}
    </span>
  );
};

/**
 * Un elemento de un paso. `n`: compases ya revelados dentro de él; `next`:
 * el siguiente compás es suyo; `frac`: avance de las tareas del paso (0 a 1).
 */
const StepElement: FC<{
  e: Element;
  n: number;
  next: boolean;
  live: boolean;
  frac: number;
  numberLocale: string;
  labels: Record<string, string>;
}> = ({ e, n, next, live, frac, numberLocale, labels }) => {
  const revealed = n >= 1;
  switch (e.t) {
    case "deck":
      return <Deck items={e.items} n={n} />;
    case "file":
      return (
        <li
          className={cn(
            "flex items-start gap-2 rounded-lg bg-muted/70 px-2.5 py-1.5 text-[13px] text-foreground",
            appear(revealed),
          )}
        >
          <FileText aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span>{e.text}</span>
        </li>
      );
    case "note":
      return (
        <li
          className={cn(
            "flex items-start gap-2 px-1 text-xs leading-snug",
            e.tone === "warn"
              ? "text-orange-700 dark:text-orange-300"
              : "text-muted-foreground",
            appear(revealed),
          )}
        >
          {e.tone === "warn" && (
            <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
          )}
          {e.text}
        </li>
      );
    case "task":
      return (
        <li
          className={cn(
            "flex items-start gap-2.5 px-1 text-[13px] leading-snug transition-colors duration-500",
            revealed ? "text-foreground" : "text-muted-foreground/70",
            appear(live),
          )}
        >
          {revealed ? (
            <Done />
          ) : next ? (
            <Spinner />
          ) : (
            <span aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-border" />
          )}
          <span>{e.text}</span>
        </li>
      );
    case "check":
      // Lo que hace el usuario va en el color de «Tú»
      return (
        <li
          className={cn(
            "flex items-start gap-2.5 px-1 text-[13px] leading-snug text-foreground",
            appear(live),
          )}
        >
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300",
              revealed ? "border-[#e3b005] bg-[#fbe59f] text-[#8a6300] dark:border-amber-400 dark:bg-amber-400/30 dark:text-amber-200" : "border-border",
            )}
          >
            {revealed && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
          </span>
          <span>{e.text}</span>
        </li>
      );
    case "auto":
      return (
        <li
          className={cn(
            "flex items-start gap-2.5 px-1 text-[13px] leading-snug text-foreground",
            appear(revealed),
          )}
        >
          <Sparkles aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
          <span>{e.text}</span>
        </li>
      );
    case "mail":
      return (
        <li
          className={cn(
            "space-y-1 rounded-[8px] border border-border bg-card p-3 text-xs leading-snug",
            appear(revealed),
          )}
        >
          <p className="grid grid-cols-[3.25rem_1fr] gap-1.5">
            <span className="text-muted-foreground">{labels.mailTo}</span>
            <span className="text-foreground">
              <span className="font-medium">{e.to}</span>
              {e.toHint && (
                <span className="block text-[11px] text-muted-foreground">{e.toHint}</span>
              )}
            </span>
          </p>
          <p className="grid grid-cols-[3.25rem_1fr] gap-1.5">
            <span className="text-muted-foreground">{labels.mailSubject}</span>
            <span className="text-foreground">{e.subject}</span>
          </p>
          <p className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
            <Paperclip aria-hidden className="h-3 w-3" />
            {e.attachment}
          </p>
        </li>
      );
    case "button":
      return (
        <li className={cn("pt-1", appear(live))}>
          <ActionButton e={e} revealed={revealed} next={next} />
        </li>
      );
    case "vote": {
      const pct = (x: number) =>
        `${x.toLocaleString(numberLocale, { minimumFractionDigits: 1 })} %`;
      const v = labels.votes as unknown as Record<string, string>;
      return (
        <li className={cn("px-1", appear(live))}>
          <p className="text-[13px] leading-snug text-foreground">{e.text}</p>
          <div className="mt-1 flex h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-[#0c8e68] transition-[width] duration-700 ease-out"
              style={{ width: revealed ? `${e.for}%` : "0%" }}
            />
            <div
              className="h-full bg-red-400 transition-[width] delay-300 duration-500 ease-out"
              style={{ width: revealed ? `${e.against}%` : "0%" }}
            />
            <div
              className="h-full bg-zinc-400 transition-[width] delay-500 duration-500 ease-out"
              style={{ width: revealed ? `${e.abstain}%` : "0%" }}
            />
          </div>
          <p
            className={cn(
              "mt-1 flex gap-x-2 whitespace-nowrap text-[11px] tabular-nums transition-opacity duration-500",
              revealed ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="text-[#0c8e68] dark:text-[#7fe8c7]">
              {v.for} {pct(e.for)}
            </span>
            <span className="text-red-500">
              {v.against} {pct(e.against)}
            </span>
            <span className="text-muted-foreground">
              {v.abstain} {pct(e.abstain)}
            </span>
          </p>
        </li>
      );
    }
    case "options":
      return (
        <li className={cn("flex flex-wrap gap-1.5", appear(revealed))}>
          {e.items.map((o, j) => (
            <span
              key={o}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs",
                j === e.selected
                  ? "border-[#e3b005] bg-[#fef8e4] font-medium text-[#8a6300] dark:bg-amber-400/10 dark:text-amber-200"
                  : "border-border text-muted-foreground",
              )}
            >
              {o}
            </span>
          ))}
        </li>
      );
    case "delegations":
      return (
        <li className="space-y-1.5">
          {e.items.map((d, j) => (
            <div
              key={j}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-muted/70 px-2 py-1.5 text-xs",
                j < n ? "animate-pop motion-reduce:animate-none" : "opacity-0",
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-[9px] font-medium text-foreground">
                {d.from}
              </span>
              <span className="flex-1 leading-snug text-foreground">{d.text}</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#0c8e68] dark:text-[#7fe8c7]">
                <PenLine aria-hidden className="h-3 w-3" />
                {e.signed}
              </span>
            </div>
          ))}
          {e.more && (
            <p
              className={cn(
                "px-1 text-[11px] text-muted-foreground",
                appear(n >= e.items.length),
              )}
            >
              {e.more}
            </p>
          )}
        </li>
      );
    case "ticker": {
      // Un solo renglón que va cambiando, como un panel de aeropuerto
      const complete = n >= e.items.length;
      const current = complete ? e.done : e.items[Math.max(n - 1, 0)];
      return (
        <li
          className={cn(
            "-mx-1.5 flex items-center gap-2.5 overflow-hidden rounded-lg bg-muted/70 px-2.5 py-2 text-[13px]",
            appear(live),
          )}
        >
          {complete ? <Done /> : <Spinner />}
          <span
            key={complete ? "done" : n}
            className={cn(
              "flex-1 truncate font-medium text-foreground",
              live && "animate-flip motion-reduce:animate-none",
            )}
          >
            {current}
          </span>
          {/* El resto de mensajes, para quien no ve la animación */}
          <span className="sr-only">{e.items.join(". ")}</span>
        </li>
      );
    }
    case "saved":
      return (
        <li
          className={cn(
            "flex items-start gap-2.5 px-1 text-[13px] leading-snug",
            appear(revealed),
          )}
        >
          <Done />
          <span className="text-muted-foreground line-through decoration-muted-foreground/50">
            {e.text}
          </span>
        </li>
      );
    case "signers": {
      // n = 1: aparecen todos; cada compás siguiente marca un firmante
      let k = 0;
      const rows = e.items.map((it) => ({ ...it, order: it.checked ? ++k : 0 }));
      return (
        <li className={cn("space-y-1.5", appear(n >= 1))}>
          {rows.map((it, j) => {
            const on = it.order > 0 && n > it.order;
            const pointing = next && it.order > 0 && n === it.order;
            return (
              <div key={j} className="relative flex items-center gap-2.5 text-[13px]">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300",
                    on ? "border-[#e3b005] bg-[#fbe59f] text-[#8a6300] dark:border-amber-400 dark:bg-amber-400/30 dark:text-amber-200" : "border-border",
                  )}
                >
                  {on && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-foreground">
                  {it.initials}
                </span>
                <span className="flex-1 leading-snug text-foreground">{it.text}</span>
                <Mail aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                {pointing && (
                  <MousePointer2
                    aria-hidden
                    className="pointer-events-none absolute left-1 top-2 h-5 w-5 animate-cursor fill-white text-foreground drop-shadow motion-reduce:hidden"
                  />
                )}
              </div>
            );
          })}
        </li>
      );
    }
    case "link":
      return (
        <li className={cn("pt-1", appear(live))}>
          {/* Pestaña nueva, para no perder la animación */}
          <Link
            href={e.href}
            target="_blank"
            className="inline-flex items-center gap-1 px-1 text-xs font-medium text-brand underline-offset-4 hover:underline"
          >
            {e.text}
            <ArrowRightIcon aria-hidden className="h-3 w-3" />
          </Link>
        </li>
      );
    case "result": {
      const Icon = Icons[e.icon] ?? Check;
      return (
        <li className={cn("flex items-start gap-3", appear(revealed))}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#e6fcf6] text-[#0c8e68] dark:bg-[#0c8e68]/15 dark:text-[#7fe8c7]">
            <Icon aria-hidden className="h-4 w-4" />
          </span>
          <span className="min-w-0 pt-0.5 text-[13px] leading-snug text-muted-foreground">
            {e.value && (
              <span className="mr-1 text-base font-semibold tabular-nums text-foreground">
                {e.value}
              </span>
            )}
            {e.text}
            {e.avatars && (
              <span aria-hidden className="mt-1.5 flex -space-x-1.5">
                {e.avatars.map((a) => (
                  <span
                    key={a}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-medium text-foreground ring-2 ring-background"
                  >
                    {a}
                  </span>
                ))}
                <span className="flex h-6 items-center pl-2.5 text-[11px] text-muted-foreground">
                  +{Number(e.value ?? 0) - e.avatars.length}
                </span>
              </span>
            )}
            {e.link && (
              // Pestaña nueva, para no perder la animación
              <Link
                href={e.link.href}
                target="_blank"
                className="mt-1 flex w-fit items-center gap-1 text-xs font-medium text-brand underline-offset-4 hover:underline"
              >
                {e.link.text}
                <ArrowRightIcon aria-hidden className="h-3 w-3" />
              </Link>
            )}
          </span>
        </li>
      );
    }
    case "meter": {
      const value = (e.to * frac).toLocaleString(numberLocale, {
        minimumFractionDigits: e.decimals,
        maximumFractionDigits: e.decimals,
      });
      return (
        <li className={cn("px-1 pb-1", appear(live))}>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-muted-foreground">{e.text}</span>
            <span className="text-2xl font-medium tabular-nums tracking-tight text-foreground">
              {value}
              {e.suffix}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
              style={{ width: `${frac * 100}%` }}
            />
          </div>
        </li>
      );
    }
    case "counters":
      return (
        <li className={cn("grid grid-cols-3 gap-1.5", appear(live))}>
          {e.items.map((c) => (
            <span key={c.label} className="rounded-[8px] bg-muted/70 px-1 py-2 text-center">
              <span className="block text-xl font-medium tabular-nums text-foreground">
                {Math.round(c.to * frac)}
              </span>
              <span className="block text-[10px] leading-tight text-muted-foreground">
                {c.label}
              </span>
            </span>
          ))}
        </li>
      );
  }
};

/** Una línea del log, escrita carácter a carácter al aparecer. */
const LogRow: FC<{ line: LogLine; on: boolean }> = ({ line, on }) => {
  const event = line.event.padEnd(26, " ");
  const n = line.time.length + 2 + event.length + line.data.length;
  return (
    <div className={cn("whitespace-pre", !on && "invisible")}>
      <span
        className={cn(
          "inline-block overflow-hidden align-bottom",
          on && "animate-typing motion-reduce:animate-none",
        )}
        style={{ "--n": n } as CSSProperties}
      >
        <span className="text-muted-foreground/60">{line.time}</span>
        {"  "}
        <span className="text-foreground/60">{event}</span>
        <span>{line.data}</span>
      </span>
    </div>
  );
};

const FlowPanel: FC<{
  flow: Flow;
  pos: Pos;
  labels: Record<string, string>;
  numberLocale: string;
  paused: boolean;
  playing: boolean;
  animated: boolean;
  onToggle: () => void;
}> = ({ flow, pos, labels, numberLocale, paused, playing, animated, onToggle }) => {
  const final = pos.step >= flow.steps.length;
  const visible = (l: LogLine) => pos.step > l.step;
  const shown = flow.log.filter(visible);
  const hidden = flow.log.filter((l) => !visible(l));

  return (
    <div className="rounded-[12px] border border-border bg-backgroundbrand p-5 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-[28px]">
          {flow.headline}
        </p>
        <span
          className={cn(
            "hidden shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-opacity duration-300 sm:inline",
            paused && !final ? "opacity-100" : "opacity-0",
          )}
        >
          {labels.paused}
        </span>
        {/* En móvil, la pausa vive junto al titular: el botón de arriba queda lejos */}
        {animated && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={playing ? labels.pause : labels.play}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
          >
            {playing ? (
              <Pause aria-hidden className="h-4 w-4" />
            ) : (
              <Play aria-hidden className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Progreso: cada punto cae sobre el centro de su tarjeta */}
      <ol aria-hidden className="mb-4 grid grid-cols-4 gap-3">
        {flow.steps.map((_, i) => (
          <li key={i} className="relative flex justify-center">
            {i < flow.steps.length - 1 && (
              <span className="absolute left-1/2 top-1/2 h-px w-[calc(100%+0.75rem)] bg-border">
                <span
                  className={cn(
                    "block h-full bg-foreground transition-[width] duration-700 ease-out",
                    i < pos.step ? "w-full" : "w-0",
                  )}
                />
              </span>
            )}
            <span
              className={cn(
                "relative z-10 flex h-3 w-3 items-center justify-center rounded-full border transition-colors duration-500",
                i < pos.step
                  ? "border-foreground bg-foreground"
                  : i === pos.step
                    ? "border-foreground bg-backgroundbrand ring-4 ring-foreground/10"
                    : "border-border bg-backgroundbrand",
              )}
            />
          </li>
        ))}
      </ol>

      <ol className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        {flow.steps.map((s, i) => {
          const Icon = Icons[s.icon] ?? FileText;
          const done = i < pos.step;
          const active = i === pos.step;
          const live = done || active;
          const revealedBeats = done ? Infinity : active ? pos.beat : 0;
          let start = 0;
          const items = s.elements.map((e, k) => {
            const beats = beatsIn(e);
            const n = Math.max(0, Math.min(beats, revealedBeats - start));
            const next =
              active && beats > 0 && pos.beat >= start && pos.beat < start + beats;
            start += beats;
            return { e, k, n, next };
          });
          // Medidores y contadores avanzan con los compases del paso
          const total = beatsOf(s);
          const frac = done ? 1 : total ? Math.min(pos.beat, total) / total : 0;
          return (
            <li
              key={i}
              className={cn(
                "flex flex-col rounded-[8px] border bg-card p-5 transition-all duration-500",
                active
                  ? "border-foreground/60 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]"
                  : "border-border",
                !live && "opacity-50",
                // En móvil, mientras se anima, solo se ve el paso en curso; al
                // terminar, el último
                animated &&
                  i !== Math.min(pos.step, flow.steps.length - 1) &&
                  "max-lg:hidden",
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-muted">
                  <Icon aria-hidden className="h-4 w-4 text-foreground" />
                </span>
                {done ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0c8e68] text-white">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : (
                  <WhoPill who={s.who} text={labels[s.who]} />
                )}
              </div>
              <p className="mb-4 text-[15px] font-medium leading-tight text-foreground">
                {s.label}
              </p>
              <ul className="space-y-2.5">
                {items.map(({ e, k, n, next }) => (
                  <StepElement
                    key={k}
                    e={e}
                    n={n}
                    next={next}
                    live={live}
                    frac={frac}
                    numberLocale={numberLocale}
                    labels={labels}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      {/* Log discreto: acompaña, no protagoniza */}
      <div className="mt-6 overflow-x-auto rounded-[8px] bg-muted/50 px-4 py-3 font-mono text-[11px] leading-5 text-muted-foreground">
        <p className="mb-1 font-sans text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
          {labels.logTitle}
        </p>
        {shown.map((l) => (
          <LogRow key={flow.log.indexOf(l)} line={l} on />
        ))}
        {!final && (
          <div aria-hidden className="h-5">
            <span className="inline-block h-3 w-1.5 animate-blink bg-muted-foreground/60 align-middle motion-reduce:animate-none" />
          </div>
        )}
        {hidden.map((l) => (
          <LogRow key={flow.log.indexOf(l)} line={l} on={false} />
        ))}
      </div>
    </div>
  );
};

const FlowsSection: FC = () => {
  const { t } = useTranslation("home-flows-section");
  const locale = useLocale();
  const numberLocale = locale === "en" ? "en-GB" : "es-ES";

  const flowsData = t("flows", { returnObjects: true }) as Flow[];
  const flows = useMemo<Flow[]>(
    () => (Array.isArray(flowsData) ? flowsData : []),
    [flowsData],
  );
  const labels = t("labels", { returnObjects: true }) as Record<string, string>;

  const [flow, setFlow] = useState(0);
  const [pos, setPos] = useState<Pos>(FINAL);
  const [animated, setAnimated] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // El servidor pinta el estado final. En el navegador, salvo con movimiento
  // reducido, se rebobina y arranca cuando la sección entra en pantalla.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimated(true);
    setPos({ step: 0, beat: 0 });
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = animated && playing && !hovered && inView;

  useEffect(() => {
    if (!running) return;
    const steps = flows[flow]?.steps ?? [];
    let delay: number;
    let next: () => void;
    if (pos.step >= steps.length) {
      // Fin del flujo: se queda un rato y pasa a la pestaña siguiente.
      delay = END_HOLD;
      next = () => {
        setFlow((f) => (f + 1) % flows.length);
        setPos({ step: 0, beat: 0 });
      };
    } else if (pos.beat < beatsOf(steps[pos.step])) {
      delay = pos.beat === 0 ? 700 : pauseFor(elementAt(steps[pos.step], pos.beat));
      next = () => setPos({ step: pos.step, beat: pos.beat + 1 });
    } else {
      delay = STEP_GAP;
      next = () => setPos({ step: pos.step + 1, beat: 0 });
    }
    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [running, pos, flow, flows]);

  const select = (i: number) => {
    setFlow(i);
    setPos(animated ? { step: 0, beat: 0 } : FINAL);
  };

  return (
    <section ref={ref} id="how-it-works" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeader
          slogan={t("header.slogan")}
          title={t("header.title")}
          description={t("header.description")}
        />

        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              className="inline-flex max-w-full overflow-x-auto rounded-full bg-muted p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {flows.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  id={`flow-tab-${i}`}
                  aria-selected={flow === i}
                  aria-controls={`flow-panel-${i}`}
                  onClick={() => select(i)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] transition-all sm:px-3.5 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    flow === i
                      ? "bg-background font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.tab}
                </button>
              ))}
            </div>
            {animated && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
              >
                {playing ? (
                  <Pause aria-hidden className="h-3.5 w-3.5" />
                ) : (
                  <Play aria-hidden className="h-3.5 w-3.5" />
                )}
                {playing ? labels.pause : labels.play}
              </button>
            )}
          </div>

          {/* Todas las pestañas van en el HTML; las inactivas, ocultas y completas */}
          {flows.map((f, i) => (
            <div
              key={i}
              role="tabpanel"
              id={`flow-panel-${i}`}
              aria-labelledby={`flow-tab-${i}`}
              hidden={flow !== i}
              // Pausa al mover el ratón encima, no al pasar con la rueda: el
              // movimiento sintético que provoca el scroll llega sin desplazamiento.
              onPointerMove={(e) => {
                if (e.pointerType === "mouse" && (e.movementX || e.movementY))
                  setHovered(true);
              }}
              onPointerLeave={() => setHovered(false)}
            >
              <FlowPanel
                flow={f}
                pos={flow === i ? pos : FINAL}
                labels={labels}
                numberLocale={numberLocale}
                paused={animated && (!playing || hovered)}
                playing={playing}
                animated={animated}
                onToggle={() => setPlaying((p) => !p)}
              />
              <p className="mt-4 text-sm">
                <Link
                  href={f.link.href}
                  className="group/link inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {labels.more}: {f.link.text}
                  <ArrowRightIcon
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </p>
            </div>
          ))}

          <div className="mt-10 text-center">
            <Link
              href={routes.APP_CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeetingClick("flows-section")}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              {labels.demo}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowsSection;
