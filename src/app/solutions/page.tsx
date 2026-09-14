import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Solutions — Problems We Automate for Businesses",
  description:
    "Automation solutions for the problems that drain business teams: lead follow-up, customer support, WhatsApp, content, invoices and sales.",
  path: "/solutions",
  keywords: [
    "lead automation",
    "customer support automation",
    "WhatsApp automation",
    "invoice automation",
    "sales automation",
  ],
});

export default function SolutionsPage() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Solutions"
          title="Processes we automate for businesses"
          description="Services are what we build. Solutions are the business problems those systems solve. Pick the problem that sounds most like your week."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => {
            const problem = solution.problem.title;
            return (
              <Reveal key={solution.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="glass-card group flex h-full flex-col gap-3 rounded-xl p-6 transition-colors duration-300 hover:border-emerald-400/40 sm:p-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    {solution.eyebrow.split("·")[1]?.trim() ?? solution.eyebrow}
                  </span>
                  <h2 className="font-display text-xl font-bold leading-snug text-white">
                    {solution.h1.split("—")[0].trim()}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-400">{problem}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-emerald-300 transition-colors group-hover:text-emerald-200">
                    See how
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14">
          <SectionHeading
            as="h2"
            eyebrow="By Industry"
            title="Automation for your type of business"
            description="The same capabilities applied to the specific problems of different industries."
          />
          <div className="flex flex-wrap justify-center gap-2.5">
            {["real-estate", "ecommerce", "agencies", "professional-services"].map((slug) => (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className="glass-card rounded-full px-4 py-2 text-sm font-medium text-zinc-300 capitalize transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
              >
                {slug.replace("-", " ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Which problem sounds like your week?"
        description="Tell us the process that drains the most hours and we'll show you the automated version — with a clear plan and a fixed quote."
      />
    </div>
  );
}