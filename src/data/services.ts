import type { Service } from "@/types";

/** Content for a dedicated service landing page (Phase 4 routes). */
export interface ServiceLandingPage {
  slug: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  outcomesTitle: string;
  outcomes: string[];
  deliverablesTitle: string;
  deliverables: string[];
  relatedProjectSlugs: string[];
  ctaTitle: string;
  ctaDescription: string;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "globe",
    shortDescription:
      "Modern websites, landing pages and web applications designed for businesses.",
    longDescription:
      "Fast, responsive and conversion-focused websites built with modern frameworks. From a single landing page to a full web application, every build is optimized for speed, SEO and mobile devices — so your business looks professional and loads instantly everywhere.",
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
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: "bot",
    shortDescription:
      "AI-powered customer support, sales, research and internal business assistants.",
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
    icon: "workflow",
    shortDescription:
      "Automate repetitive business processes and connect different applications.",
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
    id: "ai-business-systems",
    title: "AI Business Systems",
    icon: "network",
    shortDescription:
      "Combine AI, APIs and automation into complete business workflows.",
    longDescription:
      "The biggest wins come from combining everything: AI agents making decisions, APIs moving data, and automation orchestrating the process end-to-end. We build complete systems — like lead capture → AI qualification → CRM → follow-up → team alerts — that run your operations in the background.",
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
];

/**
 * Maps each service to the case-study slugs that demonstrate it.
 * Used by the services page (related work) and case-study pages
 * (the "part of our X service" internal link).
 */
