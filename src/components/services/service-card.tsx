"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Check, Globe, Network, Plus, Workflow } from "lucide-react";
import { useState } from "react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  globe: Globe,
  bot: Bot,
  workflow: Workflow,
  network: Network,
} as const;

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <article
      className={cn(
        "glass-card group relative flex flex-col gap-4 rounded-xl p-6 transition-colors duration-300 hover:border-emerald-400/40 sm:p-7",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-700 bg-ink-800 text-emerald-300">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={
            expanded
              ? `Hide details for ${service.title}`
              : `Learn more about ${service.title}`
          }
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-all duration-300 hover:border-emerald-400/40 hover:text-emerald-300",
            expanded && "rotate-45 border-emerald-400/40 text-emerald-300",
          )}
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-white">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {service.shortDescription}
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {service.useCases.slice(0, 3).map((useCase) => (
          <li key={useCase} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
              aria-hidden
            />
            {useCase}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.07] pt-4">
              <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                What you get
              </h4>
              <ul className="flex flex-col gap-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={`/services/${service.id}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
      >
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </article>
  );
}
