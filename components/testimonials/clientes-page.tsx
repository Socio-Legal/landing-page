"use client";

import { FC, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { clientLogos, getClientName } from "@/config/client-logos";
import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";

type LogoKey = keyof typeof clientLogos;

type Story = {
  client: string;
  logo: LogoKey;
  image?: string;
  text: string;
  href?: string;
  size?: "big";
};

type Segment = {
  segment: string;
  logos: LogoKey[];
  image: string;
  text: string;
  sub?: string;
  href?: string;
};

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

const SECTION = "container mx-auto px-4";
const EYEBROW = "text-xs uppercase tracking-[0.14em] text-muted-foreground";

/** Logo de cliente en blanco, para ir sobre una foto. */
const LogoBlanco: FC<{ logo: LogoKey; className?: string }> = ({ logo, className }) =>
  clientLogos[logo] ? (
    <Image
      src={clientLogos[logo]}
      alt={getClientName(logo)}
      className={cn("h-6 w-auto max-w-40 object-contain object-left brightness-0 invert", className)}
    />
  ) : null;

/** Tarjeta con foto a sangre y velo oscuro para que el texto se lea. */
const Foto: FC<{ src?: string; sizes: string }> = ({ src, sizes }) =>
  src ? (
    <>
      <Image src={src} alt="" aria-hidden fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 bg-[rgba(13,18,30,0.45)]" />
    </>
  ) : (
    <div className="absolute inset-0 bg-[#1D2433]" />
  );

/**
 * Portada de clientes (/testimonios y /en/testimonials): historias con la foto
 * de cada negocio, un carrusel por tipo de empresa, una cita, y al final las
 * cifras y los logos. El texto sale de testimonials-page.json.
 */
const ClientesPage: FC = () => {
  const { t } = useTranslation("testimonials-page");
  const locale = useLocale();
  const carrusel = useRef<HTMLDivElement>(null);

  const stories = asArray<Story>(t("stories", { returnObjects: true }));
  const segments = asArray<Segment>(t("segments.items", { returnObjects: true }));
  const figures = asArray<{ value: string; label: string }>(t("figures", { returnObjects: true }));
  const logos = asArray<LogoKey>(t("logos", { returnObjects: true }));
  const mover = (dx: number) => carrusel.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <>
      {/* Historias */}
      <section className={cn(SECTION, "py-14 md:py-20")}>
        <div className="max-w-3xl">
          <p className={EYEBROW}>{t("hero.eyebrow")}</p>
          <h1 className="mt-4 font-serif text-5xl font-normal leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("hero.description")}
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((s) => {
            const tarjeta = (
              <>
                <Foto src={s.image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="relative p-5">
                  <LogoBlanco logo={s.logo} className={s.size === "big" ? "h-7" : "h-5"} />
                </div>
                <div className="relative p-5">
                  <p
                    className={cn(
                      "text-white",
                      s.size === "big"
                        ? "font-serif text-3xl leading-tight"
                        : "text-base font-semibold leading-snug",
                    )}
                  >
                    {s.text}
                  </p>
                  {s.href && (
                    <p className="mt-3 text-sm text-white/90">
                      {t("storyLink")} <span aria-hidden>→</span>
                    </p>
                  )}
                </div>
              </>
            );
            const clase = cn(
              "relative flex flex-col justify-between overflow-hidden rounded-2xl",
              s.size === "big" && "sm:row-span-2",
            );
            return s.href ? (
              <Link key={s.client} href={localizedHref(s.href, locale)} className={cn(clase, "group")}>
                {tarjeta}
              </Link>
            ) : (
              <div key={s.client} className={clase}>
                {tarjeta}
              </div>
            );
          })}
        </div>
      </section>

      {/* Empresas como la tuya: carrusel por tipo */}
      <section className="border-t border-border">
        <div className={cn(SECTION, "py-14 md:py-20")}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className={EYEBROW}>{t("segments.eyebrow")}</p>
              <h2 className="mt-3 font-serif text-4xl font-normal leading-tight text-balance md:text-5xl">
                {t("segments.title")}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => mover(-580)}
                aria-label={t("segments.prev")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => mover(580)}
                aria-label={t("segments.next")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={carrusel}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {segments.map((s) => {
              const contenido = (
                <>
                  <Foto src={s.image} sizes="(max-width: 640px) 86vw, 560px" />
                  <p className="relative p-6 text-xs uppercase tracking-[0.14em] text-white">{s.segment}</p>
                  <div className="relative p-6">
                    <div className="flex items-center gap-5">
                      {s.logos.map((l) => (
                        <LogoBlanco key={l} logo={l} />
                      ))}
                    </div>
                    <p className="mt-4 font-serif text-3xl leading-tight text-white">{s.text}</p>
                    {s.sub && <p className="mt-3 text-sm text-white/85">{s.sub}</p>}
                  </div>
                </>
              );
              const clase =
                "relative flex h-[460px] w-[min(560px,86%)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl";
              return s.href ? (
                <Link key={s.segment} href={localizedHref(s.href, locale)} className={clase}>
                  {contenido}
                </Link>
              ) : (
                <article key={s.segment} className={clase}>
                  {contenido}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Una voz */}
      <section className="bg-[#1D2433] text-white">
        <figure className="container mx-auto max-w-4xl px-4 py-20 text-center md:py-24">
          {clientLogos[t("quote.logo") as LogoKey] && (
            <LogoBlanco logo={t("quote.logo") as LogoKey} className="mx-auto object-center" />
          )}
          <blockquote className="mt-7 font-serif text-3xl italic leading-snug md:text-4xl">
            “{t("quote.text")}”
          </blockquote>
          <figcaption className="mt-6 text-sm text-white/75">{t("quote.author")}</figcaption>
        </figure>
      </section>

      {/* Al final: cifras y logos */}
      <section className={cn(SECTION, "py-14 md:py-16")}>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {figures.map((f) => (
            <div key={f.label} className="border-l border-border pl-5">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-5xl leading-none">{f.value}</dd>
              <dd className="mt-2 text-sm text-muted-foreground">{f.label}</dd>
            </div>
          ))}
        </dl>
        <p className={cn(EYEBROW, "mt-14 text-center")}>{t("logosLabel")}</p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {logos
            .filter((l) => clientLogos[l])
            .map((l) => (
              <Image
                key={l}
                src={clientLogos[l]}
                alt={getClientName(l)}
                className="h-7 w-auto max-w-32 object-contain grayscale dark:invert"
              />
            ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className={cn(SECTION, "flex flex-wrap items-center justify-between gap-6 py-16 md:py-20")}>
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">{t("cta.title")}</h2>
          <a
            href={t("cta.button.link")}
            className="inline-flex h-12 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
          >
            {t("cta.button.text")}
          </a>
        </div>
      </section>
    </>
  );
};

export default ClientesPage;
