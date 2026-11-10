"use client";

import { useEffect, useRef, useState } from "react";

import { loadWidget } from "@/components/calendly-popup";

const CALENDLY = "https://calendly.com/sttok/30min";

/**
 * El calendario de Calendly incrustado en la página. Las marcas utm_* con las
 * que se llega a /demo (p. ej. desde una ficha en PDF) pasan a Calendly, que
 * las guarda con la reserva. La confirmación la registra `CalendlyPopup`,
 * que escucha `calendly.event_scheduled` en toda la web.
 */
export function CalendarioDemo() {
  const caja = useRef<HTMLDivElement>(null);
  const [fallo, setFallo] = useState(false);

  const url = (() => {
    if (typeof window === "undefined") return CALENDLY;
    const utm = new URLSearchParams();
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith("utm_")) utm.set(k, v);
    });
    const q = utm.toString();
    return q ? `${CALENDLY}?${q}` : CALENDLY;
  })();

  useEffect(() => {
    let vivo = true;
    loadWidget()
      .then(() => {
        if (vivo && caja.current && window.Calendly) {
          caja.current.innerHTML = "";
          window.Calendly.initInlineWidget({ url, parentElement: caja.current });
        }
      })
      .catch(() => vivo && setFallo(true));
    return () => {
      vivo = false;
    };
  }, [url]);

  return (
    <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-xl border border-border bg-background">
      <div ref={caja} className="h-[820px] w-full min-w-[320px]">
        <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
          {fallo ? (
            <a href={CALENDLY} target="_blank" rel="noopener" className="underline">
              Abrir el calendario en Calendly
            </a>
          ) : (
            "Cargando el calendario…"
          )}
        </div>
      </div>
    </div>
  );
}
