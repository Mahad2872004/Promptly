/** FAQ content — used by /faq, the ⌘K palette and contextual FAQ blocks. */

export type FaqCategory =
  | "Getting started"
  | "Pricing & timelines"
  | "Working together"
  | "After launch";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export const faqs: Faq[] = [
  {
    id: "what-we-build",
    category: "Getting started",
    question: "What does Promptly build?",
    answer:
      "We work across custom software, web applications, AI and workflow automation, system integrations, and startup product development. Our portfolio also includes products for messaging, commerce, and business operations.",
  },
  {
    id: "existing-application",
    category: "Getting started",
    question: "Can you work with an existing application?",
    answer:
      "Yes. Share the application, its current challenges, and the changes you need. A technical review helps establish whether targeted improvements, new integrations, or a phased rebuild are appropriate.",
  },
  {
    id: "specification",
    category: "Getting started",
    question: "Do I need a complete specification to get started?",
    answer:
      "No. Start with the problem you want to solve, who will use the software, and what a successful outcome looks like. Existing workflows, examples, and budget or timing constraints help guide discovery.",
  },
  {
    id: "cost",
    category: "Pricing & timelines",
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, complexity, integrations, and delivery requirements. Contact us with a brief so we can discuss an estimate. The project architect provides an exploratory starting point, not a binding quote.",
  },
  {
    id: "timeline",
    category: "Pricing & timelines",
    question: "How long will development take?",
    answer:
      "A useful timeline requires a defined scope and an understanding of dependencies. We discuss milestones during planning, including time for your feedback, testing, and launch preparation.",
  },
  {
    id: "scope-changes",
    category: "Working together",
    question: "How are scope changes handled?",
    answer:
      "Changes should be reviewed against the agreed priorities, budget, and timeline. Agreeing on their impact before implementation helps keep delivery expectations clear.",
  },
  {
    id: "see-product",
    category: "Working together",
    question: "How can I see a product or discuss a project?",
    answer:
      "Explore the portfolio for product details, then use the contact page to request a walkthrough or describe your project. You can also book a consultation for an initial conversation.",
  },
  {
    id: "after-launch",
    category: "After launch",
    question: "What happens after launch?",
    answer:
      "Discuss handover, documentation, maintenance, and ongoing development when defining your engagement. Support arrangements and responsibilities should be included in your project agreement.",
  },
];
