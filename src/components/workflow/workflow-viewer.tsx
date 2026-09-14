"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ImageIcon, ListTree, PlayCircle } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { FlowDiagram } from "./flow-diagram";

type TabId = "diagram" | "screenshot" | "video";

interface WorkflowViewerProps {
  project: Pick<
    Project,
    "title" | "flowNodes" | "workflowImageUrl" | "videoUrl" | "workflowUrl" | "workflowDescription"
  >;
}

export function WorkflowViewer({ project }: WorkflowViewerProps) {
  const hasScreenshot = Boolean(project.workflowImageUrl);
  const hasVideo = Boolean(project.videoUrl);

  const tabs = [
    { id: "diagram" as const, label: "Diagram", Icon: ListTree, available: true },
    {
      id: "screenshot" as const,
      label: "n8n Screenshot",
      Icon: ImageIcon,
      available: hasScreenshot,
    },
    {
      id: "video" as const,
      label: "Video Walkthrough",
      Icon: PlayCircle,
      available: hasVideo,
    },
  ].filter((t) => t.available);

  const [activeTab, setActiveTab] = useState<TabId>("diagram");

  return (
    <div className="flex flex-col gap-6">
      {tabs.length > 1 && (
        <div
          role="tablist"
          aria-label="Workflow views"
          className="flex flex-wrap gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white",
              )}
            >
              <tab.Icon className="h-4 w-4" aria-hidden />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "diagram" && (
            <>
              {project.workflowDescription && (
                <p className="mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed text-zinc-400">
                  {project.workflowDescription}
                </p>
              )}
              <FlowDiagram nodes={project.flowNodes} />
            </>
          )}

          {activeTab === "screenshot" && project.workflowImageUrl && (
            <figure className="glass-card overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.workflowImageUrl}
                  alt={`${project.title ?? "Project"} n8n workflow screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              </div>
            </figure>
          )}

          {activeTab === "video" && project.videoUrl && (
            <div className="glass-card aspect-video overflow-hidden rounded-2xl">
              <iframe
                src={project.videoUrl}
                title={`${project.title ?? "Project"} workflow video walkthrough`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!hasScreenshot && !hasVideo && (
        <p className="mx-auto max-w-md text-center text-sm text-zinc-500">
          Screenshots and video walkthroughs can be attached to this section —{" "}
          {project.workflowUrl ? (
            <a
              href={project.workflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200"
            >
              view the workflow file
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            "see the README for how to add them."
          )}
        </p>
      )}
    </div>
  );
}
