import { business } from "@/config/site";

/**
 * Site metadata used across layouts, SEO and the footer.
 *
 * All configurable values are centralised in `src/config/site.ts` — this
 * object just shapes them for the components and adds brand-only fields
 * (initials, role) that don't belong in the configuration file.
 */
export const site = {
  name: business.name,
  initials: "TA",
  role: "AI Automation & Web Solutions Specialist",
  tagline: business.tagline,
  description: business.description,
  url: business.url,
  email: business.email,
  location: business.location,
  availability: business.availability,
  socials: business.socials,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;