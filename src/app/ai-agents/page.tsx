import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServicePage } from "@/data/services";

export const metadata: Metadata = {
  title: getServicePage("ai-agents")?.metaTitle,
  description: getServicePage("ai-agents")?.metaDescription,
  alternates: { canonical: "/ai-agents" },
  openGraph: {
    title: getServicePage("ai-agents")?.h1,
    description: getServicePage("ai-agents")?.metaDescription,
    type: "website",
  },
};

export default function AIAgentsPage() {
  const page = getServicePage("ai-agents");
  if (!page) return null;
  return <ServicePageTemplate page={page} source="ai-agents" />;
}