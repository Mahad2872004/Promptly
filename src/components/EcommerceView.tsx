import React from "react";
import { ViewType } from "../types";
import { Package, BarChart3, Zap } from "lucide-react";
import IndustryPage from "./ui/IndustryPage";

interface EcommerceViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function EcommerceView({ setActiveView }: EcommerceViewProps) {
  return (
    <IndustryPage
      setActiveView={setActiveView}
      eyebrow="E-commerce"
      title="Turn scattered order channels into one storefront"
      lead="Retail and D2C brands lose margin in the gaps — between the catalogue, the chat thread, the checkout and the warehouse. We close them."
      strengths={[
        {
          icon: <Package className="h-5 w-5" />,
          title: "Custom platforms",
          description:
            "Storefronts built for your catalogue and fulfilment reality, not bent around a template's assumptions.",
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Analytics that reconcile",
          description:
            "One dashboard where orders, revenue and inventory agree with each other and with the accounting system.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Performance work",
          description:
            "Sub-second pages and a checkout that does not drop customers on a mid-range phone over mobile data.",
        },
      ]}
      solutions={[
        {
          title: "Custom store development",
          description:
            "A storefront built around how you actually sell, with the admin your team will use every day.",
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
          description:
            "Checkout and payment flows including local gateways, with reconciliation handled rather than assumed.",
          tags: ["Stripe", "PayPal", "Local gateways"],
        },
        {
          title: "Mobile commerce",
          description:
            "Native apps for the customers who buy repeatedly, with push notifications that respect their attention.",
          tags: ["React Native", "iOS & Android", "Push"],
        },
      ]}
      stats={[
        { value: "30+", label: "E-commerce projects" },
        { value: "40%", label: "Conversion increase, typical" },
        { value: "2x", label: "Revenue growth" },
        { value: "99.9%", label: "Uptime" },
      ]}
      caseStudy={{
        title: "Fashion brand: from manual orders to a mobile-first store",
        challenge:
          "A growing fashion brand struggled with slow site performance, a weak mobile experience, and order processing that was still being done by hand from message threads.",
        solution:
          "We built a custom mobile-first commerce platform, integrated xSender so WhatsApp orders land as structured records, and added analytics that reconcile against the ledger.",
        results: [
          "40% increase in conversion rate",
          "60% faster page load times",
          "2.5x revenue growth in six months",
          "95% reduction in order processing time",
        ],
        figures: [
          { value: "+40%", label: "Conversion rate", note: "vs previous platform" },
          { value: "0.8s", label: "Page speed", note: "median load time" },
          { value: "2.5x", label: "Revenue growth", note: "over six months" },
        ],
      }}
      cta={{
        title: "Losing orders between channels?",
        body: "Show us where the drop-off happens. We will scope what it takes to close it.",
        primaryLabel: "Talk to Us",
      }}
    />
  );
}
