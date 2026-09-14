# SEO Page Map — Tytech AI

> **Phase 2 deliverable.** Per-page title / description / H1 / keyword map.
> Source of truth for on-page metadata going forward. Revisit as pages are
> added in later phases (4, 5, 6, 7).

## Rules

- **No keyword stuffing, no duplicated H1s.** Each page owns one primary topic.
- Everything below is **current production metadata** (as of 2026-09-14) — the
  final rendered `<title>` includes the `%s | Tytech AI` template from the root layout.
- Metadata must stay human-written. These were reviewed and are kept as-is unless
  a later phase proves a specific page is not aligning with its intent.
- `description` per page should stay ≤ ~160 characters.

> **Next 16 quirk:** the root layout's title `template` (`%s | Tytech AI`) is applied
> to sub-routes but **not** to the home route. Do NOT set a bare `title` on the home
> page — omit it and let the layout's `default` render "AI Automation & Web Solutions | Tytech AI".

---

## Current pages

| Route | Final `<title>` | H1 | Description | Owns (primary keywords) | Status |
|---|---|---|---|---|---|
| `/` | AI Automation & Web Solutions \| Tytech AI | We Build AI Systems That Automate Business Operations. | We build modern websites, AI agents and automated workflows that help businesses eliminate repetitive work, respond faster and operate more efficiently. | **AI automation**; AI automation company/solutions | ✅ aligned |
| `/services` | Services — AI Agents, n8n Automation & Web Development \| Tytech AI | Automation & web solutions that pay for themselves | Web development, AI agents, n8n workflow automation and complete AI business systems. Fixed scope, clear process, built to eliminate repetitive work. | **AI automation services**; AI agents; n8n automation; business process automation | ✅ aligned |
| `/projects` | Projects — AI Agents, Automation & Websites \| Tytech AI | Projects & Case Studies | Case studies of AI agents, n8n workflow automations and modern websites: the problem, the solution, how it works and the results. | **AI / automation case studies** (index) | ✅ aligned |
| `/projects/[slug]` (6) | {Project title} — Case Study \| Tytech AI | {Project title} | `project.summary` (≤124 chars, descriptive) | per-project long-tail (see table below) | ✅ aligned |
| `/about` | About — AI Automation & Web Solutions Specialist \| Tytech AI | Hi, we're Tytech AI — we turn manual business work into automated systems. | We help businesses eliminate repetitive work with AI agents, n8n workflow automation, API integrations and modern websites. | Branded entity page: **Tytech AI** | ✅ aligned |
| `/contact` | Contact — Start Your Automation Project \| Tytech AI | Have a repetitive business process? Let's automate it. | Have a repetitive business process? Let's automate it. Tell us what eats your team's time and get a clear plan with a fixed quote. | Transactional: **automation quote / consultation** | ✅ aligned |
| `/ai-agents` *(Phase 4)* | AI Agents for Business \| Tytech AI | AI Agents for Business | Custom AI agents trained on your business information — answering customers, qualifying leads and assisting your team 24/7 on your website or WhatsApp. | **AI agents for business**; AI customer support agent; AI lead qualification | ✅ aligned |
| `/ai-automation` *(Phase 4)* | AI Automation Services \| Tytech AI | AI Automation for Business | AI automation that removes repetitive work: AI agents, n8n workflows and API integrations combined into one automated system for your business. | **AI automation services**; AI automation for small business | ✅ aligned |
| `/workflow-automation` *(Phase 4)* | Workflow Automation with n8n \| Tytech AI | n8n Workflow Automation | n8n workflow automation that moves data between your CRM, email, spreadsheets and apps — eliminating copy-paste work and human error. | **n8n workflow automation**; business process automation | ✅ aligned |
| `/ai-integrations` *(Phase 4)* | AI Integrations & API Automation \| Tytech AI | AI Integrations & API Automation | API integrations that connect your CRM, email, WhatsApp, spreadsheets and payment tools with AI and automation — so data flows by itself. | **API / CRM integrations**; AI integrations; data pipelines | ✅ aligned |
| `/404` (custom) | Page Not Found \| Tytech AI *(Phase 2 fix — added explicit metadata)* | This workflow hit a dead end. | The page you're looking for doesn't exist or was moved. | — | ✅ fixed in Phase 2 |

