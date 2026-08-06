import React from "react";
import { ViewType } from "../types";
import { Package, ArrowRight, Sparkles, Zap, Shield, BarChart } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface ProductsViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function ProductsView({ setActiveView }: ProductsViewProps) {
  const products = [
    {
      id: "xsender",
      name: "xSender",
      description: "WhatsApp Order Management System for E-commerce",
      status: "Live",
      icon: <Package className="h-6 w-6" />,
      color: "emerald",
      features: ["Instant Order Processing", "Secure Payments", "Real-time Analytics"],
      link: "xsender"
    },
    {
      id: "ai-assistant",
      name: "AI Assistant",
      description: "Intelligent customer support automation",
      status: "Coming Soon",
      icon: <Sparkles className="h-6 w-6" />,
      color: "cyan",
      features: ["Natural Language Processing", "24/7 Support", "Multi-language"],
      link: "home"
    },
    {
      id: "analytics-platform",
      name: "Analytics Platform",
      description: "Business intelligence and data visualization",
      status: "In Development",
      icon: <BarChart className="h-6 w-6" />,
      color: "indigo",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Reports"],
      link: "home"
    },
    {
      id: "payment-gateway",
      name: "Payment Gateway",
      description: "Seamless payment processing solution",
      status: "Coming Soon",
      icon: <Shield className="h-6 w-6" />,
      color: "violet",
      features: ["Multi-currency Support", "Fraud Detection", "Instant Settlements"],
      link: "home"
    }
  ];

  const colorClasses = {
    emerald: "border-emerald-500/40 hover:border-emerald-500/60 bg-emerald-500/10",
    cyan: "border-cyan-500/40 hover:border-cyan-500/60 bg-cyan-500/10",
    indigo: "border-indigo-500/40 hover:border-indigo-500/60 bg-indigo-500/10",
    violet: "border-violet-500/40 hover:border-violet-500/60 bg-violet-500/10"
  };

  const statusColors = {
    "Live": "bg-emerald-500/20 text-emerald-400",
    "Coming Soon": "bg-amber-500/20 text-amber-400",
    "In Development": "bg-blue-500/20 text-blue-400"
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 lg:px-8 relative" style={accentVars("product")}>
      <PageAtmosphere module="product" />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              <Package className="h-3 w-3" />
              Our Products
            </div>
            <p className="script-tagline mb-3">We build ours too.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Business Growth
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Production-ready products designed to solve real business challenges and drive digital transformation.
            </p>
          </ScrollReveal>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {products.map((product, i) => (
            <div key={product.id}>
              <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>
                <div 
                  className={`group relative p-8 rounded-3xl border-2 transition-all hover:-translate-y-2 cursor-pointer ${colorClasses[product.color as keyof typeof colorClasses]}`}
                  onClick={() => setActiveView(product.link as ViewType)}
                >
                  <div className="relative">
                    {/* Status Badge */}
                    <div className="absolute top-0 right-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[product.status as keyof typeof statusColors]}`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/50 mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{product.icon}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                          <Zap className="h-4 w-4 text-emerald-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Development Roadmap */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl surface-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Development Roadmap</h2>
            
            <div className="space-y-6">
              {[
                { phase: "Q3 2026", items: ["xSender v2.0 Launch", "AI Assistant Beta", "Analytics Platform MVP"] },
                { phase: "Q4 2026", items: ["Payment Gateway Launch", "Mobile App Release", "Enterprise Features"] },
                { phase: "Q1 2027", items: ["AI Assistant v1.0", "Advanced Analytics", "API Platform"] }
              ].map((quarter, i) => (
                <div key={quarter.phase} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-sm">Q{i + 3}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{quarter.phase}</h3>
                    <ul className="space-y-2">
                      {quarter.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <div className="p-8 rounded-3xl border border-slate-800/70 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in Our Products?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Get early access to our upcoming products or schedule a demo for our existing solutions.
            </p>
            <button
              onClick={() => setActiveView("contact")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
