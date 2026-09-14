# AI Automation & Web Solutions — Portfolio

A premium, dark-themed portfolio for an **AI Automation & Web Solutions Specialist**, built to attract paying business clients. Features an animated automation pipeline in the hero, full case-study pages generated from a single data file, a connectable AI chat demo, n8n workflow visualizations and a client-focused contact form.

Built with **Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons**.

---

## Quick Start

```bash
npm install       # first time only
npm run dev       # develop at http://localhost:3000
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
```

---

## Project Structure

```
portfolio/
├── public/
│   ├── images/projects/        # project screenshots (.svg/.png/.jpg all work)
│   └── og.png                  # social share image
├── src/
│   ├── app/                    # routes (App Router)
│   │   ├── page.tsx            # Home
│   │   ├── services/page.tsx   # Services
│   │   ├── projects/page.tsx   # Projects listing
│   │   ├── projects/[slug]/    # Case study pages (auto-generated)
│   │   ├── about/page.tsx      # About
│   │   ├── contact/page.tsx    # Contact
│   │   ├── api/demo-chat/      # Mock AI chat endpoint (connectable)
│   │   ├── api/contact/        # Contact form endpoint (connectable)
│   │   ├── layout.tsx          # Root layout, fonts, SEO, JSON-LD, floating WhatsApp
│   │   ├── sitemap.ts          # /sitemap.xml
│   │   └── robots.ts           # /robots.txt
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, PageTransition, MotionProvider
│   │   ├── home/               # Hero, AutomationFlow animation
│   │   ├── services/           # ServiceCard
│   │   ├── projects/           # ProjectCard, ProjectsGrid, detail sections
│   │   ├── workflow/           # FlowDiagram, WorkflowViewer, FlowIcon
│   │   ├── demo/               # InteractiveDemo (AI chat UI)
│   │   ├── contact/            # ContactForm
│   │   ├── whatsapp/           # WhatsAppButton, FloatingWhatsApp, WhatsAppIcon
│   │   ├── testimonials/       # TestimonialSection (hidden until you add real ones)
│   │   └── ui/                 # Button, SectionHeading, TechnologyBadge, Reveal, CTASection, social icons
│   ├── config/
│   │   └── site.ts             # ★ BUSINESS + WHATSAPP CONFIG — change §8 settings here
│   ├── data/                   # ★ ALL CONTENT LIVES HERE
│   │   ├── site.ts             # derived from config/site.ts (name, email, socials, URL)
│   │   ├── services.ts         # the 4 services
│   │   ├── skills.ts           # about-page skills
│   │   └── projects.ts         # ★ the 6 demo projects — add yours here
│   ├── lib/
│   │   ├── ai.ts               # ★ where you connect your real AI agent
│   │   ├── whatsapp.ts         # wa.me helpers + WhatsApp Cloud API senders (server)
│   │   ├── analytics.ts        # trackWhatsAppClick provider abstraction
│   │   ├── rate-limit.ts       # per-visitor API rate limiting
│   │   └── utils.ts, animations.ts
│   └── types/index.ts          # shared TypeScript types (incl. Lead)
└── .env.local                  # create this (see below)
```

---

## 1. Make It Yours (5 minutes)

Everything below lives in **`src/data/site.ts`**, which is derived from the single source of truth **`src/config/site.ts`** (site + WhatsApp config). The business name, tagline and WhatsApp settings are configured in `src/config/site.ts`; edit it and the rest updates automatically.

```ts
export const site = {
  name: "Alex Carter",        // ← your name/brand
  initials: "AC",             // ← navbar logo mark
  url: ...,                   // set NEXT_PUBLIC_SITE_URL env var in production
  email: "tabiroallan@gmail.com",
  socials: {
    github: "",               // ← add URLs; buttons appear automatically
    linkedin: "",
    x: "",
  },
};
```

The OG share image is `public/og.png` — replace it with a 1200×630 PNG of your own branding.

