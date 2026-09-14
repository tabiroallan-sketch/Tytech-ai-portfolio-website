import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Check, Globe, Network, Workflow } from "lucide-react";
import { services, relatedByService } from "@/data/services";
import { getProjectBySlug } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo/config";

const SERVICE_ICONS = {
  globe: Globe,
  bot: Bot,
  workflow: Workflow,
  network: Network,
} as const;

export const metadata: Metadata = buildMetadata({
  title: "Services — AI Agents, n8n Automation & Web Development",
  description:
    "AI automation, AI agents, n8n workflow automation, AI integrations, business systems and web development. Fixed scope, clear process, built to remove repetitive work.",
  path: "/services",
  keywords: [
    "AI automation services",
    "AI agents",
    "n8n workflows",
    "business automation",
    "web development",
  ],
});

export default function ServicesPage() {
  return (
    <div className="relative">
      <JsonLd
        data={services.map((service) =>
          serviceLd(service.title, service.shortDescription, `/services/${service.id}`),
        )}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="Automation & web solutions that pay for themselves"
          description="Every engagement starts with your process, not the technology. Pick a service below — or bring us a problem and we'll recommend the right combination."
        />

        <div className="flex flex-col gap-16 sm:gap-20">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon];
            const related = (relatedByService[service.id] ?? [])
              .map((slug) => getProjectBySlug(slug))
              .filter(Boolean);
            const reversed = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-title`}
                className="scroll-mt-28"
              >
                <Reveal>
                  <div
                    className={`glass-card grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 ${
                      reversed ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="flex flex-col items-start gap-5">
                      <div className="gradient-border-card relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                        <Image
                          src={`/images/sections/automation-${index + 3}.png`}
                          alt={`${service.title} illustration`}
                          fill
                          sizes="(max-width: 1152px) 100vw, 480px"
                          className="object-cover"
                        />
                      </div>
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-700 bg-ink-800 text-emerald-300">
                        <Icon className="h-7 w-7" aria-hidden />
                      </span>
                      <h2
                        id={`${service.id}-title`}
                        className="font-display text-2xl font-bold text-white sm:text-3xl"
                      >
                        {service.title}
                      </h2>
                      <p className="leading-relaxed text-zinc-400">
                        {service.longDescription}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/services/${service.id}`}
                          className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-emerald-300"
                        >
                          Explore this service
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <WhatsAppButton
                          projectName={service.title}
                          label="Discuss Your Automation"
                          source="services"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          Example use cases
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                          {service.useCases.map((useCase) => (
                            <li
                              key={useCase}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                                aria-hidden
                              />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          What you get
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {related.length > 0 && (
                        <div className="sm:col-span-2">
                          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Related work
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {related.map((project) => (
                              <Link
                                key={project!.slug}
                                href={`/projects/${project!.slug}`}
                                className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                              >
                                {project!.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}