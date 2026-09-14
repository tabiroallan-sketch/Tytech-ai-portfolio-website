import { ArrowLeft, ArrowRight, BookOpen, Download, ExternalLink, MonitorPlay, Workflow } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import type { Project, ProjectLink } from "@/types";
import { GitHubIcon } from "@/components/ui/social-icons";

type IconComponent = ComponentType<{ className?: string }>;

const CUSTOM_ICONS: Record<
  NonNullable<ProjectLink["icon"]>,
  IconComponent
> = {
  external: ExternalLink,
  github: GitHubIcon,
  workflow: Workflow,
  docs: BookOpen,
  video: MonitorPlay,
  download: Download,
};

interface ProjectLinksProps {
  project: Project;
}

export function ProjectLinks({ project }: ProjectLinksProps) {
  const links = [
    project.liveUrl && {
      href: project.liveUrl,
      label: "Live Demo",
      Icon: ExternalLink,
      primary: true,
    },
    project.githubUrl && {
      href: project.githubUrl,
      label: "GitHub",
      Icon: GitHubIcon,
      primary: false,
    },
    project.workflowUrl && {
      href: project.workflowUrl,
      label: "Workflow (n8n)",
      Icon: Workflow,
      primary: false,
    },
    project.docsUrl && {
      href: project.docsUrl,
      label: "Documentation",
      Icon: BookOpen,
      primary: false,
    },
    ...(project.links ?? []).map((link) => ({
      href: link.url,
      label: link.label,
      Icon: CUSTOM_ICONS[link.icon ?? "external"],
      primary: false,
    })),
  ].filter(Boolean) as {
    href: string;
    label: string;
    Icon: IconComponent;
    primary: boolean;
  }[];

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ href, label, Icon, primary }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            primary
              ? "inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-emerald-300 active:scale-[0.98]"
              : "glass-card inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
          }
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </a>
      ))}
    </div>
  );
}

interface PrevNextProps {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export function PrevNextNav({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="More projects"
      className="grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2"
    >
      {prev && (
        <Link
          href={`/projects/${prev.slug}`}
          className="glass-card group flex flex-col gap-1 rounded-xl p-5 transition-colors hover:border-emerald-400/30"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden />
            Previous project
          </span>
          <span className="font-display font-semibold text-white group-hover:text-emerald-300">
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="glass-card group flex flex-col items-end gap-1 rounded-xl p-5 text-right transition-colors hover:border-emerald-400/30 sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Next project
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
          <span className="font-display font-semibold text-white group-hover:text-emerald-300">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
