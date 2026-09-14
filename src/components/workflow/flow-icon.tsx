import {
  Bell,
  Bot,
  Database,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  UserPlus,
  Webhook,
  Workflow,
} from "lucide-react";
import type { FlowNodeIcon } from "@/types";

const REGISTRY = {
  form: UserPlus,
  webhook: Webhook,
  ai: Bot,
  workflow: Workflow,
  database: Database,
  mail: Mail,
  bell: Bell,
  chat: MessageSquare,
  file: FileText,
  globe: Globe,
} as const;

export function FlowIcon({
  name,
  className,
}: {
  name?: FlowNodeIcon;
  className?: string;
}) {
  const Icon = name ? REGISTRY[name] : Workflow;
  return <Icon className={className} aria-hidden />;
}
