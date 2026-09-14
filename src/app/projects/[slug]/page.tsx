import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { getServiceForProject } from "@/data/services";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/ui/cta-section";
import { WorkflowViewer } from "@/components/workflow/workflow-viewer";
import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { LiveDemoSlot } from "@/components/projects/detail/live-demo-slot";
import {
  ProjectLinks,
  PrevNextNav,
} from "@/components/projects/detail/project-links";
import { ResultsGrid } from "@/components/projects/detail/results-grid";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo/config";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    ogType: "article",
    publishedTime: `2026-01-01`,
  });
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;
  const service = getServiceForProject(slug);

  return (
    <div className="relative">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ])}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-60" />
      </div>

      <article className="container-site flex flex-col gap-16 py-12 sm:py-16">
        {/* Header */}
        <Reveal className="flex flex-col items-start gap-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-emerald-300"
            >
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/projects"
              className="transition-colors hover:text-emerald-300"
            >
              Projects
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="font-medium text-zinc-300">
              {project.title}
            </span>
          </nav>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {project.year}
            </span>
            {project.type === "demo" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Demonstration build
              </span>
            )}
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {project.summary}
          </p>
          {project.type === "demo" && (
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">
              To stay honest about results, we&apos;ve built this as a fully
              working demonstration, not a claim about a paying client.
              Every system we ship starts from a working prototype exactly
              like this one.
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <TechnologyBadge key={tech} label={tech} />
            ))}
          </div>
          {service && (
            <Link
              href={`/services/${service.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Part of our {service.title} service
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <WhatsAppButton
              projectName={project.title}
              label="Discuss This Automation"
              size="lg"
              source="project-detail"
            />
          </div>
        </Reveal>

        {/* Hero image */}
        <Reveal delay={0.08}>
          <figure className="gradient-border-card overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>

        {/* Overview / Problem / Solution */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold text-white">
              Project Overview
            </h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed text-zinc-400">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="glass-card rounded-2xl border-l-2 border-l-red-400/50 p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-white">
                  The Problem
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {project.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass-card rounded-2xl border-l-2 border-l-emerald-400/70 p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-white">
                  The Solution
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {project.solution}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* How it works */}
        <section aria-labelledby="how-it-works" className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How It Works"
            title="From trigger to outcome, automatically"
            align="center"
            className="!mb-0"
          />
          <WorkflowViewer project={project} />
        </section>

        {/* Architecture */}
        <section aria-labelledby="architecture" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Architecture"
            title="How the components communicate"
            align="center"
            className="!mb-0"
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {project.architecture.map((layer, i) => (
              <Reveal key={layer.title} delay={i * 0.06}>
                <li className="glass-card flex h-full gap-4 rounded-2xl p-6">
                  <span
                    aria-hidden
                    className="font-display text-xl font-bold text-emerald-400/80"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {layer.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      {layer.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Live demo */}
        {(project.demoType !== "none" || project.liveUrl) && (
          <section aria-labelledby="live-demo" className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Live Demo"
              title="See it in action"
              align="center"
              className="!mb-0"
            />
            {project.demoType === "chat" ? (
              <InteractiveDemo
                intro={
                  project.demoIntro ??
                  "Hi! Ask us anything about this system or how an agent like this could work for you."
                }
                suggestions={project.demoSuggestions}
                className="mx-auto w-full max-w-2xl"
              />
            ) : (
              <LiveDemoSlot project={project} />
            )}
          </section>
        )}

        {/* Results */}
        <section aria-labelledby="results" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Results"
            title="What the system changes for the business"
            align="center"
            className="!mb-0"
          />
          <ResultsGrid results={project.results} note={project.resultsNote} />
        </section>

        {/* Links + prev/next */}
        <div className="flex flex-col gap-10">
          {project.liveUrl || project.githubUrl || project.workflowUrl || project.docsUrl ? (
            <>
              <h2 className="font-display text-xl font-bold text-white">
                Project Links
              </h2>
              <ProjectLinks project={project} />
            </>
          ) : null}
          <PrevNextNav
            prev={prev && { slug: prev.slug, title: prev.title }}
            next={next && { slug: next.slug, title: next.title }}
          />
        </div>
      </article>

      <CTASection
        title="Need a system like this?"
        description="Describe your process — we'll show you exactly what an automated version could look like."
      />
    </div>
  );
}
