import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { projectListLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Projects — AI Agents, Automation & Websites",
  description:
    "Case studies of AI agents, n8n workflow automations and modern websites: the problem, the solution, how it works and the results.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <JsonLd data={projectListLd("Projects & Case Studies", projects)} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title="Projects & Case Studies"
          description="Real systems built around AI agents, n8n workflows and modern web development. Every case study shows the problem, the build and the outcome."
        />
        <ProjectsGrid projects={projects} />
        <p className="mt-12 text-center text-xs italic text-zinc-600">
          Demo note: current entries are demonstration builds — realistic
          examples of the work we deliver. Metrics are illustrative until
          replaced with real client outcomes.
        </p>
      </section>

      <CTASection
        title="Your project could be next."
        description="Bring us a repetitive process or a website idea — we'll turn it into a system that runs itself."
      />
    </div>
  );
}
