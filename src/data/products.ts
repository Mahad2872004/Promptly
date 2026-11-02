/** Verified against the supplied live sites on 30 October 2026. */
export interface ProductDefinition {
  id: string;
  name: string;
  category: string;
  audience: string;
  description: string;
  detail: string;
  problem: string;
  status: string;
  availability: string;
  url: string;
  path: string;
  features: { title: string; text: string }[];
  /** Channels/platforms named in the product's own copy. */
  integrations?: ("whatsapp" | "instagram" | "facebook" | "shopify")[];
  /** The public demo can be embedded in the page (no frame-blocking headers). */
  embeddableDemo?: boolean;
  preview: {
    src: string;
    /** 640w + full-width WebP; pair with a `sizes` that matches the slot. */
    srcSet: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
}
export const products: ProductDefinition[] = [
  {
    id: "xsender",
    name: "xSender",
    category: "Conversation automation",
    audience: "For businesses that serve customers through messaging",
    description: "Turn customer messages into the next step.",
    detail:
      "Automate replies across WhatsApp, Instagram, and Facebook. Answer questions, capture orders and bookings, send updates, and hand conversations to a person when needed.",
    problem:
      "A question, an order, or a booking can arrive at any time. Answering every message by hand makes it harder to keep information consistent and follow through on the work behind the conversation.",
    status: "Explore the live demo",
    availability:
      "The public restaurant demo lets you explore the conversation flow. Channel setup and account options are explained on the xSender website.",
    url: "https://xsender-seven.vercel.app/",
    path: "/products/xsender",
    integrations: ["whatsapp", "instagram", "facebook"],
    embeddableDemo: true,
    features: [
      {
        title: "Answer with context",
        text: "Use business information and a live menu or service catalog to answer common customer questions.",
      },
      {
        title: "Capture the next action",
        text: "Support ordering, appointment booking, lead capture, and customer updates through focused conversation flows.",
      },
      {
        title: "Keep people in the loop",
        text: "Hand over to a team member with the conversation context when a request needs human attention.",
      },
    ],
    preview: {
      src: "/images/products/xsender.webp",
      srcSet: "/images/products/xsender-640.webp 640w, /images/products/xsender.webp 1272w",
      alt: "xSender live restaurant demo with a Cafe Delight conversation and menu, booking, tracking, and staff options",
      caption: "Actual xSender public demo · Cafe Delight example",
      width: 1272,
      height: 716,
    },
  },
  {
    id: "lumetry",
    name: "Lumetry",
    category: "Commerce intelligence",
    audience: "For Shopify brands and store operators",
    description: "A clearer view of your store’s performance.",
    detail:
      "Connect Shopify, import store data, and review revenue, orders, average order value, and refunds in a dedicated performance workspace.",
    problem:
      "Store data only becomes useful when the numbers have a consistent definition. Lumetry brings Shopify records into one workspace so operators can review performance using the store’s currency and timezone.",
    status: "Shopify metrics available",
    availability:
      "Shopify connection, data import, and performance metrics are available. Automated change detection, explanations, and prioritized recommendations are still in development.",
    url: "https://lumetry-pi.vercel.app/",
    integrations: ["shopify"],
    path: "/products/lumetry",
    features: [
      {
        title: "Connect Shopify",
        text: "A read-only store connection brings orders, products, inventory, refunds, and transactions into the workspace.",
      },
      {
        title: "Understand the numbers",
        text: "Review defined metrics for net sales, orders, average order value, refunds, and customers, with period comparisons.",
      },
      {
        title: "Track data readiness",
        text: "See connection status, import progress, and synchronization information before interpreting the figures.",
      },
    ],
    preview: {
      src: "/images/products/lumetry.webp",
      srcSet: "/images/products/lumetry-640.webp 640w, /images/products/lumetry.webp 1250w",
      alt: "Lumetry workspace showing completed Shopify setup and data-source connection status",
      caption: "Actual Lumetry workspace · Shopify setup and data sources",
      width: 1250,
      height: 620,
    },
  },
  {
    id: "leadflow",
    name: "LeadFlow",
    category: "Lead management",
    audience: "For agencies, consultants, and service businesses",
    description: "Keep every inquiry moving forward.",
    detail:
      "Bring website inquiries into a focused pipeline. Keep lead context, track stages, and plan follow-ups so the next conversation is easy to find.",
    problem:
      "New inquiries can get lost between a website form, an inbox, and a reminder. LeadFlow connects the first hello to a visible pipeline and a practical follow-up routine.",
    status: "Workspace available",
    availability:
      "Lead capture, pipeline stages, activity, and follow-ups are available. Email notifications require configuration. Zapier, Make, and n8n use guided HTTP connections; team invitations are planned.",
    url: "https://leadflow-tau-five.vercel.app/",
    path: "/products/leadflow",
    features: [
      {
        title: "Capture the first hello",
        text: "Collect inquiries through hosted or embedded forms, or an authenticated inbound API, with service interest and source.",
      },
      {
        title: "See the next step",
        text: "Move leads through New, Contacted, Qualified, Converted, and Lost stages, with search and filters.",
      },
      {
        title: "Build a follow-up routine",
        text: "Schedule tasks, review what is due, mark follow-ups complete, and keep a history of lead activity.",
      },
    ],
    preview: {
      src: "/images/products/leadflow.webp",
      srcSet: "/images/products/leadflow-640.webp 640w, /images/products/leadflow.webp 1250w",
      alt: "LeadFlow overview with pipeline stages and follow-up overview, without individual contact records",
      caption: "Actual LeadFlow workspace · Pipeline overview",
      width: 1250,
      height: 690,
    },
  },
  {
    id: "retailflow",
    name: "RetailFlow",
    category: "Retail operations",
    audience: "For retailers managing sales and stock",
    description: "Connect the counter to the stockroom.",
    detail:
      "A point-of-sale and inventory workspace for product catalogs, barcode lookup, sales, stock management, purchasing, and reporting.",
    problem:
      "Selling a product is only one part of running a store. RetailFlow brings the checkout, product variants, stock levels, suppliers, and purchasing workflows into one interface.",
    status: "Explore the application",
    availability:
      "The linked application exposes the POS and inventory workflows directly. The preview shows the supplied store interface; its figures are interface data, not claimed business results.",
    url: "https://posinventorymanagementsystem.vercel.app/",
    path: "/products/retailflow",
    features: [
      {
        title: "Work at the counter",
        text: "Find products by name, SKU, or barcode, and review the current sale with discounts, totals, and payment-method controls.",
      },
      {
        title: "Keep stock in view",
        text: "Organize products and variants, review inventory and low-stock indicators, and manage stock and purchases.",
      },
      {
        title: "Connect store operations",
        text: "Navigate sales records, customers, suppliers, categories, barcodes, and reports from a shared workspace.",
      },
    ],
    preview: {
      src: "/images/products/retailflow.webp",
      srcSet: "/images/products/retailflow-640.webp 640w, /images/products/retailflow.webp 1440w",
      alt: "RetailFlow point-of-sale interface with product catalog, stock quantities, and an empty current sale",
      caption: "Actual RetailFlow application · Point of sale",
      width: 1440,
      height: 850,
    },
  },
];
