import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServicePage } from "@/data/services";

export const metadata: Metadata = {
  title: getServicePage("ai-integrations")?.metaTitle,
  description: getServicePage("ai-integrations")?.metaDescription,
  alternates: { canonical: "/ai-integrations" },
  openGraph: {
    title: getServicePage("ai-integrations")?.h1,
    description: getServicePage("ai-integrations")?.metaDescription,
    type: "website",
  },
};

export default function AIIntegrationsPage() {
  const page = getServicePage("ai-integrations");
  if (!page) return null;
  return <ServicePageTemplate page={page} source="ai-integrations" />;
}