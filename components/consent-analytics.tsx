"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type CookiebotConsent = {
  statistics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    Cookiebot?: {
      consent?: CookiebotConsent;
      hasResponse?: boolean;
      renew?: () => void;
      submitCustomConsent?: (
        preferences: boolean,
        statistics: boolean,
        marketing: boolean,
      ) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Interacciones con la página que cuentan como aceptación si no hay respuesta
 * al banner. Solo eventos que produce una persona: el evento «scroll» también
 * salta cuando el navegador restaura la posición al recargar, y aceptaría sin
 * que el visitante hiciera nada.
 */
const INTERACTIONS = ["pointerdown", "wheel", "touchmove", "keydown"] as const;

/**
 * Google Analytics y Google Ads según el consentimiento de Cookiebot.
 *
 * El layout raíz fija antes que nada el Consent Mode de Google en «denied».
 * Al cargar la página no se instala ninguna cookie de Google.
 *
 * Decisión de negocio: si el visitante no responde al banner pero interactúa
 * con la página (clic o toque, rueda del ratón, gesto táctil o teclado), se registra en Cookiebot la
 * aceptación de las cookies estadísticas y de marketing. Los clics dentro del
 * banner y en «Configurar cookies» no cuentan: ahí el visitante está
 * decidiendo. Si rechaza en el banner, no se instala nada.
 *
 * Con la decisión registrada, este componente monta gtag cuando hay
 * consentimiento estadístico y traslada a Google la de marketing.
 */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  const [statistics, setStatistics] = useState(false);

  useEffect(() => {
    const sync = () => {
      const consent = window.Cookiebot?.consent;
      const stats = Boolean(consent?.statistics);
      const marketing = Boolean(consent?.marketing);
      window.gtag?.("consent", "update", {
        analytics_storage: stats ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      });
      setStatistics(stats);
    };

    const onInteraction = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("#CybotCookiebotDialog, [data-cookie-settings]")
      ) {
        return;
      }
      const cookiebot = window.Cookiebot;
      // Cookiebot aún no ha cargado: se espera a la siguiente interacción.
      if (!cookiebot?.submitCustomConsent) return;
      removeInteractionListeners();
      if (!cookiebot.hasResponse) {
        cookiebot.submitCustomConsent(false, true, true);
        // submitCustomConsent no siempre emite CookiebotOnAccept: se sincroniza aquí.
        sync();
      }
    };

    const removeInteractionListeners = () =>
      INTERACTIONS.forEach((e) =>
        window.removeEventListener(e, onInteraction, true),
      );

    sync();
    const events = [
      "CookiebotOnConsentReady",
      "CookiebotOnAccept",
      "CookiebotOnDecline",
    ];
    events.forEach((e) => window.addEventListener(e, sync));
    INTERACTIONS.forEach((e) =>
      window.addEventListener(e, onInteraction, { capture: true, passive: true }),
    );
    return () => {
      events.forEach((e) => window.removeEventListener(e, sync));
      removeInteractionListeners();
    };
  }, []);

  return statistics ? <GoogleAnalytics gaId={gaId} /> : null;
}

/** Vuelve a abrir el banner de Cookiebot para cambiar o retirar el consentimiento. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-cookie-settings
      onClick={() => window.Cookiebot?.renew?.()}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </button>
  );
}
