import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-3 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
        {eyebrow}
      </span>
      <Heading
        id={id}
        className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
      >
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
