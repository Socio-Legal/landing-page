"use client";

import { useEffect } from "react";

import { trackDemoBooked } from "@/lib/google-ads";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const CALENDLY_PREFIX = "https://calendly.com/sttok/";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

let widget: Promise<void> | null = null;

/** Carga el widget de Calendly la primera vez que alguien pide una demo. */
export function loadWidget(): Promise<void> {
  if (widget) return widget;
  widget = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = WIDGET_JS;
    js.async = true;
    js.onload = () => resolve();
    js.onerror = () => {
      widget = null;
      reject(new Error("calendly"));
    };
    document.head.appendChild(js);
  });
  return widget;
}

/**
 * Los enlaces a calendly.com/sttok abren la reserva en una ventana sobre la
 * página, sin salir de sttok.com. Así la web sabe cuándo se confirma la
 * reserva (mensaje `calendly.event_scheduled`) y se lo dice a Google Ads.
 *
 * No hace falta tocar cada enlace: se interceptan todos, también los de los
 * MDX. Con Ctrl/Cmd o clic central se abre Calendly en otra pestaña, como
 * cualquier enlace; si el widget no carga, también.
 */
export function CalendlyPopup() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (!link.href.startsWith(CALENDLY_PREFIX)) return;

      event.preventDefault();
      const url = link.href;
      loadWidget()
        .then(() => window.Calendly?.initPopupWidget({ url }))
        .catch(() => window.open(url, "_blank", "noopener"));
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") trackDemoBooked();
    }

    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
