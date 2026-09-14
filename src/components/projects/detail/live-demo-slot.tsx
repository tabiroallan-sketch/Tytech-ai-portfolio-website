"use client";

import { ExternalLink, MonitorPlay } from "lucide-react";
import type { Project } from "@/types";
import { ButtonLink } from "@/components/ui/button";

/**
 * Live demo slot for a case study. Renders based on `demoType`:
 *  - "chat"   → InteractiveDemo (mock AI agent, connectable via lib/ai.ts)
 *  - "video"  → embedded video (project.videoUrl)
 *  - "embed"  → framed link to the live URL with browser chrome
 *  - "none"   → professional placeholder
 */
export function LiveDemoSlot({ project }: { project: Project }) {
  if (project.demoType === "embed" && project.liveUrl) {
    const safeUrl = (() => {
      try {
        return new URL(project.liveUrl).hostname;
      } catch {
        return project.liveUrl;
      }
    })();
    return (
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-ink-900/70 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500/70" />
          </div>
          <span className="flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-xs text-zinc-400">
            {safeUrl}
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live demo in a new tab`}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-400/30 px-3 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/10"
          >
            Open
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
        <div className="aspect-video">
          <iframe
            src={project.liveUrl}
            title={`${project.title} live demo`}
            loading="lazy"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    );
  }

  if (project.demoType === "video") {
    return (
      <div className="glass-card aspect-video overflow-hidden rounded-2xl">
        <iframe
          src={project.videoUrl ?? ""}
          title={`${project.title} video demonstration`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  // chat demos render above via InteractiveDemo directly; this covers none/chat-without-live
  return (
    <div className="glass-card flex flex-col items-center gap-4 rounded-2xl px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300">
        <MonitorPlay className="h-7 w-7" aria-hidden />
      </span>
      <h4 className="font-display text-lg font-semibold text-white">
        Live demo coming soon
      </h4>
      <p className="max-w-md text-sm leading-relaxed text-zinc-400">
        A working demo of this system will be available here. In the meantime,
        we&apos;re happy to walk you through it personally on a short call.
      </p>
      <ButtonLink href="/contact" variant="secondary" size="sm">
        Request a walkthrough
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </ButtonLink>
    </div>
  );
}
