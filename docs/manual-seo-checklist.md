# Manual SEO Checklist — Tytech AI

> Ongoing maintenance checklist for non-automated SEO and quality tasks.
> Run through this monthly after deploying any content change, and always
> before a major release.

---

## Pre-Launch / Monthly Audit

### Technical
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live production origin exactly (no trailing slash)
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes clean (no new warnings)
- [ ] `npx tsc --noEmit` passes (after `npx next typegen`)
- [ ] `/sitemap.xml` includes every public page; no orphan routes
- [ ] `/robots.txt` allows crawling of all public routes; only `/api/*` disallowed
- [ ] No route returns HTTP 404 / 500 in production
- [ ] No internal link points to a hashed anchor (`/#`, `/#id`) that is not a scroll target on the same page

### Metadata
- [ ] Every page title uses `buildMetadata()` and has a unique, non-duplicated value
- [ ] Layout `%s | Tytech AI` template appends the brand suffix — never hardcode `| Tytech AI` in the `title` property of `buildMetadata()`
- [ ] `alternates.canonical` is a root-relative path (handled automatically by `buildMetadata`)
- [ ] OG `url` uses the absolute production URL
- [ ] Every article's `publishedTime` and `modifiedTime` are valid ISO 8601 dates
- [ ] No page exposes a `noindex` tag without deliberate intent
- [ ] Schema.org JSON-LD validates without errors (test with Google Rich Results or Schema.org validator)

### Internal Links
- [ ] Service cards link to `/services/<slug>` (not `/#serviceId`)
- [ ] Articles' `relatedService.href` points to `/services/<slug>` (not root-level legacy paths)
- [ ] Case studies link to their related service via `/services/<id>` (not `#id`)
- [ ] Footer nav links all resolve to valid, non-redirecting routes
- [ ] Mobile hamburger menu contains the same top-level and nested links as the desktop nav

### Content Accuracy
- [ ] All case studies are clearly labeled "Demonstration build" where applicable
- [ ] No testimonial data exists in `src/data/testimonials.ts` until real quotes arrive
- [ ] No fabricated client names, statistics, or awards appear anywhere
- [ ] Every service page has substantive content in all 12 sections (no thin pages)
- [ ] Solutions pages frame the value honestly without claiming unverifiable outcomes

### Performance
- [ ] No page has a largest contentful image loaded lazily (hero images use `priority`)
- [ ] `next/image` `sizes` attribute is set on all above-the-fold images
- [ ] No route pulls more than 200KB of client-side JavaScript
- [ ] `prefers-reduced-motion` is respected (CSS + framer-motion `reducedMotion="user"`)

### Accessibility
- [ ] Skip-to-content link is visible on keyboard focus
- [ ] Every page has exactly one `<h1>` element
- [ ] InteractiveDemo has `aria-live="polite"` on its message list
- [ ] All form inputs have associated `<label>` elements and visible error messages
- [ ] Navbar `aria-expanded` and `aria-controls` toggle correctly on mobile
- [ ] No focus is trapped in an element without a keyboard-dismiss mechanism (`Escape`)

---

## Content Publishing Workflow

1. **New article**: add to `src/data/articles.ts` with all required fields (`slug`, `title`, `description`, `category`, `publishedAt`, `readingMinutes`, `body`).
2. **New project**: add to `src/data/projects.ts` with `type: "demo"` (unless verified client work). Always include `resultsNote`.
3. **New service**: add entry to `servicePages` in `src/data/services.ts`, add FAQ entry, create `/services/<slug>` page automatically via dynamic route. Update `sitemap.ts` only if adding new top-level routes.
4. **New solution**: add to `src/data/solutions.ts`, link to its `relatedServiceSlug`. Index page auto-includes.
5. **New industry**: add to `src/data/industries.ts`. Index page auto-includes.

After any data change, run: `npm run build && npm run lint`.

---

## Quarterly Review

- [ ] Review all service page CTAs — are they driving the right action?
- [ ] Review all `resultsNote` values on case studies — are they honest and clear?
- [ ] Check sitemap.xml in Google Search Console for crawl coverage
- [ ] Review any new AI tools or services added — should they appear on a service or solution page?
- [ ] Confirm no page has become thin (under 300 words of real content) after content edits

---

## Red Flags to Investigate Immediately

| Symptom | Likely cause |
|---|---|
| Canonical URL points at `localhost` | `NEXT_PUBLIC_SITE_URL` env var is unset |
| OG image broken in social preview | `ogImage` path doesn't resolve in `/public` |
| `/services` links to old root paths | `href` still uses `/ai-agents`, `/ai-automation` etc. |
| Service page shows 404 | Missing entry in `servicePages` array or `dynamicParams=false` with no data |
| Schema validation error | Missing required JSON-LD fields — check `jsonld.ts` helpers |
