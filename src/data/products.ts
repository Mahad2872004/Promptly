/** Only confirmed products belong here. Availability is deliberately not inferred. */
export interface ProductDefinition {
  id: string;
  name: string;
  audience: string;
  description: string;
  detail: string;
  path: string;
  preview:
    { kind: "illustration" } | { kind: "image"; src: string; alt: string };
}
export const products: ProductDefinition[] = [
  {
    id: "xsender",
    name: "xSender",
    audience: "For commerce teams",
    description: "Bring structure to WhatsApp orders.",
    detail:
      "A Promptly product focused on helping e-commerce businesses organize the journey from customer conversation to order management.",
    path: "/products/xsender",
    preview: { kind: "illustration" },
  },
];
