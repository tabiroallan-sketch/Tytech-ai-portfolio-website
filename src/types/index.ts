import type { LucideIcon } from "lucide-react";

export type ProjectCategory =
  | "AI Agents"
  | "Automation"
  | "AI Business Systems"
  | "Web Development";

export type FlowNodeIcon =
  | "form"
  | "webhook"
  | "ai"
  | "workflow"
  | "database"
  | "mail"
  | "bell"
  | "chat"
  | "file"
  | "globe";

export interface WorkflowNodeSpec {
  id: string;
  label: string;
  description?: string;
  icon?: FlowNodeIcon;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: "external" | "github" | "workflow" | "docs" | "video" | "download";
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  /** "client" = real client work with verified results; "demo" = demonstration build. */
  type?: "client" | "demo";
  summary: string;
  overview: string[];
  problem: string;
  solution: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  workflowUrl?: string;
  /** Any number of your own link buttons (shown on project cards and case studies) */
  links?: ProjectLink[];
  workflowImageUrl?: string;
  videoUrl?: string;
  demoType: "chat" | "video" | "embed" | "none";
  demoIntro?: string;
  demoSuggestions?: string[];
  workflowDescription?: string;
  flowNodes: WorkflowNodeSpec[];
  architecture: { title: string; description: string }[];
  results: StatItem[];
  resultsNote?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: "globe" | "bot" | "workflow" | "network";
  shortDescription: string;
  longDescription: string;
  useCases: string[];
  deliverables: string[];
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * Structured lead object captured by the contact form and forwarded to the
 * n8n pipeline / WhatsApp Business API. Source and project let you segment
 * where the lead came from.
 */
export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  automationNeed?: string;
  budget?: string;
  message: string;
  /** Where the lead originated: "contact-form" | "project" | ... */
  source: string;
  /** Project slug/title this lead is about (when sent from a case study). */
  project?: string;
  /** ISO 8601 timestamp of when the lead was created. */
  createdAt: string;
}
