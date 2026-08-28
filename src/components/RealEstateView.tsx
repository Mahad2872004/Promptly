import React from "react";
import { ViewType } from "../types";
import { Home, Map, TrendingUp } from "lucide-react";
import IndustryPage from "./ui/IndustryPage";

interface RealEstateViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function RealEstateView({ setActiveView }: RealEstateViewProps) {
  return (
    <IndustryPage
      setActiveView={setActiveView}
      eyebrow="Real Estate"
      title="Listings, tours and buyer intent in one system"
      lead="PropTech fails when the listing, the enquiry and the CRM live in three places. We connect them so an agent can see the whole thread on one screen."
      strengths={[
        {
          icon: <Home className="h-5 w-5" />,
          title: "Property management",
          description:
            "Tenancies, maintenance and financials in one platform, so nothing depends on someone remembering to forward an email.",
        },
        {
          icon: <Map className="h-5 w-5" />,
          title: "Virtual tours",
          description:
            "3D and 360° tours that load on a phone, so a buyer shortlists before they book a viewing.",
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Market analytics",
          description:
            "Investment and yield analysis on your own portfolio data rather than a generic market index.",
        },
      ]}
      solutions={[
        {
          title: "Property management systems",
          description:
            "End-to-end management platforms for agencies and landlords, built around the workflow your team already runs.",
          tags: ["Tenant management", "Maintenance", "Financial reporting"],
        },
        {
          title: "Virtual property tours",
          description:
            "Interactive tours and AR walkthroughs, delivered inside the listing rather than on a separate link.",
          tags: ["360° views", "AR", "Mobile apps"],
        },
        {
          title: "Investment analytics",
          description:
            "Yield, ROI and risk modelling across a portfolio, with the assumptions visible rather than buried.",
          tags: ["Market trends", "ROI modelling", "Risk scoring"],
        },
        {
          title: "Smart building integration",
          description:
            "IoT data from buildings surfaced where the operations team already works.",
          tags: ["Energy monitoring", "Access control", "Automation"],
        },
      ]}
      stats={[
        { value: "20+", label: "Real estate projects" },
        { value: "50%", label: "Operational efficiency gain" },
        { value: "3x", label: "Lead generation" },
        { value: "90%", label: "Client satisfaction" },
      ]}
      caseStudy={{
        title: "Property management firm: from paperwork to a tenant portal",
        challenge:
          "A property management firm ran on manual processes, with tenancy data scattered across spreadsheets and inboxes and no reliable channel for tenant communication.",
        solution:
          "We built a management platform with automated maintenance workflows, a tenant portal, and real-time analytics over the whole portfolio — migrating the historical data in one pass.",
        results: [
          "50% improvement in operational efficiency",
          "70% reduction in manual paperwork",
          "3x increase in qualified lead generation",
          "95% tenant satisfaction rate",
        ],
        figures: [
          { value: "-70%", label: "Manual paperwork", note: "after first quarter" },
          { value: "3x", label: "Qualified leads", note: "via the new portal" },
          { value: "95%", label: "Tenant satisfaction", note: "post-launch survey" },
        ],
      }}
      cta={{
        title: "Managing a portfolio out of spreadsheets?",
        body: "Tell us how many units and which systems you run. We will scope the migration.",
        primaryLabel: "Talk to Us",
      }}
    />
  );
}
