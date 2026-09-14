"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, SendHorizonal, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buildContactLeadMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  automationNeed: string;
  budget: string;
  message: string;
  website: string; // honeypot
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  automationNeed: "",
  budget: "",
  message: "",
  website: "",
};

const AUTOMATION_NEEDS = [
  "Lead capture & follow-up",
  "Customer support / AI agent",
  "Invoices & back-office",
  "Content & marketing",
  "Internal operations",
  "Sales & CRM",
  "Not sure yet — advise me",
];

const BUSINESS_TYPES = [
  "E-commerce",
  "Retail",
  "SaaS / Software",
  "Agency / Services",
  "Healthcare",
  "Real Estate",
  "Manufacturing",
  "Professional Services",
  "Education",
  "Other",
  "Not sure",
];

const BUDGETS = ["< $1,000", "$1,000 – $3,000", "$3,000 – $7,000", "$7,000+", "Let's discuss"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9()\-\s]{7,20}$/;

function validateField(field: keyof FormState, value: string): string | undefined {
  switch (field) {
    case "name":
      return value.trim().length < 2 ? "Please enter your name." : undefined;
    case "email":
      return !EMAIL_RE.test(value.trim())
        ? "Please enter a valid email address."
        : undefined;
    case "phone":
      return value.trim() && !PHONE_RE.test(value.trim())
        ? "Please enter a valid WhatsApp number (digits only, incl. country code)."
        : undefined;
    case "message":
      return value.trim().length < 10
        ? "Please describe what you'd like to automate (min. 10 characters)."
        : undefined;
    default:
      return undefined;
  }
}

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus-visible:border-emerald-400/50";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }

  function blur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const fields: (keyof FormState)[] = ["name", "email", "phone", "message"];
    const nextErrors: typeof errors = {};
    fields.forEach((f) => {
      const error = validateField(f, form[f]);
      if (error) nextErrors[f] = error;
    });
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setServerError(null);

    try {
      const payload = {
        ...form,
        source: "contact-form",
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      // Option A: pre-build the formatted WhatsApp message from the submission.
      setSuccessMessage(buildContactLeadMessage(form));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  function reset() {
    setForm(INITIAL);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSuccessMessage(null);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-border-card flex flex-col items-center gap-4 rounded-2xl p-10 text-center"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h3 className="font-display text-xl font-semibold text-white">
          Message sent!
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Thanks for reaching out. We&apos;ve received your details and will
          review your process — usually within one business day.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-5">
          <WhatsAppButton
            label="Continue on WhatsApp"
            message={successMessage ?? undefined}
            size="lg"
            source="contact-form"
          />
          <p className="max-w-xs text-xs leading-relaxed text-zinc-500">
            Prefer instant chat? Send these details straight to our WhatsApp —
            we&apos;ll pick it up even faster.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-2 text-sm font-medium text-emerald-300 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Name <span className="text-emerald-400" aria-hidden>*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={cn(inputClasses, errors.name && "border-red-400/50")}
          />
          {errors.name && (
            <p id="cf-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Email <span className="text-emerald-400" aria-hidden>*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={cn(inputClasses, errors.email && "border-red-400/50")}
          />
          {errors.email && (
            <p id="cf-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-zinc-300">
            WhatsApp Number
          </label>
          <input
            id="cf-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 415 555 2671 (optional)"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            className={cn(inputClasses, errors.phone && "border-red-400/50")}
          />
          {errors.phone && (
            <p id="cf-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Company
          </label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Ltd (optional)"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cf-business-type" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Business Type
          </label>
          <select
            id="cf-business-type"
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className={cn(inputClasses, !form.businessType && "text-zinc-500")}
          >
            <option value="">Select a type (optional)</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t} className="bg-ink-900 text-zinc-100">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-need" className="mb-1.5 block text-sm font-medium text-zinc-300">
            What would you like to automate?
          </label>
          <select
            id="cf-need"
            value={form.automationNeed}
            onChange={(e) => update("automationNeed", e.target.value)}
            className={cn(inputClasses, !form.automationNeed && "text-zinc-500")}
          >
            <option value="">Select an area (optional)</option>
            {AUTOMATION_NEEDS.map((g) => (
              <option key={g} value={g} className="bg-ink-900 text-zinc-100">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-budget" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Budget range
          </label>
          <select
            id="cf-budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={cn(inputClasses, !form.budget && "text-zinc-500")}
          >
            <option value="">Select a range (optional)</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-ink-900 text-zinc-100">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-zinc-300">
          Message <span className="text-emerald-400" aria-hidden>*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Describe the repetitive process or the system you have in mind…"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={cn(inputClasses, "resize-y", errors.message && "border-red-400/50")}
        />
        {errors.message && (
          <p id="cf-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — invisible to humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 text-base font-semibold text-ink-950 transition-all duration-200 hover:bg-emerald-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <SendHorizonal className="h-4.5 w-4.5" aria-hidden />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-zinc-500">
        Your details are only used to reply to your enquiry. No spam, ever.
      </p>
    </form>
  );
}