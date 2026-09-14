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
import type { IndustryPage } from "@/data/industries";

interface IndustryTemplateProps {
  page: IndustryPage;
}

/**
 * Industry page template. Content is written from general operational
 * patterns and clearly framed — illustrative examples stay labelled.
 */
export function IndustryTemplate({ page }: IndustryTemplateProps) {
  const related = page.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="relative">
      <JsonLd
        data={[
          serviceLd(page.h1, page.description, `/industries/${page.slug}`),
          breadcrumbLd([
            { name: "Home", href: "/" },
            { name: "Industries", href: "/industries" },
            { name: page.h1, href: `/industries/${page.slug}` },
          ]),
          faqPageLd(page.faqs, `/industries/${page.slug}`),
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
          <div className="flex flex-col gap-4">
            {page.intro.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 40)} delay={i * 0.05}>
                <p className="leading-relaxed text-zinc-300 sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton
              projectName={page.h1}
              label="Discuss Your Business"
              size="lg"
              source={`industry-${page.slug}`}
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

      {/* Common problems */}
      <section
        aria-labelledby="industry-problems"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="industry-problems"
            eyebrow="Operational Problems"
            title={page.commonProblems.title}
          />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.commonProblems.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} className="h-full">
                <li className="glass-card flex h-full items-start gap-2.5 rounded-xl p-5 text-sm leading-relaxed text-zinc-300">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                  />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant automations */}
      <section aria-labelledby="industry-automations" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="industry-automations"
            eyebrow="What Can Be Automated"
            title={page.relevantAutomations.title}
          />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.relevantAutomations.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} className="h-full">
                <li className="flex h-full items-start gap-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
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
        aria-labelledby="industry-workflow"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="industry-workflow"
            eyebrow="Example Workflow"
            title={page.exampleWorkflowTitle}
            description={page.exampleWorkflow.description}
          />
          <div className="mx-auto max-w-5xl">
            <WorkflowFlow steps={page.exampleWorkflow.flow} />
          </div>
          <p className="mt-6 text-center text-xs italic text-zinc-600">
            Illustrative example — built for a business like yours, not a claimed client result.
          </p>
        </div>
      </section>

      {/* Integrations */}
      <section aria-labelledby="industry-integrations" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="industry-integrations"
            eyebrow="Tools We Connect"
            title="Integrations that fit your stack"
          />
          <div className="flex flex-wrap justify-center gap-2.5">
            {page.integrations.map((tool) => (
              <TechnologyBadge key={tool} label={tool} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Relevant project */}
      {related.length > 0 && (
        <section
          aria-labelledby="industry-project"
          className="border-t border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
        >
          <div className="container-site">
            <SectionHeading
              as="h2"
              id="industry-project"
              eyebrow="Relevant Work"
              title="A demonstration system to explore"
              description="A demonstration build showing the kind of system we'd design for your industry."
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
        id="industry-faq"
        title="Questions from businesses like yours"
        description="We answer these often when mapping automation for this type of operation."
        faqs={page.faqs}
      />

      {/* CTA */}
      <CTASection title={page.ctaTitle} description={page.ctaDescription} />
    </div>
  );
}