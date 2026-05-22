import { Compass, PenTool, Rocket, LucideIcon } from "lucide-react";

export const CLIENT_LOGOS = [
  { name: "Lumina Health", initials: "LH" },
  { name: "FinTech Scale", initials: "FS" },
  { name: "GeoRoute", initials: "GR" },
  { name: "MindCorp", initials: "MC" },
  { name: "NovaStack", initials: "NS" },
  { name: "Arcline", initials: "AR" },
];

export const AGENCY_STATS = [
  {
    value: 250,
    suffix: "+",
    label: "Engineers & Specialists",
    decimals: 0,
    accent: "cyan",
  },
  {
    value: 12,
    suffix: "y",
    label: "Years of Delivery",
    decimals: 0,
    accent: "indigo",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    decimals: 0,
    accent: "violet",
  },
  {
    value: 140,
    suffix: "+",
    label: "Products Shipped",
    decimals: 0,
    accent: "emerald",
  },
] as const;

export type StatAccent = (typeof AGENCY_STATS)[number]["accent"];

export const STAT_CARD_STYLES: Record<
  StatAccent,
  { card: string; bar: string }
> = {
  cyan: {
    card: "border-cyan-500/30 bg-gradient-to-br from-cyan-950/55 via-slate-900/40 to-slate-900/20",
    bar: "from-cyan-400 to-teal-500",
  },
  indigo: {
    card: "border-indigo-500/30 bg-gradient-to-br from-indigo-950/55 via-slate-900/40 to-slate-900/20",
    bar: "from-indigo-400 to-blue-500",
  },
  violet: {
    card: "border-violet-500/30 bg-gradient-to-br from-violet-950/55 via-slate-900/40 to-slate-900/20",
    bar: "from-violet-400 to-purple-500",
  },
  emerald: {
    card: "border-emerald-500/30 bg-gradient-to-br from-emerald-950/55 via-slate-900/40 to-slate-900/20",
    bar: "from-emerald-400 to-teal-500",
  },
};

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description:
      "We map goals, users, and constraints through workshops and technical audits—turning ambiguity into a clear product blueprint.",
    icon: Compass,
    accent: "cyan",
  },
  {
    id: "strategy",
    number: "02",
    title: "Strategy & Design",
    description:
      "Information architecture, premium UI systems, and sprint roadmaps aligned to conversion, performance, and brand identity.",
    icon: PenTool,
    accent: "indigo",
  },
  {
    id: "launch",
    number: "03",
    title: "Development & Launch",
    description:
      "Production-grade builds, CI/CD pipelines, QA, and launch support—shipping fast without sacrificing reliability or polish.",
    icon: Rocket,
    accent: "violet",
  },
];

export const TESTIMONIAL_AVATARS: Record<string, string> = {
  "Elena Rostov": "ER",
  "Alex Rivera": "AR",
  "Marcus Vance": "MV",
  "Dr. Sarah Jenkins": "SJ",
};
