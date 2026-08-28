import React from "react";
import { ViewType } from "../types";
import { Zap, Lightbulb, TrendingUp } from "lucide-react";
import IndustryPage from "./ui/IndustryPage";

interface StartupsViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function StartupsView({ setActiveView }: StartupsViewProps) {
  return (
    <IndustryPage
      setActiveView={setActiveView}
      eyebrow="Startups"
      title="Get to a real product before the runway moves"
      lead="Early-stage teams do not need an agency's process. They need the smallest honest build that proves the idea, and an architecture that will not have to be thrown away at Series A."
      strengths={[
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Speed to market",
          description:
            "A defined MVP scope in a week and a launched product in weeks, not a discovery phase that bills for two months.",
        },
        {
          icon: <Lightbulb className="h-5 w-5" />,
          title: "Strategic guidance",
          description:
            "Product and technical advisory for founders without a CTO — including telling you when not to build something.",
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Architecture that scales",
          description:
            "Simple enough to ship now, structured so growth is a scaling problem rather than a rewrite.",
        },
      ]}
      solutions={[
        {
          title: "Idea validation",
          description:
            "Market research and technical feasibility work that tells you whether the thing is worth building at all.",
          tags: ["Market research", "Competitor analysis", "Feasibility"],
        },
        {
          title: "Rapid prototyping",
          description:
            "A functional MVP in production, testing your actual assumptions against real users rather than a click-through demo.",
          tags: ["Core features", "User testing", "Weekly iteration"],
        },
        {
          title: "Go-to-market readiness",
          description:
            "Production infrastructure, security hardening and a deploy process, so launch day is not the risky part.",
          tags: ["Performance", "Security", "Deployment"],
        },
        {
          title: "Growth & expansion",
          description:
            "When traction arrives: infrastructure scaling, feature expansion and engineers embedded with your team.",
          tags: ["Scaling", "Team augmentation", "Feature expansion"],
        },
      ]}
      stats={[
        { value: "50+", label: "Startups supported" },
        { value: "85%", label: "Funding success rate" },
        { value: "3x", label: "Faster time to market" },
        { value: "95%", label: "Client satisfaction" },
      ]}
      caseStudy={{
        title: "FinTech startup: secure payments MVP in eight weeks",
        challenge:
          "A fintech startup needed a secure payment processing platform built from scratch, on a limited budget and against a fixed fundraising timeline.",
        solution:
          "We delivered a complete MVP in eight weeks with secure payment integration, real-time transaction monitoring, and an architecture that held as volume grew.",
        results: [
          "Launched on time and under budget",
          "Secured $2M seed funding",
          "Processed $1M+ in transactions in the first three months",
          "Scaled past 100k users without a rewrite",
        ],
        figures: [
          { value: "8 wks", label: "Idea to launch", note: "full MVP in production" },
          { value: "$2M", label: "Seed raised", note: "post-launch round" },
          { value: "100k+", label: "Users", note: "on the original architecture" },
        ],
      }}
      cta={{
        title: "Have an idea and no engineering team?",
        body: "Tell us what you want to test. We come back with a scope, a timeline and a fixed price.",
        primaryLabel: "Talk to Us",
      }}
    />
  );
}
