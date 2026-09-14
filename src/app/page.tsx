import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { ServiceCard } from "@/components/services/service-card";
import { ProjectCard } from "@/components/projects/project-card";
import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { TestimonialSection } from "@/components/testimonials/testimonial-section";
import { services } from "@/data/services";
import { getFeaturedProjects } from "@/data/projects";
import { ArrowRight, ClipboardList, Code2, Rocket, SearchCheck } from "lucide-react";

export const metadata: Metadata = {
  description:
    "We build modern websites, AI agents and automated workflows that help businesses eliminate repetitive work, respond faster and operate more efficiently.",
  alternates: { canonical: "/" },
};

const process = [
  {
    Icon: SearchCheck,
    title: "Discover",
    text: "We map your current process and find what eats the most time.",
  },
  {
    Icon: ClipboardList,
    title: "Design",
    text: "You get a clear system blueprint with a fixed scope and quote.",
  },
  {
    Icon: Code2,
    title: "Build",
    text: "We build and test the automation against your real workflows.",
  },
  {
    Icon: Rocket,
    title: "Launch & Support",
    text: "Go live with monitoring, documentation and ongoing support.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Services preview */}
      <section aria-labelledby="services-preview" className="py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            id="services-preview"
            eyebrow="Services"
            title="What we can build for your business"
            description="Four focused services that remove manual work and make your business respond instantly."
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.07} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section
        aria-labelledby="featured-projects"
        className="border-y border-white/[0.05] bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="container-site">
          <SectionHeading
            id="featured-projects"
            eyebrow="Selected Work"
            title="Systems built to save real hours"
            description="Each case study covers the problem, the solution, how it works and the results."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex justify-center" delay={0.1}>
            <ButtonLink href="/projects" variant="secondary" size="lg">
              View All Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            id="process-heading"
            eyebrow="How We Work"
            title="From bottleneck to automated in four steps"
          />
          <Reveal className="mb-10">
            <div className="gradient-border-card relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
              <Image
                src="/images/sections/automation-1.png"
                alt="Automation workflow visual overview"
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm text-zinc-200 sm:bottom-5 sm:left-6 sm:text-base">
                Every system connects your existing tools into one automated,
                self-running pipeline.
              </p>
            </div>
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <li className="glass-card relative h-full rounded-xl p-6">
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 font-display text-4xl font-bold text-white/[0.06]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Interactive demo teaser */}
      <section
        aria-labelledby="demo-teaser"
        className="relative overflow-hidden border-y border-white/[0.05] bg-ink-900/40 py-20 sm:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/sections/automation-7.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.12]"
          />
        </div>
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col items-start gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Try It Live
            </span>
            <h2
              id="demo-teaser"
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Chat with a sample{" "}
              <span className="text-gradient">AI agent</span>
            </h2>
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              This is a small taste of what an AI assistant could do for your
              customers — answering questions instantly at any hour, using your
              own business knowledge.
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-300">
              {[
                "Answers from your docs, policies and pricing",
                "Escalates to humans when needed",
                "Works on websites, WhatsApp and internal tools",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/services#ai-agents" variant="secondary">
              Explore AI Agents
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.12}>
            <InteractiveDemo />
          </Reveal>
        </div>
      </section>

      <TestimonialSection />

      <CTASection />
    </>
  );
}
