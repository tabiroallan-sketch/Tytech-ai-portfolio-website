import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServicePage, servicePages, getServiceCard } from "@/data/services";
import { buildMetadata } from "@/lib/seo/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const card = getServiceCard(slug);
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/services/${page.slug}`,
    keywords: card
      ? [card.title, "AI automation", "business automation", "n8n", "AI agents"]
      : undefined,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServicePageTemplate page={page} source="service" />;
}