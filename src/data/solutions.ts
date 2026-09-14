import type { Faq } from "./services";

/**
 * Solution pages focus on a business PROBLEM rather than a technology:
 *
 *   SERVICES = what Tytech AI builds.
 *   SOLUTIONS = problems Tytech AI solves.
 *
 * Each solution maps to a real capability and to demonstration case studies —
 * never to invented client outcomes.
 */
export interface SolutionPage {
  slug: string;
  eyebrow: string;
  h1: string;
  /** Meta title — the layout appends `| Tytech AI`. */
  title: string;
  /** Meta description. */
  description: string;
  problem: { title: string; paragraphs: string[] };
  whatGetsAutomated: { title: string; items: string[] };
  workflowTitle: string;
  workflowDescription: string;
  workflowSteps: string[];
  tools: string[];
  benefits: { title: string; items: string[] };
  relatedServiceSlug: string;
  relatedProjectSlugs: string[];
  faqs: Faq[];
  ctaTitle: string;
  ctaDescription: string;
}

export const solutions: SolutionPage[] = [
  {
    slug: "lead-automation",
    eyebrow: "Solution · Lead Automation",
    h1: "Lead Automation — Qualify, Route & Respond in Seconds",
    title: "Lead Automation — Qualify & Route Enquiries Automatically",
    description:
      "Automate lead capture, AI qualification, CRM routing and follow-up so every enquiry gets a fast response — even outside office hours.",
    problem: {
      title: "Leads go cold while they wait",
      paragraphs: [
        "Every hour an enquiry waits, it cools. By the time a team member notices it, reads it and finds the right answer, the prospect is often already comparing another supplier.",
        "The triage work — noticing the lead, working out what it needs, scoring its potential, entering it into the CRM — adds minutes or hours of delay on every single enquiry.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "Every enquiry from forms, landing pages, WhatsApp and email lands in one place automatically",
        "An AI agent reads, enriches and scores the lead against your criteria",
        "The CRM is updated with the right contact, deal and pipeline stage",
        "The right person is notified instantly — hot leads immediately, the rest on a schedule",
        "Instant, scripted acknowledgements go out so the customer is never left silent",
      ],
    },
    workflowTitle: "How the automated pipeline runs",
    workflowDescription:
      "This is the demonstration system we built — the same architecture carries over to any business's stack.",
    workflowSteps: [
      "Lead submission (form / landing page)",
      "AI qualification & scoring",
      "CRM update with the right stage",
      "Instant reply + sales notification",
      "Follow-up and analytics",
    ],
    tools: ["n8n", "OpenAI", "Webhooks", "HubSpot", "Gmail", "Slack", "WhatsApp Business API", "TypeScript"],
    benefits: {
      title: "What you get",
      items: [
        "Leads answered in seconds, not hours",
        "No lead is missed or logged twice",
        "Sales sees every enquiry with scoring context",
        "Hot leads reach a human immediately",
        "Every step logged and visible",
      ],
    },
    relatedServiceSlug: "ai-automation",
    relatedProjectSlugs: ["ai-lead-qualification-system"],
    faqs: [
      {
        question: "Do we need a specific CRM for this to work?",
        answer:
          "No. The pipeline integrates with whatever you use — HubSpot, a spreadsheet, a messaging app. The architecture is the same; the connections change.",
      },
      {
        question: "How does the AI know a lead is 'hot'?",
        answer:
          "The agent scores each enquiry against criteria you define — budget signals, urgency, company fit. You set the rules; we implement them.",
      },
      {
        question: "What if a lead is complicated?",
        answer:
          "It's routed to a human with full context. The AI's job is to prepare and accelerate — not to replace the conversation.",
      },
    ],
    ctaTitle: "Every enquiry answered in under a minute?",
    ctaDescription:
      "Tell us where your leads arrive today and we'll show you the automated pipeline — with a fixed quote.",
  },
  {
    slug: "customer-support-automation",
    eyebrow: "Solution · Customer Support Automation",
    h1: "Customer Support Automation — Answer 24/7, Escalate When It Matters",
    title: "Customer Support Automation — AI Agents That Answer 24/7",
    description:
      "AI support agents answer your customers instantly from your own knowledge base, around the clock, and escalate edge cases to your team with full context.",
    problem: {
      title: "Support waits on human availability",
      paragraphs: [
        "Customers ask the same questions day and night. Every answer that waits on a human — even a fast one — is a customer who could have been served instantly.",
        "The cost isn't just delayed replies. Repetitive questions eat support hours, and inconsistent answers from different team members erode trust.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "Instant answers from your own policies, pricing, FAQs and product documentation",
        "Order, booking and account questions resolved without a ticket",
        "Edge cases and complaints escalated to a human with full conversation context",
        "Every conversation logged for review and continuous improvement",
        "Answers across your website, WhatsApp and messaging channels",
      ],
    },
    workflowTitle: "How an agent handles support",
    workflowDescription:
      "The demonstration agent we built shows the live behaviour — review the case study to see it.",
    workflowSteps: [
      "Customer message (site / WhatsApp)",
      "Agent retrieves from your knowledge base",
      "Confident answer → sent instantly",
      "Uncertain / edge case → human hand-off",
      "Conversation logged & reviewed",
    ],
    tools: ["OpenAI", "Claude", "Knowledge base (RAG)", "WhatsApp Business API", "n8n", "Your documents"],
    benefits: {
      title: "What you get",
      items: [
        "Answers delivered in seconds, 24/7",
        "Consistent, on-brand responses every time",
        "Support team freed for the cases that matter",
        "Full visibility into every conversation",
        "Escalation that never drops the ball",
      ],
    },
    relatedServiceSlug: "ai-agents",
    relatedProjectSlugs: ["ai-customer-support-agent"],
    faqs: [
      {
        question: "Will the agent invent answers it doesn't know?",
        answer:
          "No. Agents are configured to say what they don't know and escalate to a human rather than guess. Grounding in your documents keeps answers accurate.",
      },
      {
        question: "Where can the agent live?",
        answer:
          "Anywhere your customers are: an embed on your website, WhatsApp, or internal channels. One agent can serve multiple surfaces.",
      },
      {
        question: "Can we review and improve it ourselves?",
        answer:
          "Yes. Handover includes simple controls to update answers and add documents, plus a review log of what the agent got right and wrong.",
      },
    ],
    ctaTitle: "Want support that answers while you sleep?",
    ctaDescription:
      "Show us where customers ask questions today and we'll build you an agent trained on your own answers.",
  },
  {
    slug: "whatsapp-automation",
    eyebrow: "Solution · WhatsApp Automation",
    h1: "WhatsApp Automation — Turn Chats Into Managed Leads",
    title: "WhatsApp Automation — Lead Capture, Replies & Follow-Up",
    description:
      "Automate WhatsApp lead capture, instant replies, CRM logging and follow-up — so conversations on WhatsApp never fall through the cracks.",
    problem: {
      title: "WhatsApp conversations live outside your systems",
      paragraphs: [
        "WhatsApp is where a huge share of business conversations happen — but it's also where leads disappear. A message arrives, gets a reply, and then nothing is logged, tracked or followed up.",
        "Every conversation that stays in someone's personal inbox is a lead process with no system behind it.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "Incoming WhatsApp messages matched to existing contacts automatically",
        "Instant acknowledgements and instant answers to common questions",
        "Every conversation logged to your CRM with context",
        "Follow-up reminders fired when a conversation goes quiet",
        "Broadcasts or digests prepared from your CRM data when you need them",
      ],
    },
    workflowTitle: "How WhatsApp automation runs",
    workflowDescription:
      "The WhatsApp business automation case study demonstrates this end to end.",
    workflowSteps: [
      "Incoming WhatsApp message",
      "Contact matching & enrichment",
      "Instant reply (agent or template)",
      "CRM log + follow-up trigger",
      "Human takes over when needed",
    ],
    tools: ["WhatsApp Business API", "n8n", "OpenAI", "HubSpot", "Webhooks", "CRM integrations"],
    benefits: {
      title: "What you get",
      items: [
        "No lead ever lives only in a personal inbox",
        "Instant responses on the channel customers prefer",
        "Every conversation captured in your CRM",
        "Quiet conversations revived with automatic follow-up",
        "Reply on your terms — agent, human or both",
      ],
    },
    relatedServiceSlug: "ai-integrations",
    relatedProjectSlugs: ["whatsapp-business-automation", "ai-customer-support-agent"],
    faqs: [
      {
        question: "Do customers need to add us or can it work on a business number?",
        answer:
          "This runs on a WhatsApp Business number with the official API — so conversations work like regular WhatsApp and integrate cleanly with tools like n8n.",
      },
      {
        question: "Can someone still reply personally?",
        answer:
          "Yes. Automation handles the instant, routine part; humans take over the moment a conversation needs judgement. The two hand off seamlessly.",
      },
      {
        question: "Is this allowed under WhatsApp's rules?",
        answer:
          "We build within WhatsApp Business Platform policies — including their template and opt-in rules — so you stay compliant.",
      },
    ],
    ctaTitle: "Stop losing leads inside WhatsApp?",
    ctaDescription:
      "Tell us how your team handles WhatsApp today and we'll show you the automated, CRM-connected version.",
  },
  {
    slug: "content-automation",
    eyebrow: "Solution · Content Automation",
    h1: "Content Automation — Draft, Approve & Publish Faster",
    title: "Content Automation — AI-Assisted Drafting & Publishing",
    description:
      "Automate content pipelines with AI-assisted drafting, human approval and scheduling — so consistent output gets published without burning your whole week.",
    problem: {
      title: "Content creation is slow, repetitive and stuck in drafts",
      paragraphs: [
        "Producing regular content — reports, posts, emails, summaries — means starting from a blank page every time. The drafting, formatting, approval loop and scheduling eat hours on repeat.",
        "Teams end up publishing less than they plan, or skipping it entirely, because the pipeline depends on one person making time.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "AI-assisted drafting from your research, data or notes",
        "Consistent templates for reports, emails and posts",
        "An approval workflow routed to the right person at the right stage",
        "Automatic formatting and scheduling of approved content",
        "Distribution to the channels you use — email, Slack, social",
      ],
    },
    workflowTitle: "How a content pipeline runs",
    workflowDescription:
      "The content automation system case study shows this pattern working with real steps.",
    workflowSteps: [
      "Raw material (notes/data)",
      "AI-assisted draft",
      "Human review & approval",
      "Publish & schedule",
      "Distribute + track",
    ],
    tools: ["OpenAI", "Claude", "n8n", "Google Docs / Sheets", "Slack", "Email", "Scheduling APIs"],
    benefits: {
      title: "What you get",
      items: [
        "Consistent output without the blank-page block",
        "Hours saved on drafting and formatting",
        "Human approval stays on everything published",
        "One pipeline for reports, posts and emails",
        "Visibility into what's scheduled and published",
      ],
    },
    relatedServiceSlug: "ai-business-systems",
    relatedProjectSlugs: ["ai-content-automation-system"],
    faqs: [
      {
        question: "Is the AI writing everything unattended?",
        answer:
          "No. AI drafts; a human approves before anything goes out. That's the point of the pipeline — speed the drafting, keep the judgement.",
      },
      {
        question: "Can it work with our existing tools?",
        answer:
          "Yes — we connect to the tools you already use: docs, sheets, email, Slack, schedulers. Nothing is forced onto a new platform.",
      },
      {
        question: "What kind of content works best automated?",
        answer:
          "Repetitive formats first: weekly digests, reports, follow-up emails, standardized posts. Unique strategic writing still benefits from humans leading.",
      },
    ],
    ctaTitle: "Publishing more without burning the week?",
    ctaDescription:
      "Tell us what content you produce on repeat and we'll show you the automated draft → approve → publish pipeline.",
  },
  {
    slug: "invoice-automation",
    eyebrow: "Solution · Invoice Automation",
    h1: "Invoice Automation — Process Documents Without the Data Entry",
    title: "Invoice Automation — Document Processing Pipelines",
    description:
      "Automate invoice and document processing — extraction, validation, matching and filing — so data entry and manual checks disappear.",
    problem: {
      title: "Invoices arrive, and the data entry begins",
      paragraphs: [
        "Every invoice lands as a document someone has to open, read, type into a system and file. Multiply that by suppliers and months and it becomes a constant, error-prone chore.",
        "A single transposed digit or a missed invoice has real consequences — overpayments, follow-up calls and end-of-month chaos.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "Automatic extraction of invoices, receipts and documents",
        "Validation against expected values with anomalies flagged",
        "Matching to purchase orders or supplier records",
        "Filing into your accounting flow with the right metadata",
        "Notifications for approvals or mismatches",
      ],
    },
    workflowTitle: "How the pipeline runs",
    workflowDescription:
      "The invoice processing case study demonstrates the full extraction → validation → filing flow.",
    workflowSteps: [
      "Document received (email / drive)",
      "Data extraction",
      "Validation & matching",
      "Filing + metadata",
      "Approval & alerts",
    ],
    tools: ["Document extraction", "OpenAI", "n8n", "Google Sheets", "Accounting tools", "Email", "Storage"],
    benefits: {
      title: "What you get",
      items: [
        "Data entry removed from the workflow",
        "Fewer errors from manual typing and missed invoices",
        "Every document filed consistently and findable",
        "Anomalies flagged instead of slipping through",
        "An audit trail of what was processed and when",
      ],
    },
    relatedServiceSlug: "n8n-automation",
    relatedProjectSlugs: ["automated-invoice-processing"],
    faqs: [
      {
        question: "Does it work with our accounting software?",
        answer:
          "If it has an API, yes. If not, the workflow files to structured exports your accountant can use directly. We match the pipeline to your stack.",
      },
      {
        question: "What about suppliers sending different formats?",
        answer:
          "Extraction is format-agnostic — PDFs, emails, spreadsheets — and is validated against your rules so odd formats get flagged, not misfiled.",
      },
      {
        question: "Will someone still review it?",
        answer:
          "Yes. The pipeline removes the typing and the filing; a person reviews what needs judgement. Nothing is paid or booked without the controls you want.",
      },
    ],
    ctaTitle: "Done with invoice data entry?",
    ctaDescription:
      "Show us how invoices arrive today and we'll map the automated extraction → validation → filing pipeline.",
  },
  {
    slug: "sales-automation",
    eyebrow: "Solution · Sales Automation",
    h1: "Sales Automation — Enrich, Score & Follow Up Every Lead",
    title: "Sales Automation — Enrich, Score & Follow Up Every Lead",
    description:
      "Sales automation that enriches and scores leads, routes them to the right person and triggers follow-ups — so no prospect is missed.",
    problem: {
      title: "Sales time leaks into admin",
      paragraphs: [
        "Your sales team spends the day doing research a machine could do: who is this company, what do they need, when did they last engage, what should we say.",
        "By the time enquiry data is typed up, scored and assigned, the window for a great first response has often closed.",
      ],
    },
    whatGetsAutomated: {
      title: "What gets automated",
      items: [
        "Enrichment of leads with company and contact data",
        "Scoring against your fit and urgency criteria",
        "Automatic assignment to the right rep or queue",
        "First-response drafting and scheduling",
        "Follow-up sequences that revive quiet prospects",
      ],
    },
    workflowTitle: "How the sales pipeline runs",
    workflowDescription:
      "The qualification system case study demonstrates this exact pattern for lead capture through to notification.",
    workflowSteps: [
      "Lead captured",
      "Enrichment & scoring",
      "Routing & assignment",
      "Personalized first reply",
      "Follow-up sequence + analytics",
    ],
    tools: ["OpenAI", "n8n", "HubSpot", "Gmail", "Slack", "WhatsApp Business API", "Enrichment APIs"],
    benefits: {
      title: "What you get",
      items: [
        "Reps sell instead of doing data entry",
        "Leads arrive already enriched and scored",
        "Hot enquiries hit the right person instantly",
        "Follow-ups happen even when reps forget",
        "Clear visibility into pipeline performance",
      ],
    },
    relatedServiceSlug: "ai-business-systems",
    relatedProjectSlugs: ["ai-lead-qualification-system", "ai-customer-support-agent"],
    faqs: [
      {
        question: "Will automation replace our sales team?",
        answer:
          "No. It removes the prep and the busywork so the team can spend their time on relationships and closing — the parts that need humans.",
      },
      {
        question: "How do we define scoring for our leads?",
        answer:
          "You define what a hot lead looks like for your business — we translate that into the scoring rules the system applies consistently.",
      },
      {
        question: "What happens after a lead goes cold?",
        answer:
          "The system can trigger follow-up sequences at intervals you set, and re-surface a lead when new signals arrive. Nothing is dropped.",
      },
    ],
    ctaTitle: "Give your team the hours back?",
    ctaDescription:
      "Tell us how your sales process runs today and we'll show you the enriched, scored, follow-up-managed version.",
  },
];

/** Returns a solution by slug. */
export function getSolution(slug: string): SolutionPage | undefined {
  return solutions.find((solution) => solution.slug === slug);
}