import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { TechnologyBadge } from "@/components/ui/technology-badge";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="glass-card group relative flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-300 hover:border-emerald-400/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
        {/* Card-level link overlay */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          className="absolute inset-0 z-10 focus-visible:outline-2"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-300">
            {project.category}
          </span>
          <span className="shrink-0 font-mono text-xs text-zinc-500">
            {project.year}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug text-white">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <TechnologyBadge key={tech} label={tech} />
          ))}
          {project.technologies.length > 3 && (
            <TechnologyBadge
              label={`+${project.technologies.length - 3}`}
              className="border-white/[0.06] text-zinc-500"
            />
          )}
        </div>

        <div className="relative z-20 mt-2 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
          >
            View Case Study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-emerald-300"
            >
              Live Demo
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}