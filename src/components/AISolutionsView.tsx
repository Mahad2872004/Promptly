import React from "react";
import { ViewType } from "../types";
import { Brain, Zap, Target, Layers } from "lucide-react";
import ServiceDetailPage from "./ui/ServiceDetailPage";

interface AISolutionsViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function AISolutionsView({ setActiveView }: AISolutionsViewProps) {
  return (
    <ServiceDetailPage
      setActiveView={setActiveView}
      eyebrow="AI Solutions"
      title="Intelligent automation for modern business"
      lead="Automate the processes that consume your team's day, and put a model behind the decisions that need one — built on your data, running in your infrastructure."
      capabilities={[
        {
          icon: <Brain className="h-5 w-5" />,
          title: "AI Automation",
          description:
            "Intelligent process automation that removes manual handling from high-volume, repetitive operations work.",
          features: ["Workflow automation", "Process optimisation", "Cost reduction"],
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "LLM Integration",
          description:
            "Large language models wired into your own systems and data, with guardrails and evaluation in place before launch.",
          features: ["Retrieval over your data", "API integration", "Fine-tuning & evals"],
        },
        {
          icon: <Target className="h-5 w-5" />,
          title: "Predictive Analytics",
          description:
            "Forecasting and scoring models that turn historical data into decisions your team can act on daily.",
          features: ["Data modelling", "Trend analysis", "Real-time predictions"],
        },
        {
          icon: <Layers className="h-5 w-5" />,
          title: "Intelligent Systems",
          description:
            "Systems that keep improving after launch, with monitoring so you can see when accuracy moves.",
          features: ["Machine learning", "Adaptive pipelines", "Accuracy monitoring"],
        },
      ]}
      engagement={[
        {
          title: "Process audit",
          description:
            "We map the workflow as it runs today, measure where the hours actually go, and identify what is worth automating.",
        },
        {
          title: "Pilot build",
          description:
            "One workflow, built end to end and measured against the manual baseline, so the value is proven before the rollout.",
        },
        {
          title: "Rollout & monitoring",
          description:
            "Remaining workflows are shipped in sequence with dashboards, alerting, and an agreed accuracy target per use case.",
        },
      ]}
      stats={[
        { value: "60%", label: "Typical manual-work reduction" },
        { value: "4 wks", label: "To first pilot in production" },
        { value: "100%", label: "Runs in your own cloud" },
        { value: "24/7", label: "Monitoring & alerting" },
      ]}
      cta={{
        title: "Have a process worth automating?",
        body: "Send us the workflow. We will tell you whether AI is the right tool for it — including when it is not.",
        primaryLabel: "Discuss AI Solutions",
      }}
    />
  );
}
