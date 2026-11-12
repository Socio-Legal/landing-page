"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from "@radix-ui/react-icons";

import FICHAS from "@/lib/fichas.json";
import { trackFichaDownload } from "@/lib/analytics";

type Ficha = (typeof FICHAS)[number];

/**
 * Expositor de las fichas en PDF (public/fichas): las portadas en fila, con
 * flechas, como una estantería. Los datos y las portadas los genera
 * `pnpm fichas` (lib/fichas.json), así que el expositor no se desincroniza de
 * los PDF. Solo en castellano: las fichas lo son.
 */
export function FichasExpositor({
  titulo = "Fichas de producto",
  entradilla = "Cada producto y cada solución de Sttok en un PDF de cuatro páginas: qué hace, qué incluye, los casos habituales y los planes.",
}: {
  titulo?: string;
  entradilla?: string;
}) {
  const fila = useRef<HTMLDivElement>(null);
  const [extremos, setExtremos] = useState({ inicio: true, fin: false });

  const medir = () => {
    const el = fila.current;
    if (!el) return;
    setExtremos({
      inicio: el.scrollLeft <= 4,
      fin: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const mover = (sentido: 1 | -1) => {
    const el = fila.current;
    if (!el) return;
    // Salta de portada en portada: tantas como caben menos una, para que la
    // última visible siga a la vista y se vea que hay continuidad.
    const tarjetas = Array.from(el.querySelectorAll<HTMLElement>("[data-ficha]"));
    if (!tarjetas.length) return;
    const margen = tarjetas[0].offsetLeft;
    const ancho = tarjetas[1] ? tarjetas[1].offsetLeft - tarjetas[0].offsetLeft : tarjetas[0].offsetWidth;
    const actual = Math.round((el.scrollLeft) / ancho);
    const porVista = Math.max(1, Math.floor(el.clientWidth / ancho) - 1);
    const destino = Math.min(tarjetas.length - 1, Math.max(0, actual + sentido * porVista));
    el.scrollTo({ left: tarjetas[destino].offsetLeft - margen, behavior: "smooth" });
  };

  const flecha =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/70 text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <section id="fichas" className="scroll-mt-14 border-t border-border">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[1fr_minmax(0,28rem)] md:items-end md:gap-12">
          <h2 className="font-serif text-4xl font-normal leading-[1.05] text-foreground sm:text-[3.25rem]">{titulo}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{entradilla}</p>
        </div>

        <div
          ref={fila}
          onScroll={medir}
          className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FICHAS.map((f: Ficha) => (
            <article key={f.slug} data-ficha className="w-[220px] shrink-0 snap-start sm:w-[240px]">
              <a
                href={f.pdf}
                download
                onClick={() => trackFichaDownload(`expositor:${f.pdf}`)}
                className="group block focus-visible:outline-none"
                aria-label={`Descargar la ficha de ${f.nombre} (PDF, ${f.paginas} páginas)`}
              >
                <div className="relative aspect-[210/297] overflow-hidden rounded-sm bg-[#1b2240] shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring">
                  <Image src={f.portada} alt="" fill sizes="240px" className="object-cover" />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#1b2240] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <DownloadIcon className="h-3 w-3" aria-hidden />
                    PDF
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-normal leading-snug text-foreground">{f.nombre}</h3>
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.descripcion}</p>
              <p className="mt-3 flex items-baseline justify-between gap-3 text-xs text-muted-foreground">
                <span className="font-medium uppercase tracking-[0.12em]">
                  {f.tipo === "producto" ? "Producto" : "Solución"} · {f.paginas} págs.
                </span>
                <Link href={f.url} className="shrink-0 underline-offset-4 hover:text-foreground hover:underline">
                  Ver la página
                </Link>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground">{FICHAS.length} fichas en PDF, para descargar y compartir</p>
          <div className="flex gap-2">
            <button type="button" className={flecha} onClick={() => mover(-1)} disabled={extremos.inicio} aria-label="Fichas anteriores">
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button type="button" className={flecha} onClick={() => mover(1)} disabled={extremos.fin} aria-label="Fichas siguientes">
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
