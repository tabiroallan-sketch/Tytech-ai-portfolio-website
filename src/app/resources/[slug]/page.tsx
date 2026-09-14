import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { articles, getArticleBySlug } from "@/data/articles";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/ui/cta-section";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { getProjectBySlug } from "@/data/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo/config";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const index = articles.findIndex((a) => a.slug === slug);
  const next = index < articles.length - 1 ? articles[index + 1] : undefined;
  const project = article.relatedProjectSlug
    ? getProjectBySlug(article.relatedProjectSlug)
    : undefined;

  const published = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative">
      <JsonLd
        data={[
          articleLd(article),
          breadcrumbLd([
            { name: "Home", href: "/" },
            { name: "Resources", href: "/resources" },
            { name: article.title, href: `/resources/${article.slug}` },
          ]),
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <article className="container-site flex flex-col items-center py-16 sm:py-20">
        <div className="w-full max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
          >
            <Link href="/" className="transition-colors hover:text-emerald-300">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/resources" className="transition-colors hover:text-emerald-300">
              Resources
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="font-medium text-zinc-300">
              {article.title}
            </span>
          </nav>

          <Reveal className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {article.category}
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {published} · {article.readingMinutes} min read
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.7rem] lg:leading-tight">
              {article.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {article.description}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-10">
            {article.body.map((section) => (
              <Reveal key={section.heading ?? section.paragraphs?.[0]?.slice(0, 24)}>
                <section className="flex flex-col gap-4">
                  {section.heading ? (
                    <h2 className="font-display text-2xl font-bold text-white">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="leading-relaxed text-zinc-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="flex flex-col gap-2.5">
                      {section.bullets.map((item) => (
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
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {(article.relatedService || project) && (
            <Reveal className="mt-14">
              <div className="glass-card flex flex-col gap-5 rounded-2xl p-6 sm:p-7">
                {article.relatedService && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Related service
                    </span>
                    <Link
                      href={article.relatedService.href}
                      className="inline-flex items-center gap-2 text-lg font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                    >
                      {article.relatedService.label}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                )}
                {project && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      See it built
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-emerald-200"
                    >
                      {project.title} — Case Study
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                )}
                <div className="border-t border-white/[0.06] pt-4">
                  <WhatsAppButton
                    projectName={article.title}
                    label="Discuss this for your business"
                    source="resources"
                  />
                </div>
              </div>
            </Reveal>
          )}

          {next && (
            <Reveal className="mt-12">
              <Link
                href={`/resources/${next.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:border-emerald-400/40"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Next guide
                </span>
                <span className="font-display text-lg font-semibold text-white group-hover:text-emerald-200">
                  {next.title}
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </article>

      <CTASection
        title="Want automation done properly?"
        description="Bring us the process from the article — we'll build the version that runs itself."
      />
    </div>
  );
}