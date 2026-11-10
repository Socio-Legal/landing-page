"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Icons } from "@/components/icons";
import SectionHeader from "@/components/section-header";
import VERSION from "@/lib/animaciones-version.json";
import { useLocale } from "@/lib/use-locale";

import s from "./junta-section.module.css";

/**
 * «Preparación de la junta general»: una escena (vídeo generado, sobre blanco)
 * con las señales del problema alrededor (correos, Excel, quórum, escrituras,
 * delegación, una socia que pide su certificado). Sttok AI las absorbe, enseña
 * tres recortes de la app real y las devuelve resueltas.
 *
 * Solo en castellano: los recortes son de la app en castellano y /en no lleva
 * nada en castellano. Para /en hacen falta capturas de la app en inglés.
 *
 * El escenario tiene un tamaño de diseño fijo (1200 × 675; en móvil 420 × 560)
 * y se escala al ancho de la caja. La línea de tiempo va por requestAnimationFrame
 * y solo avanza mientras la caja se ve y la pestaña está activa.
 */

type Rect = { x: number; y: number; w: number; r?: number };
type Layout = {
  w: number;
  h: number;
  scene: Rect;
  bar: Rect;
  res: Rect;
  sigs: Record<SigId, Rect | null>;
};
type SigId = "correo" | "excel" | "quorum" | "delegacion" | "carpeta" | "laura";

const ORDER: SigId[] = ["correo", "excel", "quorum", "delegacion", "carpeta", "laura"];

const LAYOUTS: Record<"desktop" | "mobile", Layout> = {
  desktop: {
    w: 1200,
    h: 675,
    scene: { x: -280, y: -34, w: 1680 },
    bar: { x: 320, y: 572, w: 560 },
    res: { x: 250, y: 120, w: 700 },
    sigs: {
      correo: { x: 34, y: 34, w: 300, r: -2 },
      excel: { x: 930, y: 28, w: 230, r: 2 },
      quorum: { x: 960, y: 290, w: 220, r: 2 },
      carpeta: { x: 1062, y: 380, w: 116, r: 3 },
      delegacion: { x: 70, y: 470, w: 140, r: -7 },
      laura: { x: 905, y: 560, w: 270, r: 0 },
    },
  },
  mobile: {
    w: 420,
    h: 560,
    scene: { x: -300, y: 6, w: 980 },
    bar: { x: 30, y: 476, w: 360 },
    res: { x: 10, y: 120, w: 400 },
    sigs: {
      quorum: { x: 146, y: 16, w: 254, r: 2 },
      carpeta: { x: 312, y: 250, w: 96, r: 3 },
      laura: { x: 14, y: 330, w: 260, r: 0 },
      correo: null,
      excel: null,
      delegacion: null,
    },
  },
};

/** Capturas de la app a doble resolución y la región [x, y, ancho, alto] que se enseña. */
const CROPS = [
  { src: "/funcionalidades/asistencia-y-quorum-detalle-light.png", w: 960, h: 684, r: [20, 352, 920, 236] },
  { src: "/funcionalidades/acta-de-la-junta-documento-light.png", w: 2368, h: 2102, r: [500, 505, 1370, 250] },
  { src: "/funcionalidades/certificados-detalle-light.png", w: 952, h: 1008, r: [50, 474, 852, 150] },
] as const;

/**
 * Tiempos del vídeo de la escena. Agobiada hasta el segundo 4; la sonrisa
 * empieza hacia el 6,5. Mientras están las tarjetas (escena difuminada) el
 * vídeo espera en HOLD; al irse, sigue hasta FREEZE, así que el paso del
 * agobio a la sonrisa se ve a la vez que las señales vuelven resueltas.
 * FREEZE es la sonrisa, antes de que cierre los ojos.
 */
const HOLD = 4.8;
const FREEZE = 8.6;
const END = 16900;

