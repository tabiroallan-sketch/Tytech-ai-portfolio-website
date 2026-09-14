import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { FaqSection } from "@/components/services/faq-section";
import { WorkflowCardGrid } from "@/components/services/workflow-steps";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, faqPageLd, serviceLd } from "@/lib/jsonld";
import { getProjectBySlug } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { getServiceCard } from "@/data/services";
import type { ServicePage } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServicePageTemplateProps {
  page: ServicePage;
  source: string;
}

/**
 * The 12-section service page layout:
 * 1. Hero  2. Problem  3. What it is  4. Who it's for  5. What gets built
 * 6. How it works  7. Example workflows  8. Technologies  9. Benefits
 * 10. Related case study  11. FAQ  12. CTA
 */
export function ServicePageTemplate({ page, source }: ServicePageTemplateProps) {
  const related = page.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const relatedSolutions = solutions.filter((s) => s.relatedServiceSlug === page.slug);
  const card = getServiceCard(page.slug);

  return (
    <div className="relative">
      <JsonLd
        data={[
          serviceLd(page.h1, page.description, `/services/${page.slug}`),
          breadcrumbLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: page.h1, href: `/services/${page.slug}` },
          ]),
          faqPageLd(page.faqs, `/services/${page.slug}`),
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      {/* 1. Hero */}
      <section className="container-site py-16 sm:py-20" aria-labelledby="service-hero">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            as="h1"
            id="service-hero"
            eyebrow={page.eyebrow}
            title={page.h1}
            description={page.hero.kicker}
          />
          {page.hero.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 40)}>
              <p className="mx-auto max-w-3xl leading-relaxed text-zinc-300 sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal className="mt-6">
            <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2">
              {page.hero.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton
                projectName={page.h1}
                label="Discuss This Service"
                size="lg"
                source={`${source}-landing`}
              />
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
              >
                Get a fixed quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Problem */}
      <section
        aria-labelledby="service-problem"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              as="h2"
              align="left"
              id="service-problem"
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

      {/* 3. What it is */}
      <section aria-labelledby="service-whatis" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="service-whatis"
            eyebrow={card ? card.title : page.eyebrow}
            title={page.whatIs.title}
          />
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {page.whatIs.paragraphs.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who it's for */}
      <section
        aria-labelledby="service-whofor"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading as="h2" id="service-whofor" eyebrow="Who It's For" title={page.whoFor.title} />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.whoFor.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} className="h-full">
                <li className="glass-card flex h-full items-start gap-2.5 rounded-xl p-5 leading-relaxed text-zinc-300">
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

      {/* 5. What gets built */}
      <section aria-labelledby="service-built" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="service-built"
            eyebrow="What You Can Build"
            title={page.whatGetsBuilt.title}
          />
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.whatGetsBuilt.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} className="h-full">
                <li className="flex items-start gap-2.5 leading-relaxed text-zinc-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. How it works */}
      <section
        aria-labelledby="service-how"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading as="h2" id="service-how" eyebrow="The Process" title={page.howItWorks.title} />
          <ol className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.howItWorks.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} className="h-full">
                <li className="glass-card relative h-full rounded-xl p-6">
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 font-display text-4xl font-bold text-white/[0.06]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Example workflows */}
      <section aria-labelledby="service-workflows" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            id="service-workflows"
            eyebrow="Example Workflows"
            title={page.exampleWorkflows.title}
          />
          <WorkflowCardGrid items={page.exampleWorkflows.items} />
        </div>
      </section>

      {/* 8. Technologies */}
      <section
        aria-labelledby="service-tech"
        className="border-y border-white/[0.05] bg-ink-900/40 py-16 sm:py-20"
      >
        <div className="container-site">
          <SectionHeading as="h2" id="service-tech" eyebrow="Technology" title={page.technologies.title} />
          <div className="flex flex-wrap justify-center gap-2.5">
            {page.technologies.items.map((tech) => (
              <TechnologyBadge key={tech} label={tech} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Benefits */}
      <section aria-labelledby="service-benefits" className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading as="h2" id="service-benefits" eyebrow="Benefits" title={page.benefits.title} />
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

      {/* 10. Related case study */}
      {related.length > 0 && (
        <section
          aria-labelledby="service-related"
          className={cn("py-16 sm:py-20", (relatedSolutions.length > 0 || related.length > 0) && "border-t border-white/[0.05] bg-ink-900/40")}
        >
          <div className="container-site">
            <SectionHeading
              as="h2"
              id="service-related"
              eyebrow="Related Work"
              title="Built with this approach"
              description="Demonstration systems we've built that show this service in action."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related solutions cross-links */}
      {relatedSolutions.length > 0 && (
        <section aria-labelledby="service-solutions" className="pb-16 sm:pb-20">
          <div className="container-site">
            <h2 id="service-solutions" className="mb-5 text-center font-display text-2xl font-bold text-white">
              Problems this service solves
            </h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {relatedSolutions.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="glass-card rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  {solution.h1.split("—")[0].trim()}
                  <ArrowRight className="ml-1.5 inline h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. FAQ */}
      <FaqSection
        id="service-faq"
        title={page.eyebrow}
        description="Questions we hear most about this service."
        faqs={page.faqs}
      />

      {/* 12. CTA */}
      <CTASection title={page.ctaTitle} description={page.ctaDescription} />
    </div>
  );
}