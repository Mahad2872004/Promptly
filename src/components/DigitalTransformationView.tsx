import React from "react";
import { ViewType } from "../types";
import { Workflow, BarChart3, Cpu, Map } from "lucide-react";
import ServiceDetailPage from "./ui/ServiceDetailPage";

interface DigitalTransformationViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function DigitalTransformationView({
  setActiveView,
}: DigitalTransformationViewProps) {
  return (
    <ServiceDetailPage
      setActiveView={setActiveView}
      eyebrow="Digital Transformation"
      title="Modernise operations without pausing the business"
      lead="Move offline processes into software, replace spreadsheets and message threads with systems, and connect the tools you already pay for — one workflow at a time."
      capabilities={[
        {
          icon: <Workflow className="h-5 w-5" />,
          title: "Process Automation",
          description:
            "Manual, repeatable operations work replaced with software that runs it the same way every time.",
          features: ["Workflow optimisation", "Task automation", "Approval routing"],
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Data & Reporting",
          description:
            "One reporting layer over the systems you run, so the numbers in the meeting are the numbers in the database.",
          features: ["Business intelligence", "Dashboards", "Performance metrics"],
        },
        {
          icon: <Cpu className="h-5 w-5" />,
          title: "System Integration",
          description:
            "Existing tools connected into one flow, including the legacy system nobody wants to touch.",
          features: ["API integration", "Legacy modernisation", "Data migration"],
        },
        {
          icon: <Map className="h-5 w-5" />,
          title: "Digital Strategy",
          description:
            "A sequenced roadmap that puts the highest-friction process first, so the programme pays for itself early.",
          features: ["Technology roadmap", "Change management", "Adoption support"],
        },
      ]}
      engagement={[
        {
          title: "Operations audit",
          description:
            "We sit with the people doing the work, document each process end to end, and rank them by hours lost.",
        },
        {
          title: "Phased build",
          description:
            "The highest-cost process is rebuilt first and put into daily use before the next one starts. Nothing goes dark.",
        },
        {
          title: "Adoption & training",
          description:
            "Documentation, training sessions and a support window, so the new system is what the team actually uses.",
        },
      ]}
      stats={[
        { value: "310", label: "Hours saved per month, typical" },
        { value: "0", label: "Days of downtime during migration" },
        { value: "6 wks", label: "To first process in production" },
        { value: "100%", label: "Data exported and retained" },
      ]}
      cta={{
        title: "Still running the business on spreadsheets?",
        body: "Tell us which process hurts most. We will scope what replacing it takes before you commit to anything.",
        primaryLabel: "Discuss Transformation",
      }}
    />
  );
}
