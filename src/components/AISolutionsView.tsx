import React from "react";
import { ViewType } from "../types";
import { Brain, Zap, Target, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface AISolutionsViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function AISolutionsView({ setActiveView }: AISolutionsViewProps) {
  const services = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Automation",
      description: "Intelligent process automation to reduce manual work and increase efficiency",
      features: ["Workflow automation", "Process optimization", "Cost reduction"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "LLM Integration", 
      description: "Custom large language model solutions tailored to your business needs",
      features: ["Custom model training", "API integration", "Fine-tuning"]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Predictive Analytics",
      description: "Data-driven insights and forecasting to power better decision making",
      features: ["Data modeling", "Trend analysis", "Real-time predictions"]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Intelligent Systems",
      description: "Smart systems that learn and adapt to improve over time",
      features: ["Machine learning", "Neural networks", "Adaptive algorithms"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              AI Solutions
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Intelligent Automation for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Modern Business
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to automate processes, gain insights, and stay ahead of the competition.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={service.title}>
              <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>
                <div className="group relative p-6 rounded-2xl border border-slate-800/70 bg-slate-900/40 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 group-hover:from-cyan-500/20 group-hover:to-cyan-500/10 mb-4 transition-colors">
                      <span className="text-cyan-400">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40"
          >
            Discuss AI Solutions
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
