"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type CookiebotConsent = {
  statistics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    Cookiebot?: { consent?: CookiebotConsent; renew?: () => void };
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics solo con consentimiento (art. 22.2 LSSI).
 *
 * El layout raíz fija antes que nada el Consent Mode de Google en «denied».
 * Este componente no monta gtag hasta que el visitante acepta las cookies
 * estadísticas en Cookiebot, y traslada a Google cada decisión: si se
 * rechazan las de marketing, la etiqueta de Google Ads vinculada a la
 * propiedad no instala cookies.
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

    sync();
    const events = [
      "CookiebotOnConsentReady",
      "CookiebotOnAccept",
      "CookiebotOnDecline",
    ];
    events.forEach((e) => window.addEventListener(e, sync));
    return () => events.forEach((e) => window.removeEventListener(e, sync));
  }, []);

  return statistics ? <GoogleAnalytics gaId={gaId} /> : null;
}

/** Vuelve a abrir el banner de Cookiebot para cambiar o retirar el consentimiento. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.Cookiebot?.renew?.()}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </button>
  );
}
