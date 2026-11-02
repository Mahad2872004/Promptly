import type { LucideIcon } from "lucide-react";
import { Building2, Network, Rocket, ShoppingBag } from "lucide-react";

/**
 * /industries content. Solutions come from the previous industry pages; the
 * unverified case studies and figures those pages carried are not used.
 * TODO: review the solution claims (e.g. AR tours, IoT, compliance frameworks)
 * and keep only what the team delivers today.
 */
export interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
  /** One line for the hero lens card. */
  short: string;
  title: string;
  lead: string;
  challenges: string[];
  solutions: { title: string; description: string; tags: string[] }[];
  /** A product id from data/products, or a tool route. */
  related: { kind: "product"; id: string } | { kind: "tool"; label: string; path: string; text: string };
  cta: { title: string; text: string };
}

export const industries: Industry[] = [
  {
    id: "startups",
    name: "Startups",
    icon: Rocket,
    short: "Validate an idea, define your MVP, and build a foundation that can evolve.",
    title: "Get to a real product before the runway moves",
    lead: "Early-stage teams do not need an agency's process. They need the smallest honest build that proves the idea, and an architecture that will not have to be thrown away at Series A.",
    challenges: [
      "Too many ideas competing for a first release",
      "No technical co-founder to make architecture calls",
      "Prototypes that can’t carry real users",
    ],
    solutions: [
      {
        title: "Idea validation",
        description: "Market research and technical feasibility work that tells you whether the thing is worth building at all.",
        tags: ["Market research", "Competitor analysis", "Feasibility"],
      },
      {
        title: "Rapid prototyping",
        description:
          "A functional MVP in production, testing your actual assumptions against real users rather than a click-through demo.",
        tags: ["Core features", "User testing", "Weekly iteration"],
      },
      {
        title: "Go-to-market readiness",
        description:
          "Production infrastructure, security hardening and a deploy process, so launch day is not the risky part.",
        tags: ["Performance", "Security", "Deployment"],
      },
      {
        title: "Growth & expansion",
        description: "When traction arrives: infrastructure scaling, feature expansion and engineers embedded with your team.",
        tags: ["Scaling", "Team augmentation", "Feature expansion"],
      },
    ],
    related: {
      kind: "tool",
      label: "Project Blueprint",
      path: "/blueprint",
      text: "Describe your idea and get a preliminary technical plan in under a minute.",
    },
    cta: { title: "Have an idea worth testing?", text: "Tell us what you want to learn first." },
  },
  {
    id: "ecommerce",
    name: "Ecommerce & retail",
    icon: ShoppingBag,
    short: "Connect orders, customer conversations, and reporting so your team spends less time coordinating.",
    title: "Turn scattered order channels into one storefront",
    lead: "Retail and D2C brands lose margin in the gaps — between the catalogue, the chat thread, the checkout and the warehouse. We close them.",
    challenges: [
      "Orders arriving through chat, store and phone",
      "Stock and sales that never quite reconcile",
      "Reports assembled by hand every week",
    ],
    solutions: [
      {
        title: "Custom store development",
        description: "A storefront built around how you actually sell, with the admin your team will use every day.",
        tags: ["React / Next.js", "Node.js", "PostgreSQL"],
      },
      {
        title: "Platform integration",
        description:
          "Keep the platform you are on and fix what it cannot do, rather than starting a migration you do not need.",
        tags: ["Shopify", "WooCommerce", "Magento"],
      },
      {
        title: "Payment solutions",
        description: "Checkout and payment flows including local gateways, with reconciliation handled rather than assumed.",
        tags: ["Stripe", "PayPal", "Local gateways"],
      },
      {
        title: "Mobile commerce",
        description: "Native apps for the customers who buy repeatedly, with push notifications that respect their attention.",
        tags: ["React Native", "iOS & Android", "Push"],
      },
    ],
    related: { kind: "product", id: "retailflow" },
    cta: { title: "Losing time between channels?", text: "Show us how an order moves today." },
  },
  {
    id: "realestate",
    name: "Real estate",
    icon: Building2,
    short: "Organize property information and enquiries with software shaped around your sales team.",
    title: "Listings, tours and buyer intent in one system",
    lead: "PropTech fails when the listing, the enquiry and the CRM live in three places. We connect them so an agent can see the whole thread on one screen.",
    challenges: [
      "Enquiries scattered across portals and inboxes",
      "Follow-ups that depend on someone remembering",
      "Property data split between spreadsheets and tools",
    ],
    solutions: [
      {
        title: "Property management systems",
        description:
          "End-to-end management platforms for agencies and landlords, built around the workflow your team already runs.",
        tags: ["Tenant management", "Maintenance", "Financial reporting"],
      },
      {
        title: "Virtual property tours",
        description: "Interactive tours and AR walkthroughs, delivered inside the listing rather than on a separate link.",
        tags: ["360° views", "AR", "Mobile apps"],
      },
      {
        title: "Investment analytics",
        description: "Yield, ROI and risk modelling across a portfolio, with the assumptions visible rather than buried.",
        tags: ["Market trends", "ROI modelling", "Risk scoring"],
      },
      {
        title: "Smart building integration",
        description: "IoT data from buildings surfaced where the operations team already works.",
        tags: ["Energy monitoring", "Access control", "Automation"],
      },
    ],
    related: { kind: "product", id: "leadflow" },
    cta: { title: "Too many enquiries slipping through?", text: "Let’s map where a lead goes after it arrives." },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Network,
    short: "Modernize existing systems in manageable stages and connect the tools your business depends on.",
    title: "Replace legacy systems without stopping the business",
    lead: "Scale-up and enterprise teams need modernisation that survives an audit. We migrate in phases, keep the old path alive until the new one proves itself, and document every step.",
    challenges: [
      "Legacy systems that are risky to change",
      "Data trapped between departments",
      "Modernisation that can’t pause operations",
    ],
    solutions: [
      {
        title: "Cloud architecture",
        description: "Scalable infrastructure design and migration, with cost modelling before anything is committed.",
        tags: ["AWS", "Azure", "GCP", "Microservices"],
      },
      {
        title: "Data & analytics",
        description: "Enterprise data pipelines and a reporting layer the finance team and the board can both rely on.",
        tags: ["Big data", "ML pipelines", "Real-time"],
      },
      {
        title: "Security & compliance",
        description:
          "Security frameworks, access control and audit trails built to the standard you are certified against.",
        tags: ["SOC 2", "GDPR", "HIPAA"],
      },
      {
        title: "Integration services",
        description: "APIs and messaging that connect the systems you cannot replace to the ones you are building.",
        tags: ["REST", "GraphQL", "Event bus"],
      },
    ],
    related: {
      kind: "tool",
      label: "Client Portal demo",
      path: "/portal-demo",
      text: "See how progress, milestones, and invoices stay visible during a phased programme.",
    },
    cta: { title: "Planning a phased modernisation?", text: "Start with the system that costs the most to keep." },
  },
];
