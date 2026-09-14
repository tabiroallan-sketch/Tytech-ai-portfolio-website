import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * DEMO CHAT API (mock)
 * --------------------
 * Serves canned, keyword-matched responses for the InteractiveDemo chat.
 *
 * TO USE A REAL AI AGENT instead:
 *   1. Set AI_API_URL in .env.local / Vercel env vars to your agent URL
 *      (an n8n webhook or any HTTP endpoint works).
 *   2. Your endpoint receives: { message: string, history: {role,content}[] }
 *      and must return JSON:     { reply: string }
 *
 * No frontend changes are needed — this route transparently proxies to
 * AI_API_URL when the variable is present. Keys stay server-side.
 */

interface ChatBody {
  message?: string;
  history?: { role: string; content: string }[];
}

const RESPONSES: { match: RegExp; reply: string }[] = [
  {
    match: /(lead|qualif|score|prospect|sales)/i,
    reply:
      "Great question about lead handling. In a typical build we set up:\n\n1. Your forms/webhooks feed every enquiry into n8n instantly\n2. An AI agent scores each lead against YOUR criteria (budget, urgency, fit)\n3. Hot leads hit your CRM + your phone within seconds\n4. Everyone else gets an instant, personalised follow-up email\n\nWant something similar? Use the contact form and mention \"lead qualification\" — we'll map it to your exact process.",
  },
  {
    match: /(support|customer service|help desk|ticket|chat bot|chatbot)/i,
    reply:
      "A support agent is one of our most requested builds. It answers from your own documentation (policies, FAQs, product info), so customers get correct answers in seconds — day or night.\n\nWhen the agent is unsure or the customer is upset, it hands off to a human with the full conversation attached. You only step in where you're actually needed.",
  },
  {
    match: /(whatsapp|sms|messenger)/i,
    reply:
      "Yes — we build on the WhatsApp Business API. Common automations include instant order confirmations, FAQ replies, booking reminders and follow-ups when customers go quiet.\n\nIt connects through n8n, so it plays nicely with your CRM, spreadsheets and payment tools.",
  },
  {
    match: /(invoice|billing|accounting|bookkeep|xero|quickbooks)/i,
    reply:
      "Invoice processing is a perfect automation candidate. The pipeline we typically build:\n\n• Watches an inbox for invoice PDFs\n• Uses an AI vision model to extract vendor, dates and line items\n• Validates totals against purchase orders\n• Posts approved bills straight into Xero/QuickBooks\n• Flags only genuine exceptions for human review\n\nTeams usually go from ~15 minutes per invoice to under a minute.",
  },
  {
    match: /(n8n)/i,
    reply:
      "n8n is an open-source workflow automation tool — think of it as the engine room connecting all your apps. We use it to orchestrate everything: webhooks in, AI decisions in the middle, actions out to CRMs, email, Sheets, WhatsApp and hundreds of other services.\n\nIt can run cloud-hosted or self-hosted, which means you own the automation instead of renting it.",
  },
  {
    match: /(price|pricing|cost|quote|budget|how much|rate|charge)/i,
    reply:
      "Pricing depends entirely on scope — a focused single-workflow automation is very different from a full AI business system.\n\nAs rough guidance: simple automations start small, AI agent builds sit in the mid range, and end-to-end systems are scoped individually. Every project starts with a free consultation where we map your process and give you a fixed quote before any work begins.",
  },
  {
    match: /(time|how long|timeline|deadline|fast|deliver)/i,
    reply:
      "Typical timelines:\n\n• Single workflow automation: a few days\n• AI agent with knowledge base: 1–2 weeks\n• Full business system: 2–4 weeks\n\nYou'll get a clear schedule before we start, plus progress check-ins along the way.",
  },
  {
    match: /(website|web development|landing page|site)/i,
    reply:
      "We build modern websites with Next.js — fast, mobile-first and SEO-optimized. That ranges from campaign landing pages to full marketing sites and web apps.\n\nThe difference with us: your website doesn't have to be static brochure-ware. It can plug directly into automations — capturing leads, triggering workflows and feeding your CRM automatically.",
  },
  {
    match: /(api|integrat|connect|sync|hubspot|crm|notion|airtable|slack|sheets)/i,
    reply:
      "Integration is core to what we do. If a tool has an API (or even just webhooks), we can wire it into your workflows — HubSpot, Pipedrive, Notion, Airtable, Slack, Google Workspace, Stripe, WhatsApp and many more.\n\nTell us which tools you currently use via the contact form and we'll tell you exactly what's possible.",
  },
  {
    match: /^(hi|hello|hey|yo|hola)\b/i,
    reply:
      "Hello! 👋 This is a demo agent showing how an AI assistant feels on your website or WhatsApp — instant answers, friendly tone, always available.\n\nAsk us about lead qualification, support agents, invoice processing, n8n or pricing — or use the contact form when you're ready to talk about your project.",
  },
  {
    match: /(start|begin|hire|work together|contact|consult)/i,
    reply:
      "Starting is simple:\n\n1. Send us a message via the contact form describing what eats your team's time\n2. We hop on a free call and map the process together\n3. You get a fixed-scope plan and quote — no surprises\n\nHead over to the Contact page and let's automate it.",
  },
];

