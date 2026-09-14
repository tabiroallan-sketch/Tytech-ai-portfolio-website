import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XBrandIcon } from "@/components/ui/social-icons";
import { navLinks, site } from "@/data/site";
import { servicePages } from "@/data/services";
import { projects } from "@/data/projects";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: site.socials.x, label: "X (Twitter)", Icon: XBrandIcon },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-white/[0.06] bg-ink-900/60">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:py-16">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={33}
              height={36}
              className="h-9 w-auto"
            />
            <span className="font-display text-sm font-semibold text-white">
              {site.name}
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            {site.description}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass-card flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Pages
          </h3>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services navigation">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link
                href="/services"
                className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
              >
                All Services
              </Link>
            </li>
            {servicePages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
                >
                  {page.eyebrow}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services#web-development"
                className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
              >
                Web Development
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Case studies navigation">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Case Studies
          </h3>
          <ul className="flex flex-col gap-2.5">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-emerald-300"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-300"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.email}
          </a>
          <p className="mt-3 text-sm text-zinc-500">{site.location}</p>
          <Link
            href="/contact"
            className="mt-5 inline-flex h-10 items-center rounded-xl border border-emerald-400/30 px-4 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-400/10"
          >
            Start a Project
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="glass-card flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