export const relatedByService: Record<string, string[]> = {
  "ai-agents": ["ai-customer-support-agent"],
  "n8n-automation": ["whatsapp-business-automation", "automated-invoice-processing"],
  "ai-business-systems": ["ai-lead-qualification-system", "ai-content-automation-system"],
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

/**
 * Content for the dedicated service landing pages. All copy mirrors the
 * claims already made across the site — nothing is invented here.
 */
export const servicePages: ServiceLandingPage[] = [
  {
    slug: "ai-agents",
    eyebrow: "AI Agents",
    h1: "AI Agents for Business",
    metaTitle: "AI Agents for Business",
    metaDescription:
      "Custom AI agents trained on your business information — answering customers, qualifying leads and assisting your team 24/7 on your website or WhatsApp.",
    intro: [
      "Custom AI agents trained on your business information that answer customers, qualify leads, research prospects or assist your team. Available 24/7 on your website, WhatsApp or internal tools — responding in seconds instead of hours.",
      "Agents start from your own documents: policies, pricing, FAQs and SOPs. They answer from that knowledge, escalate to a human when it matters, and log every conversation for review.",
    ],
    outcomesTitle: "What an AI agent can do for your business",
    outcomes: [
      "24/7 customer support that answers from your own docs",
      "Lead qualification agents that score and route enquiries",
      "Research assistants that summarize companies and contacts",
      "Internal assistants for policies, SOPs and onboarding",
    ],
    deliverablesTitle: "What's included",
    deliverables: [
      "Agent connected to your website or messaging channel",
      "Knowledge base built from your documents",
      "Guardrails, escalation to humans and logging",
      "Handover so you can update answers yourself",
    ],
    relatedProjectSlugs: [
      "ai-customer-support-agent",
      "ai-lead-qualification-system",
      "ai-content-automation-system",
    ],
    ctaTitle: "Want a customer-facing agent like this?",
    ctaDescription:
      "Tell us where customers ask questions today — we'll show you what an agent trained on your business could answer instantly.",
  },
  {
    slug: "ai-automation",
    eyebrow: "AI Automation",
    h1: "AI Automation for Business",
    metaTitle: "AI Automation Services",
    metaDescription:
      "AI automation that removes repetitive work: AI agents, n8n workflows and API integrations combined into one automated system for your business.",
    intro: [
      "The biggest wins come from combining everything: AI agents making decisions, APIs moving data, and automation orchestrating the process end-to-end.",
      "We build complete systems — like lead capture → AI qualification → CRM → follow-up → team alerts — that run your operations in the background. If your team does a task manually more than twice a week, it's a candidate for automation.",
    ],
    outcomesTitle: "What an automated system can do",
    outcomes: [
      "End-to-end lead generation and nurturing systems",
      "Automated customer onboarding journeys",
      "AI-assisted content and reporting pipelines",
      "Operations dashboards fed by live data",
    ],
    deliverablesTitle: "What's included",
    deliverables: [
      "System architecture designed around your process",
      "AI agents, APIs and n8n workflows combined",
      "Monitoring dashboard and failure alerts",
      "Training session for you and your team",
    ],
    relatedProjectSlugs: [
      "ai-lead-qualification-system",
      "ai-content-automation-system",
      "automated-invoice-processing",
    ],
    ctaTitle: "Let's map your biggest time sink",
    ctaDescription:
      "A short call is enough to spot where automation would save you the most. Bring your repetitive process and we'll chart the automated version.",
  },
  {
    slug: "workflow-automation",
    eyebrow: "n8n Automation",
    h1: "n8n Workflow Automation",
    metaTitle: "Workflow Automation with n8n",
    metaDescription:
      "n8n workflow automation that moves data between your CRM, email, spreadsheets and apps — eliminating copy-paste work and human error.",
    intro: [
      "We design n8n workflows that move data between the tools you already use — CRMs, email, spreadsheets, messaging apps and payment systems — eliminating copy-paste work and human error.",
      "Every workflow is built around your actual process, with error handling, retries and alerting built in, plus documentation of every step so you always know what's running and why.",
    ],
    outcomesTitle: "Workflows you can automate",
    outcomes: [
      "Lead capture synced automatically into your CRM",
      "Invoice and document processing pipelines",
      "Report generation and scheduled digests",
      "Order, booking and fulfilment notifications",
    ],
    deliverablesTitle: "What's included",
    deliverables: [
      "Workflow design mapped to your process",
      "Error handling, retries and alerting built in",
      "Documentation of every step",
      "Self-hosted or cloud deployment options",
    ],
    relatedProjectSlugs: [
      "whatsapp-business-automation",
      "automated-invoice-processing",
      "ai-lead-qualification-system",
    ],
    ctaTitle: "Which process eats the most manual work?",
    ctaDescription:
      "Describe the task and we'll show you an n8n workflow that does it automatically — with a fixed scope and quote.",
  },
  {
    slug: "ai-integrations",
    eyebrow: "AI Integrations",
    h1: "AI Integrations & API Automation",
    metaTitle: "AI Integrations & API Automation",
    metaDescription:
      "API integrations that connect your CRM, email, WhatsApp, spreadsheets and payment tools with AI and automation — so data flows by itself.",
    intro: [
      "Most of the heavy lifting in automation is integration — making the tools you already use talk to each other and to AI. We connect CRMs, email, messaging, spreadsheets and payment systems into one automated pipeline.",
      "Once your data flows by itself, agents and workflows can act on it: matching records, triggering follow-ups, generating reports and keeping your team in the loop.",
    ],
    outcomesTitle: "What connecting your tools unlocks",
    outcomes: [
      "A single source of truth across your apps",
      "Data that moves between tools without copy-paste",
      "AI agents that act on live, up-to-date data",
      "Alerts and reports delivered where you work",
    ],
    deliverablesTitle: "What's included",
    deliverables: [
      "Integration architecture designed around your process",
      "API connections for your existing tools",
      "Error handling and failure alerts",
      "Documentation and handover",
    ],
    relatedProjectSlugs: [
      "ai-lead-qualification-system",
      "whatsapp-business-automation",
      "ai-customer-support-agent",
    ],
    ctaTitle: "Tired of copying data between tools?",
    ctaDescription:
      "Tell us which apps you juggle daily — we'll show you how an integration pipeline can move that data automatically.",
  },
];

/** Returns the landing-page content for a service page slug. */
export function getServicePage(slug: string): ServiceLandingPage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
