import { site } from "@/data/site";
import type { Article } from "@/data/articles";
import type { Project } from "@/types";

export type JsonLd = Record<string, unknown>;

const orgUrl = site.url;
const orgId = `${orgUrl}/#organization`;

export function organizationLd(): JsonLd {
  const sameAs = [site.socials.github, site.socials.linkedin, site.socials.x].filter(
    Boolean,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: orgUrl,
    logo: { "@type": "ImageObject", url: `${orgUrl}/logo.png` },
    email: `mailto:${site.email}`,
    description: site.role,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.role}`,
    url: orgUrl,
    inLanguage: "en",
  };
}

export function breadcrumbLd(
  items: { name: string; href: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, href }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: href.startsWith("http") ? href : `${orgUrl}${href}`,
    })),
  };
}

export function serviceLd(name: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@id": orgId },
    url: orgUrl,
    areaServed: { "@type": "Place", name: site.location },
    inLanguage: "en",
  };
}

export function articleLd(article: Article): JsonLd {
  const publisher = {
    "@type": "Organization",
    name: site.name,
    url: orgUrl,
    logo: { "@type": "ImageObject", url: `${orgUrl}/logo.png` },
  };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "en",
    mainEntityOfPage: `${orgUrl}/resources/${article.slug}`,
    author: { "@type": "Organization", name: site.name, url: orgUrl },
    publisher,
  };
}

export function articleListLd(
  name: string,
  items: { title: string; slug: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `${orgUrl}/resources/${item.slug}`,
    })),
  };
}

export function projectListLd(name: string, projects: Project[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.title,
      url: `${orgUrl}/projects/${project.slug}`,
    })),
  };
}