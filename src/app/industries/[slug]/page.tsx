import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryTemplate } from "@/components/industries/industry-template";
import { getIndustry, industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustry(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/industries/${page.slug}`,
    keywords: ["AI automation", "business automation", "n8n", "AI agents"],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustry(slug);
  if (!page) notFound();
  return <IndustryTemplate page={page} />;
}