import type { Project, ProjectCategory } from "@/types";

/**
 * CENTRAL PROJECT DATA — YOUR PERSONAL PROJECTS LIVE HERE
 * =======================================================
 *
 * HOW TO ADD ONE OF YOUR OWN PROJECTS
 * -----------------------------------
 * 1. Copy the TEMPLATE object at the bottom of this file (or copy any demo
 *    project below) and paste it inside the `projects` array.
 * 2. Change the fields. `slug` becomes the URL: /projects/<your-slug>.
 * 3. Drop your screenshot into /public/images/projects/ and point `image` at it
 *    (png / jpg / webp / svg all work).
 * 4. Save. The projects page, category filters, sitemap.xml and a full
 *    case-study page are generated automatically.
 *
 * LINKS (yours, per project)
 * --------------------------
 * - Common ones have dedicated fields: liveUrl, githubUrl, docsUrl, workflowUrl.
 * - For ANY other link (demo video, Figma, app store, blog post...), add it to
 *   the `links` array — as many as you want:
 *
 *     links: [
 *       { label: "App Store", url: "https://apps.apple.com/...", icon: "external" },
 *       { label: "Demo Video", url: "https://youtube.com/watch?v=...", icon: "video" },
 *     ],
 *
 *   icon options: "external" | "github" | "workflow" | "docs" | "video" | "download"
 *   (icon is optional — defaults to an external-link arrow)
 *
 * Any field you delete makes its button / section disappear automatically.
 * When you're ready to go live, DELETE the six demo projects below and keep
 * only your own entries.
 */

export const categories: ProjectCategory[] = [
  "AI Business Systems",
  "AI Agents",
  "Automation",
  "Web Development",
];

