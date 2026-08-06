import React from "react";
import { ViewType } from "../types";
import { Workflow, BarChart, Cpu, ArrowRight } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface DigitalTransformationViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function DigitalTransformationView({ setActiveView }: DigitalTransformationViewProps) {
  const services = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Process Automation",
      description: "Streamline business operations with intelligent automation solutions",
      features: ["Workflow optimization", "Task automation", "Efficiency gains"]
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Data Analytics", 
      description: "Transform raw data into actionable insights for better decision making",
      features: ["Business intelligence", "Data visualization", "Performance metrics"]
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "System Integration",
      description: "Connect disparate systems and create seamless digital workflows",
      features: ["API integration", "Legacy modernization", "System architecture"]
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Digital Strategy",
      description: "Comprehensive digital transformation planning and execution",
      features: ["Technology roadmap", "Change management", "Digital adoption"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 lg:px-8 relative" style={accentVars("product")}>
      <PageAtmosphere module="product" />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              Digital Transformation
            </span>
            <p className="script-tagline mb-3">Offline is a choice.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Modernize Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Business Operations
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Transform your business with digital solutions that improve efficiency, reduce costs, and drive growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={service.title}>
              <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>
                <div className="group relative p-6 rounded-2xl surface-card hover:border-emerald-500/40 transition-all hover:-translate-y-1">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 mb-4 transition-colors">
                      <span className="text-emerald-400">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40"
          >
            Discuss Digital Transformation
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
