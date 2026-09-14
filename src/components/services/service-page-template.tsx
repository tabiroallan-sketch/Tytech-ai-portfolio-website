import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { getProjectBySlug } from "@/data/projects";
import type { ServiceLandingPage } from "@/data/services";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, serviceLd } from "@/lib/jsonld";

interface ServicePageTemplateProps {
  page: ServiceLandingPage;
  source: string;
}

export function ServicePageTemplate({ page, source }: ServicePageTemplateProps) {
  const related = page.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="relative">
      <JsonLd
        data={[
          serviceLd(page.h1, page.metaDescription),
          breadcrumbLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: page.h1, href: `/${page.slug}` },
          ]),
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          align="left"
          className="mb-10"
          eyebrow={page.eyebrow}
          title={page.h1}
          description={page.metaDescription}
        />

        <div className="flex flex-col items-start gap-6">
          {page.intro.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 32)}>
              <p className="max-w-3xl leading-relaxed text-zinc-300 sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal className="mt-2">
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton
                projectName={page.h1}
                label="Discuss This"
                source={`${source}-landing`}
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
              >
                Get a fixed quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full rounded-3xl p-7 sm:p-9">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {page.outcomesTitle}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {page.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 leading-relaxed text-zinc-300"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-green-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass-card h-full rounded-3xl p-7 sm:p-9">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {page.deliverablesTitle}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {page.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 leading-relaxed text-zinc-300"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-green-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-work" className="mt-16 sm:mt-20">
            <SectionHeading
              id="related-work"
              align="left"
              className="mb-8 md:mb-10"
              eyebrow="Related Work"
              title="Built with this approach"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </section>

      <CTASection title={page.ctaTitle} description={page.ctaDescription} />
    </div>
  );
}