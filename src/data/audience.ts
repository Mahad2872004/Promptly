import { ModuleId } from "../theme/tokens";
import { ViewType } from "../types";

/**
 * Scene 4 content — one entry per audience segment we actually serve.
 *
 * `benefit` and `flow` are distilled from the existing industry pages
 * (src/components/{Startups,Ecommerce,RealEstate,Enterprise}View.tsx); the two
 * segments without a dedicated route (Healthcare, FinTech) reuse the copy
 * already in INDUSTRIES in src/data/landing.ts.
 */
export interface AudienceTab {
  id: string;
  label: string;
  /** One-line benefit headline shown when the tab is active. */
  benefit: string;
  /** Horizontal chip-flow, rendered as chips joined by arrows. */
  flow: string[];
  accent: ModuleId;
  /** Deep-link target, when the segment has its own page. */
  route?: ViewType;
}

export const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "startups",
    label: "Startups",
    benefit: "Validate the idea and ship an MVP before the runway moves.",
    flow: ["Idea", "Validation", "MVP", "Launch", "Iterate"],
    accent: "startup",
    route: "startups",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    benefit: "Turn messy order channels into one professional storefront.",
    flow: ["Catalog", "Storefront", "Checkout", "Fulfilment", "Analytics"],
    accent: "product",
    route: "ecommerce",
  },
  {
    id: "realestate",
    label: "Real Estate",
    benefit: "Put listings, tours and buyer intent in one connected system.",
    flow: ["Listing", "Virtual Tour", "Enquiry", "CRM", "Close"],
    accent: "dev",
    route: "realestate",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    benefit: "Replace legacy processes without pausing the business.",
    flow: ["Audit", "Architecture", "Migration", "Integration", "Scale"],
    accent: "ai",
    route: "enterprise",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    benefit: "Digitise intake and records under real compliance constraints.",
    flow: ["Intake", "Records", "Scheduling", "Compliance", "Insights"],
    accent: "dev",
  },
  {
    id: "fintech",
    label: "FinTech",
    benefit: "Move money and data with an audit trail behind every action.",
    flow: ["Onboard", "Verify", "Transact", "Reconcile", "Report"],
    accent: "ai",
  },
];
