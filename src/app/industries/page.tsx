import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Industries — AI Automation by Sector",
  description:
    "How Tytech AI applies AI agents, n8n automation and integrations to the specific problems of real estate, ecommerce, agencies and professional services.",
  path: "/industries",
  keywords: [
    "AI automation for real estate",
    "AI automation for ecommerce",
    "automation for agencies",
    "automation for professional services",
  ],
});

export default function IndustriesPage() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Industries"
          title="Automation built for how your business operates"
          description="The same systems, adapted to the problems your industry deals with every day. If yours isn't listed, bring us the problem — the capabilities carry over."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 0.06} className="h-full">
              <Link
                href={`/industries/${industry.slug}`}
                className="glass-card group flex h-full flex-col gap-3 rounded-xl p-6 transition-colors duration-300 hover:border-emerald-400/40 sm:p-7"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {industry.eyebrow}
                </span>
                <h2 className="font-display text-xl font-bold leading-snug text-white">
                  {industry.h1}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">{industry.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-emerald-300 transition-colors group-hover:text-emerald-200">
                  Explore
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Don't see your industry?"
        description="The problems worth automating are similar across businesses. Tell us yours and we'll show you the automated version."
      />
    </div>
  );
}