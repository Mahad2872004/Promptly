import React from "react";
import { ViewType } from "../types";
import { Code, Smartphone, Database, Globe } from "lucide-react";
import ServiceDetailPage from "./ui/ServiceDetailPage";

interface SoftwareDevelopmentViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function SoftwareDevelopmentView({
  setActiveView,
}: SoftwareDevelopmentViewProps) {
  return (
    <ServiceDetailPage
      setActiveView={setActiveView}
      eyebrow="Software Development"
      title="Custom software built to outlive the sprint"
      lead="Web applications, mobile clients, APIs and the infrastructure under them — production-grade from the first commit, documented so your own team can take it over."
      capabilities={[
        {
          icon: <Code className="h-5 w-5" />,
          title: "Web Applications",
          description:
            "Custom web applications on modern frameworks, with the accessibility and performance work done as part of the build.",
          features: ["React / Next.js", "Full-stack delivery", "Responsive by default"],
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Mobile Apps",
          description:
            "Cross-platform mobile clients that share a codebase without feeling like a wrapped website.",
          features: ["React Native", "iOS & Android", "Offline-capable"],
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "Backend Systems",
          description:
            "APIs, data models and background processing designed for the load you will have in two years, not just today.",
          features: ["Node.js / Express", "REST & GraphQL APIs", "Schema design"],
        },
        {
          icon: <Globe className="h-5 w-5" />,
          title: "Cloud & Infrastructure",
          description:
            "Deployment pipelines, environments and observability, set up so shipping is boring and rollbacks are one command.",
          features: ["AWS / GCP", "CI/CD pipelines", "Monitoring & logging"],
        },
      ]}
      engagement={[
        {
          title: "Technical discovery",
          description:
            "Requirements, integrations and constraints written down, then an architecture and a sprint plan you sign off on.",
        },
        {
          title: "Sprint delivery",
          description:
            "Fixed-scope sprints, each ending in a deployable build and a demo. Scope changes are re-estimated, never absorbed silently.",
        },
        {
          title: "Handover & support",
          description:
            "Full repository, documentation and a walkthrough with your team. Ongoing support is optional, never a lock-in.",
        },
      ]}
      stats={[
        { value: "< 8 wks", label: "Typical first release" },
        { value: "100%", label: "Code ownership transferred" },
        { value: "99.9%", label: "Target uptime" },
        { value: "2 wks", label: "Sprint cadence" },
      ]}
      cta={{
        title: "Ready to scope a build?",
        body: "Bring the requirements you have — even if they are rough. We turn them into an architecture and an estimate.",
        primaryLabel: "Discuss Your Build",
      }}
    />
  );
}
