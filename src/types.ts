export type ViewType = 
  | "home"
  | "services"
  | "portfolio"
  | "ai-architect"
  | "about"
  | "client-portal"
  | "contact";

export interface DemoProject {
  id: string;
  title: string;
  clientName: string;
  category: "SaaS" | "AI Integration" | "Cloud" | "Mobile";
  tagline: string;
  description: string;
  longDescription: string;
  metrics: string[];
  technologies: string[];
  visualTheme: string; // Tailwind colors like "from-cyan-500 to-blue-500"
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface AgencyService {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string; // Lucide icon name mapping
  badge: string;
  heroColor: string;
  caseStudyRef: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  svgAvatarIndex: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Client Portal types for interactive simulator
export interface PortalTask {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  phase: string;
  assignedTo: string;
}

export interface PortalInvoice {
  id: string;
  amount: string;
  date: string;
  status: "paid" | "sent" | "draft";
  item: string;
}

export interface PortalMessage {
  id: string;
  sender: "client" | "lead-engineer";
  text: string;
  timestamp: string;
}

export interface ArchitectResponse {
  name: string;
  description: string;
  techStack: string[];
  timeline: string;
  budget: string;
  phases: Array<{
    name: string;
    duration: string;
    details: string;
  }>;
  recommendations: string[];
}
