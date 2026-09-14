import { ArrowRight, MessageSquare } from "lucide-react";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "Have a repetitive business process? Let's automate it.",
  description = "Tell us what eats your team's time every week. We'll show you how AI and automation can remove it — with a clear plan and a fixed quote.",
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="relative py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <div className="gradient-border-card glow-accent relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div className="bg-grid mask-radial-fade absolute inset-0 opacity-60" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <MessageSquare className="h-4 w-4" aria-hidden />
                Free consultation
              </span>
              <h2
                id="cta-heading"
                className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {title}
              </h2>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                {description}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                <ButtonLink href="/contact" size="lg">
                  Start a Project
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <WhatsAppButton
                  label="Chat With Us"
                  size="lg"
                  source="cta-section"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