---

## 2. How to Add a New Project

Open **`src/data/projects.ts`**, copy any existing object, change the values, save. That's it.

```ts
{
  slug: "my-new-project",              // becomes /projects/my-new-project
  title: "My New Project",
  category: "Automation",              // one of: AI Agents | Automation | AI Business Systems | Web Development
  year: "2026",
  featured: true,                      // shows on homepage (optional)
  summary: "One-line description shown on cards.",
  overview: ["Paragraph 1...", "Paragraph 2..."],
  problem: "What was hurting the business...",
  solution: "How the system solves it...",
  technologies: ["n8n", "OpenAI API"],
  image: "/images/projects/my-new-project.png",
  imageAlt: "Describe the screenshot",
  demoType: "chat",                    // "chat" | "video" | "embed" | "none"
  demoIntro: "Intro line inside the chat widget",
  demoSuggestions: ["Question 1", "Question 2"],
  flowNodes: [                         // the How-It-Works diagram
    { id: "form", label: "Lead Submission", description: "...", icon: "form" },
    // icons: form | webhook | ai | workflow | database | mail | bell | chat | file | globe
  ],
  architecture: [{ title: "Capture layer", description: "..." }],
  results: [{ value: "< 60 sec", label: "Lead response time" }],
  liveUrl: "https://demo.example.com",     // optional — omit if none
  githubUrl: "https://github.com/you/repo",// optional
  docsUrl: "...",                          // optional
  workflowUrl: "...",                      // optional — link to n8n export/canva
  links: [                                 // optional — ANY extra link buttons
    { label: "Demo Video", url: "https://youtube.com/watch?v=xyz", icon: "video" },
    { label: "Figma", url: "https://figma.com/...", icon: "external" },
  ],
  workflowImageUrl: "/images/projects/workflow.png", // optional screenshot tab
  videoUrl: "https://youtube.com/embed/…", // optional video tab
}
```

The new project will automatically:
- appear on `/projects` with working category filters,
- get its own SEO-friendly case-study page at `/projects/<slug>`,
- be added to `sitemap.xml`.

**Delete any optional field you don't use** — related buttons/sections hide themselves. A full copy-paste **TEMPLATE** lives at the bottom of `src/data/projects.ts`, and the header comment there walks you through it step by step.

Custom `links` icons: `"external" | "github" | "workflow" | "docs" | "video" | "download"` (optional, defaults to external arrow). Up to 2 custom links show on the project card; all of them appear on the case-study page under Project Links.

---

## 3. How to Add Project Screenshots

1. Drop your image into `public/images/projects/` (png/jpg/webp/svg all work).
2. Point `image:` at it, e.g. `"/images/projects/my-shot.png"`.

Tips: 1600×1000 or similar 16:10 looks best. For `workflowImageUrl`, export your n8n workflow canvas as PNG (`Ctrl+A` → right-click → download) and add it the same way.

---

## 4. Live Demo URLs

Set `liveUrl` on a project:
- Card + case study get **Live Demo** buttons automatically.
- With `demoType: "embed"` the case study renders the live site in a browser-chrome frame.
- With `demoType: "video"` + `videoUrl`, a video player is embedded instead.
- With `demoType: "chat"`, an interactive AI chat widget is embedded (see next section).

---

## 5. Connect Your Real AI Agent

The chat UI never talks to an AI provider directly — keys stay server-side.

**Easiest way:** set one environment variable:

```bash
# .env.local
AI_API_URL=https://your-n8n.hook.workflows.net/ai-agent
# optional, if your endpoint needs auth:
AI_API_KEY=super-secret
```

Your endpoint receives:
```json
{ "message": "user question", "history": [{"role":"user","content":"…"}] }
```
and must respond with:
```json
{ "reply": "the agent's answer" }
```

An n8n webhook → OpenAI/Claude node → "reply" response is a 3-node workflow.

