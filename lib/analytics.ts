declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type EventName =
  | "demo_click"
  | "login_click"
  | "meeting_scheduled"
  | "feature_view"
  | "cta_click";

interface AnalyticsEvent {
  event: EventName;
  event_category?: string;
  event_label?: string;
  value?: number;
}

export function trackEvent(params: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(params);
}

export function trackDemoClick(label?: string) {
  trackEvent({ event: "demo_click", event_label: label || "hero" });
}

export function trackMeetingClick(label?: string) {
  trackEvent({ event: "demo_click", event_category: "calendly", event_label: label || "cta" });
}

export function trackLoginClick() {
  trackEvent({ event: "login_click" });
}
