# SEO Audit — Tytech AI Portfolio

> **Phase 0 deliverable.** Read-only audit of `C:\Users\PC\Desktop\portfolio`.
> No source code was changed during this audit.

| | |
|---|---|
| Audit date | 2026-09-14 |
| Framework | Next.js 16.3.2 (App Router, Turbopack) |
| Language / types | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animation | Framer Motion 13, Lucide icons |
| Rendering | Static (SSG) for all marketing + case-study pages; dynamic only for `/api/contact`, `/api/demo-chat` |
| Deploy base URL | `NEXT_PUBLIC_SITE_URL` env (default `http://localhost:3000`; `.env.example` sets `https://tytech.ai`) |

---

## 1. Current architecture

```
Routes (all except /api are statically generated)
├── /                        Home (single H1)
├── /services                Services — all four services on ONE page, anchor-sections
├── /projects                Projects / case-study index + client-side category filter
├── /projects/[slug]         Case-study pages (generateStaticParams, 6 pages)
├── /about                   About
├── /contact                 Contact + validated lead form
├── /not-found (custom 404)  Themed page, returns HTTP 404
├── /api/contact             Lead form endpoint (validated, rate-limited, optional n8n/WhatsApp/Resend)
├── /api/demo-chat           Mock AI-chat endpoint (connectable to a real agent)
├── /sitemap.xml             Native Next.js sitemap route
├── /robots.txt              Native Next.js robots route
└── /icon.svg                Favicon (icon.svg route)
```

Content is **data-driven**: `src/data/projects.ts` (6 projects + template), `services.ts` (4 services), `skills.ts`, `testimonials.ts` (empty by design), `config/site.ts` (single source of truth for name/tagline/description/url/email/location/socials).

---

## 2. Current SEO implementation — what already works

These are assessed as **already good** and must not be regressed:

| Area | Status | Evidence |
|---|---|---|
| Metadata system | ✅ Solid | Root layout uses `metadataBase` + title template `%s | Tytech AI`; every indexable page exports its own `title`, `description`, `alternates.canonical` |
| Canonical URLs | ✅ Present everywhere | All static pages set `alternates.canonical`; project pages generate per-slug canonicals. Trailing-slash behaviour is uniform (all no-trailing-slash) |
| Sitemap | ✅ Present | `/sitemap.xml` includes 6 static routes + all 6 project pages, correct base URL |
| Robots.txt | ✅ Present | Allows `/`, disallows `/api/`, references sitemap |
| 404 handling | ✅ Correct | Custom themed page; verified invalid slugs return HTTP 404 |
| Titles/descriptions | ✅ Natural, unique per page | No keyword stuffing; each ~50–63 chars final title |
| Semantic HTML | ✅ Good | Single H1 on home/about/contact/project/404; logical H2/H3; `<article>`, `<nav>`, `<section>` used |
| Internal links (baseline) | ✅ Good | Nav (5 links) + footer (Pages, Services→anchors, Contact, CTA) on every page |
| Image handling (mostly) | ✅ Good | `next/image` used everywhere except the hero background; `sizes` + `fill` present; `priority` set on above-fold images |
| Fonts | ✅ Good | Inter + Space Grotesk via `next/font/google` (self-hosted, `display: swap`, `size-adjust`) |
| Accessibility | ✅ Good baseline | Skip link, `aria-current` on nav, `aria-expanded`/labels on menu, focus-visible rings, `prefers-reduced-motion` honoured |
| Honesty | ✅ Good | No fake testimonials (section renders nothing if empty), no invented awards, case-study "example" metrics are explicitly disclosed on the page |
| Security | ✅ Good | Strict CSP, `Powered-By` off, COOP/CORP headers — relevant, because adding analytics later means editing the CSP, not weakening it |

---

## 3. Problems discovered

### 3.1 CRITICAL

| # | Issue | Detail | Fix location (later) |
|---|---|---|---|
| C1 | **Production URL env gate** | `site.url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`. If the env var is not set at deploy time, **every canonical, every sitemap URL and all OG tags point at `http://localhost:3000`**. This silently destroys all technical SEO. | `.env.example` already documents it; must be set in the hosting provider. No code change needed unless we want a build-time guard. |
| C2 | **Content decision: 6 case studies are placeholder projects** | All six `/projects/[slug]` pages are indexed and currently disclose "example" metrics on-page. The projects page also carries an italic "Demo note…". This is *honest*, so it is **not** a fake-claims violation — but publishing placeholder case studies as the portfolio's main evidence weakens topical authority. **STOP/decision**: replace with real client (or spec) work before/at launch, or keep as clearly-labelled build demonstrations. |

