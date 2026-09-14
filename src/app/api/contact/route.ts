import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/whatsapp";
import type { Lead } from "@/types";

/**
 * CONTACT FORM API
 * ----------------
 * The secure server-side endpoint for the contact form. It:
 *
 *   1. Rate-limits per visitor (in-memory sliding window).
 *   2. Rejects submissions from foreign origins (CSRF guard).
 *   3. Ignores honeypot (bot) submissions.
 *   4. Validates + sanitises every field.
 *   5. Builds the structured `Lead` object.
 *   6. Forwards the Lead to your n8n webhook when configured
 *      (N8N_LEAD_WEBHOOK_URL — set in .env.local / hosting provider).
 *   7. Optionally notifies the owner over the WhatsApp Business Cloud API
 *      (WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID) when configured.
 *
 * Pipeline the Lead can travel:
 *
 *   Website → /api/contact → n8n webhook (AI processing)
 *                          → WhatsApp Business Cloud API → CRM / Sheets / Email
 *
 * SECURITY: every credential lives in server-only environment variables.
 * Nothing in this file (or anything <NEXT_PUBLIC_>) reaches the browser.
 */

/** Everything non-printable is stripped (keeps multi-line text, drops control chars). */
function sanitizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  automationNeed?: string;
  budget?: string;
  message?: string;
  source?: string;
  project?: string;
  website?: string; // honeypot — must stay empty
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Allow common phone formats, incl. "+" and grouping; digits-only after strip.
const PHONE_RE = /^\+?[0-9()\-\s]{7,20}$/;

type OptionalLeadField =
  | "company"
  | "businessType"
  | "automationNeed"
  | "budget"
  | "project";

const MAX_LENGTH: Record<OptionalLeadField, number> = {
  company: 120,
  businessType: 80,
  automationNeed: 120,
  budget: 60,
  project: 160,
};

export async function POST(request: Request) {
  // Rate limit: throttle spammy/bot submissions per client.
  const rl = rateLimit(request, { limit: 5, windowSeconds: 600 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSeconds) },
      },
    );
  }

  // CSRF guard: reject submissions that do not originate from the site.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const origin = request.headers.get("origin");
  if (origin) {
    let allowed = false;
    try {
      allowed = new URL(origin).origin === new URL(siteUrl).origin;
    } catch {
      allowed = false;
    }
    if (!allowed) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
    if (!payload || typeof payload !== "object") throw new Error("bad body");
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot filled → silently accept (bots) but do nothing
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const name = sanitizeText(payload.name);
  const email = sanitizeText(payload.email);
  const phone = sanitizeText(payload.phone);
  const message = sanitizeText(payload.message);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && !PHONE_RE.test(phone))
    errors.phone = "Please enter a valid WhatsApp number.";
  if (message.length < 10)
    errors.message = "Please describe what you'd like to automate (min. 10 characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Sanitise + cap the optional free-text/long fields.
  const bounded = (field: OptionalLeadField) =>
    sanitizeText(payload[field]).slice(0, MAX_LENGTH[field]) || undefined;

  const lead: Lead = {
    name,
    email,
    phone: phone || undefined,
    company: bounded("company"),
    businessType: bounded("businessType"),
    automationNeed: bounded("automationNeed"),
    budget: bounded("budget"),
    message,
    source: payload.source === "project" ? "project" : "contact-form",
    project: bounded("project"),
    createdAt: new Date().toISOString(),
  };

  console.info("[contact] New lead:", JSON.stringify(lead));

  // Forward to n8n (or any webhook) when configured.
  const webhookUrl =
    process.env.N8N_LEAD_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;
  let delivered = false;
  if (webhookUrl) {
    // SSRF guard: only allow HTTPS (or localhost in dev) targets from env —
    // never values supplied by the client.
    let safeUrl: URL;
    try {
      safeUrl = new URL(webhookUrl);
    } catch {
      return NextResponse.json({ error: "Webhook misconfigured" }, { status: 500 });
    }
    const isDevLocalhost =
      process.env.NODE_ENV !== "production" &&
      (safeUrl.hostname === "localhost" || safeUrl.hostname === "127.0.0.1");
    if (safeUrl.protocol !== "https:" && !isDevLocalhost) {
      console.error("[contact] Refusing non-HTTPS webhook target.");
      return NextResponse.json({ error: "Webhook misconfigured" }, { status: 500 });
    }
    try {
      const res = await fetch(safeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      delivered = true;
    } catch (error) {
      console.error("[contact] Webhook forward failed:", error);
      return NextResponse.json(
        { error: "Could not deliver your message. Please email us directly." },
        { status: 502 },
      );
    }
  }

  // Optional: WhatsApp Business Cloud API notification to the owner.
  let whatsappNotified = false;
  try {
    const result = await sendLeadNotification(lead);
    whatsappNotified = result.status === "sent";
  } catch (error) {
    // The lead is already delivered via the webhook (if any) — never fail the
    // request because the WhatsApp notification hiccupped.
    console.error("[contact] WhatsApp notification failed:", error);
  }

  return NextResponse.json({
    ok: true,
    stored: delivered,
    whatsappNotified,
  });
}