export const projects: Project[] = [
  {
    slug: "ai-lead-qualification-system",
    title: "AI Lead Qualification System",
    category: "AI Business Systems",
    year: "2026",
    type: "demo",
    featured: true,
    summary:
      "An end-to-end system that captures leads, qualifies them with an AI agent, updates the CRM and notifies sales — in under a minute.",
    overview: [
      "This system watches every inbound lead from website forms and landing pages, enriches and scores it with an AI agent, then routes hot leads to sales instantly while logging everything to the CRM.",
      "It combines a webhook receiver, an n8n orchestration layer, an LLM-powered qualification step and native CRM/email integrations into one automated pipeline.",
    ],
    problem:
      "Leads submitted through forms were reviewed manually once or twice a day. Response times stretched to hours, high-intent enquiries went cold, and sales spent the first hour of each day copying form data into the CRM by hand.",
    solution:
      "A fully automated pipeline now qualifies every lead within seconds. The AI agent scores intent and completeness, drafts a personalised first reply, creates the CRM record with the right pipeline stage, and pushes an instant notification for hot leads — removing the manual triage step entirely.",
    technologies: ["n8n", "OpenAI API", "Webhooks", "HubSpot", "Gmail", "TypeScript", "Next.js"],
    image: "/images/projects/lead-qualification.png",
    imageAlt: "Dashboard preview of the AI lead qualification system showing scored leads",
    demoType: "chat",
    demoIntro:
      "Try the qualification agent below. Paste a messy enquiry like \"need pricing asap for our team of 20\" and see how it responds.",
    demoSuggestions: [
      "What does this system do?",
      "How are leads scored?",
      "What happens to a hot lead?",
      "Which tools does it connect?",
    ],
    flowNodes: [
      { id: "form", label: "Lead Submission", description: "Website form or landing page", icon: "form" },
      { id: "webhook", label: "Webhook", description: "Instant POST to n8n on submit", icon: "webhook" },
      { id: "n8n", label: "n8n Workflow", description: "Orchestrates the full pipeline", icon: "workflow" },
      { id: "ai", label: "AI Agent", description: "Enriches, scores and segments the lead", icon: "ai" },
      { id: "decision", label: "Lead Qualification", description: "Hot / warm / cold routing rules", icon: "file" },
      { id: "crm", label: "CRM Update", description: "Contact + deal created with stage", icon: "database" },
      { id: "email", label: "Email & Alerts", description: "Personalised reply + Slack alert", icon: "mail" },
    ],
    architecture: [
      {
        title: "Capture layer",
        description:
          "Forms POST JSON directly to an n8n webhook URL. No middleware server required — n8n receives submissions in real time.",
      },
      {
        title: "Orchestration layer",
        description:
          "The n8n workflow validates input, deduplicates against existing contacts, and fans out to the AI and CRM branches in parallel.",
      },
      {
        title: "Intelligence layer",
        description:
          "An OpenAI model scores budget signals, urgency and fit against a rubric stored in the workflow, returning structured JSON.",
      },
      {
        title: "Action layer",
        description:
          "Native n8n nodes write to HubSpot, send Gmail via OAuth and post to Slack — with retry logic and error alerts if any step fails.",
      },
    ],
    results: [
      { value: "< 60 sec", label: "Lead response time (from hours)" },
      { value: "100%", label: "Leads logged to CRM automatically" },
      { value: "~5 hrs/week", label: "Manual triage time saved" },
      { value: "0", label: "Leads missed outside office hours" },
    ],
    liveUrl: "",
    githubUrl: "",
    workflowUrl: "",
  },
  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Agent",
    category: "AI Agents",
    year: "2026",
    type: "demo",
    featured: true,
    summary:
      "A website chat agent trained on company knowledge that answers customer questions instantly and escalates edge cases to humans.",
    overview: [
      "A conversational AI agent embedded on a business website. It answers product, pricing and policy questions using a retrieval layer built from the company's own documentation, and hands over to a human whenever confidence is low.",
      "Every conversation is logged so the business can see exactly what customers ask and where the knowledge base needs improving.",
    ],
    problem:
      "Support emails arrived around the clock but were only answered during business hours. Customers waited overnight for answers to simple questions, and the same twenty questions consumed most of the team's day.",
    solution:
      "An AI agent now resolves routine questions in seconds, 24/7. It cites the company's real policies rather than guessing, collects order numbers where relevant, and passes anything sensitive to a human with full conversation context attached.",
    technologies: ["OpenAI API", "RAG", "Next.js", "Tailwind CSS", "Supabase", "Edge Functions"],
    image: "/images/projects/support-agent.png",
    imageAlt: "Chat interface preview of the AI customer support agent answering a question",
    demoType: "chat",
    demoIntro:
      "This is a live mock of the support agent experience. Ask about shipping, refunds or integrations.",
    demoSuggestions: [
      "What's your refund policy?",
      "Do you ship internationally?",
      "How do I reset my password?",
      "Can I talk to a human?",
    ],
    flowNodes: [
      { id: "chat", label: "Visitor Message", description: "Chat widget on the website", icon: "chat" },
      { id: "api", label: "API Route", description: "Server endpoint keeps keys private", icon: "webhook" },
      { id: "rag", label: "Knowledge Retrieval", description: "Relevant doc chunks fetched", icon: "database" },
      { id: "ai", label: "AI Agent", description: "Answers grounded in company docs", icon: "ai" },
      { id: "confidence", label: "Confidence Check", description: "Low confidence → human handoff", icon: "file" },
      { id: "reply", label: "Instant Reply", description: "Answer streamed back in seconds", icon: "mail" },
    ],
    architecture: [
      {
        title: "Client widget",
        description:
          "A lightweight React chat component talks only to the site's own API route — the LLM key never reaches the browser.",
      },
      {
        title: "Retrieval service",
        description:
          "Company documents are chunked and embedded into Postgres (Supabase). Each question retrieves the most relevant passages first.",
      },
      {
        title: "Agent logic",
        description:
          "The system prompt restricts answers to retrieved context, defines escalation triggers and sets tone-of-voice rules.",
      },
      {
        title: "Handoff & logging",
        description:
          "Transcripts persist to the database; low-confidence sessions email the support inbox with the full history pre-filled.",
      },
    ],
    results: [
      { value: "~70%", label: "Routine questions resolved automatically (example)" },
      { value: "24/7", label: "Instant answers, including nights and weekends" },
      { value: "< 3 sec", label: "Median response time" },
      { value: "Weekly", label: "Knowledge gaps surfaced automatically" },
    ],
    liveUrl: "",
    githubUrl: "",
    docsUrl: "",
  },
  {
    slug: "whatsapp-business-automation",
    title: "WhatsApp Business Automation",
    category: "Automation",
    year: "2025",
    type: "demo",
    summary:
      "n8n workflows on the WhatsApp Business API that confirm orders, answer FAQs and follow up with customers automatically.",
    overview: [
      "Automated WhatsApp flows for a small business handling bookings and order updates through their most-used channel. Templates, quick replies and AI fallbacks keep conversations fast without a human glued to the phone.",
      "The workflows handle order confirmations, delivery updates, FAQ replies and polite follow-ups when customers go quiet.",
    ],
    problem:
      "The owner answered every WhatsApp message personally — including the same shipping, pricing and opening-hours questions dozens of times per week. Order confirmations sometimes went out hours late, and no-shows were never followed up.",
    solution:
      "WhatsApp messages now trigger n8n workflows instantly. Common questions get immediate template or AI-assisted replies, orders receive automatic confirmations and status updates, and unconfirmed bookings get a friendly reminder sequence.",
    technologies: ["WhatsApp Business API", "n8n", "Google Sheets", "Airtable", "OpenAI API"],
    image: "/images/projects/whatsapp-automation.png",
    imageAlt: "Phone-style preview of automated WhatsApp business conversation flows",
    demoType: "none",
    flowNodes: [
      { id: "msg", label: "Inbound Message", description: "Customer texts the business number", icon: "chat" },
      { id: "webhook", label: "Webhook", description: "Meta delivers the event to n8n", icon: "webhook" },
      { id: "route", label: "Intent Router", description: "Keyword + AI classification", icon: "ai" },
      { id: "branch", label: "Workflow Branch", description: "FAQ, order or booking path", icon: "workflow" },
      { id: "data", label: "Business Data", description: "Sheets/Airtable lookup", icon: "database" },
      { id: "reply", label: "Auto-Reply", description: "Template or generated response", icon: "mail" },
      { id: "alert", label: "Owner Alert", description: "Only complex chats reach a human", icon: "bell" },
    ],
    architecture: [
      {
        title: "Channel",
        description:
          "Meta's Cloud API webhooks deliver every inbound message to a single n8n endpoint with phone-number routing.",
      },
      {
        title: "Routing logic",
        description:
          "A switch node classifies intents using keyword rules first, falling back to a cheap LLM call for ambiguous messages.",
      },
      {
        title: "Data lookups",
        description:
          "Order and booking details are pulled from Airtable/Google Sheets so replies always reference live records.",
      },
      {
        title: "Escalation",
        description:
          "Complaints and unusual requests pause automation and notify the owner with suggested reply text.",
      },
    ],
    results: [
      { value: "< 10 sec", label: "First reply to common questions" },
      { value: "-80%", label: "Messages needing manual replies (example)" },
      { value: "+35%", label: "Booking confirmations after reminders (example)" },
      { value: "1 person", label: "Whole system manageable by owner" },
    ],
    workflowImageUrl: "",
    liveUrl: "",
  },
  {
    slug: "automated-invoice-processing",
    title: "Automated Invoice Processing",
    category: "Automation",
    year: "2025",
    type: "demo",
    summary:
      "Invoices arriving by email are extracted, validated against purchase orders and filed to accounting — without anyone touching a spreadsheet.",
    overview: [
      "A document-processing pipeline that monitors an invoices mailbox, extracts line items from PDFs with an AI model, cross-checks totals against purchase orders and files clean records into accounting software.",
      "Exceptions — mismatched amounts, missing POs, unreadable scans — land in a review queue with the extracted fields highlighted.",
    ],
    problem:
      "Invoices arrived as PDF attachments in a shared inbox. Someone opened each one, retyped vendor, date and line items into a spreadsheet, matched them to purchase orders manually and emailed reminders for mismatches. Processing a single invoice took 10–15 minutes.",
    solution:
      "The pipeline extracts all header and line-item fields automatically, validates them against PO records, and posts approved invoices straight to accounting. Staff now only see exceptions, which arrive pre-filled and highlighted for a 30-second check instead of a 15-minute retype.",
    technologies: ["n8n", "GPT-4o (vision)", "IMAP/E-mail parsing", "Xero API", "Google Drive"],
    image: "/images/projects/invoice-processing.png",
    imageAlt: "Preview of extracted invoice fields displayed in a processing dashboard",
    demoType: "none",
    flowNodes: [
      { id: "mail", label: "Invoice Email", description: "Monitored inbox attachment", icon: "mail" },
      { id: "extract", label: "AI Extraction", description: "Vision model reads PDF fields", icon: "ai" },
      { id: "validate", label: "Validation", description: "Totals checked against POs", icon: "file" },
      { id: "match", label: "Match & Approve", description: "Auto-post or flag exceptions", icon: "workflow" },
      { id: "accounting", label: "Accounting Sync", description: "Bills created in Xero", icon: "database" },
      { id: "archive", label: "Archive", description: "PDF filed to Drive with metadata", icon: "globe" },
    ],
    architecture: [
      {
        title: "Ingestion",
        description:
          "n8n polls the IMAP inbox, saves attachments to Drive and passes each PDF to the extraction step with metadata.",
      },
      {
        title: "Extraction",
        description:
          "A vision-capable model returns strict JSON (vendor, dates, currency, line items); a schema check rejects malformed output.",
      },
      {
        title: "Validation rules",
        description:
          "Line totals must sum to the invoice total, and both must match the linked PO within tolerance before auto-approval.",
      },
      {
        title: "Outputs",
        description:
          "Approved bills post to Xero via API; failures create a flagged row with reasons so finance reviews only what broke.",
      },
    ],
    results: [
      { value: "~90%", label: "Reduction in manual entry time (example)" },
      { value: "10–15 min → < 1 min", label: "Processing time per invoice" },
      { value: "Auto", label: "PO matching with exception queue" },
      { value: "Full", label: "Audit trail for every document" },
    ],
    liveUrl: "",
  },
  {
    slug: "ai-content-automation-system",
    title: "AI Content Automation System",
    category: "AI Business Systems",
    year: "2025",
    type: "demo",
    summary:
      "One brief in, a week of content out — AI-drafted social posts, newsletter sections and blog outlines queued for human approval.",
    overview: [
      "A content pipeline for a small marketing team: dropping a single campaign brief into Notion triggers generation of platform-specific drafts — LinkedIn posts, X threads and a newsletter section — all staged in a review board.",
      "Nothing publishes automatically. Drafts wait for one-click approval, keeping humans firmly in control of brand voice.",
    ],
    problem:
      "Turning one campaign idea into a week of channel-specific content took a whole afternoon of rewriting. Deadlines slipped because drafting, formatting and scheduling were three separate manual jobs.",
    solution:
      "The system generates structured first drafts for every channel from one brief, formatted to each platform's conventions and the team's style guide. The team edits and approves from a single board, cutting production time to minutes per campaign.",
    technologies: ["n8n", "Claude API", "Notion API", "Buffer API", "Airtable"],
    image: "/images/projects/content-automation.svg",
    imageAlt: "Content calendar preview showing AI-drafted posts awaiting approval",
    demoType: "none",
    flowNodes: [
      { id: "brief", label: "Campaign Brief", description: "Added to Notion database", icon: "form" },
      { id: "trigger", label: "n8n Trigger", description: "New brief detected instantly", icon: "webhook" },
      { id: "style", label: "Style Context", description: "Brand guide + examples injected", icon: "database" },
      { id: "gen", label: "AI Drafting", description: "Per-channel drafts generated", icon: "ai" },
      { id: "review", label: "Review Board", description: "Drafts staged for approval", icon: "file" },
      { id: "schedule", label: "Schedule", description: "Approved posts pushed to Buffer", icon: "bell" },
    ],
    architecture: [
      {
        title: "Trigger",
        description:
          "Notion database changes fire n8n webhooks; the brief row carries campaign goal, audience and key messages.",
      },
      {
        title: "Context assembly",
        description:
          "The workflow fetches the latest style guide plus two past high-performing posts to anchor tone before generation.",
      },
      {
        title: "Generation",
        description:
          "Claude produces channel-specific drafts in one structured pass, returning JSON keyed by platform to avoid drift.",
      },
      {
        title: "Approval loop",
        description:
          "Drafts write back to Notion cards with status fields; approvals trigger Buffer scheduling via a second workflow.",
      },
    ],
    results: [
      { value: "Afternoon → ~30 min", label: "Weekly content production (example)" },
      { value: "1 brief", label: "Now feeds every channel" },
      { value: "100%", label: "Human approval before publishing" },
      { value: "Consistent", label: "Brand voice across platforms" },
    ],
    liveUrl: "",
  },
  {
    slug: "modern-business-website",
    title: "Modern Business Website",
    category: "Web Development",
    year: "2026",
    type: "demo",
    featured: true,
    summary:
      "A fast, SEO-optimized marketing site for a services business with a lead-generating contact flow and a 95+ Lighthouse score.",
    overview: [
      "A complete rebuild of an outdated services-company website into a modern Next.js site: sharp mobile-first design, sub-second loads, semantic HTML and a contact flow designed around conversion.",
      "Content is component-driven so the owner can update services, FAQs and testimonials without touching code.",
    ],
    problem:
      "The previous site scored in the 40s on Lighthouse, rendered poorly on phones, buried the contact form three clicks deep, and needed a developer for every text change — so it silently repelled mobile visitors.",
    solution:
      "A rebuilt site with performance budgets enforced at build time, a prominent enquiry form above the fold on mobile, structured data for local SEO, and editable content collections. Bounce rate dropped and enquiries became measurable end-to-end.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Resend"],
    image: "/images/projects/business-website.svg",
    imageAlt: "Preview of a modern responsive business website homepage design",
    demoType: "embed",
    liveUrl: "",
    githubUrl: "",
    flowNodes: [
      { id: "visit", label: "Visitor Arrives", description: "SEO result, ad or referral", icon: "globe" },
      { id: "render", label: "Instant Render", description: "Static-first, sub-second load", icon: "workflow" },
      { id: "engage", label: "Value First", description: "Clear services and proof above fold", icon: "ai" },
      { id: "cta", label: "Enquiry Form", description: "Validated, accessible form", icon: "form" },
      { id: "notify", label: "Owner Alert", description: "Email delivered via Resend API", icon: "mail" },
      { id: "crm", label: "Follow-up", description: "Lead optionally synced to CRM", icon: "database" },
    ],
    architecture: [
      {
        title: "Rendering strategy",
        description:
          "Marketing pages are statically generated and served from the edge; only the form action touches the server.",
      },
      {
        title: "Performance budget",
        description:
          "Images ship as AVIF/WebP via next/image, fonts self-host with size-adjust, and JS is limited to interactive islands.",
      },
      {
        title: "Conversion path",
        description:
          "Every page carries a persistent CTA; the form posts to a route handler that sends transactional email and stores the lead.",
      },
      {
        title: "Maintainability",
        description:
          "Services, FAQs and testimonials live in typed data files, so content edits never require deploy-time code changes.",
      },
    ],
    results: [
      { value: "95+", label: "Lighthouse performance score" },
      { value: "< 1s", label: "Largest Contentful Paint on 4G" },
      { value: "100%", label: "Mobile-friendly across viewports" },
      { value: "Self-serve", label: "Content edits without a developer" },
    ],
    resultsNote:
      "Performance figures describe the engineering targets this build was held to; replace with your measured results after launch.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ===========================================================================
 * TEMPLATE — copy everything between the --- lines into the array above,
 * then edit the values. Every field marked (optional) can be deleted.
 * ===========================================================================
 *
 * {
 *   slug: "my-personal-project",              // required — becomes /projects/my-personal-project
 *   title: "My Personal Project",             // required
 *   category: "Automation",                   // required — "AI Agents" | "Automation" | "AI Business Systems" | "Web Development"
 *   year: "2026",                             // required
 *   featured: true,                           // optional — shows on the homepage
 *   summary: "One line shown on the project card.",            // required
 *   overview: ["First paragraph...", "Second paragraph..."],    // required
 *   problem: "What was hurting the business before this.",     // required
 *   solution: "How your system solves it end-to-end.",         // required
 *   technologies: ["n8n", "OpenAI API"],                        // required
 *   image: "/images/projects/my-screenshot.png",               // required
 *   imageAlt: "Describe what the screenshot shows",            // required
 *   demoType: "chat",                         // required — "chat" | "video" | "embed" | "none"
 *   demoIntro: "Intro line inside the chat widget",            // only for demoType: "chat"
 *   demoSuggestions: ["Question one", "Question two"],          // only for demoType: "chat"
 *   flowNodes: [                              // required — the How-It-Works diagram steps
 *     { id: "form", label: "Form Submit", description: "...", icon: "form" },
 *     { id: "ai", label: "AI Step", description: "...", icon: "ai" },
 *   ],
 *   architecture: [{ title: "Layer name", description: "..." }], // required
 *   results: [
 *     { value: "< 60 sec", label: "Response time" },
 *   ],
 *   liveUrl: "https://your-demo.com",          // optional
 *   githubUrl: "https://github.com/you/repo",  // optional
 *   docsUrl: "https://docs.example.com",       // optional
 *   workflowUrl: "https://n8n-export-or-canvas", // optional
 *   links: [                                   // optional — ANY extra link buttons you want
 *     { label: "Demo Video", url: "https://youtube.com/watch?v=xyz", icon: "video" },
 *     { label: "Figma Design", url: "https://figma.com/file/...", icon: "external" },
 *     { label: "Download Report", url: "/files/report.pdf", icon: "download" },
 *   ],
 * },
 * ------------------------------------------------------------------------ */

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getRelatedProjects(current: Project, count = 2): Project[] {
  const sameCategory = projects.filter(
    (p) => p.slug !== current.slug && p.category === current.category,
  );
  const others = projects.filter(
    (p) => p.slug !== current.slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}
