// TODO: legal review — draft text describing what this codebase actually does.
// Have it reviewed (and governing law confirmed) before relying on it.

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  id: string;
  title: string;
  body: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT = "promptlypk@gmail.com";

export const privacy: LegalDocument = {
  title: "Privacy policy",
  updated: "3 November 2026",
  intro:
    "This policy explains what information Promptly collects through this website, why we collect it, and the choices you have.",
  sections: [
    {
      id: "collect",
      title: "Information we collect",
      body: [
        "We only collect information you choose to send us, plus a small amount stored in your own browser.",
        {
          list: [
            "Project briefs: your name, email address, company, project type, budget range, and message when you submit the contact form.",
            "Project Blueprint: the project description you type, which is sent to our server to generate a preliminary plan.",
            "Chat: messages you send through the chat assistant on this site.",
            "Bookings: details you enter when scheduling a call through our booking calendar.",
            "Preferences: your light or dark theme choice, saved in your browser's local storage.",
          ],
        },
      ],
    },
    {
      id: "use",
      title: "How we use it",
      body: [
        "We use the information to respond to your enquiry, prepare for a conversation you booked, generate the plan you requested, and improve how we communicate about our services. We don't sell your information.",
      ],
    },
    {
      id: "providers",
      title: "Service providers",
      body: [
        "We rely on a few providers to run this website. They process information on our behalf and under their own privacy terms:",
        {
          list: [
            "Supabase — stores project briefs submitted through the contact form.",
            "Google (Gemini API) — generates Project Blueprint plans from the description you enter.",
            "Calendly — handles call scheduling.",
            "Aivastark — provides the chat assistant.",
          ],
        },
        "Avoid including confidential or personal details in a Project Blueprint description.",
      ],
    },
    {
      id: "demos",
      title: "Demos",
      body: [
        "The Client Portal demo uses sample data. Anything you change in it is not saved or sent to us.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        "We keep project briefs and related correspondence for as long as needed to respond and, if we work together, for the duration of the engagement and our record-keeping obligations. You can ask us to delete your information at any time.",
      ],
    },
    {
      id: "rights",
      title: "Your choices",
      body: [
        `You can ask to see, correct, or delete the information you've sent us by emailing ${CONTACT}. You can clear your saved theme preference by clearing this site's data in your browser.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If we change how we handle information, we'll update this page and the date above.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about this policy: ${CONTACT}. Promptly is based in Lahore, Pakistan.`],
    },
  ],
};

export const terms: LegalDocument = {
  title: "Terms of use",
  updated: "3 November 2026",
  intro:
    "These terms apply when you use the Promptly website, its demos, and the Project Blueprint tool. By using the site you agree to them.",
  sections: [
    {
      id: "site",
      title: "Using this website",
      body: [
        "You may browse the site and use its tools for your own evaluation of Promptly's services and products. Please don't misuse the site, attempt to disrupt it, or submit content that is unlawful or that you don't have the right to share.",
      ],
    },
    {
      id: "blueprint",
      title: "Project Blueprint",
      body: [
        "Project Blueprint produces an AI-generated, preliminary technical plan. It needs human review, may be incomplete or inaccurate, and is not a quote, proposal, or commitment. Scope, timelines, and pricing are only agreed in a written engagement.",
      ],
    },
    {
      id: "demos",
      title: "Demos and product information",
      body: [
        "Demos use sample data and simulated responses. Product descriptions are provided for information and may change. Features available in a product are described on that product's own website.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: [
        "The Promptly name, logo, website design, and content belong to Promptly. Product names belong to their respective owners. Ownership of work we create for clients is set out in each client agreement.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      body: [
        "Some features link to or rely on third-party services, such as booking and chat. Their own terms apply when you use them.",
      ],
    },
    {
      id: "liability",
      title: "No warranty",
      body: [
        "The website and its tools are provided as-is. To the extent permitted by law, Promptly isn't liable for losses arising from reliance on website content or tool output.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: [
        // TODO: legal review — confirm governing law and jurisdiction.
        "These terms are governed by the laws of Pakistan.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about these terms: ${CONTACT}.`],
    },
  ],
};
