import React from "react";
import { ViewType } from "../types";
import { Building2, Shield, Globe, ArrowRight, CheckCircle, TrendingUp, Users, Zap, Lock, Server } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import RevealGroup from "./ui/RevealGroup";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface EnterpriseViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function EnterpriseView({ setActiveView }: EnterpriseViewProps) {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300" style={accentVars("ai")}>
      <PageAtmosphere module="ai" />
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6">
              <Shield className="h-3 w-3" />
              Enterprise Solutions
            </div>
            <p className="script-tagline mb-3">Governance that scales.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Scaling for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Enterprise Impact
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Mission-critical digital solutions engineered for large enterprises with uncompromising security and reliability requirements.
            </p>
          </ScrollReveal>
        </div>

        {/* Enterprise Solutions */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" itemClassName="h-full">
            {[
              { icon: <Lock className="h-6 w-6" />, title: "Enterprise Security", desc: "Bank-grade security protocols, compliance frameworks, and data protection" },
              { icon: <Server className="h-6 w-6" />, title: "Scalable Infrastructure", desc: "High-availability cloud architecture designed for massive scale" },
              { icon: <Globe className="h-6 w-6" />, title: "Global Deployment", desc: "Multi-region deployments with low latency and global compliance" }
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 hover:border-blue-500/40 transition-all shadow-md dark:shadow-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                    <span className="text-blue-600 dark:text-blue-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Our Enterprise Expertise */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 p-8 shadow-lg dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Enterprise Capabilities</h2>
            
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" itemClassName="h-full">
              {[
                { title: "Legacy System Modernization", desc: "Migrate legacy monoliths to modern microservices architecture", features: ["Cloud migration", "API development", "Database transformation"] },
                { title: "Enterprise AI Integration", desc: "Deploy secure, private AI models tailored to your business data", features: ["Custom LLMs", "Private deployments", "Data privacy"] },
                { title: "Compliance & Governance", desc: "Ensure adherence to industry standards and regulations", features: ["SOC 2", "HIPAA", "GDPR compliance"] },
                { title: "24/7 Enterprise Support", desc: "Dedicated engineering team with SLA guarantees", features: ["Dedicated Lead", "SLA guarantees", "Incident response"] }
              ].map((capability) => (
                <div key={capability.title} className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{capability.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{capability.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature) => (
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
              { metric: "99.99%", label: "System Availability", icon: <Server className="h-5 w-5" /> },
              { metric: "10x", label: "Scale Capability", icon: <TrendingUp className="h-5 w-5" /> },
              { metric: "50%", label: "Infrastructure Cost Reduction", icon: <Zap className="h-5 w-5" /> },
              { metric: "0", label: "Security Breaches", icon: <Shield className="h-5 w-5" /> }
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/40 text-center hover:border-blue-500/40 transition-all shadow-sm dark:shadow-none">
                <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.metric}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Case Study */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-blue-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-indigo-950/40 p-8 shadow-lg dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Success Story: Financial Services Enterprise</h2>
            
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8" itemClassName="h-full">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Challenge</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  A global financial institution needed to modernize legacy core infrastructure while maintaining strict regulatory compliance.
                </p>
                
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Solution</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  We engineered a cloud-native microservices architecture with bank-grade encryption, zero-downtime deployment, and real-time auditing.
                </p>
                
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Results</h3>
                <ul className="space-y-2">
                  {[
                    "99.99% uptime achieved across global regions",
                    "10x increase in transaction processing throughput",
                    "50% reduction in cloud infrastructure spend",
                    "Full SOC 2 Type II compliance certification"
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">System Uptime</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">99.99%</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">SLA guaranteed</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Throughput</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">10x</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">higher capacity</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cost Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">50%</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">infra reduction</p>
                </div>
              </div>
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40"
          >
            Schedule an Enterprise Architecture Review
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
