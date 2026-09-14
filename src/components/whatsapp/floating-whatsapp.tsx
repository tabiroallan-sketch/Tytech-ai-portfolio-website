"use client";

import { useEffect, useState } from "react";
import { business, whatsapp } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Persistent floating WhatsApp button, fixed bottom-right on every page.
 *
 * - Compact 48px on mobile, 56px on desktop (well above the 44px touch target).
 * - Subtle pulse/glow ring, gentle hover lift, glass tooltip on hover (desktop).
 * - Falls back to a "please email us" popover when WhatsApp can't be opened
 *   (i.e. the phone number isn't configured yet), so the site never breaks.
 */
export function FloatingWhatsApp() {
  const [showFallback, setShowFallback] = useState(false);
  const url = buildWhatsAppUrl();

  useEffect(() => {
    if (!showFallback) return;
    const timer = setTimeout(() => setShowFallback(false), 10_000);
    return () => clearTimeout(timer);
  }, [showFallback]);

  function onTap() {
    trackWhatsAppClick({ source: "floating-button", label: whatsapp.chatLabel });
    if (!url) setShowFallback(true);
  }

  const ariaLabel = `Chat with ${business.name} on WhatsApp`;

  const buttonBody = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-whatsapp-glow rounded-full bg-green-glow"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-green-400 shadow-lg shadow-black/25 transition-transform duration-200 group-hover:scale-[1.06] group-active:scale-95"
      />
      <WhatsAppIcon className="relative h-6 w-6 text-ink-950 sm:h-7 sm:w-7" />
    </>
  );

  const tooltip = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-ink-850 px-3.5 py-2 text-sm font-medium text-zinc-200 opacity-0 shadow-xl shadow-black/40 transition-opacity duration-200 group-hover:opacity-100 sm:block"
    >
      {whatsapp.chatLabel}
    </span>
  );

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <div className="group relative">
        {tooltip}

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onTap}
            aria-label={ariaLabel}
            className="relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-14 sm:w-14"
          >
            {buttonBody}
          </a>
        ) : (
          <button
            type="button"
            onClick={onTap}
            aria-label={ariaLabel}
            className="relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95 sm:h-14 sm:w-14"
          >
            {buttonBody}
          </button>
        )}

        {/* Fallback: WhatsApp couldn't be opened — point visitors to email. */}
        <span
          role="status"
          aria-live="polite"
          className={
            showFallback
              ? "absolute bottom-full right-0 mb-3 w-64 rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-xs leading-relaxed text-zinc-300 shadow-2xl shadow-black/60 sm:-right-6"
              : "hidden"
          }
        >
          Unable to open WhatsApp. Please contact us at{" "}
          <a
            href={`mailto:${business.email}`}
            className="font-semibold text-green-400 underline underline-offset-2 hover:text-green-300"
          >
            {business.email}
          </a>
          .
        </span>
      </div>
    </div>
  );
}