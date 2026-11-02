/**
 * Social proof. Every section that reads these renders only when the array
 * has entries — never add placeholder, illustrative or unverified content.
 */

export interface Client {
  name: string;
  /** Monochrome SVG logo in /public/images/clients. */
  logo: string;
  url?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface Outcome {
  /** A real, verifiable figure, e.g. "38%". */
  value: string;
  label: string;
  /** Where the number comes from (client, project), for internal reference. */
  source: string;
}

// TODO: real content — client logos (with permission).
export const clients: Client[] = [];

// TODO: real content — approved client quotes.
export const testimonials: Testimonial[] = [];

// TODO: real content — measured project outcomes.
export const outcomes: Outcome[] = [];
