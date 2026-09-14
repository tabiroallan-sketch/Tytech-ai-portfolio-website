"use client";

import { motion } from "framer-motion";
import type { WorkflowNodeSpec } from "@/types";
import { cn } from "@/lib/utils";
import { FlowIcon } from "./flow-icon";

interface FlowDiagramProps {
  nodes: WorkflowNodeSpec[];
}

export function FlowDiagram({ nodes }: FlowDiagramProps) {
  return (
    <ol
      aria-label="Workflow steps"
      className="relative mx-auto flex max-w-xl flex-col"
    >
      {nodes.map((node, i) => {
        const isLast = i === nodes.length - 1;
        return (
          <li key={node.id} className="relative flex gap-4 sm:gap-5">
            {/* Node column */}
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="glass-card relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-emerald-300"
              >
                <FlowIcon name={node.icon} className="h-5 w-5" />
              </motion.span>
              {!isLast && (
                <span
                  aria-hidden
                  className="relative w-px flex-1 overflow-hidden bg-white/[0.08]"
                >
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.12 + 0.15 }}
                    className="absolute inset-0 origin-top bg-emerald-400"
                  />
                </span>
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.12 + 0.05 }}
              className={cn("pb-8", isLast && "pb-1")}
            >
              <div className="flex h-11 items-center">
                <h4 className="font-display text-base font-semibold text-white sm:text-lg">
                  {node.label}
                </h4>
                <span className="ml-3 rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Step {i + 1}
                </span>
              </div>
              {node.description && (
                <p className="-mt-1.5 pr-4 text-sm leading-relaxed text-zinc-400">
                  {node.description}
                </p>
              )}
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
