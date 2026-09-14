import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { articles } from "@/data/articles";
import { JsonLd } from "@/components/seo/json-ld";
import { articleListLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Resources — AI, Automation & Workflow Guides",
  description:
    "Practical guides on AI agents, n8n workflow automation and getting your data ready for automation — written from real project experience.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <div className="relative">
      <JsonLd data={articleListLd("Resources & Guides", articles)} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Resources"
          title="Practical guides to AI & automation"
          description="No hype, no filler — the decisions we walk through with clients every week, written down."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.06}>
              <Link
                href={`/resources/${article.slug}`}
                className="glass-card group flex h-full flex-col gap-3 rounded-xl p-6 transition-colors duration-300 hover:border-emerald-400/40 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    {article.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {article.readingMinutes} min read
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold leading-snug text-white">
                  {article.title}
                </h2>
                <p className="leading-relaxed text-zinc-400">{article.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-emerald-300 transition-colors group-hover:text-emerald-200">
                  Read the guide
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
        title="Have a process that needs this treatment?"
        description="Bring us a repetitive task or data juggling problem — we'll show you the automated version."
      />
    </div>
  );
}