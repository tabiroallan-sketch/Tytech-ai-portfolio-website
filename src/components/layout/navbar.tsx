"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

interface Dropdown {
  href: string;
  label: string;
  children: { href: string; label: string }[];
}

const NAV_ITEMS: (Dropdown | { href: string; label: string })[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      ...services.map((service) => ({
        href: `/services/${service.id}`,
        label: service.title,
      })),
    ],
  },
  {
    href: "/solutions",
    label: "Solutions",
    children: solutions.map((solution) => ({
      href: `/solutions/${solution.slug}`,
      label: solution.h1.split("—")[0].trim(),
    })),
  },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

function isDropdown(item: (typeof NAV_ITEMS)[number]): item is Dropdown {
  return "children" in item;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="container-site flex h-16 items-center justify-between gap-4 md:h-[72px]"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={40}
            height={43}
            priority
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 md:h-11"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold text-white">
              {site.name}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-zinc-400">
              AI Automation Agency
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            if (isDropdown(item)) {
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-emerald-300" : "text-zinc-400 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180",
                        active ? "text-emerald-300" : "text-zinc-500",
                      )}
                    />
                  </Link>
                  <div
                    role="menu"
                    aria-label={`${item.label} submenu`}
                    className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  >
                    <div className="glass-card w-60 rounded-xl border-white/10 p-2 shadow-2xl shadow-black/40">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                      >
                        All {item.label}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block rounded-lg px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-emerald-300"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "text-emerald-300" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-emerald-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden h-10 items-center gap-2 rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-emerald-300 active:scale-[0.98] sm:inline-flex"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass-card flex h-10 w-10 items-center justify-center rounded-xl text-zinc-200 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden"
          >
            <div className="container-site pb-4">
              <div className="glass-card mt-1 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl p-3 shadow-2xl shadow-black/40">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "text-zinc-300 hover:bg-white/5 hover:text-white",
                          )}
                        >
                          {item.label}
                        </Link>
                        {isDropdown(item) && (
                          <ul className="mb-1 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-emerald-300"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-400 text-sm font-semibold text-ink-950"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}