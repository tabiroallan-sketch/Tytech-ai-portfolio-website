/**
 * ============================================================
 *  CENTRAL WEBSITE CONFIGURATION  —  EDIT EVERYTHING HERE
 * ============================================================
 *
 *  This is the single place to configure the business, the WhatsApp
 *  integration and the backend pipeline. Nothing else in the codebase
 *  needs to change when you update these values.
 *
 *  ── WHATSAPP QUICK START ─────────────────────────────
 *  1. Replace `whatsapp.phoneNumber` below with your WhatsApp number in
 *     international format, DIGITS ONLY (no "+", spaces or dashes).
 *     Example: for +1 (415) 555-2671  →  "14155552671"
 *  2. Keep `defaultMessage` (or change it) — it is pre-filled every time
 *     someone taps a WhatsApp button.
 *  3. Done. Every WhatsApp button and the floating button update
 *     automatically.
 *
 *  ── SERVER-SIDE SECRETS ──────────────────────────────
 *  WhatsApp Cloud API tokens, Business Account IDs and the n8n webhook
 *  URL are SECRETS. They are read from environment variables ONLY on the
 *  server (see .env.example) — never put them in this file, because this
 *  file is imported by client components.
 * ============================================================
 */

/** Production origin used for all canonical, sitemap and OG URLs. */
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const resolvedSiteUrl = envSiteUrl ? envSiteUrl.replace(/\/+$/, "") : "https://tytech.ai";
if (!envSiteUrl && process.env.NODE_ENV === "production") {
  console.warn(
    "[seo] NEXT_PUBLIC_SITE_URL is not set. Falling back to https://tytech.ai for all canonical, sitemap and OG URLs.",
  );
}

export const business = {
  /** Your business / brand name (used in headers, SEO and messages). */
  name: "Tytech AI",
  tagline: "AI Automation Agency",
  description:
    "Tytech AI is an AI automation agency. We build AI agents, n8n workflows, business integrations and websites that remove repetitive work and help your business respond faster.",
  /** Public site URL. Falls back to https://tytech.ai when NEXT_PUBLIC_SITE_URL is unset. */
  url: resolvedSiteUrl,
  /** Public contact email — used everywhere and as the WhatsApp fallback. */
  email: "tabiroallan@gmail.com",
  location: "Remote · Working worldwide",
  availability: "Available for new projects",
  socials: {
    github: "",
    linkedin: "",
    x: "",
  },
} as const;

/**
 * WhatsApp integration settings.
 *
 * `phoneNumber` is the ONLY thing you must fill in to go live with the
 * simple "tap to chat" experience. Everything else has a sensible default.
 *
 * NOTE: This number is intentionally client-safe (it is not a secret —
 * it's the number customers chat with). API credentials for the WhatsApp
 * Business Cloud API live in server-only environment variables instead.
 */
export const whatsapp = {
  /**
   * Your WhatsApp number in international format, DIGITS ONLY.
   * Example:  +1 (415) 555-2671  →  "14155552671"
   * Leave empty ("") to fall back to email CTAs until you set it.
   */
  phoneNumber: "254742879040",

  /** Hover tooltip text on the floating button + aria-label base. */
  chatLabel: "Chat with Tytech AI",

  /** Default pre-filled message (used unless a specific message is set). */
  defaultMessage:
    "Hello Tytech Ai, I came across your website and I'd like to discuss an automation project.",

  /**
   * Template for project / service specific messages.
   * {name} is replaced with the project or service title.
   */
  projectMessageTemplate:
    "Hello Tytech Ai, I'm interested in your {name}. I'd like to discuss how something similar could work for my business.",
} as const;

/**
 * Backend pipeline configuration (n8n webhook + WhatsApp Business Cloud API
 * credentials). These are read from server-only environment variables so
 * nothing sensitive ever reaches the browser. See `.env.example`.
 */
export const backend = {
  /** Env var name holding the n8n lead webhook URL. */
  n8nWebhookUrlEnv: "N8N_LEAD_WEBHOOK_URL",
  /** Env var name for the legacy webhook (kept for backwards compatibility). */
  legacyWebhookUrlEnv: "CONTACT_WEBHOOK_URL",
  /** Note: only readable server-side via process.env — never inline here. */
} as const;