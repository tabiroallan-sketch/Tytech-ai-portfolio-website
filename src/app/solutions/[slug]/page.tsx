import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionTemplate } from "@/components/solutions/solution-template";
import { getSolution, solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolution(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/solutions/${page.slug}`,
    keywords: ["automation", "AI agents", "n8n", "business automation"],
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSolution(slug);
  if (!page) notFound();
  return <SolutionTemplate page={page} />;
}