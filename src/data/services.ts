import type { Service } from "@/types";

/** A single FAQ entry shown on a service/solution/industry page. */
export interface Faq {
  question: string;
  answer: string;
}

/** An example workflow with its step-by-step flow. */
export interface ExampleWorkflow {
  name: string;
  description: string;
  flow: string[];
}

/** Full landing-page content for a dedicated service page. */
export interface ServicePage {
  slug: string;
  eyebrow: string;
  h1: string;
  /** Meta title — the layout appends `| Tytech AI`. */
  title: string;
  /** Meta description. */
  description: string;
  hero: {
    kicker: string;
    paragraphs: string[];
    bullets: string[];
  };
  problem: {
    title: string;
    paragraphs: string[];
  };
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  whoFor: {
    title: string;
    items: string[];
  };
  whatGetsBuilt: {
    title: string;
    items: string[];
  };
  howItWorks: {
    title: string;
    steps: { title: string; text: string }[];
  };
  exampleWorkflows: {
    title: string;
    items: ExampleWorkflow[];
  };
  technologies: {
    title: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  relatedProjectSlugs: string[];
  faqs: Faq[];
  ctaTitle: string;
  ctaDescription: string;
}

/* ------------------------------------------------------------------ */
/* Service cards (grid previews on the homepage + services index)      */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: "workflow",
    shortDescription:
      "AI agents, n8n workflows and API integrations combined into one automated system for your business.",
    longDescription:
      "We combine AI agents, n8n workflows and API integrations into complete systems — like lead capture → AI qualification → CRM → follow-up → team alerts — that run your operations in the background.",
    useCases: [
      "End-to-end lead generation and nurturing systems",
      "Automated customer onboarding journeys",
      "AI-assisted content and reporting pipelines",
      "Operations dashboards fed by live data",
    ],
    deliverables: [
      "System architecture designed around your process",
      "AI agents, APIs and n8n workflows combined",
      "Monitoring dashboard and failure alerts",
      "Training session for you and your team",
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: "bot",
    shortDescription:
      "Custom AI agents trained on your business information — answering customers, qualifying leads and assisting your team 24/7.",
    longDescription:
      "Custom AI agents trained on your business information that answer customers, qualify leads, research prospects or assist your team. Available 24/7 on your website, WhatsApp or internal tools — responding in seconds instead of hours.",
    useCases: [
      "24/7 customer support that answers from your own docs",
      "Lead qualification agents that score and route enquiries",
      "Research assistants that summarize companies and contacts",
      "Internal assistants for policies, SOPs and onboarding",
    ],
    deliverables: [
      "Agent connected to your website or messaging channel",
      "Knowledge base built from your documents",
      "Guardrails, escalation to humans and logging",
      "Handover so you can update answers yourself",
    ],
  },
  {
    id: "n8n-automation",
    title: "n8n Automation",
    icon: "network",
    shortDescription:
      "n8n workflows that connect your CRM, email, spreadsheets and apps so data moves by itself.",
    longDescription:
      "We design n8n workflows that move data between the tools you already use — CRMs, email, spreadsheets, messaging apps and payment systems — eliminating copy-paste work and human error. If your team does it manually more than twice a week, it can probably be automated.",
    useCases: [
      "Lead capture synced automatically into your CRM",
      "Invoice and document processing pipelines",
      "Report generation and scheduled digests",
      "Order, booking and fulfilment notifications",
    ],
    deliverables: [
      "Workflow design mapped to your process",
      "Error handling, retries and alerting built in",
      "Documentation of every step",
      "Self-hosted or cloud deployment options",
    ],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    icon: "network",
    shortDescription:
      "Connect your existing CRMs, email, WhatsApp, spreadsheets and payment tools with AI and automation.",
    longDescription:
      "API integrations that connect your CRM, email, WhatsApp, spreadsheets and payment systems with AI and automation — so data flows by itself and agents can act on live, up-to-date information.",
    useCases: [
      "A single source of truth across your apps",
      "Data that moves between tools without copy-paste",
      "AI agents that act on live, up-to-date data",
      "Alerts and reports delivered where you work",
    ],
    deliverables: [
      "Integration architecture designed around your process",
      "API connections for your existing tools",
      "Error handling and failure alerts",
      "Documentation and handover",
    ],
  },
  {
    id: "ai-business-systems",
    title: "AI Business Systems",
    icon: "workflow",
    shortDescription:
      "Multiple automations working together as one operational system that runs your business in the background.",
    longDescription:
      "We combine AI, APIs and automation into complete business workflows — like lead capture → AI qualification → CRM → follow-up → team alerts — where every step feeds the next automatically.",
    useCases: [
      "End-to-end lead generation and nurturing systems",
      "Automated customer onboarding journeys",
      "AI-assisted content and reporting pipelines",
      "Operations dashboards fed by live data",
    ],
    deliverables: [
      "System architecture designed around your process",
      "API integrations across all your tools",
      "Monitoring dashboard and failure alerts",
      "Training session for you and your team",
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: "globe",
    shortDescription:
      "Websites and web applications designed to work with your automation and business systems.",
    longDescription:
      "Fast, responsive and conversion-focused websites built with modern frameworks. From a landing page to a full web application, every build is optimized for speed, SEO and mobile devices — and wired to the automation systems behind it.",
    useCases: [
      "Company websites that convert visitors into enquiries",
      "High-performance landing pages for campaigns",
      "Client portals and internal dashboards",
      "Rebuilding slow or outdated websites",
    ],
    deliverables: [
      "Responsive design for phone, tablet and desktop",
      "SEO-friendly structure and metadata",
      "Analytics and contact forms wired up",
      "Fast hosting setup and handover",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Employment relationships used for internal linking                  */
/* ------------------------------------------------------------------ */

/**
 * Maps each service to the case-study slugs that demonstrate it.
 * Used by the services page (related work) and case-study pages
 * (the "part of our X service" internal link).
 */
export const relatedByService: Record<string, string[]> = {
  "ai-agents": ["ai-customer-support-agent"],
  "n8n-automation": ["whatsapp-business-automation", "automated-invoice-processing"],
  "ai-business-systems": ["ai-lead-qualification-system", "ai-content-automation-system"],
  "ai-integrations": ["ai-lead-qualification-system", "whatsapp-business-automation"],
  "ai-automation": ["ai-lead-qualification-system", "ai-content-automation-system", "automated-invoice-processing"],
  "web-development": ["modern-business-website"],
};

/** Returns the service a case study belongs to, if any. */
export function getServiceForProject(slug: string): Service | undefined {
  for (const [serviceId, slugs] of Object.entries(relatedByService)) {
    if (slugs.includes(slug)) {
      return services.find((service) => service.id === serviceId);
    }
  }
  return undefined;
}

/** Returns the card content for a service slug, if any. */
export function getServiceCard(slug: string): Service | undefined {
  return services.find((service) => service.id === slug);
}

/* ------------------------------------------------------------------ */
/* Full landing-page content for each service                          */
/* ------------------------------------------------------------------ */

/**
 * Content for the dedicated service landing pages. All copy mirrors the
 * capabilities the business genuinely offers — no invented client outcomes,
 * no fabricated statistics.
 */
export const servicePages: ServicePage[] = [
  {
    slug: "ai-automation",
    eyebrow: "AI Automation",
    h1: "AI Automation for Business",
    title: "AI Automation Services — AI Agents, n8n & Integrations",
    description:
      "AI automation services that combine AI agents, n8n workflows and API integrations into systems that remove repetitive work and speed up your operations.",
    hero: {
      kicker: "Automate the work your team repeats",
      paragraphs: [
        "AI automation binds AI agents, n8n workflows and API integrations into one system that runs business operations in the background — capturing leads, answering enquiries, moving data and keeping your team in the loop.",
        "If your team does a task manually more than twice a week, it's a candidate. We map the process, design the automated version and hand over a system you can maintain yourself.",
      ],
      bullets: [
        "Replies to leads and customers in seconds, not hours",
        "Data moves between your tools without copy-paste",
        "Human review stays on every important step",
        "Monitoring, alerts and error handling built in",
      ],
    },
    problem: {
      title: "The problem AI automation solves",
      paragraphs: [
        "Manual work doesn't scale. The same copy-paste, the same follow-ups, the same drafting — repeated enough that hours disappear and customers wait. Most time is lost between tools, not inside them: data sits in a form, an inbox or a spreadsheet until someone finds time to move it.",
        "Businesses don't need more software. They need the software they already use to work together automatically.",
      ],
    },
    whatIs: {
      title: "What AI automation is",
      paragraphs: [
        "AI automation is using AI models to make decisions and do work, with workflows orchestrating the sequence — capture, process, act, notify — and integrations connecting the tools involved. We combine all three into one pipeline you can see, test and maintain.",
        "It's a system you can watch: every step logged, every failure alerted, every hand-off to a human deliberate.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Small and mid-sized businesses doing repetitive admin their team can't escape",
        "Agencies and service firms drowning in lead follow-up and reporting",
        "Operations teams juggling several tools that don't talk to each other",
        "Businesses that want AI working for them without replacing their stack",
      ],
    },
    whatGetsBuilt: {
      title: "What we can automate for you",
      items: [
        "End-to-end lead capture, qualification and follow-up systems",
        "Automated customer onboarding and support journeys",
        "AI-assisted content, reporting and document pipelines",
        "Operations dashboards fed by live data",
        "Notifications and alerts that land where your team already works",
      ],
    },
    howItWorks: {
      title: "How we build it",
      steps: [
        {
          title: "Map the process",
          text: "We document what happens today, where it breaks and what you want automated. You get the process written down clearly.",
        },
        {
          title: "Design the system",
          text: "A blueprint of steps, decisions and integrations, with a fixed scope and quote before anything is built.",
        },
        {
          title: "Build and test",
          text: "We assemble the AI steps, workflows and integrations against your real data and test each stage.",
        },
        {
          title: "Launch with monitoring",
          text: "Error alerts, logs and a dashboard keep every run visible — you know the moment something needs attention.",
        },
        {
          title: "Hand over",
          text: "Documentation and training so you can adjust answers, rules and triggers yourself.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example workflows",
      items: [
        {
          name: "Lead capture → qualified → routed",
          description:
            "An enquiry from any form or landing page is scored by an AI agent and pushed to the CRM with the right pipeline stage.",
          flow: ["Form or landing page", "AI qualification", "CRM update", "Sales notification"],
        },
        {
          name: "Support enquiry → answered or escalated",
          description:
            "Customers get instant answers from your knowledge base; hard cases escalate to a human with full context.",
          flow: ["Website or WhatsApp message", "AI agent answers", "Escalation to human", "Logged and reviewable"],
        },
        {
          name: "Invoice → processed → filed",
          description:
            "Documents are read, validated and pushed into your accounting flow automatically, with anomalies flagged.",
          flow: ["Invoice received", "Document extraction", "Validation & matching", "Filing & alerts"],
        },
      ],
    },
    technologies: {
      title: "Technologies we work with",
      items: [
        "n8n",
        "OpenAI",
        "Claude",
        "Webhooks & APIs",
        "WhatsApp Business API",
        "HubSpot & CRMs",
        "Google Workspace & Sheets",
        "Slack",
        "PostgreSQL",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "Leads and customers get responses in seconds, not hours",
        "Repetitive work disappears instead of piling up",
        "Copy-paste mistakes and missed hand-offs are eliminated",
        "Every step is logged, reviewable and auditable",
        "A fixed scope and price before we build anything",
      ],
    },
    relatedProjectSlugs: ["ai-lead-qualification-system", "ai-content-automation-system", "automated-invoice-processing"],
    faqs: [
      {
        question: "What does AI automation actually do?",
        answer:
          "It takes the steps your team repeats — answering enquiries, moving data between tools, drafting replies, updating records — and runs them automatically with AI handling the decisions. You keep review points where it matters.",
      },
      {
        question: "Do we need to replace our existing tools?",
        answer:
          "No. We integrate with the tools you already use — CRMs, email, spreadsheets, messaging and payment systems. Automation is built around your stack, not instead of it.",
      },
      {
        question: "How long does a typical system take to build?",
        answer:
          "Simple single-workflow automations are usually live within a week. Complete systems with AI agents and multiple integrations typically take two to four weeks, including testing and handover.",
      },
      {
        question: "Who maintains the system after launch?",
        answer:
          "You get documentation and a training session so you can adjust it yourself. We also offer support retainers if you'd prefer us to handle changes and monitoring.",
      },
    ],
    ctaTitle: "Ready to remove your biggest time sink?",
    ctaDescription:
      "Tell us the process that eats the most hours each week and we'll show you the automated version — with a fixed quote.",
  },
  {
    slug: "ai-agents",
    eyebrow: "AI Agents",
    h1: "AI Agents for Business",
    title: "AI Agents — Customer Support, Sales & Research",
    description:
      "Custom AI agents trained on your business information that answer customers, qualify leads, research prospects and support your team — 24/7 on your website or WhatsApp.",
    hero: {
      kicker: "Agents that work like helpful team members",
      paragraphs: [
        "An AI agent is more than a chatbot: it reads your documents, uses your tools and workflows, remembers the conversation and knows when to hand over to a human.",
        "We build agents trained on your business information — policies, pricing, FAQs and SOPs — that answer customers, qualify leads or assist your team around the clock.",
      ],
      bullets: [
        "Answers from your own knowledge base",
        "Uses your tools, APIs and workflows",
        "Escalates to a human with full context",
        "Works on your website, WhatsApp or internal tools",
      ],
    },
    problem: {
      title: "The problem agents solve",
      paragraphs: [
        "Customers expect an answer in minutes, but your team can't be online 24/7. When enquiries wait, they cool down — or worse, go to the competitor that answers first.",
        "An agent fixes the gap: instant answers to routine questions, informed context at every hand-off, and your team free to focus on the conversations that genuinely need a human.",
      ],
    },
    whatIs: {
      title: "Agent vs chatbot",
      paragraphs: [
        "A chatbot plays back scripted answers. An AI agent acts: it searches your knowledge base, calls your tools and APIs, follows your workflows, remembers the conversation and completes a task — an answer, a qualified lead, a booked slot or a draft document.",
        "Agents start from your own documents: policies, pricing, FAQs and SOPs. They answer from that knowledge, escalate to a human when it matters and log every conversation for review.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Support teams dealing with the same questions every week",
        "Sales teams that need every enquirer answered within minutes",
        "Agencies and consultants who want 24/7 coverage without hiring overnight staff",
        "Service businesses with appointment, enquiry or onboarding processes",
      ],
    },
    whatGetsBuilt: {
      title: "What we can build for you",
      items: [
        "Customer support agents that answer from your own docs and policies",
        "Lead qualification agents that score and route enquiries",
        "Appointment and inquiry handling agents connected to your calendar",
        "Internal assistants for policies, SOPs and onboarding",
        "Research and document-processing assistants",
      ],
    },
    howItWorks: {
      title: "How we build an agent",
      steps: [
        {
          title: "Build the knowledge base",
          text: "We turn your existing documents, site and FAQs into a knowledge base the agent actually answers from.",
        },
        {
          title: "Connect the tools",
          text: "The agent gets access to the workflows it needs — CRM, calendar, APIs, notification channels.",
        },
        {
          title: "Set guardrails",
          text: "Escalation rules, tone, what it can and can't say, and full logging of every conversation.",
        },
        {
          title: "Test against real questions",
          text: "We run it against the questions your customers actually ask and tune the answers.",
        },
        {
          title: "Hand over",
          text: "You get tools to review conversations and update answers yourself.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example agent workflows",
      items: [
        {
          name: "Support agent with escalation",
          description:
            "Customers get instant answers from your knowledge base; edge cases are handed to a human with full conversation context.",
          flow: ["Customer message", "Agent answers from docs", "Edge case detected", "Hand-off to human"],
        },
        {
          name: "Lead qualification agent",
          description:
            "Every enrolment is enriched, scored and routed — with a personalised first reply prepared automatically.",
          flow: ["Enquiry captured", "Agent scores & enriches", "CRM record created", "Sales notified"],
        },
        {
          name: "Internal assistant",
          description:
            "Your team asks policies and SOPs in natural language and gets answers grounded in your documents.",
          flow: ["Team member asks", "Agent retrieves policy", "Grounded answer", "Source linked"],
        },
      ],
    },
    technologies: {
      title: "Technology behind our agents",
      items: [
        "OpenAI",
        "Claude",
        "Retrieval / knowledge bases (RAG)",
        "Webhooks & APIs",
        "WhatsApp Business API",
        "n8n workflows",
        "Your documents (PDF, Notion, site content)",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "24/7 coverage that answers the same questions every time",
        "Leads get a response in seconds — while they're still hot",
        "Your team works on the conversations that need judgement",
        "Every interaction logged and reviewable",
        "Answers you can update yourself after handover",
      ],
    },
    relatedProjectSlugs: ["ai-customer-support-agent", "ai-lead-qualification-system", "ai-content-automation-system"],
    faqs: [
      {
        question: "What's the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot replies with scripted answers. An AI agent retrieves your information, uses your tools and workflows, remembers the conversation and completes a task — then knows when to hand over to a human.",
      },
      {
        question: "What can an agent connect to?",
        answer:
          "Anything with an API: your CRM, calendar, email, spreadsheets, website, WhatsApp or messaging tools. Agents can read data, update records and trigger workflows.",
      },
      {
        question: "What happens when the agent doesn't know the answer?",
        answer:
          "The agent is configured to say so honestly and escalate to a human with the full conversation context — never to invent an answer.",
      },
      {
        question: "Can we update the agent ourselves?",
        answer:
          "Yes. You get a handover session and simple controls to update answers, add documents to the knowledge base and review conversations.",
      },
    ],
    ctaTitle: "Want a customer-facing agent like this?",
    ctaDescription:
      "Tell us where customers ask questions today — we'll show you what an agent trained on your business could answer instantly.",
  },
  {
    slug: "n8n-automation",
    eyebrow: "n8n Automation",
    h1: "n8n Workflow Automation",
    title: "n8n Automation Services — Workflows & Integrations",
    description:
      "n8n workflow automation that moves data between your CRM, email, spreadsheets and apps — with error handling, monitoring and documentation built in.",
    hero: {
      kicker: "Connect your tools. Remove the copy-paste.",
      paragraphs: [
        "n8n is an open-source automation platform where you build workflows visually — triggers, steps, AI nodes, branches and integrations connecting the tools you already use.",
        "We design n8n workflows around your actual process, with error handling, retries and alerting built in, plus documentation so you always know what runs and why.",
      ],
      bullets: [
        "Visual, human-readable workflows",
        "Self-hosted or cloud deployment",
        "AI nodes for decision steps",
        "Error handling and alerts on every workflow",
      ],
    },
    problem: {
      title: "The problem n8n workflows solve",
      paragraphs: [
        "Your data lives in many places — forms, inboxes, spreadsheets, CRMs, messaging apps. Moving it between them by hand is slow, error-prone and invisible: when a step is missed, nobody notices until it matters.",
        "n8n workflows move that data automatically, following the exact rules you'd apply manually, every single time.",
      ],
    },
    whatIs: {
      title: "What n8n is (and isn't)",
      paragraphs: [
        "n8n is a visual workflow builder with 400+ integrations, so a workflow can watch a form, call an AI model, update a CRM and post a notification — all in one editor. It can run in the cloud or self-hosted on your own infrastructure.",
        "n8n is one of the platforms we use. We pick the right tool for each situation — this is about solving your process, not selling a platform.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Operations and admin teams moving data between tools by hand",
        "Agencies handling client lead flows, reporting and notifications",
        "Sales and marketing teams syncing enquiries into their CRM",
        "Finance and admin teams processing invoices and documents",
      ],
    },
    whatGetsBuilt: {
      title: "Workflows we can build for you",
      items: [
        "Lead capture synced automatically into your CRM",
        "Invoice and document processing pipelines",
        "Report generation and scheduled digests",
        "Order, booking and fulfilment notifications",
        "Two-way WhatsApp and messaging automation",
      ],
    },
    howItWorks: {
      title: "How we build a workflow",
      steps: [
        {
          title: "Map the process",
          text: "We document what happens today, the exact rules, and where the manual work is.",
        },
        {
          title: "Design the workflow",
          text: "A visual blueprint of triggers, steps and branches, agreed before build.",
        },
        {
          title: "Build with you in the loop",
          text: "We assemble the workflow, wire in error handling, retries and alerts.",
        },
        {
          title: "Test against real cases",
          text: "We run it through your real scenarios and fix anything that breaks.",
        },
        {
          title: "Monitor and document",
          text: "You get monitoring, alerting and a plain-language guide to every step.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example n8n workflows",
      items: [
        {
          name: "Lead capture → CRM sync",
          description:
            "Every form or WhatsApp enquiry is deduplicated, enriched and written to the CRM as the right record type.",
          flow: ["Form or WhatsApp", "Deduplication", "CRM create/update", "Notification"],
        },
        {
          name: "Invoice → extraction → filing",
          description:
            "Invoices and documents are read, validated and filed, with anomalies flagged for a human.",
          flow: ["Document received", "Data extraction", "Validation", "Filing & flags"],
        },
        {
          name: "Weekly report digest",
          description:
            "Data from your tools is pulled together into a report and delivered to your team on schedule.",
          flow: ["Scheduled trigger", "Data aggregation", "Report built", "Delivered to Slack/email"],
        },
      ],
    },
    technologies: {
      title: "What we connect with n8n",
      items: [
        "n8n (cloud or self-hosted)",
        "Webhooks",
        "REST APIs",
        "WhatsApp Business API",
        "HubSpot & CRMs",
        "Google Workspace & Sheets",
        "Slack",
        "PostgreSQL & databases",
        "OpenAI / AI nodes",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "Data flows between tools without copy-paste",
        "Tasks follow the same rules every single time",
        "Failures are caught and alerted — not discovered weeks later",
        "Every workflow is documented and easy to change",
        "Hosted on your infrastructure if you need full control",
      ],
    },
    relatedProjectSlugs: ["whatsapp-business-automation", "automated-invoice-processing", "ai-lead-qualification-system"],
    faqs: [
      {
        question: "What is n8n?",
        answer:
          "n8n is an open-source automation platform where you build workflows visually out of triggers, steps, AI nodes and integrations. It connects hundreds of tools and can run in the cloud or self-hosted.",
      },
      {
        question: "Self-hosted or cloud — which should we choose?",
        answer:
          "Self-hosted keeps your data on your own infrastructure and avoids per-execution fees at scale. Cloud is zero-maintenance. We'll recommend based on your data sensitivity and volume.",
      },
      {
        question: "How is this different from Zapier or Make?",
        answer:
          "n8n is open-source, self-hostable and better for complex logic, custom AI nodes and high-volume jobs. We'll recommend whatever fits your case — sometimes that means a hosted tool.",
      },
      {
        question: "What happens if a workflow fails?",
        answer:
          "Every workflow includes error handling, retries and alerts. Failures notify the right person immediately instead of failing silently.",
      },
    ],
    ctaTitle: "Which process eats the most manual work?",
    ctaDescription:
      "Describe the task and we'll show you an n8n workflow that does it automatically — with a fixed scope and quote.",
  },
  {
    slug: "ai-integrations",
    eyebrow: "AI Integrations",
    h1: "AI Integrations & API Automation",
    title: "AI Integrations — Connect AI to Your Existing Systems",
    description:
      "API integrations that connect your CRM, email, WhatsApp, spreadsheets and payment tools with AI and automation — without replacing your existing stack.",
    hero: {
      kicker: "Make the tools you already use talk to each other",
      paragraphs: [
        "Most of the heavy lifting in automation is integration — making the tools you already use talk to each other and to AI. We connect CRMs, email, messaging, spreadsheets and payment systems into one automated pipeline.",
        "Once your data flows by itself, agents and workflows can act on it: matching records, triggering follow-ups, generating reports and keeping your team in the loop.",
      ],
      bullets: [
        "No forced replatforming — we connect what you have",
        "AI agents act on live, up-to-date data",
        "Alerts and reports delivered where you work",
        "Error handling and monitoring throughout",
      ],
    },
    problem: {
      title: "The problem integrations solve",
      paragraphs: [
        "Every tool your business uses comes with its own data silo. Keeping them in sync means exporting, formatting, importing and copy-paste — work that nobody notices until it goes wrong.",
        "Integrations remove that work and make the data reliable enough to build on — which is also what makes AI agents and automation actually useful.",
      ],
    },
    whatIs: {
      title: "What we mean by AI integration",
      paragraphs: [
        "An integration is a permanent, reliable connection between systems — a webhook here, an API there — that moves data automatically with error handling when something breaks.",
        "When we add AI, the integration doesn't just move data; it reads, enriches and decides — matching a lead to a company, summarizing a document, drafting a reply. Your existing tools stay, and AI works on top of the data that flows between them.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Businesses using several disconnected tools that duplicate their data",
        "Teams that want AI to work on real business data, not just chat",
        "Companies preparing to automate but unsure what integrates with what",
        "Businesses that can't afford to rip out and replace their current stack",
      ],
    },
    whatGetsBuilt: {
      title: "Integrations we can build for you",
      items: [
        "Single source of truth across your apps",
        "AI agents connected to your CRM, calendar and messaging",
        "WhatsApp and email automation pipelines",
        "Enrichment and matching between record systems",
        "Alerts and reports pushed into your existing tools",
      ],
    },
    howItWorks: {
      title: "How we build an integration",
      steps: [
        {
          title: "Audit your stack",
          text: "We map the tools you use, where data sits and where it needs to flow.",
        },
        {
          title: "Design the architecture",
          text: "A clear plan of connections, data shapes, and how AI gets in on the act.",
        },
        {
          title: "Build the connections",
          text: "APIs, webhooks and sync logic — with authentication and error handling.",
        },
        {
          title: "Test the data flow",
          text: "We verify real records move correctly in both directions.",
        },
        {
          title: "Document and hand over",
          text: "Plain-language documentation and monitoring so it keeps running.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example integration pipelines",
      items: [
        {
          name: "Two-way WhatsApp ↔ CRM",
          description:
            "Messages are matched to contacts, logged to the CRM and follow-ups are triggered automatically.",
          flow: ["WhatsApp message", "Contact matching", "CRM log & follow-up", "Agent or human reply"],
        },
        {
          name: "Enrichment pipeline",
          description:
            "New leads are enriched with company data before they reach sales — automatically, from public APIs.",
          flow: ["New lead", "API enrichment", "Scoring & routing", "Sales notified"],
        },
        {
          name: "AI report pipeline",
          description:
            "Data from your systems is pulled together, summarized by AI and delivered where your team works.",
          flow: ["Scheduled pull", "Data aggregated", "AI summary", "Delivered to Slack/email"],
        },
      ],
    },
    technologies: {
      title: "Systems we integrate",
      items: [
        "CRMs (HubSpot and others)",
        "WhatsApp Business API",
        "Gmail & Google Workspace",
        "Google Sheets & Spreadsheets",
        "Payment and invoicing tools",
        "Slack & messaging",
        "Databases (PostgreSQL)",
        "REST APIs & webhooks",
        "OpenAI / Claude",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "Your existing systems kept — nothing forced to be replaced",
        "A single source of truth across your tools",
        "AI that works on live, up-to-date business data",
        "Reliable connections with error handling and alerts",
        "Documentation you can actually follow",
      ],
    },
    relatedProjectSlugs: ["ai-lead-qualification-system", "whatsapp-business-automation", "ai-customer-support-agent"],
    faqs: [
      {
        question: "Do integrations require replacing our current tools?",
        answer:
          "No. The whole point is connecting what you already have. If a tool genuinely can't do the job, we'll say so — but the default is to integrate, not replace.",
      },
      {
        question: "Will our data be safe across these connections?",
        answer:
          "Yes. Connections use proper authentication, minimal necessary permissions and server-side secrets. Where data is sensitive we'll recommend self-hosted infrastructure.",
      },
      {
        question: "How long does an integration take?",
        answer:
          "A simple two-system sync is usually done in a few days. Multi-system pipelines with AI steps normally take one to three weeks.",
      },
      {
        question: "What if an integration breaks?",
        answer:
          "Every connection has monitoring and alerting. Failures are caught and reported immediately, rather than discovered later.",
      },
    ],
    ctaTitle: "Tired of copying data between tools?",
    ctaDescription:
      "Tell us which apps you juggle daily — we'll show you how an integration pipeline can move that data automatically.",
  },
  {
    slug: "ai-business-systems",
    eyebrow: "AI Business Systems",
    h1: "AI Business Systems",
    title: "AI Business Systems — Complete Automated Operations",
    description:
      "Complete AI business systems that combine AI agents, n8n workflows and API integrations into one operational system that runs your business in the background.",
    hero: {
      kicker: "Multiple automations, one operational system",
      paragraphs: [
        "The biggest wins come from combining everything: AI agents making decisions, APIs moving data, and automation orchestrating the process end-to-end.",
        "We build complete business systems — like lead capture → AI qualification → CRM → follow-up → team alerts — that run your operations in the background while your team handles what genuinely needs a human.",
      ],
      bullets: [
        "End-to-end systems, not isolated workflows",
        "Every step feeds the next automatically",
        "Live monitoring of the whole operation",
        "Built around your people, not over their heads",
      ],
    },
    problem: {
      title: "The problem piecemeal automation leaves behind",
      paragraphs: [
        "Single automations help, but a business is a chain of steps. Speed up one link and the next becomes the bottleneck — a qualifying agent without a CRM behind it, a CRM nobody updates, a follow-up that never fires.",
        "An AI business system treats the whole chain as one: captured, processed, routed and followed up automatically, with humans at the decision points that matter.",
      ],
    },
    whatIs: {
      title: "What an AI business system is",
      paragraphs: [
        "It's a group of automations designed and built together so that each step's output becomes the next step's input. Leads flow into qualification, qualification flows into the CRM, the CRM triggers follow-ups and notifications — one connected operation.",
        "It's not a single chatbot or a single workflow. It's the automated version of an entire process your team currently runs by hand.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Businesses ready to move beyond one-off automations",
        "Teams whose leads and customers pass through several steps and tools",
        "Companies scaling operations without scaling headcount",
        "Founders who want visibility into what's actually happening",
      ],
    },
    whatGetsBuilt: {
      title: "Systems we can build for you",
      items: [
        "End-to-end lead generation and nurturing systems",
        "Automated customer onboarding journeys",
        "AI-assisted content, reporting and document pipelines",
        "Operations dashboards fed by live data",
        "Escalation and alerting that keeps your team informed",
      ],
    },
    howItWorks: {
      title: "How we build a business system",
      steps: [
        {
          title: "Map the whole process",
          text: "We trace the full journey — from the first touchpoint to the outcome — not just one isolated step.",
        },
        {
          title: "Design the architecture",
          text: "A clear diagram of stages, decisions, integrations and where humans stay in control.",
        },
        {
          title: "Build stage by stage",
          text: "Each stage is built and tested against the next, so the chain works end to end.",
        },
        {
          title: "Monitor the operation",
          text: "A dashboard and alerts show every stage in real time — you see the health of the whole system.",
        },
        {
          title: "Train and hand over",
          text: "Your team learns to run and adjust the system, with documentation throughout.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example system architectures",
      items: [
        {
          name: "Lead → qualified → CRM → follow-up → analytics",
          description:
            "The full pipeline from first touchpoint to tracked outcome, run automatically with human review before anything significant.",
          flow: ["Lead source", "AI qualification", "CRM update", "Follow-up & alerts", "Analytics"],
        },
        {
          name: "Onboarding → documents → account → support",
          description:
            "A new customer is onboarded, documents collected, the account provisioned and support handed off — automatically.",
          flow: ["Signup", "Document collection", "Account provisioning", "Support hand-off"],
        },
        {
          name: "Content → review → publish → distribute",
          description:
            "Drafts are AI-assisted, routed for human approval, published and distributed across your channels.",
          flow: ["Content draft", "AI assist", "Human approval", "Publish & distribute"],
        },
      ],
    },
    technologies: {
      title: "What we combine",
      items: [
        "AI agents",
        "n8n workflows",
        "REST APIs & webhooks",
        "CRMs (HubSpot and others)",
        "WhatsApp Business API",
        "Google Workspace & Sheets",
        "Slack",
        "PostgreSQL",
        "Terraform / cloud hosting where needed",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "An operation that runs in the background, not a stack of disconnected tools",
        "Leads and customers handled end-to-end without dropping steps",
        "Human review exactly where it matters",
        "Live visibility into every stage of the process",
        "A system your own team can operate and adjust",
      ],
    },
    relatedProjectSlugs: ["ai-lead-qualification-system", "ai-content-automation-system", "ai-customer-support-agent"],
    faqs: [
      {
        question: "What makes this different from hiring someone to manage our tools?",
        answer:
          "A person moves data step by step, when they have time. A system does it instantly, every time, and records every action. The person's role changes to reviewing and handling the moments that need judgement.",
      },
      {
        question: "Do we build the whole thing at once?",
        answer:
          "Usually we agree the full architecture first, then build it stage by stage so you see working results early and each stage is tested before the next.",
      },
      {
        question: "Will our team need training to use it?",
        answer:
          "Yes — and we include it. A business system only works if your team understands it, so handover and training are part of every build.",
      },
      {
        question: "What happens when the system needs to change?",
        answer:
          "You can adjust documented steps yourself, or we handle changes on a support retainer. The architecture is designed to be changed, not frozen.",
      },
    ],
    ctaTitle: "Let's map your biggest time sink",
    ctaDescription:
      "A short call is enough to spot where automation would save you the most. Bring your repetitive process and we'll chart the automated version.",
  },
  {
    slug: "web-development",
    eyebrow: "Web Development",
    h1: "Websites & Web Applications Built Around Your Automation",
    title: "Web Development — Websites & Web Applications",
    description:
      "Fast, conversion-focused websites and web applications designed to work with your automation stack — landing pages, dashboards, portals and AI-powered interfaces.",
    hero: {
      kicker: "Websites that plug into your business systems",
      paragraphs: [
        "A website is usually the first step of an automated pipeline — the place leads arrive. We build fast, SEO-friendly sites and web applications that are wired to the automation systems behind them, not pages cut off from the rest of your operation.",
        "We're not a generic web-design shop. We build websites as the front end of your business systems: contact forms that feed your AI qualification, dashboards fed by live data, portals that talk to your workflow.",
      ],
      bullets: [
        "Fast, responsive, SEO-friendly builds",
        "Forms wired directly into your automation",
        "Portals and dashboards fed by live data",
        "Built with modern frameworks, not page builders",
      ],
    },
    problem: {
      title: "The problem with most websites",
      paragraphs: [
        "Most business websites are a static brochure that ends where the real work begins: forms go nowhere, enquiries sit in a mailbox, and the site is never connected to the process behind it.",
        "We build websites as part of the system — the front door that captures enquiries exactly the way your automation needs them.",
      ],
    },
    whatIs: {
      title: "What we build",
      paragraphs: [
        "Business websites and landing pages that convert visitors into enquiries, and web applications — portals, dashboards and internal tools — that run on your own infrastructure.",
        "Every build is optimized for speed, SEO and mobile, and engineered to integrate with the AI agents, workflows and APIs you use or will use.",
      ],
    },
    whoFor: {
      title: "Who it's for",
      items: [
        "Businesses with a slow or outdated website that doesn't convert",
        "Teams that want their website tied into their automation",
        "Companies launching new products or campaigns that need landing pages",
        "Businesses that need internal dashboards, portals or web apps",
      ],
    },
    whatGetsBuilt: {
      title: "What we can build for you",
      items: [
        "Company websites that convert visitors into enquiries",
        "High-performance landing pages for campaigns",
        "Client portals and internal dashboards",
        "AI-powered interfaces — chat, search, document upload",
        "Rebuilding slow or outdated websites",
      ],
    },
    howItWorks: {
      title: "How we build a website",
      steps: [
        {
          title: "Define the goal",
          text: "What should the visitor do — enquire, book, sign up? We design around that action.",
        },
        {
          title: "Design, not decorate",
          text: "A clear structure that matches your brand, focused on the conversion path.",
        },
        {
          title: "Build it fast",
          text: "Modern, responsive frameworks with SEO, performance and accessibility built in.",
        },
        {
          title: "Wire it to your systems",
          text: "Forms feed your CRM or automation; dashboards pull live data; nothing dead-ends.",
        },
        {
          title: "Launch and hand over",
          text: "Hosting setup, analytics and a handover so you own the build.",
        },
      ],
    },
    exampleWorkflows: {
      title: "Example builds",
      items: [
        {
          name: "Conversion-focused company website",
          description:
            "A fast, SEO-friendly site where every enquiry form feeds your lead qualification pipeline.",
          flow: ["Visitor lands", "Clear value & proof", "Enquiry form", "Automation pipeline"],
        },
        {
          name: "Client portal",
          description:
            "A login-protected portal where clients see their data, documents and workflow status.",
          flow: ["Login", "Live data shown", "Actions & updates", "Sync with backend"],
        },
        {
          name: "Operations dashboard",
          description:
            "An internal dashboard fed by live data from your tools and automations.",
          flow: ["Data sources", "Real-time aggregation", "Dashboard view", "Alerts & exports"],
        },
      ],
    },
    technologies: {
      title: "Technology we build with",
      items: [
        "Next.js / React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js APIs",
        "PostgreSQL",
        "Vercel / self-hosted",
        "Authentication",
        "Analytics",
        "Headless CMS (when needed)",
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        "A site that loads fast and ranks on search engines",
        "Enquiries wired directly into your automation — nothing lost",
        "A modern stack you can extend, not a locked-in page builder",
        "Responsive on every device, accessible to all visitors",
        "Hosting, analytics and handover included",
      ],
    },
    relatedProjectSlugs: ["modern-business-website", "ai-lead-qualification-system"],
    faqs: [
      {
        question: "Can you redesign our existing site rather than starting fresh?",
        answer:
          "Yes. We often rebuild existing sites in a modern framework, preserving what works while fixing speed, SEO and conversion issues.",
      },
      {
        question: "Do you build sites as part of a bigger automation project?",
        answer:
          "Often, yes. A website is the front door of an automated pipeline — we build it to feed the system properly rather than as an afterthought.",
      },
      {
        question: "Who hosts the website?",
        answer:
          "We set up fast, modern hosting for you — self-managed via Vercel or similar — and hand over access. You own everything.",
      },
      {
        question: "Will we be able to update content ourselves?",
        answer:
          "Yes. Standard edits run through an easy workflow or content system, and we document how to make changes without touching code.",
      },
    ],
    ctaTitle: "Need a website that actually feeds your pipeline?",
    ctaDescription:
      "Tell us what you need the site to do and we'll show you how it connects to your automation — with a clear plan and quote.",
  },
];

/** Returns the landing-page content for a service page slug. */
export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}