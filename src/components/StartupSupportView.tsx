import React from "react";
import { ViewType } from "../types";
import { Rocket, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface StartupSupportViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function StartupSupportView({ setActiveView }: StartupSupportViewProps) {
  const services = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "MVP Development",
      description: "Rapid MVP development to validate your ideas and get to market fast",
      features: ["Quick prototyping", "Market validation", "Iterative development"]
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Product Strategy", 
      description: "Strategic guidance to build products that solve real market problems",
      features: ["Market research", "Product roadmap", "Feature prioritization"]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scaling Support",
      description: "Help your startup grow with scalable architecture and processes",
      features: ["Infrastructure scaling", "Team augmentation", "Performance optimization"]
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Technical Advisory",
      description: "Expert technical guidance for founders and startup teams",
      features: ["Architecture review", "Technology selection", "Best practices"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300" style={accentVars("startup")}>
      <PageAtmosphere module="startup" />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest font-mono">
              Startup Support
            </span>
            <p className="script-tagline mb-3">Ship before the runway ends.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 mb-4">
              Build & Scale Your{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                Startup Vision
              </span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              From idea to scale, we provide the technical expertise and strategic guidance startups need to succeed.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={service.title}>
              <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>
                <div className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 hover:border-orange-500/40 transition-all hover:-translate-y-1 shadow-md dark:shadow-none">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 group-hover:from-orange-500/20 group-hover:to-orange-500/10 mb-4 transition-colors">
                      <span className="text-orange-600 dark:text-orange-400">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-orange-500/40"
          >
            Discuss Startup Support
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
