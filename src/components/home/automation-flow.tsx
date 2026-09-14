"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Bot,
  Check,
  Database,
  Mail,
  UserPlus,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FlowNodeIcon } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<FlowNodeIcon | "user", typeof Bot> = {
  user: UserPlus,
  form: UserPlus,
  webhook: Workflow,
  ai: Bot,
  workflow: Workflow,
  database: Database,
  mail: Mail,
  bell: Bell,
  chat: Bot,
  file: Database,
  globe: Bell,
};

interface FlowStep {
  label: string;
  sub: string;
  icon: FlowNodeIcon | "user";
}

const STEPS: FlowStep[] = [
  { label: "Lead", sub: "New enquiry captured", icon: "user" },
  { label: "AI Agent", sub: "Lead qualified & scored 87/100", icon: "ai" },
  { label: "n8n", sub: "Workflow triggered — routing data", icon: "workflow" },
  { label: "CRM", sub: "Contact & deal created", icon: "database" },
  { label: "Email", sub: "Personalised follow-up sent", icon: "mail" },
  { label: "Alert", sub: "Sales team notified instantly", icon: "bell" },
];

const STEP_MS = 1500;
const HOLD_INDEX = STEPS.length;

function useFlowCycle() {
  const [cycle, setCycle] = useState({ index: 0, prev: HOLD_INDEX });

  useEffect(() => {
    const id = window.setInterval(() => {
      setCycle((s) => ({
        index: (s.index + 1) % (HOLD_INDEX + 1),
        prev: s.index,
      }));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  return { index: cycle.index, justReset: cycle.prev === HOLD_INDEX && cycle.index === 0 };
}

export function AutomationFlow() {
  const { index, justReset } = useFlowCycle();
  const isHold = index === HOLD_INDEX;
  const progressPct = (Math.min(index, STEPS.length - 1) / (STEPS.length - 1)) * 100;

  const logLine = isHold
    ? "Cycle complete — listening for the next lead…"
    : STEPS[index].sub;
  const logPrefix = isHold ? "[done]" : `[step ${index + 1}/${STEPS.length}]`;

  return (
    <div
      aria-label="Animated diagram of an automated lead workflow: lead submission, AI agent qualification, n8n workflow, CRM update, email follow-up and team notification"
      role="img"
      className="flex h-full flex-col gap-5"
    >
      {/* Desktop: horizontal flow */}
      <div className="relative hidden md:block">
        <div className="relative flex items-start justify-between px-[7%]">
          {STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const complete = isHold || index > i;
            const active = index === i;
            return (
              <div key={step.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  {active && !isHold && (
                    <span
                      aria-hidden
                      className="animate-ping-slow absolute inset-0 rounded-xl border border-emerald-400/70"
                    />
                  )}
                  <div
                    className={cn(
                      "relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500",
                      complete
                        ? "border-emerald-400/50 bg-ink-800 text-emerald-300"
                        : active
                          ? "border-emerald-400/70 bg-ink-800 text-emerald-300"
                          : "border-white/10 bg-ink-850 text-zinc-500",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    {complete && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-400 text-ink-950">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-center text-xs font-medium leading-tight",
                    complete || active ? "text-zinc-200" : "text-zinc-500",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* connector track */}
        <div
          aria-hidden
          className="absolute left-[7%] right-[7%] top-6 h-px bg-white/[0.08]"
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: `${isHold ? 100 : progressPct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {!justReset && (
            <motion.span
              className="absolute top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300"
              initial={false}
              animate={{
                left: `${isHold ? 100 : progressPct}%`,
                opacity: isHold ? 0 : 1,
              }}
              transition={
                justReset
                  ? { duration: 0 }
                  : { duration: 0.65, ease: "easeInOut" }
              }
            />
          )}
        </div>
      </div>

      {/* Mobile: vertical flow */}
      <div className="relative md:hidden">
        <div className="relative flex flex-col gap-3 pl-1">
          {STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const complete = isHold || index > i;
            const active = index === i;
            return (
              <div key={step.label} className="flex items-center gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      "z-10 flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-500",
                      complete
                        ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300"
                        : active
                          ? "border-emerald-400/70 bg-ink-800 text-emerald-300"
                          : "border-white/10 bg-ink-850 text-zinc-500",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "w-px flex-1 transition-colors duration-500",
                        complete ? "bg-emerald-400/50" : "bg-white/[0.08]",
                      )}
                      style={{ minHeight: "18px" }}
                    />
                  )}
                </div>
                <div className="-ml-[26px] mt-0 pl-[38px]">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      complete || active ? "text-zinc-200" : "text-zinc-500",
                    )}
                  >
                    {step.label}
                  </span>
                  {(active || (complete && i === STEPS.length - 1)) && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${logLine}-${i}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="block text-[11px] text-emerald-300/90"
                      >
                        {active ? step.sub : "Pipeline healthy ✓"}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal-style status log */}
      <div className="mt-auto rounded-xl border border-white/[0.07] bg-ink-900 p-3 font-mono text-[11px] leading-relaxed sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">{logPrefix}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={logLine}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-zinc-400"
            >
              {logLine}
            </motion.span>
          </AnimatePresence>
          <span
            aria-hidden
            className="animate-blink inline-block h-3.5 w-[7px] shrink-0 self-center bg-emerald-400/90"
          />
        </div>
      </div>
    </div>
  );
}
