/**
 * ============================================================
 *  ANALYTICS ABSTRACTION
 * ============================================================
 *
 *  One call site for tracking WhatsApp clicks. It fires a single
 *  `whatsapp_click` event to every analytics provider that is loaded on the
 *  page — Google Analytics 4 / Google Tag Manager (dataLayer), Plausible
 *  and PostHog are supported out of the box, with zero configuration.
 *
 *  To add a different provider, extend the `fireToProviders` switch below —
 *  the components only ever call `trackWhatsAppClick(...)`, so nothing
 *  else needs to change.
 *
 *  This module is deliberately dependency-free and never throws, so
 *  tracking can never break the site.
 * ============================================================
 */

export interface WhatsAppClickEvent {
  /** Where the click happened: "floating-button" | "hero" | "project" | "services" | "contact-form" | ... */
  source?: string;
  /** Project or service title, when the click relates to one. */
  project?: string;
  /** Human-readable button label, e.g. "Chat With Us". */
  label?: string;
}

interface AnalyticsWindow {
  dataLayer?: unknown[];
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
}

function fireToProviders(event: WhatsAppClickEvent): void {
  const win = window as unknown as AnalyticsWindow;

  // Google Analytics 4 / GTM — standard dataLayer push.
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event: "whatsapp_click", whatsapp_click: event });
  }

  // Plausible — automatic page-view tracking, this adds a custom goal.
  if (typeof win.plausible === "function") {
    win.plausible("whatsapp_click", { props: { ...event } });
  }

  // PostHog.
  if (win.posthog && typeof win.posthog.capture === "function") {
    win.posthog.capture("whatsapp_click", { ...event });
  }
}

/**
 * Track a WhatsApp call-to-action click. Safe to call from anywhere and
 * safe to call multiple times per page.
 */
export function trackWhatsAppClick(event: WhatsAppClickEvent = {}): void {
  if (typeof window === "undefined") return;
  try {
    fireToProviders(event);
    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics] whatsapp_click", event);
    }
  } catch {
    // Tracking must never break the contact flow.
  }
}