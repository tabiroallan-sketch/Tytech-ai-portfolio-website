import { ArrowRight } from "lucide-react";
import type { ExampleWorkflow } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";

/**
 * Visual flow of workflow steps using the existing card language.
 * Horizontal on large screens, stacked with arrows on smaller ones.
 */
export function WorkflowFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center lg:gap-2">
          <div className="glass-card flex h-full flex-1 items-center gap-3 rounded-xl px-4 py-3.5">
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 font-mono text-xs font-semibold text-emerald-300"
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium leading-snug text-zinc-200">
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight
              aria-hidden
              className="mx-auto h-4 w-4 shrink-0 rotate-90 text-zinc-600 lg:rotate-0"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Card grid for the "example workflows" section. */
export function WorkflowCardGrid({ items }: { items: ExampleWorkflow[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.name} delay={i * 0.07} className="h-full">
          <div className="glass-card flex h-full flex-col gap-4 rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-white">
              {item.name}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {item.description}
            </p>
            <ol className="mt-auto flex flex-col gap-2 border-t border-white/[0.06] pt-4">
              {item.flow.map((stage, j) => (
                <li
                  key={stage}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                >
                  <span
                    aria-hidden
                    className="polygon-marker mt-1 h-2 w-2 shrink-0 rounded-sm bg-emerald-400"
                  />
                  <span>
                    <span className="font-mono text-[11px] text-emerald-300/80">
                      {j + 1}.
                    </span>{" "}
                    {stage}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      ))}
    </div>
  );
}