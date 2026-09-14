import { Code2, BrainCircuit, Workflow, Wrench } from "lucide-react";
import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Web Development",
    icon: Code2,
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
    ],
  },
  {
    title: "AI & LLMs",
    icon: BrainCircuit,
    skills: [
      "OpenAI API",
      "Anthropic Claude API",
      "Prompt engineering",
      "RAG & embeddings",
      "AI agent design",
      "Function/tool calling",
    ],
  },
  {
    title: "Automation & Integration",
    icon: Workflow,
    skills: [
      "n8n",
      "Webhooks",
      "Zapier / Make",
      "CRM integrations (HubSpot, Pipedrive)",
      "Google Workspace APIs",
      "WhatsApp Business API",
      "Stripe",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      "Git & GitHub",
      "Supabase",
      "Airtable",
      "Notion API",
      "Vercel",
      "Docker basics",
    ],
  },
];
