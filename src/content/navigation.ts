import {
  BookOpen,
  Building2,
  Code2,
  Compass,
  FileText,
  LayoutDashboard,
  Mail,
  Network,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { products } from "../data/products";
import { caseStudies } from "./caseStudies";

/** Single source for the header, mobile menu, footer and ⌘K palette. */

export interface NavLink {
  label: string;
  path: string;
  description?: string;
  icon?: LucideIcon;
}

export const services: NavLink[] = [
  {
    label: "Software development",
    path: "/services/software-development",
    description: "Web applications, APIs, and maintainable business systems.",
    icon: Code2,
  },
  {
    label: "AI & automation",
    path: "/services/ai-solutions",
    description: "Connect your tools and put intelligence where it helps.",
    icon: Workflow,
  },
  {
    label: "Digital transformation",
    path: "/services/digital-transformation",
    description: "Modernize manual processes and connect business tools.",
    icon: Network,
  },
  {
    label: "Startup support",
    path: "/services/startup-support",
    description: "Product discovery, MVPs, and technical direction.",
    icon: Rocket,
  },
];

export const productLinks = products.map((p) => ({
  id: p.id,
  label: p.name,
  path: p.path,
  description: p.description,
  category: p.category,
  /** Small variant — the mega-menu shows it at ~320px. */
  image: p.preview.src.replace(".webp", "-640.webp"),
  /** xSender has a public live demo — it gets the orange badge. */
  live: p.id === "xsender",
}));

export const resources: NavLink[] = [
  {
    label: "Project Blueprint",
    path: "/blueprint",
    description: "Describe your idea, get a preliminary technical plan.",
    icon: Sparkles,
  },
  {
    label: "Client Portal demo",
    path: "/portal-demo",
    description: "See how we share progress, tasks, and invoices.",
    icon: LayoutDashboard,
  },
  {
    label: "How we work",
    path: "/process",
    description: "Discover, architect, build, launch, improve.",
    icon: Compass,
  },
  {
    label: "FAQ",
    path: "/faq",
    description: "Pricing, timelines, and working together.",
    icon: BookOpen,
  },
];

export const company: NavLink[] = [
  { label: "About", path: "/about", icon: Building2 },
  { label: "Industries", path: "/industries", icon: Network },
  // Case studies appear only once real ones exist (content/caseStudies.ts).
  ...(caseStudies.length ? [{ label: "Work", path: "/work", icon: FileText }] : []),
  { label: "Contact", path: "/contact", icon: Mail },
];

export const legal: NavLink[] = [
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
];

export const CONTACT_EMAIL = "promptlypk@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/promptlypk/";
export const BOOKING_URL = "https://calendly.com/promptlypk/30min";
export const LOCATION = "Lahore, Pakistan";
