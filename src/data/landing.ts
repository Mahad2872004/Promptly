import { Compass, PenTool, Rocket, LucideIcon, Brain, Cloud, Workflow, BrainCircuit, Database } from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite,
  SiFramer,
  SiRedux,
  SiGraphql,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiExpress,
  SiPrisma,
  SiSupabase,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiVercel,
  SiTerraform,
  SiNginx
} from "react-icons/si";

export const CLIENT_LOGOS = [
  { name: "Lumina Health", initials: "LH" },
  { name: "FinTech Scale", initials: "FS" },
  { name: "GeoRoute", initials: "GR" },
  { name: "MindCorp", initials: "MC" },
  { name: "NovaStack", initials: "NS" },
  { name: "Arcline", initials: "AR" },
  { name: "Elevate Retail", initials: "ER" },
  { name: "PropTech Solutions", initials: "PS" },
];

export const INDUSTRIES = [
  {
    id: "startups",
    name: "Startups",
    description: "Early-stage to growth companies",
    icon: "🚀",
    services: ["AI Solutions", "Software Development", "Startup Support"]
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Retail & D2C brands",
    icon: "🛒",
    services: ["Digital Transformation", "Software Development"]
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "PropTech solutions",
    icon: "🏠",
    services: ["AI Solutions", "Software Development"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Scale-up businesses",
    icon: "🏢",
    services: ["Digital Transformation", "AI Solutions"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Digital health solutions",
    icon: "🏥",
    services: ["AI Solutions", "Software Development"]
  },
  {
    id: "fintech",
    name: "FinTech",
    description: "Financial technology",
    icon: "💰",
    services: ["AI Solutions", "Software Development"]
  },
];

export const PARTNERS = [
  { name: "Vercel", category: "Infrastructure" },
  { name: "AWS", category: "Cloud" },
  { name: "OpenAI", category: "AI" },
  { name: "Stripe", category: "Payments" },
  { name: "Shopify", category: "E-commerce" },
  { name: "MongoDB", category: "Database" },
];

export const TECH_STACK = {
  frontend: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "Vite", icon: SiVite },
    { name: "Framer Motion", icon: SiFramer },
    { name: "Redux", icon: SiRedux },
    { name: "GraphQL", icon: SiGraphql },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Python", icon: SiPython },
    { name: "Go", icon: SiGo },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Redis", icon: SiRedis },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Express", icon: SiExpress },
    { name: "Prisma", icon: SiPrisma },
    { name: "Supabase", icon: SiSupabase },
  ],
  ai: [
    { name: "OpenAI", icon: Brain },
    { name: "LangChain", icon: SiLangchain },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "PyTorch", icon: SiPytorch },
    { name: "Hugging Face", icon: SiHuggingface },
    { name: "Anthropic", icon: BrainCircuit },
    { name: "Vector DBs", icon: Database },
  ],
  devops: [
    { name: "Docker", icon: SiDocker },
    { name: "Kubernetes", icon: SiKubernetes },
    { name: "AWS", icon: Cloud },
    { name: "Vercel", icon: SiVercel },
    { name: "Terraform", icon: SiTerraform },
    { name: "Nginx", icon: SiNginx },
    { name: "GitHub Actions", icon: SiGithubactions },
    { name: "CI/CD", icon: Workflow },
  ],
};

export const AGENCY_STATS = [
  {
    value: 20,
    suffix: "+",
    label: "Engineers & Specialists",
    decimals: 0,
    accent: "cyan",
  },
  {
    value: 5,
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
    value: 50,
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