Alternatively edit `sendDemoMessage()` in **`src/lib/ai.ts`** — that function is the only swap point; the UI needs zero changes. The mock endpoint itself is `src/app/api/demo-chat/route.ts`.

---

## 6. n8n Workflow Demonstrations

Per-project options in `projects.ts`:
- `flowNodes` — always renders the animated **How It Works** diagram.
- `workflowImageUrl` — adds an "n8n Screenshot" tab (real canvas export).
- `videoUrl` — adds a "Video Walkthrough" tab (use YouTube embed URLs).
- `workflowUrl` — external link button ("Workflow (n8n)") when no assets are attached.

All tabs render through the reusable `WorkflowViewer` component.

---

## 7. Connect the Contact Form

The form POSTs to `/api/contact`, which validates everything server-side (name, email format, WhatsApp-number format, message length, plus a hidden honeypot anti-spam field), rate-limits each visitor, and builds a structured `Lead` object for your pipeline.

Fields: **Name, Email, WhatsApp Number, Company, Business Type, "What would you like to automate?", Budget, Message** — validated twice (friendly inline errors in the UI + strict re-validation and sanitisation server-side), with per-visitor rate limiting and a CSRF origin check.

Pick one backend:

**Option A — n8n webhook (no code changes, recommended):**
1. Build a workflow starting with a **Webhook** trigger.
2. Set `N8N_LEAD_WEBHOOK_URL=https://your-n8n.../webhook/contact` in `.env.local` (legacy name `CONTACT_WEBHOOK_URL` still works).
3. In n8n: send yourself the email (Gmail/SMTP node), append to Sheets, create a CRM deal, or run AI — whatever you like. This makes n8n your email service *and* CRM pipeline in one.

**Option B — Resend:** `npm install resend`, then follow the code comment inside `src/app/api/contact/route.ts` (add `RESEND_API_KEY` to env vars — never to client code).

**Option C — Formspree:** point the fetch in `src/components/contact/contact-form.tsx` at their endpoint.

Every integration point has a comment block exactly where you need it. See **§8** for the WhatsApp layer that rides on top of this.

---

## 8. WhatsApp Integration

The site ships with a production-quality WhatsApp layer that works **out of the box with just your phone number**, then upgrades to the official **WhatsApp Business Cloud API** + an **n8n pipeline** whenever you're ready — no redesign needed.

### 8.1 How to change the WhatsApp number

Edit **`src/config/site.ts`** — this is the single source of truth:

```ts
export const whatsapp = {
  phoneNumber: "",     // international format, DIGITS ONLY:
                       //   +1 (415) 555-2671  →  "14155552671"
  defaultMessage: "Hello Tytech Ai, I came across your website and I'd like to discuss an automation project.",
};
```

That one field controls the floating button **and every WhatsApp button on the site**.

- Set it to your WhatsApp number → buttons open WhatsApp with the pre-filled message.
- Leave it empty (`""`) → the site never breaks; buttons gracefully fall back to an *"Unable to open WhatsApp. Please email us at …"* popover instead.

Why `src/config/site.ts`? The site's imports are aliased `@/* → src/*`, so the config lives under `src/` (the README covers this layout in [Project Structure](#project-structure)).

### 8.2 How to change the default WhatsApp message

Same file, `whatsapp.defaultMessage` — or override per button with the `message` prop:

```tsx
<WhatsAppButton message="Your own pre-filled text" />
```

### 8.3 How project-specific messages work

The reusable `<WhatsAppButton />` takes a `projectName` prop and builds the message dynamically from `whatsapp.projectMessageTemplate` (uses a `{name}` placeholder):

```tsx
<WhatsAppButton projectName="AI Lead Qualification System" label="Discuss This Automation" />
```

→ opens `wa.me/<number>?text=Hello Tytech Ai%2C I'm interested in your AI Lead Qualification System…`

