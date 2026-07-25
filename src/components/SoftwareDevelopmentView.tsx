import React from "react";
import { ViewType } from "../types";
import { Code, Database, Globe, Smartphone, ArrowRight } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface SoftwareDevelopmentViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function SoftwareDevelopmentView({ setActiveView }: SoftwareDevelopmentViewProps) {
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Applications",
      description: "Custom web applications built with modern frameworks and best practices",
      features: ["React/Next.js", "Full-stack development", "Responsive design"]
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Apps", 
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "iOS & Android", "Cross-platform"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Backend Systems",
      description: "Robust backend architecture and API development for scalable applications",
      features: ["Node.js/Express", "REST APIs", "Database design"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cloud Solutions",
      description: "Cloud-native applications and infrastructure for modern businesses",
      features: ["AWS/GCP", "Serverless", "DevOps"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest font-mono">
              Software Development
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Custom Software for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Build robust, scalable software solutions tailored to your business requirements and technical needs.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={service.title}>
              <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>
                <div className="group relative p-6 rounded-2xl border border-slate-800/70 bg-slate-900/40 hover:border-indigo-500/40 transition-all hover:-translate-y-1">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 group-hover:from-indigo-500/20 group-hover:to-indigo-500/10 mb-4 transition-colors">
                      <span className="text-indigo-400">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40"
          >
            Discuss Software Development
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
