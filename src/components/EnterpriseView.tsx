import React from "react";
import { ViewType } from "../types";
import { Building2, Shield, Globe, ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import RevealGroup from "./ui/RevealGroup";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface EnterpriseViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function EnterpriseView({ setActiveView }: EnterpriseViewProps) {
  return (
    <div className="min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 lg:px-8 relative" style={accentVars("ai")}>
      <PageAtmosphere module="ai" />
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
              <Building2 className="h-3 w-3" />
              Enterprise Solutions
            </div>
            <p className="script-tagline mb-3">Scale without the rewrite.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Enterprise-Grade{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Scalable, secure, and innovative solutions designed for enterprise-level operations and growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Enterprise Solutions */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" itemClassName="h-full">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "Enterprise Security", desc: "Bank-grade security and compliance for sensitive data" },
              { icon: <Globe className="h-6 w-6" />, title: "Global Scalability", desc: "Infrastructure that scales across regions and markets" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Performance Optimization", desc: "High-performance systems for enterprise workloads" }
            ].map((feature, i) => (
              <div key={feature.title} className="p-6 rounded-2xl surface-card hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                    <span className="text-blue-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Enterprise Capabilities */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl surface-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Enterprise Capabilities</h2>
            
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" itemClassName="h-full">
              {[
                { title: "Cloud Architecture", desc: "Scalable cloud infrastructure design and implementation", features: ["AWS/Azure/GCP", "Microservices", "Serverless"] },
                { title: "Data Analytics", desc: "Enterprise-grade data processing and business intelligence", features: ["Big Data", "Machine Learning", "Real-time Analytics"] },
                { title: "Security & Compliance", desc: "Comprehensive security frameworks and compliance", features: ["SOC 2", "GDPR", "HIPAA"] },
                { title: "Integration Services", desc: "Seamless system integration and API development", features: ["REST APIs", "GraphQL", "Enterprise Service Bus"] }
              ].map((capability) => (
                <div key={capability.title} className="p-6 rounded-xl bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{capability.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300">{feature}</span>
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
              { metric: "15+", label: "Enterprise Clients", icon: <Building2 className="h-5 w-5" /> },
              { metric: "99.99%", label: "Uptime SLA", icon: <Shield className="h-5 w-5" /> },
              { metric: "10x", label: "Performance Gain", icon: <Zap className="h-5 w-5" /> },
              { metric: "24/7", label: "Support Coverage", icon: <Users className="h-5 w-5" /> }
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl surface-card text-center hover:border-blue-500/40 transition-all">
                <div className="flex justify-center mb-3 text-blue-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-white mb-1">{stat.metric}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Case Study */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Success Story: Financial Services Enterprise</h2>
            
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8" itemClassName="h-full">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Challenge</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  A financial services enterprise needed to modernize legacy systems while maintaining strict security and compliance requirements.
                </p>
                
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Solution</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  We delivered a complete digital transformation with cloud migration, microservices architecture, and enterprise-grade security.
                </p>
                
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Results</h3>
                <ul className="space-y-2">
                  {[
                    "99.99% uptime achieved",
                    "10x performance improvement",
                    "Full regulatory compliance maintained",
                    "50% reduction in operational costs"
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Uptime Achievement</p>
                  <p className="text-2xl font-bold text-white">99.99%</p>
                  <p className="text-xs text-blue-400 mt-1">SLA compliance</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Performance Gain</p>
                  <p className="text-2xl font-bold text-white">10x</p>
                  <p className="text-xs text-blue-400 mt-1">faster processing</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Cost Reduction</p>
                  <p className="text-2xl font-bold text-white">50%</p>
                  <p className="text-xs text-blue-400 mt-1">operational savings</p>
                </div>
              </div>
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40"
          >
            Transform Your Enterprise
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
