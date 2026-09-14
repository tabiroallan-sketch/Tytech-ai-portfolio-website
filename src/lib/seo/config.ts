import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Central SEO configuration system.
 *
 * Every route builds its `Metadata` through `buildMetadata` instead of
 * hand-writing metadata exports. This guarantees:
 *
 *  - a consistent title/description shape across the whole site
 *  - canonical URLs always correct (relative path maintained, OG url absolute)
 *  - Open Graph + Twitter cards always present
 *  - per-page opt-in for noindex / article-type OG
 *
 * The layout (`src/app/layout.tsx`) owns the `title.template` (`%s | Tytech AI`)
 * and shared image defaults — here we only configure what varies per page.
 */

export const OG_IMAGE = "/og.png";

export interface SeoOptions {
  /** Page title WITHOUT the brand suffix (the layout template appends `| Tytech AI`). */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/services/ai-agents". Used for canonical + OG url. */
  path: string;
  keywords?: string[];
  noindex?: boolean;
  ogType?: "website" | "article";
  /** Absolute path (in /public) to a page-specific OG image. */
  ogImage?: string;
  /** For articles — ISO 8601 date string. */
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noindex = false,
  ogType = "website",
  ogImage = OG_IMAGE,
  publishedTime,
  modifiedTime,
}: SeoOptions): Metadata {
  const url = new URL(path, site.url).toString();
  const brandTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: path },
    ...(noindex
      ? { robots: { index: false, follow: false } as const }
      : {}),
    openGraph: {
      type: ogType,
      url,
      siteName: site.name,
      title: brandTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: brandTitle,
      description,
      images: [{ url: ogImage, alt: title }],
    },
  };
}