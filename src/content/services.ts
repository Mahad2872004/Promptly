import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Brain,
  Code,
  Compass,
  Cpu,
  Database,
  Globe,
  Layers,
  Lightbulb,
  Map,
  Rocket,
  Smartphone,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

/** Content for the shared service-detail template (src/pages/service). */
export interface ServiceContent {
  slug: string;
  path: string;
  /** Short name used in breadcrumbs and nav. */
  name: string;
  title: string;
  lead: string;
  /** Which hero visual this service gets — each is unique to its page. */
  visual: "code" | "decision-flow" | "systems-map" | "roadmap";
  problems: { title: string; text: string }[];
  capabilities: { icon: LucideIcon; title: string; description: string; features: string[] }[];
  /** TODO: confirm — only list technologies actually used on client work. */
  stack: { group: string; items: string[] }[];
  engagement: { title: string; description: string }[];
  /** Product ids from data/products. */
  relatedProducts: string[];
  /** FAQ ids from content/faq. */
  faqIds: string[];
  closing: { title: string; lead: string };
}

export const aiSolutions: ServiceContent = {
  slug: "ai-solutions",
  path: "/services/ai-solutions",
  name: "AI & automation",
  title: "Intelligent automation for modern business",
  lead: "Automate the processes that consume your team's day, and put a model behind the decisions that need one — built on your data, running in your infrastructure.",
  visual: "decision-flow",
  problems: [
    {
      title: "Hours lost to copy-and-paste work",
      text: "Orders, enquiries and updates move between inboxes, spreadsheets and systems by hand — slowly, and with room for mistakes.",
    },
    {
      title: "Decisions waiting on someone to look",
      text: "Requests sit in a queue because the context needed to act is spread across tools no one has time to check.",
    },
    {
      title: "AI pilots that never reach production",
      text: "A promising prototype without access to your data, guardrails or monitoring stays a demo instead of doing real work.",
    },
  ],
  capabilities: [
    {
      icon: Brain,
      title: "AI Automation",
      description:
        "Intelligent process automation that removes manual handling from high-volume, repetitive operations work.",
      features: ["Workflow automation", "Process optimisation", "Cost reduction"],
    },
    {
      icon: Zap,
      title: "LLM Integration",
      description:
        "Large language models wired into your own systems and data, with guardrails and evaluation in place before launch.",
      features: ["Retrieval over your data", "API integration", "Fine-tuning & evals"],
    },
    {
      icon: Target,
      title: "Predictive Analytics",
      description:
        "Forecasting and scoring models that turn historical data into decisions your team can act on daily.",
      features: ["Data modelling", "Trend analysis", "Real-time predictions"],
    },
    {
      icon: Layers,
      title: "Intelligent Systems",
      description: "Systems that keep improving after launch, with monitoring so you can see when accuracy moves.",
      features: ["Machine learning", "Adaptive pipelines", "Accuracy monitoring"],
    },
  ],
  // TODO: confirm stack with the team.
  stack: [
    { group: "Models", items: ["Google Gemini", "LLM APIs", "Retrieval (RAG)"] },
    { group: "Channels", items: ["WhatsApp Business", "Instagram", "Facebook Messenger", "Email & web forms"] },
    { group: "Platform", items: ["Node.js", "TypeScript", "Supabase", "PostgreSQL", "REST & webhooks"] },
  ],
  engagement: [
    {
      title: "Process audit",
      description:
        "We map the workflow as it runs today, measure where the hours actually go, and identify what is worth automating.",
    },
    {
      title: "Pilot build",
      description:
        "One workflow, built end to end and measured against the manual baseline, so the value is proven before the rollout.",
    },
    {
      title: "Rollout & monitoring",
      description:
        "Remaining workflows are shipped in sequence with dashboards, alerting, and an agreed accuracy target per use case.",
    },
  ],
  relatedProducts: ["xsender", "leadflow"],
  faqIds: ["existing-application", "specification", "cost"],
  closing: {
    title: "Have a process worth automating?",
    lead: "Send us the workflow. We will tell you whether AI is the right tool for it — including when it is not.",
  },
};