const FALLBACK =
  "We're a demo agent, so we only know about Alex's services — AI agents, n8n automation, business systems and websites.\n\nTry asking about those, or use the contact form for anything specific to your business. A real agent built for YOU would answer questions about your products, policies and processes instead.";

export async function POST(request: Request) {
  // Rate limit to keep the endpoint cheap and reduce abuse.
  const rl = rateLimit(request, { limit: 30, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSeconds) },
      },
    );
  }

  let body: ChatBody;
  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 },
    );
  }

  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Message too long" },
      { status: 400 },
    );
  }

  // Sanitise + cap the conversation history before proxying.
  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (h) =>
            h &&
            typeof h.content === "string" &&
            h.content.length <= 4000 &&
            (h.role === "user" || h.role === "assistant"),
        )
        .slice(-20)
        .map((h) => ({ role: h.role, content: h.content }))
    : [];

  // Proxy to your real agent when configured
  const upstream = process.env.AI_API_URL;
  if (upstream) {
    // SSRF guard: only allow HTTPS targets from env.
    let safeUrl: URL;
    try {
      safeUrl = new URL(upstream);
    } catch {
      return NextResponse.json({ error: "Agent misconfigured" }, { status: 500 });
    }
    const isDevLocalhost =
      process.env.NODE_ENV !== "production" &&
      (safeUrl.hostname === "localhost" || safeUrl.hostname === "127.0.0.1");
    if (safeUrl.protocol !== "https:" && !isDevLocalhost) {
      console.error("[demo-chat] Refusing non-HTTPS agent target.");
      return NextResponse.json({ error: "Agent misconfigured" }, { status: 500 });
    }
    try {
      const res = await fetch(safeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.AI_API_KEY
            ? { Authorization: `Bearer ${process.env.AI_API_KEY}` }
            : {}),
        },
        body: JSON.stringify({
          message,
          history,
          sessionId: request.headers.get("x-session-id") ?? undefined,
        }),
        signal: AbortSignal.timeout(30000),
      });
      const data = (await res.json()) as { reply?: string; output?: string };
      const reply = data.reply ?? data.output;
      if (res.ok && reply) {
        return NextResponse.json({ reply });
      }
    } catch (error) {
      console.error("[demo-chat] upstream agent failed:", error);
      return NextResponse.json(
        { error: "Agent unavailable" },
        { status: 502 },
      );
    }
  }

  // Mock brain
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 700));
  const matched = RESPONSES.find((entry) => entry.match.test(message));

  return NextResponse.json({
    reply: matched?.reply ?? FALLBACK,
    demo: true,
  });
}
