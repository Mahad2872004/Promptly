import React from "react";
import { ViewType } from "../types";
import { ShieldCheck, Globe, TrendingUp } from "lucide-react";
import IndustryPage from "./ui/IndustryPage";

interface EnterpriseViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function EnterpriseView({ setActiveView }: EnterpriseViewProps) {
  return (
    <IndustryPage
      setActiveView={setActiveView}
      eyebrow="Enterprise"
      title="Replace legacy systems without stopping the business"
      lead="Scale-up and enterprise teams need modernisation that survives an audit. We migrate in phases, keep the old path alive until the new one proves itself, and document every step."
      strengths={[
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: "Security & compliance",
          description:
            "Controls designed against the framework you actually report under, with evidence generated as you go.",
        },
        {
          icon: <Globe className="h-5 w-5" />,
          title: "Multi-region scale",
          description:
            "Infrastructure that holds across regions and data-residency rules without a separate stack per market.",
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Performance engineering",
          description:
            "Profiling and re-architecture on the paths that carry your load, measured before and after.",
        },
      ]}
      solutions={[
        {
          title: "Cloud architecture",
          description:
            "Scalable infrastructure design and migration, with cost modelling before anything is committed.",
          tags: ["AWS", "Azure", "GCP", "Microservices"],
        },
        {
          title: "Data & analytics",
          description:
            "Enterprise data pipelines and a reporting layer the finance team and the board can both rely on.",
          tags: ["Big data", "ML pipelines", "Real-time"],
        },
        {
          title: "Security & compliance",
          description:
            "Security frameworks, access control and audit trails built to the standard you are certified against.",
          tags: ["SOC 2", "GDPR", "HIPAA"],
        },
        {
          title: "Integration services",
          description:
            "APIs and messaging that connect the systems you cannot replace to the ones you are building.",
          tags: ["REST", "GraphQL", "Event bus"],
        },
      ]}
      stats={[
        { value: "15+", label: "Enterprise clients" },
        { value: "99.99%", label: "Uptime SLA" },
        { value: "10x", label: "Performance gain, typical" },
        { value: "24/7", label: "Support coverage" },
      ]}
      caseStudy={{
        title: "Financial services: legacy modernisation under compliance",
        challenge:
          "A financial services enterprise needed to modernise core legacy systems while holding strict security and regulatory requirements throughout — with no maintenance window available.",
        solution:
          "We ran a phased cloud migration to a microservices architecture, kept the legacy path live behind a routing layer until each service was verified, and built compliance evidence into the pipeline.",
        results: [
          "99.99% uptime achieved through the migration",
          "10x performance improvement on core transaction paths",
          "Full regulatory compliance maintained end to end",
          "50% reduction in operational cost",
        ],
        figures: [
          { value: "99.99%", label: "Uptime", note: "maintained during migration" },
          { value: "10x", label: "Throughput", note: "on core transaction paths" },
          { value: "-50%", label: "Operating cost", note: "post-migration run rate" },
        ],
      }}
      cta={{
        title: "Carrying a system nobody wants to touch?",
        body: "We will audit it and give you a phased plan with the risk at each step written down.",
        primaryLabel: "Request an Audit",
      }}
    />
  );
}
