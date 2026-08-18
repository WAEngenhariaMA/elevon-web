import { getStoredUtm } from "@/lib/utm";

export type AnalyticsEvent =
  | "click_whatsapp"
  | "click_product"
  | "click_checkout"
  | "click_link"
  | "view_product"
  | "submit_contact";

type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const metaPixelEventMap: Partial<Record<AnalyticsEvent, string>> = {
  click_whatsapp: "Contact",
  click_checkout: "InitiateCheckout",
  view_product: "ViewContent",
  submit_contact: "Lead",
};

export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const payload = { ...getStoredUtm(), ...params };

  window.gtag?.("event", event, payload);

  const pixelEvent = metaPixelEventMap[event];
  if (pixelEvent) window.fbq?.("track", pixelEvent, payload);

  window.dispatchEvent(new CustomEvent("elevon:analytics", { detail: { event, params: payload } }));
}