export const softwareDevelopment: ServiceContent = {
  slug: "software-development",
  path: "/services/software-development",
  name: "Software development",
  title: "Custom software built to outlive the sprint",
  lead: "Web applications, mobile clients, APIs and the infrastructure under them — production-grade from the first commit, documented so your own team can take it over.",
  visual: "code",
  problems: [
    {
      title: "Off-the-shelf tools that almost fit",
      text: "The business bends around software built for someone else, with workarounds living in spreadsheets and people’s heads.",
    },
    {
      title: "A codebase no one wants to touch",
      text: "Undocumented systems make every change slow and risky, so improvements wait while the business moves on.",
    },
    {
      title: "Launches that feel like a gamble",
      text: "Without reviewable increments, tests and a deploy process, release day becomes the riskiest day of the project.",
    },
  ],
  capabilities: [
    {
      icon: Code,
      title: "Web Applications",
      description:
        "Custom web applications on modern frameworks, with the accessibility and performance work done as part of the build.",
      features: ["React / Next.js", "Full-stack delivery", "Responsive by default"],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile clients that share a codebase without feeling like a wrapped website.",
      features: ["React Native", "iOS & Android", "Offline-capable"],
    },
    {
      icon: Database,
      title: "Backend Systems",
      description:
        "APIs, data models and background processing designed for the load you will have in two years, not just today.",
      features: ["Node.js / Express", "REST & GraphQL APIs", "Schema design"],
    },
    {
      icon: Globe,
      title: "Cloud & Infrastructure",
      description:
        "Deployment pipelines, environments and observability, set up so shipping is boring and rollbacks are one command.",
      features: ["AWS / GCP", "CI/CD pipelines", "Monitoring & logging"],
    },
  ],
  // TODO: confirm stack with the team (taken from this service's existing copy).
  stack: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { group: "Mobile", items: ["React Native", "iOS", "Android"] },
    { group: "Backend", items: ["Node.js", "Express", "REST & GraphQL", "PostgreSQL", "Supabase"] },
    { group: "Infrastructure", items: ["AWS", "GCP", "Vercel", "CI/CD"] },
  ],
  engagement: [
    {
      title: "Technical discovery",
      description:
        "Requirements, integrations and constraints written down, then an architecture and a sprint plan you sign off on.",
    },
    {
      title: "Sprint delivery",
      description:
        "Fixed-scope sprints, each ending in a deployable build and a demo. Scope changes are re-estimated, never absorbed silently.",
    },
    {
      title: "Handover & support",
      description:
        "Full repository, documentation and a walkthrough with your team. Ongoing support is optional, never a lock-in.",
    },
  ],
  relatedProducts: ["retailflow", "lumetry"],
  faqIds: ["existing-application", "timeline", "after-launch"],
  closing: {
    title: "Ready to scope a build?",
    lead: "Bring the requirements you have — even if they are rough. We turn them into an architecture and an estimate.",
  },
};

export const digitalTransformation: ServiceContent = {
  slug: "digital-transformation",
  path: "/services/digital-transformation",
  name: "Digital transformation",
  title: "Modernise operations without pausing the business",
  lead: "Move offline processes into software, replace spreadsheets and message threads with systems, and connect the tools you already pay for — one workflow at a time.",
  visual: "systems-map",
  problems: [
    {
      title: "The business runs on spreadsheets",
      text: "Orders, stock and approvals live in files and chat threads, so the real state of things depends on who you ask.",
    },
    {
      title: "Tools that don’t talk to each other",
      text: "The same data is typed into three systems, and the reports in the meeting rarely match the numbers in the books.",
    },
    {
      title: "Change that never sticks",
      text: "New software gets bought, then quietly abandoned because it was never shaped around how the team actually works.",
    },
  ],
  capabilities: [
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Manual, repeatable operations work replaced with software that runs it the same way every time.",
      features: ["Workflow optimisation", "Task automation", "Approval routing"],
    },
    {
      icon: BarChart3,
      title: "Data & Reporting",
      description:
        "One reporting layer over the systems you run, so the numbers in the meeting are the numbers in the database.",
      features: ["Business intelligence", "Dashboards", "Performance metrics"],
    },
    {
      icon: Cpu,
      title: "System Integration",
      description: "Existing tools connected into one flow, including the legacy system nobody wants to touch.",
      features: ["API integration", "Legacy modernisation", "Data migration"],
    },
    {
      icon: Map,
      title: "Digital Strategy",
      description:
        "A sequenced roadmap that puts the highest-friction process first, so the programme pays for itself early.",
      features: ["Technology roadmap", "Change management", "Adoption support"],
    },
  ],
  // TODO: confirm stack with the team.
  stack: [
    { group: "Integrations", items: ["REST & webhooks", "Shopify", "WhatsApp Business", "Email"] },
    { group: "Data", items: ["PostgreSQL", "Supabase", "Dashboards & reporting"] },
    { group: "Platform", items: ["Node.js", "TypeScript", "React"] },
  ],
  engagement: [
    {
      title: "Operations audit",
      description:
        "We sit with the people doing the work, document each process end to end, and rank them by hours lost.",
    },
    {
      title: "Phased build",
      description:
        "The highest-cost process is rebuilt first and put into daily use before the next one starts. Nothing goes dark.",
    },
    {
      title: "Adoption & training",
      description:
        "Documentation, training sessions and a support window, so the new system is what the team actually uses.",
    },
  ],
  relatedProducts: ["retailflow", "lumetry"],
  faqIds: ["existing-application", "scope-changes", "after-launch"],
  closing: {
    title: "Still running the business on spreadsheets?",
    lead: "Tell us which process hurts most. We will scope what replacing it takes before you commit to anything.",
  },
};

