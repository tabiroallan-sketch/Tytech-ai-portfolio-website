import { cn } from "@/lib/utils";

interface TechnologyBadgeProps {
  label: string;
  size?: "sm" | "md";
  className?: string;
}

export function TechnologyBadge({
  label,
  size = "sm",
  className,
}: TechnologyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] font-medium text-zinc-300 transition-colors hover:border-emerald-400/35 hover:text-emerald-200",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
        className,
      )}
    >
      <span aria-hidden className="mr-1.5 h-1 w-1 rounded-full bg-emerald-400/80" />
      {label}
    </span>
  );
}
