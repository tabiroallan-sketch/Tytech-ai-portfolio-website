import { TrendingUp } from "lucide-react";
import type { StatItem } from "@/types";
import { Reveal } from "@/components/ui/reveal";

interface ResultsGridProps {
  results: StatItem[];
  note?: string;
}

export function ResultsGrid({ results, note }: ResultsGridProps) {
  return (
    <Reveal className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {results.map((result) => (
          <div
            key={result.label}
            className="glass-card flex flex-col gap-1.5 rounded-xl p-5"
          >
            <dd className="font-display text-2xl font-bold text-gradient sm:text-[1.7rem]">
              {result.value}
            </dd>
            <dt className="text-xs leading-snug text-zinc-400">{result.label}</dt>
          </div>
        ))}
      </dl>
      <p className="flex items-start gap-2 text-xs italic leading-relaxed text-zinc-500">
        <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        {note ??
          "Metrics shown are illustrative example data for this demo case study — replace them with your real client outcomes in data/projects.ts."}
      </p>
    </Reveal>
  );
}