export const startupSupport: ServiceContent = {
  slug: "startup-support",
  path: "/services/startup-support",
  name: "Startup support",
  title: "Ship the MVP before the runway moves",
  lead: "An engineering team for founders without one yet — scoped to get a real product in front of real users, then to scale it only when the usage says so.",
  visual: "roadmap",
  problems: [
    {
      title: "An idea without an engineering team",
      text: "Founders end up making technical decisions alone, or waiting months to hire before anything is built.",
    },
    {
      title: "An MVP that tries to do everything",
      text: "Every feature feels essential, so the first release grows until it never ships — or ships too late to learn from.",
    },
    {
      title: "A prototype that can’t grow",
      text: "Early shortcuts become the foundation, and the first sign of traction turns into an expensive rewrite.",
    },
  ],
  capabilities: [
    {
      icon: Rocket,
      title: "MVP Development",
      description: "The smallest build that genuinely tests the idea, shipped to production rather than to a prototype link.",
      features: ["Rapid prototyping", "Market validation", "Weekly iteration"],
    },
    {
      icon: Lightbulb,
      title: "Product Strategy",
      description: "Deciding what not to build. We cut the roadmap down to what the first hundred users actually need.",
      features: ["Market research", "Product roadmap", "Feature prioritisation"],
    },
    {
      icon: TrendingUp,
      title: "Scaling Support",
      description:
        "When traction arrives, the architecture and the team both need to move. We handle both without a rewrite.",
      features: ["Infrastructure scaling", "Team augmentation", "Performance work"],
    },
    {
      icon: Compass,
      title: "Technical Advisory",
      description: "A senior engineer in the room for the decisions a non-technical founder should not have to make alone.",
      features: ["Architecture review", "Technology selection", "Diligence support"],
    },
  ],
  // TODO: confirm stack with the team.
  stack: [
    { group: "Product", items: ["React", "Next.js", "React Native", "TypeScript"] },
    { group: "Backend", items: ["Node.js", "Supabase", "PostgreSQL", "Auth & payments"] },
    { group: "Launch", items: ["Vercel", "Analytics", "CI/CD"] },
  ],
  engagement: [
    {
      title: "Scope sprint",
      description:
        "One week to turn the idea into a defined MVP scope, a technical approach, a timeline and a fixed price.",
    },
    {
      title: "Build to launch",
      description: "Weekly deployable builds you can put in front of users while the rest is still being built.",
    },
    {
      title: "Post-launch iteration",
      description:
        "We instrument the product, watch what people actually do, and iterate against that rather than the roadmap.",
    },
  ],
  relatedProducts: ["leadflow", "xsender"],
  faqIds: ["specification", "cost", "timeline"],
  closing: {
    title: "Have an idea and no engineering team?",
    lead: "Tell us what you want to test. We will come back with a scope, a timeline and a fixed price — or advise you not to build it yet.",
  },
};

/** Order matches the nav and the /services overview. */
export const allServices = [softwareDevelopment, aiSolutions, digitalTransformation, startupSupport];

/** Ways to work together, shown on /services. Descriptive only — no prices. */
export const engagementModels = [
  {
    title: "Fixed-scope project",
    forWho: "For a defined product, feature set or integration.",
    text: "We agree the scope, milestones and price before the build starts. Changes are re-estimated openly, never absorbed silently.",
    points: ["Scope & architecture signed off", "Milestone-based delivery", "Full handover"],
  },
  {
    title: "Dedicated team",
    forWho: "For ongoing product work with a moving roadmap.",
    text: "A stable team that works inside your priorities, sprint by sprint, with the same people building and maintaining the product.",
    points: ["Sprint planning together", "Working demos each sprint", "Scales up or down"],
  },
  {
    title: "Advisory & audit",
    forWho: "For a decision, a review, or a plan before you build.",
    text: "Architecture reviews, technology selection and code audits that leave you with a clear, written recommendation.",
    points: ["Architecture & code review", "Written findings", "Prioritised next steps"],
  },
  {
    title: "Ongoing support",
    forWho: "For systems that are live and need to stay healthy.",
    text: "Maintenance, monitoring and continuous improvement for software we built — or software we’ve taken over.",
    points: ["Monitoring & fixes", "Small improvements", "Agreed response times"],
  },
];