## Case-study pages (generated from `src/data/projects.ts`)

| Slug | Title | Primary long-tail keyword this page targets |
|---|---|---|
| `ai-lead-qualification-system` | AI Lead Qualification System | AI lead qualification / AI lead scoring |
| `ai-customer-support-agent` | AI Customer Support Agent | AI customer support agent / AI chatbot for business |
| `whatsapp-business-automation` | WhatsApp Business Automation | WhatsApp automation / order confirmation bot |
| `automated-invoice-processing` | Automated Invoice Processing | invoice processing automation / AP automation |
| `ai-content-automation-system` | AI Content Automation System | AI content automation |
| `modern-business-website` | Modern Business Website | professional business website / SEO website |

Descriptions already carry these long-tails in natural sentences — kept as-is.

---

## Keyword territory (cannibalization guard)

- **"AI automation"** → homepage + `/services` (commercial umbrella).
- **Service-specific terms** ("AI agents", "n8n automation", "business process
  automation", "web development") → downloadable to the **planned standalone
  service pages** in Phase 4, NOT squeezed into `/services` copy.
- **"Case studies"** → `/projects` index + `/projects/[slug]`.
- **Brand ("Tytech AI")** → about page, canonical/OG everywhere.
- **Transactional ("quote", "get a plan", "consultation")** → `/contact`.

---

## Planned pages and their future target territory (added in later phases)

> **Phase 4 (done):** the four service landing pages (`/ai-agents`, `/ai-automation`,
> `/workflow-automation`, `/ai-integrations`) — see the current-pages table above.
>
> **Phase 5 (skipped by decision):** no industry/vertical pages — positioning is
> "Remote · Worldwide", so no fabricated industry landing pages.
>
> **Phase 6 (decision):** `/projects` remains the **single canonical** case-study
> index. No duplicate `/case-studies` URL. Breadcrumb navigation is already
> visible on case studies (Phase 3); `BreadcrumbList` schema is added in Phase 8.

| Route (planned) | Owns |
|---|---|
| `/resources/*` (Phase 7) | problem-solving long-tails that link back to the service map above |

> **Phase 7 (done):** `/resources` index + 4 articles
> (`/resources/automating-lead-follow-up`, `/resources/n8n-vs-custom-code`,
> `/resources/what-ai-support-agents-can-do`,
> `/resources/data-ready-for-ai-checklist`) — practical, honest topics that
> funnel to services and case studies. Added to sitemap, header nav and footer.
>
> **Phase 8 (done):** structured data live — `Organization` + `WebSite` sitewide;
> `Service` on the 4 service pages + `/services`; `BreadcrumbList` on case studies,
> service pages and articles; `ItemList` on `/projects` and `/resources`;
> `Article` on article pages. `areaServed: WorldWide` (remote positioning).
> No `Person` founder schema (decision).
>
> **Phase 9 (done):** LCP `hero.png` now served via `next/image` (priority,
> ~78% smaller payload at 1920w). Remaining originals in `/public` stay as
> source-of-truth; optional WebP re-export tracked as a manual task.
>
> **Phase 10 (done):** `manifest.webmanifest` added; `twitter:image:alt` set.
> `apple-touch-icon` deferred — needs a real logo PNG, not generated here.

---

## Verification checklist (any time metadata is touched)

1. Every indexable page exports its own `title` + `description` + `alternates.canonical`.
2. Final title ≤ ~65 chars; description ≤ ~160 chars; single H1 per page.
3. `metadataBase` resolves to the production origin (`https://tytech.ai`).
4. New pages are added to the sitemap automatically only if they're static
   routes — check `/sitemap.xml` after adding routes.
5. No page duplicates another page's title.