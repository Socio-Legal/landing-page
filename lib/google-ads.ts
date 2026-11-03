import { getConsentState } from "@/lib/cookie-consent";

/**
 * Google Ads. El ID es público: acaba en el HTML de cualquier página.
 *
 * La conversión que optimiza Google Ads es la demo reservada, no el clic en
 * «Solicita una demo»: se envía cuando Calendly confirma la reserva
 * (components/calendly-popup.tsx), y solo con la publicidad aceptada.
 */
export const GOOGLE_ADS_ID = "AW-10842456774";

/** Etiqueta de la acción de conversión «Reserva de demo» en Google Ads. */
export const DEMO_CONVERSION_LABEL = "X93HCMKAlrEdEMaFi7Io";

export function trackDemoBooked() {
  if (typeof window === "undefined" || !window.gtag) return;
  const consent = getConsentState().record;
  if (consent?.analytics) {
    window.gtag("event", "meeting_scheduled", { event_category: "calendly" });
  }
  if (consent?.advertising) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${DEMO_CONVERSION_LABEL}`,
      value: 1.0,
      currency: "EUR",
    });
  }
}
