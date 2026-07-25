import React from "react";
import { ViewType } from "../types";
import { ShoppingCart, Package, BarChart, ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface EcommerceViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function EcommerceView({ setActiveView }: EcommerceViewProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-pink-400 mb-6">
              <ShoppingCart className="h-3 w-3" />
              E-commerce Focus
            </div>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Powering{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Digital Retail
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Transform your e-commerce business with cutting-edge technology and seamless shopping experiences.
            </p>
          </ScrollReveal>
        </div>

        {/* E-commerce Solutions */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Package className="h-6 w-6" />, title: "Custom Platforms", desc: "Tailored e-commerce solutions for your unique business needs" },
              { icon: <BarChart className="h-6 w-6" />, title: "Analytics & Insights", desc: "Data-driven decisions with comprehensive analytics dashboards" },
              { icon: <Zap className="h-6 w-6" />, title: "Performance Optimization", desc: "Lightning-fast loading times and seamless checkout experience" }
            ].map((feature, i) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-slate-800/70 bg-slate-900/40 hover:border-pink-500/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5">
                    <span className="text-pink-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Our E-commerce Expertise */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/40 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">E-commerce Solutions We Deliver</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Custom Store Development", desc: "Build unique shopping experiences with custom platforms", features: ["React/Next.js", "Node.js backend", "MongoDB/PostgreSQL"] },
                { title: "Platform Integration", desc: "Seamlessly integrate with existing platforms", features: ["Shopify", "WooCommerce", "Magento"] },
                { title: "Payment Solutions", desc: "Secure and flexible payment processing", features: ["Stripe", "PayPal", "Local gateways"] },
                { title: "Mobile Commerce", desc: "Native mobile apps for enhanced shopping", features: ["React Native", "iOS & Android", "Push notifications"] }
              ].map((solution) => (
                <div key={solution.title} className="p-6 rounded-xl bg-slate-800/30">
                  <h3 className="text-lg font-semibold text-white mb-2">{solution.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{solution.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Metrics */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "30+", label: "E-commerce Projects", icon: <ShoppingCart className="h-5 w-5" /> },
              { metric: "40%", label: "Conversion Increase", icon: <TrendingUp className="h-5 w-5" /> },
              { metric: "2x", label: "Revenue Growth", icon: <BarChart className="h-5 w-5" /> },
              { metric: "99.9%", label: "Uptime Guarantee", icon: <Zap className="h-5 w-5" /> }
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl border border-slate-800/70 bg-slate-900/40 text-center hover:border-pink-500/40 transition-all">
                <div className="flex justify-center mb-3 text-pink-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-white mb-1">{stat.metric}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Case Study */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Success Story: Fashion Brand</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-pink-400 mb-4">Challenge</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  A growing fashion brand struggled with slow website performance, limited mobile experience, and manual order processing.
                </p>
                
                <h3 className="text-lg font-semibold text-pink-400 mb-4">Solution</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  We built a custom e-commerce platform with mobile-first design, integrated xSender for WhatsApp ordering, and implemented advanced analytics.
                </p>
                
                <h3 className="text-lg font-semibold text-pink-400 mb-4">Results</h3>
                <ul className="space-y-2">
                  {[
                    "40% increase in conversion rate",
                    "60% faster page load times",
                    "2.5x revenue growth in 6 months",
                    "95% reduction in order processing time"
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">+40%</p>
                  <p className="text-xs text-pink-400 mt-1">vs previous platform</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Page Speed</p>
                  <p className="text-2xl font-bold text-white">0.8s</p>
                  <p className="text-xs text-pink-400 mt-1">load time</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50">
                  <p className="text-xs text-slate-400 mb-1">Revenue Growth</p>
                  <p className="text-2xl font-bold text-white">2.5x</p>
                  <p className="text-xs text-pink-400 mt-1">in 6 months</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] hover:shadow-pink-500/40"
          >
            Transform Your E-commerce Business
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