### 3.2 HIGH

| # | Issue | Detail |
|---|---|---|
| H1 | **No `<h1>` on `/services`** | The page's main heading ("Automation & web solutions that pay for themselves") is an `<h2>` via `SectionHeading`; the whole page has zero H1s. |
| H2 | **No `<h1>` on `/projects`** | "Projects & Case Studies" is an `<h2>`. Homepage and project pages link here; crawlers get no primary heading. |
| H3 | **Hero LCP image is a 2.1 MB raw `<img>`** | `/hero.png` (2.1 MB) is the largest, above-the-fold, full-bleed element and uses plain `<img>` (no `next/image`, no `fetchPriority`, no dimensions) — also the cause of the ESLint `no-img-element` warning. High LCP risk. |
| H4 | **Section imagery is extremely heavy on every page** | 10 `/images/sections/automation-*.png` files are each **1.9–2.6 MB**. They are served via `next/image` (which optimizes/transcodes), but the initial payload and originals are far beyond what a portfolio needs. |
| H5 | **No dedicated commercial service URLs** | The four services only exist as anchors on `/services`. Competitive intent ("AI agents", "AI workflow automation", "AI automation services") has no landing page of its own, so nothing can rank specifically — and there's nothing to link to from case studies. |
| H6 | **No industry/vertical pages** | No real-estate / e-commerce / small-business / professional-services targeting. |
| H7 | **No resource/content layer** | No blog/resources system. The site cannot accumulate topical authority or earn links with problem-solving content. |
| H8 | **Structured data is minimal and thin** | Only one inline `Person` JSON-LD in the root layout (name/description/email/knowsAbout). No `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `ItemList`, or `Article`. The `Person` is also semantically awkward for a brand named "Tytech AI". |
| H9 | **Case-study pages don't link back to services** | A "AI Lead Qualification System" page never points to the AI Business Systems / n8n service sections, so link equity doesn't flow toward commercial pages. |

### 3.3 MEDIUM

| # | Issue | Detail |
|---|---|---|
| M1 | **Broken `aria-labelledby` targets** | Home: `aria-labelledby="services-preview"`, `"featured-projects"`, `"process-heading"` and About: `"what-i-do"`, `"principles"`, `"skills"` reference `id`s that don't exist because `SectionHeading` renders an `<h2>` **without** an `id` prop (only `demo-teaser` wires its own). Accessibility/quality issue; not a ranking factor, but fixable in one component. |
| M2 | **No visible breadcrumbs / `BreadcrumbList` on case studies** | Only a "← All Projects" link exists; no hierarchy signal for crawlers or users on deep pages. |
| M3 | **Project-filter tabs are `role="tablist"` buttons** | Functional (no URLs involved, all content below is still present in HTML after hydration keeps 'All' as default), but keyboard tab semantics could be tightened. Low priority. |
| M4 | **Unused public assets** | `public/ty.png` (1.2 MB), `public/logo2.jpeg` (0.8 MB), `public/logo-original.png`, `public/next.svg`, `vercel.svg`, `window.svg`, `globe.svg`, `file.svg` are not referenced anywhere. Root-dir drafts (`app.png`, `chat.png`, `invoice.png`, …) are not deployed. |
| M5 | **Identity inconsistency** | Brand "Tytech AI" but `email: tabiroallan@gmail.com`; socials (GitHub/LinkedIn/X) are all empty so no `sameAs` anywhere. Fine to ship, but worth aligning. |
| M6 | **`lastModified: new Date()` in sitemap** | Every request emits "now" for every URL — mildly noisy for crawlers. Acceptable; can pin to meaningful dates. |

### 3.4 LOW

- `keywords` meta array (deprecated/no ranking effect) — harmless, can stay.
- No `manifest.json` / `apple-touch-icon` — no app-icon story beyond `icon.svg`.
- `tsconfig.tsbuildinfo` committed at repo root.
- Analytics is dormant: `lib/analytics.ts` can push to GA4/Plausible/PostHog if a snippet is loaded, but nothing is loaded yet. Adding any analytics later requires a CSP edit in `next.config.ts`.

---

## 4. Missing SEO features / content gaps (summary)

| Gap | Phase | Notes |
|---|---|---|
| H1 on `/services`, `/projects` | 2 | Small, high-value fix |
| Dedicated service pages | 4 | `/ai-automation`, `/ai-agents`, `/workflow-automation`, `/ai-integrations`, `/ai-chatbots` — only those that genuinely match services offered |
| Industry pages | 5 | Only if genuine relevance (needs your input — see Decisions) |
| Case-study architecture + breadcrumbs | 6 | `/case-studies` index + BreadcrumbList; reuse existing `/projects/[slug]` data |
| Resources/content layer | 7 | Problem-solving articles that link to service pages |
| Structured data suite | 8 | Organization, WebSite, Service, BreadcrumbList, Article, ItemList |
| Performance pass (images, LCP, bundle) | 9 | Biggest concrete win available |
| Social metadata polish | 10 | Per-page OG image handling, manifest |
| Local SEO prep | 11 | Only if Nairobi/location targeting is real strategy |

---

## 5. Duplicate metadata / indexation risks

- Titles are unique per page. No two indexable pages currently share `<title>` or canonical.
- No `noindex` conflicts. `robots` meta allows index+follow globally; `/api/*` is blocked at `robots.txt` level (correct — API routes are also server/dynamic, not linked from any page).
- The `/projects/[slug]` pages and the mobile-menu / filter interactions create no duplicate URL surface (client-side filter, no query params emitted).
- **Risk**: if `NEXT_PUBLIC_SITE_URL` is unset in production (C1), every canonical collapses to `localhost:3000` — this *creates* duplicate/incorrect indexation across domains. This is the single most important deployment gate.

---

## 6. Recommended implementation order (roadmap)

Each phase ends with inspection → checks (build/lint/typecheck/page-200) → report → then proceed. Phases marked ⛳ include **STOP points** (ask user before proceeding).

| Phase | Work | Primary files | Risk |
|---|---|---|---|
| 1. Technical foundation | H1 on /services + /projects; `id` support for SectionHeading (fix M1); build-time URL guard for C1 (optional, needs env decision) | `services/page.tsx`, `projects/page.tsx`, `section-heading.tsx` | **LOW** |
| 2. On-page SEO | `SEO_PAGE_MAP.md`; per-page title/description/h1/keyword mapping; refine homepage copy only where it improves intent clarity | `page.tsx`, data files | **LOW** |
| 3. Architecture & internal linking | Project → service links (H9), breadcrumbs on case studies, footer/related-links pass | `[slug]/page.tsx`, `project-card.tsx`, `footer.tsx` | **LOW** |
| 4. Commercial service pages ⛳ | New routes `/ai-agents`, `/ai-automation`, `/workflow-automation`, `/ai-integrations` (+ `/ai-chatbots` if offered). Reuse existing design system + `services.ts` content as base. Must sound like a working consultant, not AI filler | new `src/app/**` pages + data | **MEDIUM** (new URLs — decision needed) |
| 5. Industry pages ⛳ | Only if genuinely relevant (e.g. real-estate if you serve that sector) | new pages | **MEDIUM** (needs business input) |
| 6. Case studies ⛳ | `/case-studies` index; breadcrumbs + BreadcrumbList schema; decide placeholder vs real work for C2 | `[slug]/page.tsx`, new index route | **MEDIUM** (content decision) |
| 7. Content layer ⛳ | Small starter set of honest, technical articles linking to services | new `resources` routes + data | **MEDIUM** |
| 8. Structured data | Organization (+Person as founder), WebSite, Service, BreadcrumbList, Article; JSON-LD utilities; validate | layout, `lib/jsonld.ts`, pages | **LOW/MEDIUM** (needs brand entity info — see Decisions) |
| 9. Performance | Hero via `next/image` + fetchPriority; compress automation-*.png/hero/project PNGs (WebP/AVIF or re-export); audit bundle/fonts; consider `react-scan`-free status check | `hero.tsx`, public images, `next.config.ts` | **MEDIUM** (asset work; visual must not change) |
| 10. Social/sharing | Fix twitter images alt, add manifest/apple-touch-icon, optional per-page OG image | `layout.tsx`, `manifest.ts` | **LOW** |
| 11. Local SEO prep ⛳ | If targeting Kenya/Nairobi: consistent NAP in schema, natural location-aware copy; never fake a GBP | config + schema | **LOW** (needs decision) |
| 12. Final QA | Full re-audit + validation checklist (build, lint, tsc, sitemap/robots fetch, canonical scan, JSON-LD syntax) | — | — |
| 13. Deployment/Manual | `SEO_FINAL_REPORT.md`; Search Console checklist below | docs | — |

---

## 7. Decisions / STOP points requiring your input

The prompt's STOP conditions apply here. Before Phases 4–11 I need answers to:

1. **Confirm the production domain** — is it `https://tytech.ai` (as in `.env.example`)? This gates C1 and all canonicals.
2. **Are the 6 case studies real client work, or demonstrations/spec builds?** Determines C2: replace with real outcomes (and remove the "example" disclaimers) vs. keep as clearly-labelled portfolio demonstrations.
3. **Which of the four existing services merit a *separate* dedicated page?** (AI Agents, n8n Automation, AI Business Systems, Web Development). Not all four need standalone URLs.
4. **Do you target a specific location for local SEO** (e.g. Nairobi)? Or is "Remote · Worldwide" the accurate positioning?
5. **Brand entity for schema**: is "Tytech AI" a company (Organization) with you as Person/founder — and what is your name to use in Person schema + `sameAs` (GitHub/LinkedIn/X URLs when filled)?
6. **Analytics**: do you want GA4/Plausible/PostHog installed (requires a CSP edit) — or leave dormant until later?

---

## 8. What already exists that must NOT be changed

- **Color palette / typography / spacing / animations** (recently redesigned) — untouched by any SEO work.
- **Route structure**: `/services`, `/projects`, `/projects/[slug]`, `/about`, `/contact` stay as-is; new pages are additive.
- **The four-services single-page layout** on `/services` — we *add* dedicated pages rather than removing the existing presentation.
- **The animated AutomationFlow / InteractiveDemo / keyframe animations** — content sits in the HTML regardless; nothing here is hidden from crawlers.
- **`/api/*` being disallowed in robots.txt** and the strict CSP in `next.config.ts` — they stay; analytics additions must extend, not weaken, the CSP.
- **The honest labelling** of example metrics and empty testimonials — preserved; never filled with invented data.

---

## 9. Measure & validate on every phase

- `npm run build` (prerenders all 19 pages), `npm run lint`, `npx tsc --noEmit`.
- Fetch `/sitemap.xml`, `/robots.txt` and every page → assert HTTP 200 (404 only for invalid slugs).
- Verify `<link rel="canonical">` per page and that all canonicals carry the production origin.
- Validate JSON-LD with the Rich Results Test / `schema.org` parser in Phase 8.
- On any nav/link change: crawl the homepage with a JS-disabled render to confirm all key links are plain `<a href>`.

---

## 10. Manual actions outside the codebase (for the deployment checklist)

1. Set `NEXT_PUBLIC_SITE_URL` in the hosting provider's environment (critical — C1; a build-time guard in `src/config/site.ts` now warns if unset).
2. Point DNS at the host; verify HTTPS on the apex domain only (no `www`/apex duplication).
3. Verify the site in **Google Search Console**, submit `sitemap.xml`, request indexing for `/`, `/services`, `/projects`.
4. Replace `public/og.png` with a brand-accurate 1200×630 image when branding is final; add a real logo PNG for `apple-touch-icon`.
5. Fill in GitHub/LinkedIn/X URLs in `data/site.ts` when they exist → enables `sameAs` schema + footer socials.
6. Decide on analytics (Decision 6 — requires a CSP extension when chosen).
7. Off-site SEO (separate task, not code): real backlinks via GitHub projects, LinkedIn, developer communities, directories, guest contributions — no link farms, no purchased links.
8. Compress /WebP-export the large PNG originals in `public/` (client payload already optimized; repo/deploy-size only).
9. When real client results exist, replace the "demonstration builds" case studies with real outcomes + metrics.

---

## Roadmap status — complete

Phases 1–13 are **done or documented** (see `SEO_FINAL_REPORT.md` and the phase notes in `SEO_PAGE_MAP.md`):
P1 technical foundation · P2 on-page (page map) · P3 linking/breadcrumbs · P4 service pages · P5 skipped (no industry pages) · P6 case-study policy (single canonical index; "demonstration builds") · P7 `/resources` + 4 articles · P8 structured data live · P9 hero `next/image` · P10 manifest + twitter alt · P11 no-op (Remote/Worldwide) · P12 final QA green · P13 this report.

Final state: build 29/29 · lint 0/0 · tsc clean · 20/20 sitemap URLs return 200 · JSON-LD parse-verified sitewide.

---

*Completed. All 13 phases delivered — see `SEO_FINAL_REPORT.md`.*