Already wired into: **project cards** ("Ask About This Solution", homepage + `/projects`), **case-study pages** ("Discuss This Automation", `/projects/<slug>`), **services page** ("Discuss Your Automation"), **hero + closing CTA** ("Chat With Us"), **contact page** ("Chat on WhatsApp"), and the **floating button** on every page. Reusable component: `src/components/whatsapp/whatsapp-button.tsx`.

### 8.4 How the floating button works

`src/components/whatsapp/floating-whatsapp.tsx`, mounted in the root layout so it appears on every page:

- Fixed bottom-right — **48px on mobile, 56px on desktop** (comfortably above the 44px touch-target minimum).
- Renders **below the navbar / menu** (`z-40`) so it never covers navigation.
- Subtle glow pulse (`animate-whatsapp-glow`), gentle hover lift, and a "Chat with Tytech AI" tooltip on hover (desktop).
- `aria-label="Chat with Tytech AI on WhatsApp"`.
- Opens the WhatsApp app on mobile, WhatsApp Web on desktop.

### 8.5 How to connect the WhatsApp Business Cloud API (official Meta API)

The integration layer **already exists** in `src/lib/whatsapp.ts`:

- `sendWhatsAppMessage({ to, message })` — sends any message via the Cloud API.
- `sendLeadNotification(lead)` — pushes a submitted lead to your number via the Cloud API.
- `buildWhatsAppUrl()` / `buildProjectMessage()` / `buildContactLeadMessage()` — client-safe deep-link helpers.

Until you add credentials these return `status: "not-configured"` and the site silently keeps using plain `wa.me` links — nothing breaks.

**1. Create a Meta app & Business account** (developers.facebook.com) → add the WhatsApp product → get:
   - `WHATSAPP_ACCESS_TOKEN` (System User token — never a `NEXT_PUBLIC_*` var)
   - `WHATSAPP_PHONE_NUMBER_ID`
   - `WHATSAPP_BUSINESS_ACCOUNT_ID`

**2. Add them as server-side env vars** in `.env.local` (local) or the hosting dashboard (Vercel/Netlify → Project Settings → Environment Variables):

```bash
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
```

**3. Verify** — submit the contact form; the lead is now also pushed to your WhatsApp via the Cloud API (the API response reports `whatsappNotified: true`).

> **Security guarantee:** these variables are read only on the server. They never appear in client bundles and are never prefixed `NEXT_PUBLIC_`. There is no hard-coded token anywhere in the repo.

### 8.6 How to connect n8n

**1. Build a workflow** starting with a **Webhook** trigger.

**2. Add the webhook URL** as a server-side env var:

```bash
N8N_LEAD_WEBHOOK_URL=https://your-instance.n8n.cloud/webhook/contact
```

**3. Done.** Every form submission POSTs this exact object to n8n:

```json
{
  "name": "Jane Smith",
  "email": "jane@acme.com",
  "phone": "+1 415 555 2671",
  "company": "Acme Ltd",
  "businessType": "E-commerce",
  "automationNeed": "Lead capture and follow-up",
  "budget": "$1,000 - $3,000",
  "message": "We need automated follow-up on web leads.",
  "source": "contact-form",
  "project": null,
  "createdAt": "2026-08-29T05:01:58.507Z"
}
```

Then chain whatever you like inside n8n: **AI processing → WhatsApp / Email → CRM / Google Sheets / Slack**.

> **Security:** the webhook URL is read server-side only. The API route refuses non-HTTPS targets (except localhost in dev), so a leaked-looking URL can't be used as an open redirect.

### 8.7 How the contact form works

`src/components/contact/contact-form.tsx` → POST `/api/contact` (`src/app/api/contact/route.ts`).

- Validated twice (nice inline errors in UI + strict server-side re-validation and sanitisation), honeypot anti-spam, per-visitor rate limit, CSRF origin check.
- On success the visitor gets a **"Continue on WhatsApp"** button that pre-fills the whole conversation summary from their inputs (optionally completed via the Cloud API).

