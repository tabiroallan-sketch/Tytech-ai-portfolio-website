import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { FaqSection } from "@/components/services/faq-section";
import { WorkflowFlow } from "@/components/services/workflow-steps";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, faqPageLd, serviceLd } from "@/lib/jsonld";
import { getProjectBySlug } from "@/data/projects";
import { getServiceCard } from "@/data/services";
import type { SolutionPage } from "@/data/solutions";

interface SolutionTemplateProps {
  page: SolutionPage;
}

/** Focuses on the business PROBLEM a solution solves, not the technology. */
export function SolutionTemplate({ page }: SolutionTemplateProps) {
  const related = page.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const serviceCard = getServiceCard(page.relatedServiceSlug);

  return (
    <div className="relative">
      <JsonLd
        data={[
          serviceLd(page.h1, page.description, `/solutions/${page.slug}`),
          breadcrumbLd([
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: page.h1, href: `/solutions/${page.slug}` },
          ]),
          faqPageLd(page.faqs, `/solutions/${page.slug}`),
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      {/* Hero */}
      <section className="container-site py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow={page.eyebrow}
            title={page.h1}
            description={page.description}
          />
          {serviceCard && (
            <p className="mx-auto -mt-6 mb-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-zinc-500">
              Built with our
              <Link
                href={`/services/${serviceCard.id}`}
                className="font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
              >
                {serviceCard.title}
              </Link>
              service
            </p>
          )}
          <Reveal className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton
              projectName={page.h1}
              label="Discuss This Solution"
              size="lg"
              source={`solution-${page.slug}`}
            />
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Get a fixed quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section
        aria-labelledby="solution-problem"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              as="h2"
              align="left"
              id="solution-problem"
              className="mb-0"
              eyebrow="The Problem"
              title={page.problem.title}
            />
          </Reveal>
          <div className="flex flex-col justify-center gap-4">
            {page.problem.paragraphs.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p className="leading-relaxed text-zinc-300 sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What gets automated */}
      <section aria-labelledby="solution-automated" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="solution-automated"
            eyebrow="What Gets Automated"
            title={page.whatGetsAutomated.title}
          />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.whatGetsAutomated.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} className="h-full">
                <li className="flex h-full items-start gap-2.5 leading-relaxed text-zinc-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Example workflow */}
      <section
        aria-labelledby="solution-workflow"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="solution-workflow"
            eyebrow="Example Workflow"
            title={page.workflowTitle}
            description={page.workflowDescription}
          />
          <div className="mx-auto max-w-5xl">
            <WorkflowFlow steps={page.workflowSteps} />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="solution-tools" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading as="h2" id="solution-tools" eyebrow="Tools & Integrations" title="What the pipeline connects" />
          <div className="flex flex-wrap justify-center gap-2.5">
            {page.tools.map((tool) => (
              <TechnologyBadge key={tool} label={tool} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="solution-benefits"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading as="h2" id="solution-benefits" eyebrow="Benefits" title={page.benefits.title} />
          <ul className="mx-auto grid max-w-3xl gap-3">
            {page.benefits.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <li className="flex items-start gap-2.5 leading-relaxed text-zinc-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant project */}
      {related.length > 0 && (
        <section aria-labelledby="solution-project" className="py-16 sm:py-20">
          <div className="container-site">
            <SectionHeading
              as="h2"
              id="solution-project"
              eyebrow="See It In Action"
              title="Relevant demonstration system"
              description="A demonstration build that shows this exact approach working."
            />
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FaqSection
        id="solution-faq"
        title="Common questions"
        description="Straight answers about how this solution works for real businesses."
        faqs={page.faqs}
      />

      {/* CTA */}
      <CTASection title={page.ctaTitle} description={page.ctaDescription} />
    </div>
  );
}