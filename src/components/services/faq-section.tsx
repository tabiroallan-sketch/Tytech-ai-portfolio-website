"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/services";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  title: string;
  description?: string;
  faqs: Faq[];
  id?: string;
}

/**
 * Accessible FAQ accordion. The FAQPage JSON-LD for the page is generated
 * separately from the same `faqs` data — this component only handles display.
 */
export function FaqSection({ title, description, faqs, id }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="container-site py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col gap-3 items-start">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            FAQ
          </span>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={cn(
                  "glass-card overflow-hidden rounded-xl transition-colors",
                  isOpen && "border-emerald-400/30",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                >
                  <span className="font-display text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "h-5 w-5 shrink-0 text-emerald-300 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={!isOpen}
                  className="border-t border-white/[0.06] px-5 py-4 sm:px-6"
                >
                  <p className="leading-relaxed text-zinc-400">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}