```
Tytech AI Website
      |  (contact form)
      v
  /api/contact          <- validates, sanitises, rate-limits
      |
      +--> n8n webhook (N8N_LEAD_WEBHOOK_URL)  ->  AI / CRM / Sheets / Email / Slack
      |
      +--> WhatsApp Cloud API (optional)        ->  lead notification to you
```

### 8.8 Analytics

Every WhatsApp click fires `trackWhatsAppClick({ source, project, label })` (`src/lib/analytics.ts`). Provider-agnostic:

- **GA4 / GTM** → pushes a `whatsapp_click` event to the `dataLayer`.
- **Plausible** → calls `plausible("whatsapp_click", …)` if the script is loaded.
- **PostHog** → calls `posthog.capture("whatsapp_click", …)` if loaded.

Extend `fireToProviders` to add your own tracker — zero changes elsewhere. (Note: the site's CSP restricts `connect-src` to `'self'`, so external analytics domains must be added to `next.config.ts`.)

### 8.9 Deploying the integration securely

1. Put `N8N_LEAD_WEBHOOK_URL` and any `WHATSAPP_*` vars **only** in the hosting provider's server-side environment settings — never in code.
2. Keep `.env.local` out of git (already covered by the `.gitignore` `env*` rule).
3. Set `NEXT_PUBLIC_SITE_URL` so the contact-form origin check knows the production domain.
4. Review the CSP in `next.config.ts` before adding any third-party scripts.

**Missing or broken configuration can never crash the site** — an unset number or webhook just routes around the gap.

### 8.10 Env vars at a glance

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL (SEO + contact origin check) |
| `WHATSAPP_ACCESS_TOKEN` | Cloud API token (server-only) |
| `WHATSAPP_PHONE_NUMBER_ID` | Cloud API phone ID (server-only) |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Cloud API business account (server-only) |
| `N8N_LEAD_WEBHOOK_URL` | n8n lead webhook (server-only) |
| `CONTACT_WEBHOOK_URL` | Legacy alias for the n8n webhook |
| `AI_API_URL` / `AI_API_KEY` | Existing AI chat demo |

Copy-safe template with placeholders: **`.env.example`**.

---

## Environment Variables

Create `.env.local` (never commit it):

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO/sitemap | Your production URL, e.g. `https://tytech.ai` |
| `AI_API_URL` | demo-chat route | Your real AI agent endpoint |
| `AI_API_KEY` | demo-chat route | Bearer token for that endpoint |
| `NEXT_PUBLIC_DEMO_CHAT_ENDPOINT` | lib/ai.ts | Optional custom chat endpoint |
| `WHATSAPP_ACCESS_TOKEN` | whatsapp lib | Cloud API token (server-only) |
| `WHATSAPP_PHONE_NUMBER_ID` | whatsapp lib | Cloud API phone ID (server-only) |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | whatsapp lib | Cloud API business account (server-only) |
| `N8N_LEAD_WEBHOOK_URL` | contact route | n8n lead webhook / CRM endpoint |
| `CONTACT_WEBHOOK_URL` | contact route | Legacy alias for `N8N_LEAD_WEBHOOK_URL` |

On Vercel, add these in **Project Settings → Environment Variables**.

---

## Deploying (Vercel)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset auto-detects Next.js. Click **Deploy**.
4. Add the environment variables from the table above (at minimum `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`).
5. Add your custom domain under **Settings → Domains** if you have one.

Zero-config otherwise — API routes, image optimization and sitemap work out of the box.

---

## Notes on Demo Content

- The six projects are realistic **placeholders**: copy, architecture and metrics marked as example data are meant to be replaced with your real work. Case-study Results sections display an italic disclaimer until you override `resultsNote` or replace the numbers.
- Testimonials intentionally contain **zero fake entries** — the section stays invisible until you add real ones in `src/data/testimonials.ts`.
