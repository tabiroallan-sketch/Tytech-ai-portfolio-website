import type { Metadata } from "next";
import { Clock, Mail, MessagesSquare, FileCheck2 } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start Your Automation Project",
  description:
    "Have a repetitive business process? Let's automate it. Tell us what eats your team's time and get a clear plan with a fixed quote.",
  path: "/contact",
});

const steps = [
  {
    Icon: MessagesSquare,
    title: "Tell us the problem",
    text: "Describe what's repetitive, slow or error-prone — a rough description is enough.",
  },
  {
    Icon: Clock,
    title: "Free consultation call",
    text: "We map your process together and we identify where automation pays off most.",
  },
  {
    Icon: FileCheck2,
    title: "Fixed plan & quote",
    text: "You receive a clear scope, timeline and fixed price. No surprises later.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />
      </div>

      <section className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left column */}
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Contact
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
              Have a repetitive business process?{" "}
              <span className="text-gradient">Let&apos;s automate it.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
              Whether it&apos;s lead follow-up, customer support, invoices or
              content — tell us what slows your team down and we&apos;ll show you
              how AI and automation can remove it.
            </p>
          </div>

          <ol className="flex flex-col gap-4" aria-label="What happens next">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="glass-card flex items-start gap-4 rounded-xl p-5">
                <span
                  aria-hidden
                  className="font-display text-lg font-bold text-emerald-400/70"
                >
                  {i + 1}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold text-white">
                    {title}
                  </h2>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="glass-card flex flex-col gap-4 rounded-xl px-5 py-5 transition-colors hover:border-emerald-400/40">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300">
                  <WhatsAppIcon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-zinc-500">
                    Prefer chatting?
                  </span>
                  <span className="text-sm font-medium text-zinc-200">
                    Message us directly on WhatsApp
                  </span>
                </div>
              </div>
              <WhatsAppButton
                label="Chat on WhatsApp"
                size="md"
                source="contact"
                ariaLabel="Chat on WhatsApp"
              />
            </div>

          <a
            href={`mailto:${site.email}`}
            className="glass-card group inline-flex w-fit items-center gap-3 rounded-xl px-5 py-3.5 transition-colors hover:border-emerald-400/40"
          >
            <Mail className="h-5 w-5 text-emerald-300" aria-hidden />
            <span>
              <span className="block text-xs uppercase tracking-wider text-zinc-500">
                Prefer email?
              </span>
              <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-emerald-300">
                {site.email}
              </span>
            </span>
          </a>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12}>
          <div className="gradient-border-card rounded-3xl p-6 sm:p-8 lg:p-9">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
