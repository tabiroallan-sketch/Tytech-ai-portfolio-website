import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or was moved.",
  path: "/404",
});

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="glass-card flex h-16 w-16 items-center justify-center rounded-2xl border-emerald-400/30 text-emerald-300">
        <Bot className="h-8 w-8" aria-hidden />
      </span>
      <p className="font-mono text-sm text-emerald-300">
        [error] route not found — status 404
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        This workflow hit a dead end.
      </h1>
      <p className="max-w-md leading-relaxed text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Even
        automation can&apos;t find everything — but you&apos;re in the right
        place to automate something else.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-400 px-6 font-semibold text-ink-950 transition-colors hover:bg-emerald-300"
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-emerald-400/30 px-6 font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/10"
        >
          Our Services
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <nav aria-label="Useful pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
        <Link
          href="/projects"
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-300"
        >
          Projects & Case Studies
        </Link>
        <Link
          href="/solutions"
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-300"
        >
          Solutions
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-300"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}