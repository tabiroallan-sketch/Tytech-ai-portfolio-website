/**
 * ============================================================
 *  WHATSAPP INTEGRATION LAYER
 * ============================================================
 *
 *  Three tiers, one file:
 *
 *  1. CLIENT-SAFE helpers (below) — used by buttons/components to build the
 *     `wa.me` deep-link. They only read `src/config/site.ts` (public data),
 *     so it is safe to import them from client components:
 *
 *       buildWhatsAppUrl()          → https://wa.me/<number>?text=<encoded>
 *       buildProjectMessage(name)   → "Hello..., I'm interested in your <x>..."
 *       buildContactLeadMessage(l)  → beautifully formatted lead message
 *       isWhatsAppConfigured()      → true when phoneNumber is set
 *
 *  2. SERVER-ONLY senders (bottom) — talk to the official WhatsApp Business
 *     Cloud API on the server. They read secrets from environment variables
 *     and are ONLY safe to call from server code (API routes / server
 *     actions). Do NOT import them into "use client" components.
 *
 *       sendWhatsAppMessage()       → sends any text message via Cloud API
 *       sendLeadNotification()      → sends the structured lead to the owner
 *
 *  Credentials are read from:
 *      WHATSAPP_ACCESS_TOKEN
 *      WHATSAPP_PHONE_NUMBER_ID
 *      WHATSAPP_BUSINESS_ACCOUNT_ID
 *
 *  These are server-only — never prefix them with NEXT_PUBLIC_.
 * ============================================================
 */

import { business, whatsapp } from "@/config/site";
import type { Lead } from "@/types";

/* ------------------------------------------------------------------ */
/* 1. Client-safe helpers                                             */
/* ------------------------------------------------------------------ */

/** Strips everything except digits, so any input format becomes E.164-safe. */
export function normalizePhoneNumber(raw?: string): string {
  if (!raw) return "";
  return raw.replace(/\D/g, "");
}

/** true when a usable WhatsApp number is configured. */
export function isWhatsAppConfigured(): boolean {
  return normalizePhoneNumber(whatsapp.phoneNumber).length >= 7;
}

/** Builds the project/service-specific enquiry message. */
export function buildProjectMessage(name: string): string {
  const clean = name.replace(/\s+/g, " ").trim();
  if (!clean) return whatsapp.defaultMessage;
  return whatsapp.projectMessageTemplate.replace("{name}", clean);
}

/**
 * Formats the submitted contact-form data into the tidy message that gets
 * pre-filled in WhatsApp (and is also what the owner receives via the
 * Business Cloud API).
 */
export function buildContactLeadMessage(lead: {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  automationNeed?: string;
  budget?: string;
  message?: string;
}): string {
  const lines: string[] = [
    `Hello ${business.name},`,
    "",
    "I'd like to discuss an automation project.",
    "",
  ];
  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.company) lines.push(`Company: ${lead.company}`);
  if (lead.businessType) lines.push(`Business Type: ${lead.businessType}`);
  if (lead.automationNeed) lines.push(`What I'd like to automate: ${lead.automationNeed}`);
  if (lead.budget) lines.push(`Budget: ${lead.budget}`);
  if (lead.phone) lines.push(`WhatsApp: ${lead.phone}`);
  if (lead.email) lines.push(`Email: ${lead.email}`);
  lines.push("");
  lines.push("Message:");
  lines.push(lead.message?.trim() ? lead.message.trim() : "—");
  return lines.join("\n");
}

/**
 * Builds the `wa.me` deep-link with a URL-encoded message.
 *
 * Returns `null` when no WhatsApp number is configured, so callers can
 * degrade gracefully to the email fallback instead of crashing.
 */
export function buildWhatsAppUrl(message?: string): string | null {
  const phone = normalizePhoneNumber(whatsapp.phoneNumber);
  if (!phone) return null;
  const text = message && message.trim() ? message.trim() : whatsapp.defaultMessage;
  const params = new URLSearchParams();
  if (text) params.set("text", text);
  const query = params.toString();
  return `https://wa.me/${phone}${query ? `?${query}` : ""}`;
}

/* ------------------------------------------------------------------ */
/* 2. SERVER-ONLY senders                                             */
/* ------------------------------------------------------------------ */
/*  Everything below talks to outbound APIs and must ONLY be imported   */
/*  from server code (API routes, server actions, etc.).                */

const GRAPH_API_BASE = "https://graph.facebook.com/v21.0";

export type WhatsAppSendStatus =
  | "sent"
  | "not-configured"
  | "error";

export interface WhatsAppSendResult {
  ok: boolean;
  status: WhatsAppSendStatus;
  /** Short, non-sensitive description — never raw API internals. */
  detail?: string;
}

function isServerOnlyConfigured(): boolean {
  return Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

/**
 * Sends a text message through the WhatsApp Business Cloud API.
 *
 * Requires WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID in the server
 * environment. Returns `status: "not-configured"` (ok: false) when the
 * credentials aren't set up yet — callers should treat that as "skip",
 * not as a failure.
 */
export async function sendWhatsAppMessage(input: {
  to: string;
  message: string;
}): Promise<WhatsAppSendResult> {
  if (!isServerOnlyConfigured()) {
    return { ok: false, status: "not-configured" };
  }

  const to = normalizePhoneNumber(input.to);
  if (!to || !input.message.trim()) {
    return { ok: false, status: "error", detail: "Invalid recipient or empty message." };
  }

  try {
    const res = await fetch(
      `${GRAPH_API_BASE}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "text",
          text: { body: input.message.slice(0, 4096) },
        }),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!res.ok) {
      // Log limited details server-side; never echo raw API errors to users.
      const body = await res.text().catch(() => "");
      console.error(`[whatsapp] Cloud API responded ${res.status}`.concat(
        body ? ` — ${body.slice(0, 500)}` : "",
      ));
      return { ok: false, status: "error", detail: "WhatsApp API request failed." };
    }

    return { ok: true, status: "sent" };
  } catch (error) {
    console.error("[whatsapp] Failed to send message:", error);
    return { ok: false, status: "error", detail: "Unable to reach WhatsApp." };
  }
}

/**
 * Sends the structured lead to the business owner's WhatsApp number via the
 * Cloud API. Uses `whatsapp.phoneNumber` (the owner's number, configured in
 * src/config/site.ts) as the recipient.
 */
export async function sendLeadNotification(lead: Lead): Promise<WhatsAppSendResult> {
  return sendWhatsAppMessage({
    to: whatsapp.phoneNumber,
    message: buildContactLeadMessage(lead),
  });
}