import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getServicePage } from "@/data/services";

export const metadata: Metadata = {
  title: getServicePage("workflow-automation")?.metaTitle,
  description: getServicePage("workflow-automation")?.metaDescription,
  alternates: { canonical: "/workflow-automation" },
  openGraph: {
    title: getServicePage("workflow-automation")?.h1,
    description: getServicePage("workflow-automation")?.metaDescription,
    type: "website",
  },
};

export default function WorkflowAutomationPage() {
  const page = getServicePage("workflow-automation");
  if (!page) return null;
  return <ServicePageTemplate page={page} source="workflow-automation" />;
}