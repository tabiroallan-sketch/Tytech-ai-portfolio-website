"use client";

import { useCallback, useEffect, useState } from "react";
import { business } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  buildProjectMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "./whatsapp-icon";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  whatsapp:
    "bg-green-400 font-semibold text-ink-950 hover:bg-green-300",
  primary: "bg-green-400 text-ink-950 font-semibold hover:bg-green-300",
  secondary: "glass-card text-zinc-100 hover:border-green-400/60",
  ghost: "border border-transparent text-zinc-300 hover:bg-white/5 hover:text-green-400",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export interface WhatsAppButtonProps {
  /**
   * Custom pre-filled message. When omitted, the default config message
   * (or the project-specific one, when `projectName` is set) is used.
   */
  message?: string;
  /**
   * Project or service title. When set, the message becomes
   * "Hello…, I'm interested in your <title>. I'd like to discuss how
   * something similar could work for my business."
   */
  projectName?: string;
  /** Button label. Defaults to "Chat on WhatsApp". */
  label?: string;
  variant?: Variant;
  size?: Size;
  /** Analytics source tag, e.g. "hero", "services", "project-card". */
  source?: string;
  ariaLabel?: string;
  className?: string;
}

export function WhatsAppButton({
  message,
  projectName,
  label = "Chat on WhatsApp",
  variant = "whatsapp",
  size = "md",
  source = "whatsapp-cta",
  ariaLabel,
  className,
}: WhatsAppButtonProps) {
  const [showFallback, setShowFallback] = useState(false);

  // Resolve the final pre-filled message.
  const resolvedMessage = message?.trim()
    ? message
    : projectName
      ? buildProjectMessage(projectName)
      : undefined;
  const url = buildWhatsAppUrl(resolvedMessage);
  const configured = isWhatsAppConfigured();

  const handleClick = useCallback(() => {
    trackWhatsAppClick({ source, project: projectName, label });
    if (!configured) setShowFallback(true);
  }, [configured, label, projectName, source]);

  useEffect(() => {
    if (!showFallback) return;
    const timer = setTimeout(() => setShowFallback(false), 10_000);
    return () => clearTimeout(timer);
  }, [showFallback]);

  const fallbackNote = configured
    ? null
    : (showFallback && (
        <span
          role="status"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[260px] -translate-x-1/2 rounded-xl border border-white/10 bg-ink-850 px-3.5 py-2.5 text-center text-xs leading-relaxed text-zinc-300 shadow-2xl shadow-black/50"
        >
          Unable to open WhatsApp. Please contact us at{" "}
          <a
            href={`mailto:${business.email}`}
            className="pointer-events-auto font-semibold text-green-400 underline underline-offset-2 hover:text-green-300"
          >
            {business.email}
          </a>
          .
        </span>
      ));

  const content = (
    <>
      <WhatsAppIcon
        className={cn(
          "shrink-0",
          size === "lg" ? "h-4.5 w-4.5" : size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
        )}
      />
      {label}
    </>
  );

  // Not configured → render a button that surfaces the email fallback,
  // so nothing on the site breaks before the number is set.
  if (!configured) {
    return (
      <span className={cn("relative inline-flex", className)}>
        <button
          type="button"
          onClick={handleClick}
          aria-label={ariaLabel ?? `${label} (email fallback)`}
          className={cn(base, variants[variant], sizes[size])}
        >
          {content}
        </button>
        {fallbackNote}
      </span>
    );
  }

  return (
    <a
      href={url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabel ?? `${label} on WhatsApp`}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {content}
    </a>
  );
}