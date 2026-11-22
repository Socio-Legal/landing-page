
type EventName =
  | "demo_click"
  | "login_click"
  | "meeting_scheduled"
  | "feature_view"
  | "cta_click"
  | "ficha_download";

interface AnalyticsEvent {
  event: EventName;
  event_category?: string;
  event_label?: string;
  value?: number;
}

export function trackEvent({ event, ...params }: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  // gtag lo define el script en línea del <head> (Consent Mode); los eventos
  // se encolan en dataLayer hasta que gtag.js, cargado en diferido y solo con
  // las analíticas aceptadas, los envía.
  window.gtag?.("event", event, params);
}

export function trackDemoClick(label?: string) {
  trackEvent({ event: "demo_click", event_label: label || "hero" });
}

/** Descarga de la ficha en PDF de una página (public/fichas). */
export function trackFichaDownload(label: string) {
  trackEvent({ event: "ficha_download", event_label: label });
}

export function trackMeetingClick(label?: string) {
  trackEvent({ event: "demo_click", event_category: "calendly", event_label: label || "cta" });
}

export function trackLoginClick() {
  trackEvent({ event: "login_click" });
}
