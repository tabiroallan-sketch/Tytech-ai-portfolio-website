import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServicePage } from "@/data/services";

export const metadata: Metadata = {
  title: getServicePage("ai-automation")?.metaTitle,
  description: getServicePage("ai-automation")?.metaDescription,
  alternates: { canonical: "/ai-automation" },
  openGraph: {
    title: getServicePage("ai-automation")?.h1,
    description: getServicePage("ai-automation")?.metaDescription,
    type: "website",
  },
};

export default function AIAutomationPage() {
  const page = getServicePage("ai-automation");
  if (!page) return null;
  return <ServicePageTemplate page={page} source="ai-automation" />;
}