"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type CookieYesConsent = {
  categories?: {
    analytics?: boolean;
    advertisement?: boolean;
  };
};

declare global {
  interface Window {
    getCkyConsent?: () => CookieYesConsent;
    revisitCkyConsent?: () => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics solo con consentimiento (art. 22.2 LSSI).
 *
 * El layout raíz fija antes que nada el Consent Mode de Google en «denied».
 * Este componente no monta gtag hasta que el visitante acepta las cookies
 * analíticas en CookieYes, y traslada a Google cada decisión: si se
 * rechazan las de publicidad, la etiqueta de Google Ads vinculada a la
 * propiedad no instala cookies.
 */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  const [statistics, setStatistics] = useState(false);

  useEffect(() => {
    const sync = () => {
      const categories = window.getCkyConsent?.().categories;
      const stats = Boolean(categories?.analytics);
      const marketing = Boolean(categories?.advertisement);
      window.gtag?.("consent", "update", {
        analytics_storage: stats ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      });
      setStatistics(stats);
    };

    sync();
    const events = ["cookieyes_banner_load", "cookieyes_consent_update"];
    events.forEach((e) => document.addEventListener(e, sync));
    return () => events.forEach((e) => document.removeEventListener(e, sync));
  }, []);

  return statistics ? <GoogleAnalytics gaId={gaId} /> : null;
}

/** Vuelve a abrir el banner de CookieYes para cambiar o retirar el consentimiento. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.revisitCkyConsent?.()}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </button>
  );
}
