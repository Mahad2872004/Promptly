import React from "react";
import { ViewType } from "../types";
import { Rocket, Lightbulb, TrendingUp, Target, ArrowRight, CheckCircle, Users, Zap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import RevealGroup from "./ui/RevealGroup";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface StartupsViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function StartupsView({ setActiveView }: StartupsViewProps) {
  return (
    <div className="min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 lg:px-8 relative" style={accentVars("startup")}>
      <PageAtmosphere module="startup" />
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">
              <Rocket className="h-3 w-3" />
              Startup Focus
            </div>
            <p className="script-tagline mb-3">Momentum beats perfection.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Empowering{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Startup Success
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From MVP to scale, we provide the technical expertise and strategic guidance startups need to succeed in competitive markets.
            </p>
          </ScrollReveal>
        </div>

        {/* Why Startups Choose Us */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" itemClassName="h-full">
            {[
              { icon: <Zap className="h-6 w-6" />, title: "Speed to Market", desc: "Rapid MVP development to validate ideas and get to market fast" },
              { icon: <Lightbulb className="h-6 w-6" />, title: "Strategic Guidance", desc: "Product strategy and technical advisory for founders" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Scalable Solutions", desc: "Architecture that grows with your business" }
            ].map((feature, i) => (
              <div key={feature.title} className="p-6 rounded-2xl surface-card hover:border-orange-500/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5">
                    <span className="text-orange-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Startup Journey */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl surface-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Startup Journey with Promptly</h2>
            
            <div className="space-y-6">
              {[
                { phase: "Phase 1: Discovery", title: "Idea Validation", desc: "We help validate your concept with market research and technical feasibility analysis", items: ["Market research", "Competitor analysis", "Technical assessment"] },
                { phase: "Phase 2: MVP", title: "Rapid Prototyping", desc: "Build a functional MVP to test your assumptions with real users", items: ["Core features", "User testing", "Iterative development"] },
                { phase: "Phase 3: Launch", title: "Go-to-Market", desc: "Prepare for launch with production-ready infrastructure and support", items: ["Performance optimization", "Security hardening", "Deployment strategy"] },
                { phase: "Phase 4: Scale", title: "Growth & Expansion", desc: "Scale your product with enhanced features and infrastructure", items: ["Feature expansion", "Infrastructure scaling", "Team augmentation"] }
              ].map((journey, i) => (
                <div key={journey.phase} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-700/20 border border-orange-500/30 flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{journey.phase}</h3>
                    <h4 className="text-base font-semibold text-orange-400 mb-2">{journey.title}</h4>
                    <p className="text-sm text-slate-400 mb-3">{journey.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {journey.items.map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-300">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Metrics */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" itemClassName="h-full">
            {[
              { metric: "50+", label: "Startups Supported", icon: <Rocket className="h-5 w-5" /> },
              { metric: "85%", label: "Funding Success Rate", icon: <TrendingUp className="h-5 w-5" /> },
              { metric: "3x", label: "Faster Time to Market", icon: <Zap className="h-5 w-5" /> },
              { metric: "95%", label: "Client Satisfaction", icon: <Users className="h-5 w-5" /> }
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl surface-card text-center hover:border-orange-500/40 transition-all">
                <div className="flex justify-center mb-3 text-orange-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-white mb-1">{stat.metric}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Case Study */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-orange-500/10 to-orange-700/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Success Story: FinTech Startup</h2>
            
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8" itemClassName="h-full">
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Challenge</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  A fintech startup needed to build a secure payment processing platform from scratch with limited budget and tight timeline.
                </p>
                
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Solution</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  We delivered a complete MVP in 8 weeks with secure payment integration, real-time transaction monitoring, and scalable architecture.
                </p>
                
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Results</h3>
                <ul className="space-y-2">
                  {[
                    "Launched on time and under budget",
                    "Secured $2M seed funding",
                    "Processed $1M+ in transactions in first 3 months",
                    "Scaled to 100k+ users"
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Development Time</p>
                  <p className="text-2xl font-bold text-white">8 weeks</p>
                  <p className="text-xs text-orange-400 mt-1">vs industry avg 16 weeks</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Funding Raised</p>
                  <p className="text-2xl font-bold text-white">$2M</p>
                  <p className="text-xs text-orange-400 mt-1">Seed round</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">User Growth</p>
                  <p className="text-2xl font-bold text-white">100k+</p>
                  <p className="text-xs text-orange-400 mt-1">First 3 months</p>
                </div>
              </div>
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-orange-500/40"
          >
            Start Your Startup Journey
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
