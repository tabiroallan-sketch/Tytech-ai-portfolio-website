"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AutomationFlow } from "./automation-flow";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { EASE_OUT } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container-site grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        {/* Copy */}
        <motion.div
          className="flex max-w-2xl flex-col items-start gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.11 } },
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
            }}
            className="glass-card inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-zinc-300"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-success" />
            Available for new projects
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
            }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            We Build <span className="text-gradient">AI Systems</span> That Automate{" "}
            Business Operations.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
            }}
            className="text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Tytech AI is an AI automation agency. We build AI agents, n8n
            workflows and business integrations that remove repetitive work —
            so your business responds faster, loses fewer leads and runs
            itself more of the time.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
            }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <ButtonLink href="/projects" size="lg">
              View Our Work
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <WhatsAppButton label="Chat With Us" size="lg" source="hero" />
          </motion.div>

        </motion.div>

        {/* Live automation diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          className="gradient-border-card glow-accent relative rounded-3xl p-5 sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-500/80" />
              </div>
              <span className="font-mono text-xs text-zinc-500">
                lead-to-crm.workflow
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live demo
            </span>
          </div>
          <AutomationFlow />
        </motion.div>
      </div>
    </section>
  );
}
