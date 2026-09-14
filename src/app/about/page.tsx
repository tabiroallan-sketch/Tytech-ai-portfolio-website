import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "About — AI Automation & Web Solutions Specialist",
  description:
    "We help businesses eliminate repetitive work with AI agents, n8n workflow automation, API integrations and modern websites.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Business first, technology second",
    text: "Every build starts with the outcome you need — hours saved, faster replies, fewer errors — then we pick the simplest stack that gets there.",
  },
  {
    title: "Automate what repeats",
    text: "If your team does a task manually more than twice a week, it's a candidate. That's where automation delivers the fastest return.",
  },
  {
    title: "Humans stay in control",
    text: "Good systems escalate to people when it matters and keep you informed — never black boxes that act on their own.",
  },
  {
    title: "Built to be maintained",
    text: "Clear documentation, error alerts and handover training mean the system keeps working long after launch day.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      {/* Intro */}
      <section className="container-site py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-emerald-300">
              {site.availability}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Hi, we&apos;re{" "}
              <span className="text-gradient">{site.name}</span> — we
              turn manual business work into automated systems.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              We&apos;re an AI automation and web solutions specialist. We build
              modern websites, AI agents and n8n workflow automations that help
              businesses eliminate repetitive work, respond to customers faster
              and operate more efficiently — without adding headcount.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">
              Our focus is practical: connecting the tools you already use
              (CRMs, email, WhatsApp, spreadsheets, payment systems) with AI and
              automation so data flows by itself and your team handles only what
              genuinely needs a human.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-2 w-full max-w-3xl">
            <div className="gradient-border-card relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src="/images/sections/automation-2.png"
                alt="Connected AI automation systems"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What I do */}
      <section aria-labelledby="what-i-do" className="border-y border-white/[0.05] bg-ink-900/40 py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            id="what-i-do"
            eyebrow="What We Do"
            title="One specialist for the whole pipeline"
            description="Most businesses stitch together a web developer, an automation freelancer and an AI tool that don't talk to each other. We build all three as one connected system."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Websites & web apps",
                text: "Fast, modern sites built with Next.js that convert visitors into enquiries.",
              },
              {
                title: "AI agents",
                text: "Assistants trained on your business info that support customers 24/7.",
              },
              {
                title: "n8n automation",
                text: "Workflows that move data between your tools without copy-paste.",
              },
              {
                title: "API integrations",
                text: "Your CRM, email, messaging and payments — connected into one system.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <li className="glass-card h-full rounded-xl p-6">
                  <span
                    aria-hidden
                    className="mb-3 block h-1 w-8 rounded-full bg-emerald-400"
                  />
                  <h3 className="font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {item.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles" className="py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading id="principles" eyebrow="How We Think" title="Principles behind every build" />
          <ol className="grid gap-5 md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.07}>
                <li className="gradient-border-card h-full rounded-2xl p-6 sm:p-7">
                  <span
                    aria-hidden
                    className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400/80"
                  >
                    Principle {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {principle.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="border-y border-white/[0.05] bg-ink-900/40 py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            id="skills"
            eyebrow="Skills & Stack"
            title="Tools we work with"
            description="The technologies behind our builds — chosen for reliability, not hype."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={i * 0.06}>
                  <div className="glass-card h-full rounded-xl p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <TechnologyBadge key={skill} label={skill} size="md" />
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's find your biggest time sink."
        description="A short call is enough to spot where automation would save you the most."
      />
    </div>
  );
}
