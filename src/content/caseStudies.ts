/**
 * Client case studies for /work and /work/:slug.
 *
 * The routes, nav link and sitemap entry only exist while this array has
 * entries. Never add illustrative or invented projects, clients or metrics.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  /** One-line outcome for cards, e.g. "Order handling cut from hours to minutes". */
  outcome: string;
  industry: "Startups" | "Ecommerce & retail" | "Real estate" | "Enterprise";
  services: string[];
  cover: { src: string; alt: string };
  challenge: string;
  approach: string;
  solution: { text: string; screens: { src: string; alt: string }[] };
  metrics: { value: string; label: string }[];
  stack: string[];
  testimonial?: { quote: string; name: string; role: string };
}

// TODO: real content — add verified case studies with the client's approval.
export const caseStudies: CaseStudy[] = [];
