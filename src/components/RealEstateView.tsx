import React from "react";
import { ViewType } from "../types";
import { Building, Home, Map, ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import RevealGroup from "./ui/RevealGroup";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface RealEstateViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function RealEstateView({ setActiveView }: RealEstateViewProps) {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300" style={accentVars("dev")}>
      <PageAtmosphere module="dev" />
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-6">
              <Building className="h-3 w-3" />
              PropTech Solutions
            </div>
            <p className="script-tagline mb-3">Listings that sell themselves.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Transforming{" "}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Real Estate
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Innovative PropTech solutions that modernize property management and enhance customer experiences.
            </p>
          </ScrollReveal>
        </div>

        {/* PropTech Solutions */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" itemClassName="h-full">
            {[
              { icon: <Home className="h-6 w-6" />, title: "Property Management", desc: "Streamlined property management with digital tools" },
              { icon: <Map className="h-6 w-6" />, title: "Virtual Tours", desc: "Immersive 3D virtual tours and property visualization" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Market Analytics", desc: "Data-driven insights for property investment decisions" }
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 hover:border-teal-500/40 transition-all shadow-md dark:shadow-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5">
                    <span className="text-teal-600 dark:text-teal-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Our PropTech Expertise */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 p-8 shadow-lg dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Real Estate Technology Solutions</h2>
            
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" itemClassName="h-full">
              {[
                { title: "Property Management Systems", desc: "Comprehensive management platforms for real estate firms", features: ["Tenant management", "Maintenance tracking", "Financial reporting"] },
                { title: "Virtual Property Tours", desc: "Interactive 3D tours and augmented reality experiences", features: ["360° views", "AR integration", "Mobile apps"] },
                { title: "Investment Analytics", desc: "Advanced analytics for property investment decisions", features: ["Market trends", "ROI calculations", "Risk assessment"] },
                { title: "Smart Building Integration", desc: "IoT integration for modern smart buildings", features: ["Energy monitoring", "Security systems", "Automated controls"] }
              ].map((solution) => (
                <div key={solution.title} className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{solution.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{solution.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700/50 text-xs text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* Success Metrics */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" itemClassName="h-full">
            {[
              { metric: "20+", label: "Real Estate Projects", icon: <Building className="h-5 w-5" /> },
              { metric: "50%", label: "Operational Efficiency", icon: <Zap className="h-5 w-5" /> },
              { metric: "3x", label: "Lead Generation", icon: <TrendingUp className="h-5 w-5" /> },
              { metric: "90%", label: "Client Satisfaction", icon: <Users className="h-5 w-5" /> }
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 text-center hover:border-teal-500/40 transition-all shadow-sm dark:shadow-none">
                <div className="flex justify-center mb-3 text-teal-600 dark:text-teal-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.metric}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Case Study */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-teal-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-br dark:from-teal-950/40 dark:to-cyan-950/40 p-8 shadow-lg dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Success Story: Property Management Firm</h2>
            
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8" itemClassName="h-full">
              <div>
                <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">Challenge</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  A property management firm struggled with manual processes, scattered data, and poor tenant communication.
                </p>
                
                <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">Solution</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  We developed a comprehensive property management platform with automated workflows, tenant portals, and real-time analytics.
                </p>
                
                <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">Results</h3>
                <ul className="space-y-2">
                  {[
                    "50% improvement in operational efficiency",
                    "70% reduction in manual paperwork",
                    "3x increase in lead generation",
                    "95% tenant satisfaction rate"
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Efficiency Gain</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">+50%</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">operational efficiency</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Paperwork Reduction</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">70%</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">less manual work</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Lead Generation</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">3x</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">increase</p>
                </div>
              </div>
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] hover:shadow-teal-500/40"
          >
            Modernize Your Real Estate Business
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
