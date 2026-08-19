declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (event: string, action: string, params?: Record<string, unknown>) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer?.push({ event: eventName, ...properties });
  window.gtag?.("event", eventName, properties);
  window.plausible?.(eventName, { props: properties });
  window.dispatchEvent(
    new CustomEvent("backendbrilliance:event", {
      detail: { eventName, properties },
    }),
  );
}
