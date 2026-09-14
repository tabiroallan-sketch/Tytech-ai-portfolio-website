import type { Faq } from "./services";

/**
 * Industry pages describe how Tytech AI's automation capabilities apply to a
 * particular type of business. Content is written from general operational
 * patterns — not claimed client experience. Where an example is illustrative,
 * it is clearly labelled as a demonstration.
 */
export interface IndustryPage {
  slug: string;
  eyebrow: string;
  h1: string;
  /** Meta title — the layout appends `| Tytech AI`. */
  title: string;
  /** Meta description. */
  description: string;
  intro: string[];
  commonProblems: { title: string; items: string[] };
  relevantAutomations: { title: string; items: string[] };
  exampleWorkflowTitle: string;
  exampleWorkflow: { description: string; flow: string[] };
  integrations: string[];
  relatedProjectSlugs: string[];
  faqs: Faq[];
  ctaTitle: string;
  ctaDescription: string;
}

export const industries: IndustryPage[] = [
  {
    slug: "real-estate",
    eyebrow: "Industry · Real Estate",
    h1: "AI Automation for Real Estate",
    title: "AI Automation for Real Estate — Lead Response & Operations",
    description:
      "AI automation for real estate: instant lead response, listing follow-up, appointment handling and CRM routing — so no enquiry sits unanswered.",
    intro: [
      "Real estate runs on response speed. The agent who replies first to a fresh listing enquiry is the one who gets the viewing — yet most enquiries filter through portals, emails and phone calls that no one is watching in real time.",
      "We help agents and agencies automate the follow-up layer: instant replies, listing qualification, appointment booking and clean CRM records — so the manual triage that eats deal time disappears.",
    ],
    commonProblems: {
      title: "Common operational problems",
      items: [
        "Enquiries from portals, ads and phone calls landing in scattered inboxes",
        "Leads going cold because follow-up depends on one person's availability",
        "The same qualification questions asked manually on every call",
        "Listings, viewing schedules and client records maintained by hand",
        "No view of which channels and follow-ups actually produce viewings",
      ],
    },
    relevantAutomations: {
      title: "Automations that help",
      items: [
        "Instant reply and AI qualification of every listing enquiry",
        "Property matching and viewing slots connected to your calendar",
        "Follow-up sequences for leads that go quiet",
        "CRM records created automatically from portals and WhatsApp",
        "Weekly reporting on enquiry sources and follow-up outcomes",
      ],
    },
    exampleWorkflowTitle: "Example: listing enquiry to booked viewing",
    exampleWorkflow: {
      description:
        "A demonstration of the flow we build for agencies handling high enquiry volumes.",
      flow: ["Portal / WhatsApp enquiry", "AI qualification & property match", "Calendar availability offered", "Viewing booked + CRM updated", "Follow-up reminders"],
    },
    integrations: ["WhatsApp Business API", "Major property portals", "Google Calendar", "CRMs", "n8n", "OpenAI"],
    relatedProjectSlugs: ["ai-lead-qualification-system"],
    faqs: [
      {
        question: "Can this work with our listing portal feeds?",
        answer:
          "Where a portal offers webhooks or APIs, yes. Where it doesn't, enquiries can still be captured by forward-connected email or form pipelines — we build to your setup.",
      },
      {
        question: "Will automated replies sound robotic to buyers?",
        answer:
          "No. Replies use your tone, reference the actual property, and are written to sound human. The point is speed with a personal feel — not template spam.",
      },
      {
        question: "Do we need to use the tools you mention?",
        answer:
          "No. We integrate with the CRM, calendar and channels you already use. These pages describe patterns, not a required stack.",
      },
    ],
    ctaTitle: "Reply to every enquiry in minutes?",
    ctaDescription:
      "Tell us where your property enquiries come from and we'll show you the automated respond → qualify → book flow.",
  },
  {
    slug: "ecommerce",
    eyebrow: "Industry · Ecommerce",
    h1: "AI Automation for Ecommerce",
    title: "AI Automation for Ecommerce — Support, Orders & Follow-Up",
    description:
      "AI automation for ecommerce: order updates, support answers, review requests and abandoned-cart follow-up — without adding staff.",
    intro: [
      "Online stores generate high volumes of repeat questions — order status, delivery times, returns, stock. Each one is simple, and each one takes a human away from something more valuable.",
      "We automate the repeat layer for ecommerce businesses: instant order and support answers, abandoned-cart follow-up, review requests and clean records between your store, email and support tools.",
    ],
    commonProblems: {
      title: "Common operational problems",
      items: [
        "The same support questions answered manually, dozens of times a day",
        "Abandoned carts with no follow-up at all",
        "Order and delivery updates that customers have to chase",
        "Returns and status queries handled across multiple inboxes",
        "No system connecting store data with support and email",
      ],
    },
    relevantAutomations: {
      title: "Automations that help",
      items: [
        "AI support agent answering order, delivery and returns questions from your policies",
        "Abandoned-cart recovery sequences with the right timing and incentives",
        "Automatic order and delivery status notifications",
        "Review requests sent after confirmed delivery",
        "Support conversations logged against the customer record",
      ],
    },
    exampleWorkflowTitle: "Example: customer question to resolution",
    exampleWorkflow: {
      description:
        "A demonstration of the support flow we build for stores that sell around the clock.",
      flow: ["Customer asks (site / WhatsApp)", "Agent answers from your policies", "Order lookup if needed", "Human hand-off for edge cases", "Logged to customer record"],
    },
    integrations: ["Store platforms", "Email & transactional systems", "WhatsApp Business API", "CRMs", "n8n", "OpenAI"],
    relatedProjectSlugs: ["ai-customer-support-agent"],
    faqs: [
      {
        question: "Can the agent check real order status?",
        answer:
          "Yes, when connected to your store's API. The agent can look up an order and answer with live data instead of guessing.",
      },
      {
        question: "Will automation feel impersonal to buyers?",
        answer:
          "Handled well, automation feels like instant service. Every communication is written in your brand voice, and humans take over whenever a customer needs it.",
      },
      {
        question: "Which ecommerce platforms does this support?",
        answer:
          "Anything with an API — that covers the major store platforms. We map the pipeline to what you actually run.",
      },
    ],
    ctaTitle: "Stop answering the same questions manually?",
    ctaDescription:
      "Tell us what your customers ask most and we'll show you the automated support and follow-up pipeline.",
  },
  {
    slug: "agencies",
    eyebrow: "Industry · Agencies & Consultants",
    h1: "AI Automation for Agencies & Consultants",
    title: "AI Automation for Agencies & Consultants — Client Workflows",
    description:
      "AI automation for agencies and consultants: lead handling, reporting, proposal prep and client onboarding — without burning out your team.",
    intro: [
      "Agencies and consultants sell outcomes while drowning in process — nurturing enquiries, preparing proposals, chasing approvals, building reports and on-boarding clients. None of that generates revenue directly; all of it eats hours.",
      "We automate the internal and client-facing process layer so your people spend time on the thinking clients actually pay for.",
    ],
    commonProblems: {
      title: "Common operational problems",
      items: [
        "Enquiry and pitch follow-up that slips between team members",
        "Reports and digests hand-assembled from several tools",
        "Proposals and proposals data re-typed for every client",
        "Client onboarding that depends on a single person's routine",
        "No central view of what each client is waiting on",
      ],
    },
    relevantAutomations: {
      title: "Automations that help",
      items: [
        "Lead capture, qualification and pitch scheduling",
        "Automated client onboarding with document collection",
        "Report and digest pipelines built from your live tools",
        "Proposal and estimate assembly from your templates and data",
        "Reminder and status alerts that keep projects moving",
      ],
    },
    exampleWorkflowTitle: "Example: client report pipeline",
    exampleWorkflow: {
      description:
        "A demonstration of the reporting flow we build for agencies that deliver regular client reports.",
      flow: ["Scheduled trigger", "Data pulled from your tools", "AI-assisted summary", "Human review & send", "Logged to client record"],
    },
    integrations: ["Project tools", "Google Workspace & Sheets", "Slack", "CRMs", "Billing tools", "n8n", "OpenAI"],
    relatedProjectSlugs: ["ai-content-automation-system"],
    faqs: [
      {
        question: "Can automation actually speed up proposals and reports?",
        answer:
          "It removes the assembly work — pulling data, formatting, drafting summaries — so a report or proposal is 80% ready before a human touches it. Review stays yours.",
      },
      {
        question: "Our client work is bespoke. Is automation a good fit?",
        answer:
          "Yes, because the repetition in agencies isn't the client work — it's the process around it: follow-ups, onboarding, reporting, admin. That's exactly what we automate.",
      },
      {
        question: "Will this require clients to change how they work with us?",
        answer:
          "No. Automation happens behind the scenes and improves the touchpoints — clients simply see faster responses and cleaner deliverables.",
      },
    ],
    ctaTitle: "Get the process work out of your week?",
    ctaDescription:
      "Show us the admin that eats most of your week and we'll show you the automated version with a fixed quote.",
  },
  {
    slug: "professional-services",
    eyebrow: "Industry · Professional Services",
    h1: "AI Automation for Professional Services",
    title: "AI Automation for Professional Services — Admin Without the Hours",
    description:
      "AI automation for professional services firms: document handling, enquiry response, onboarding and reporting — so billable hours stay billable.",
    intro: [
      "Professional services firms — accounting, legal, consulting, financial planning — trade on expertise but lose hours to document handling, follow-ups, onboarding and admin.",
      "We connect those process layers to AI and automation: documents that process themselves, enquiries answered instantly, onboarding that runs on rails, and reporting that assembles itself.",
    ],
    commonProblems: {
      title: "Common operational problems",
      items: [
        "Enquiries and document requests waiting on a person's availability",
        "Invoices, forms and documents typed, checked and filed by hand",
        "Client onboarding that repeats the same steps for every client",
        "Follow-up and reminders depending on individual memory",
        "Reporting assembled manually from several systems",
      ],
    },
    relevantAutomations: {
      title: "Automations that help",
      items: [
        "Instant reply and qualification of inbound enquiries",
        "Document extraction, validation and filing pipelines",
        "Guided client onboarding with automatic document collection",
        "Appointment, reminder and follow-up sequences",
        "Report and digest pipelines from your practice tools",
      ],
    },
    exampleWorkflowTitle: "Example: client document handling",
    exampleWorkflow: {
      description:
        "A demonstration of the document flow we build for firms that handle a steady stream of client paperwork.",
      flow: ["Document arrives", "Extraction & validation", "Matched to client record", "Filed + flagged", "Approval where needed"],
    },
    integrations: ["Practice/CRM tools", "Email", "Document storage", "Accounting tools", "n8n", "OpenAI"],
    relatedProjectSlugs: ["automated-invoice-processing"],
    faqs: [
      {
        question: "Is it wise to automate document handling in a regulated practice?",
        answer:
          "Automation handles the mechanical parts — extraction, validation, filing — while every control you need (approval, audit, review) stays in place. That's how we build it: humans on every decision that needs one.",
      },
      {
        question: "What about confidentiality?",
        answer:
          "Sensitive client data stays under your control. Where needed we use self-hosted infrastructure and server-only credentials so nothing leaks to unapproved systems.",
      },
      {
        question: "Will our team need to change how they work?",
        answer:
          "Minimally. The systems fit around existing roles — the difference is that the typing, chasing and re-keying disappears.",
      },
    ],
    ctaTitle: "Protect your billable hours?",
    ctaDescription:
      "Tell us which admin step costs your firm the most and we'll map the automated pipeline.",
  },
];

/** Returns an industry page by slug. */
export function getIndustry(slug: string): IndustryPage | undefined {
  return industries.find((industry) => industry.slug === slug);
}