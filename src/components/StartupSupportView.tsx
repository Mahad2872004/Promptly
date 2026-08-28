import React from "react";
import { ViewType } from "../types";
import { Rocket, Lightbulb, TrendingUp, Compass } from "lucide-react";
import ServiceDetailPage from "./ui/ServiceDetailPage";

interface StartupSupportViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function StartupSupportView({
  setActiveView,
}: StartupSupportViewProps) {
  return (
    <ServiceDetailPage
      setActiveView={setActiveView}
      eyebrow="Startup Support"
      title="Ship the MVP before the runway moves"
      lead="An engineering team for founders without one yet — scoped to get a real product in front of real users, then to scale it only when the usage says so."
      capabilities={[
        {
          icon: <Rocket className="h-5 w-5" />,
          title: "MVP Development",
          description:
            "The smallest build that genuinely tests the idea, shipped to production rather than to a prototype link.",
          features: ["Rapid prototyping", "Market validation", "Weekly iteration"],
        },
        {
          icon: <Lightbulb className="h-5 w-5" />,
          title: "Product Strategy",
          description:
            "Deciding what not to build. We cut the roadmap down to what the first hundred users actually need.",
          features: ["Market research", "Product roadmap", "Feature prioritisation"],
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Scaling Support",
          description:
            "When traction arrives, the architecture and the team both need to move. We handle both without a rewrite.",
          features: ["Infrastructure scaling", "Team augmentation", "Performance work"],
        },
        {
          icon: <Compass className="h-5 w-5" />,
          title: "Technical Advisory",
          description:
            "A senior engineer in the room for the decisions a non-technical founder should not have to make alone.",
          features: ["Architecture review", "Technology selection", "Diligence support"],
        },
      ]}
      engagement={[
        {
          title: "Scope sprint",
          description:
            "One week to turn the idea into a defined MVP scope, a technical approach, a timeline and a fixed price.",
        },
        {
          title: "Build to launch",
          description:
            "Weekly deployable builds you can put in front of users while the rest is still being built.",
        },
        {
          title: "Post-launch iteration",
          description:
            "We instrument the product, watch what people actually do, and iterate against that rather than the roadmap.",
        },
      ]}
      stats={[
        { value: "6–10 wks", label: "Idea to launched MVP" },
        { value: "Fixed", label: "MVP price, agreed upfront" },
        { value: "100%", label: "IP and repository yours" },
        { value: "1 wk", label: "Scope sprint turnaround" },
      ]}
      cta={{
        title: "Have an idea and no engineering team?",
        body: "Tell us what you want to test. We will come back with a scope, a timeline and a fixed price — or advise you not to build it yet.",
        primaryLabel: "Discuss Your MVP",
      }}
    />
  );
}