const v = (VERSION as Record<string, string>)["escena-junta"];
const VIDEO = `/animaciones/escena-junta-light.mp4${v ? `?v=${v}` : ""}`;
const POSTER = `/animaciones/escena-junta-light-poster.webp${v ? `?v=${v}` : ""}`;

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#1f8a4c" />
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function JuntaSection() {
  const locale = useLocale();
  const { t } = useTranslation("home-junta-section");
  const viewport = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const [cargar, setCargar] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const syncRef = useRef<() => void>(() => {});

  const prompt = t("prompt");
  const done = t("done");

  // El vídeo se pide cuando la caja se acerca a la pantalla, no antes.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCargar(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const vp = viewport.current;
    const st = stage.current;
    const video = scene.current;
    const barEl = bar.current;
    const typedEl = typed.current;
    if (!vp || !st || !video || !barEl || !typedEl) return;

    const sig = (id: SigId) => st.querySelector<HTMLElement>(`[data-sig="${id}"]`)!;
    const ress = [...st.querySelectorAll<HTMLElement>("[data-res]")];
    const play = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };

    let layout: "desktop" | "mobile" | null = null;
    const place = (n: HTMLElement, p: Rect) => {
      n.style.left = p.x + "px";
      n.style.top = p.y + "px";
      n.style.width = p.w + "px";
    };
    const applyLayout = () => {
      const key = vp.clientWidth < 700 ? "mobile" : "desktop";
      const L = LAYOUTS[key];
      st.style.width = L.w + "px";
      st.style.height = L.h + "px";
      st.style.transform = `scale(${vp.clientWidth / L.w})`;
      st.classList.add(s.ready);
      if (layout === key) return;
      layout = key;
      place(video, L.scene);
      place(barEl, L.bar);
      const bx = L.bar.x + L.bar.w / 2;
      const by = L.bar.y + 32;
      for (const id of ORDER) {
        const p = L.sigs[id];
        const n = sig(id);
        if (!p) {
          n.style.display = "none";
          continue;
        }
        n.style.display = "";
        place(n, p);
        n.style.setProperty("--r", (p.r ?? 0) + "deg");
        n.style.setProperty("--dx", bx - (p.x + p.w / 2) + "px");
        n.style.setProperty("--dy", by - (p.y + 40) + "px");
      }
      ress.forEach((n, i) => {
        place(n, L.res);
        const c = CROPS[i];
        const box = n.querySelector<HTMLElement>("[data-crop]")!;
        const img = box.querySelector("img")!;
        const k = L.res.w / c.r[2];
        box.style.height = Math.round(c.r[3] * k) + "px";
        img.style.width = c.w * k + "px";
        img.style.height = c.h * k + "px";
        img.style.left = -c.r[0] * k + "px";
        img.style.top = -c.r[1] * k + "px";
      });
    };

    const showRes = (i: number) =>
      ress.forEach((n, k) => {
        if (k === i) {
          n.classList.remove(s.out);
          n.classList.add(s.in);
        } else if (n.classList.contains(s.in)) {
          n.classList.remove(s.in);
          n.classList.add(s.out);
        }
      });

    // Hasta dónde puede avanzar el vídeo ahora: HOLD con las tarjetas, FREEZE después.
    let limit = HOLD;

    const steps: { t: number; f: () => void }[] = [];
    steps.push({
      t: 0,
      f: () => {
        try {
          video.currentTime = 0;
        } catch {}
        limit = HOLD;
        play();
      },
    });
    ORDER.forEach((id, i) => steps.push({ t: 300 + i * 350, f: () => sig(id).classList.add(s.in) }));
    steps.push({ t: 3400, f: () => barEl.classList.add(s.in) });
    for (let i = 1; i <= prompt.length; i++)
      steps.push({ t: 3700 + i * 50, f: () => (typedEl.textContent = prompt.slice(0, i)) });
    steps.push(
      { t: 4900, f: () => barEl.classList.add(s.work) },
      ...ORDER.map((id, i) => ({ t: 5000 + i * 80, f: () => sig(id).classList.add(s.suck) })),
      { t: 5700, f: () => (st.classList.add(s.app), showRes(0)) },
      { t: 7500, f: () => showRes(1) },
      { t: 9300, f: () => showRes(2) },
      {
        t: 11100,
        f: () => {
          showRes(-1);
          st.classList.remove(s.app);
          limit = FREEZE;
          play();
        },
      },
      // Primero se van las tarjetas; después, la barra en verde.
      {
        t: 11600,
        f: () => {
          barEl.classList.remove(s.work);
          barEl.classList.add(s.ok);
          typedEl.textContent = done;
        },
      },
      ...ORDER.map((id, i) => ({
        t: 12000 + i * 250,
        f: () => {
          const n = sig(id);
          n.classList.add(s.done);
          n.classList.remove(s.suck);
        },
      })),
      { t: 16200, f: () => st.classList.add(s.fade) },
    );
    steps.sort((a, b) => a.t - b.t);

    const reset = () => {
      st.classList.remove(s.app, s.fade);
      ORDER.forEach((id) => sig(id).classList.remove(s.in, s.suck, s.done));
      barEl.classList.remove(s.in, s.work, s.ok);
      ress.forEach((n) => n.classList.remove(s.in, s.out));
      typedEl.textContent = "";
    };

    const freezeCheck = () => {
      if (!video.paused && video.currentTime >= limit) {
        video.pause();
        try {
          video.currentTime = limit;
        } catch {}
      }
    };

    let elapsed = 0;
    let next = 0;
    let last: number | null = null;
    let inView = false;
    let raf = 0;
    const running = () => playingRef.current && inView && !document.hidden;
    const sync = () => {
      if (!running()) {
        if (!video.paused) video.pause();
      } else if (next > 0 && video.paused && video.currentTime < limit) play();
    };
    syncRef.current = sync;

    const tick = (now: number) => {
      freezeCheck();
      if (last === null) last = now;
      if (running()) {
        // Tope por fotograma: al volver de otra pestaña no se salta escenas.
        elapsed += Math.min(now - last, 250);
        while (next < steps.length && steps[next].t <= elapsed) steps[next++].f();
        if (elapsed >= END) {
          reset();
          elapsed = 0;
          next = 0;
        }
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    applyLayout();
    const ro = new ResizeObserver(applyLayout);
    ro.observe(vp);
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(vp);
    document.addEventListener("visibilitychange", sync);
    // La fuente se pone al acercarse la caja; si llega con la escena ya en marcha, arranca entonces.
    video.addEventListener("canplay", sync);

    // Con «reducir movimiento» no arranca sola: se ven las señales quietas.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playingRef.current = false;
      setPlaying(false);
      ORDER.forEach((id) => sig(id).classList.add(s.in));
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("canplay", sync);
    };
  }, [prompt, done]);

  const toggle = () => {
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
    syncRef.current();
  };

  if (locale !== "es") return null;

  const cards = t("cards", { returnObjects: true }) as string[];

  return (
    <section id="junta" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeader
          slogan={t("header.slogan")}
          title={t("header.title")}
          description={t("header.description")}
        />

        <div className="mx-auto max-w-6xl">
          <div
            ref={viewport}
            role="img"
            aria-label={t("alt")}
            className={`${s.viewport} border border-border shadow-sm`}
          >
            <div ref={stage} className={s.stage} aria-hidden>
              <video
                ref={scene}
                className={s.scene}
                src={cargar ? VIDEO : undefined}
                poster={cargar ? POSTER : undefined}
                muted
                playsInline
                preload={cargar ? "auto" : "none"}
                tabIndex={-1}
              />

              <div className={s.sig} data-sig="correo">
                <div className={s.swap}>
                  <div className={`${s.b} ${s.card} ${s.mail}`}>
                    <span className={s.ic}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                        <rect x="3" y="5.5" width="18" height="13" rx="2" />
                        <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
                      </svg>
                      <b>47</b>
                    </span>
                    <span className={s.mailText}>{t("signals.mailBefore")}</span>
                  </div>
                  <div className={`${s.a} ${s.card} ${s.mail}`}>
                    <span className={`${s.ic} ${s.okc}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span className={s.mailText}>{t("signals.mailAfter")}</span>
                  </div>
                </div>
              </div>

              <div className={s.sig} data-sig="excel">
                <div className={s.swap}>
                  <div className={`${s.b} ${s.card} ${s.sheet}`}>
                    <div className={s.top}>
                      <i>X</i>
                      {t("signals.sheetBefore")}
                    </div>
                    <div className={s.grid}>
                      {Array.from({ length: 6 }, (_, i) => <span key={i} />)}
                    </div>
                    <div className={`${s.total} ${s.bad}`}>
                      <small>{t("signals.total")}</small>
                      <strong>{t("signals.totalBefore")}</strong>
                    </div>
                  </div>
                  <div className={`${s.a} ${s.card} ${s.sheet}`}>
                    <div className={`${s.top} ${s.topSttok}`}>
                      <i>S</i>
                      {t("signals.sheetAfter")}
                    </div>
                    <div className={s.grid}>
                      {Array.from({ length: 6 }, (_, i) => <span key={i} />)}
                    </div>
                    <div className={`${s.total} ${s.good}`}>
                      <small>{t("signals.total")}</small>
                      <strong>{t("signals.totalAfter")}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={s.sig} data-sig="quorum">
                <div className={s.swap}>
                  <div className={`${s.b} ${s.card} ${s.pill}`}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3 L22.5 20.5 H1.5 Z" fill="#f7b500" stroke="#f7b500" strokeLinejoin="round" strokeWidth="1.5" />
                      <rect x="11" y="9" width="2" height="6.5" rx="1" fill="#fff" />
                      <circle cx="12" cy="18" r="1.2" fill="#fff" />
                    </svg>
                    {t("signals.quorum")} <em>?</em>
                  </div>
                  <div className={`${s.a} ${s.card} ${s.pill} ${s.pillGood}`}>
                    <Check />
                    {t("signals.quorum")} <em>{t("signals.quorumAfter")}</em>
                  </div>
                </div>
              </div>

              <div className={s.sig} data-sig="carpeta" style={{ textAlign: "center" }}>
                <div className={s.folder}>
                  <svg viewBox="0 0 200 150">
                    <path d="M10 28 q0-8 8-8 h52 l14 14 h98 q8 0 8 8 v92 q0 8-8 8 H18 q-8 0-8-8z" fill="#e8b84a" />
                    <rect x="34" y="18" width="56" height="70" rx="3" fill="#fff" transform="rotate(-8 62 53)" />
                    <rect x="74" y="12" width="56" height="70" rx="3" fill="#fff" />
                    <rect x="114" y="18" width="56" height="70" rx="3" fill="#fff" transform="rotate(8 142 53)" />
                    <rect x="84" y="20" width="22" height="11" rx="2" fill="#d13438" />
                    <text x="95" y="28.5" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">PDF</text>
                    <rect x="122" y="26" width="22" height="11" rx="2" fill="#d13438" transform="rotate(8 142 53)" />
                    <rect x="42" y="26" width="22" height="11" rx="2" fill="#d13438" transform="rotate(-8 62 53)" />
                    <path d="M10 56 q0-8 8-8 h164 q8 0 8 8 v78 q0 8-8 8 H18 q-8 0-8-8z" fill="#f5c95c" />
                  </svg>
                </div>
                <div className={s.swap}>
                  <div className={s.b}>
                    <span className={`${s.tag} ${s.tagBad}`}>{t("signals.folderBefore")}</span>
                  </div>
                  <div className={s.a}>
                    <span className={`${s.tag} ${s.tagGood}`}>{t("signals.folderAfter")}</span>
                  </div>
                </div>
              </div>

              <div className={s.sig} data-sig="delegacion">
                <span className={s.pdf}>PDF</span>
                <div className={s.paper}>
                  <p className={s.paperTitle}>{t("signals.proxy")}</p>
                  <div className={s.ln} />
                  <div className={s.ln} />
                  <div className={`${s.ln} ${s.lnShort}`} />
                  <div className={s.ln} />
                  <svg viewBox="0 0 120 40">
                    <path d="M5 28 C 18 6, 26 34, 36 18 S 52 8, 58 26 S 76 30, 84 14 S 104 22, 115 16" fill="none" stroke="#2747b8" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={`${s.swap} ${s.stampLayer}`}>
                  <div className={s.b} />
                  <div className={s.a}>
                    <span className={s.stamp}>{t("signals.proxyAfter")}</span>
                  </div>
                </div>
              </div>

              <div className={s.sig} data-sig="laura">
                <div className={s.swap}>
                  <div className={`${s.b} ${s.chat}`}>
                    <span className={s.av}>{t("signals.memberInitials")}</span>
                    <div className={s.bubble}>{t("signals.memberBefore")}</div>
                  </div>
                  <div className={`${s.a} ${s.chat} ${s.chatEnd}`}>
                    <div className={`${s.bubble} ${s.bubbleGood}`}>{t("signals.memberAfter")}</div>
                  </div>
                </div>
              </div>

              {CROPS.map((c, i) => (
                <div key={c.src} className={s.res} data-res={i}>
                  <div className={`${s.card} ${s.resCard}`}>
                    <div className={s.resHead}>
                      <Check />
                      {Array.isArray(cards) ? cards[i] : ""}
                    </div>
                    <div className={s.crop} data-crop>
                      <Image src={c.src} width={c.w} height={c.h} alt="" unoptimized loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}

              <div ref={bar} className={s.bar}>
                <div className={s.halo} />
                <div className={s.field}>
                  {/* El logo, para que se lea que la orden se le da a Sttok */}
                  <Icons.logo className={s.logo} aria-hidden />
                  <span className={s.sep} />
                  <span className={s.typed}>
                    <span ref={typed} />
                    <span className={s.caret} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">{t("note")}</p>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {playing ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5" />}
              {playing ? t("labels.pause") : t("labels.play")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
