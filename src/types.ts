export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  svgAvatarIndex: number;
  /** Portrait path; when empty, the card shows a brand-gradient monogram. */
  image: string;
  experience?: string;
  /** TODO: real content — LinkedIn profile URL. Rendered only when set. */
  linkedin?: string;
}

/* Client Portal demo (sample data only). */

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

/** Shape returned by POST /api/gemini/analyze (Project Blueprint). */
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
