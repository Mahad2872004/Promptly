import React from "react";
import { ViewType } from "../types";
import { MessageSquare, Zap, Shield, BarChart, ArrowRight, CheckCircle, Clock, Users, Smartphone } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import RevealGroup from "./ui/RevealGroup";
import PageAtmosphere from "./ui/PageAtmosphere";
import { accentVars } from "../theme/tokens";

interface XSenderViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function XSenderView({ setActiveView }: XSenderViewProps) {
  return (
    <div className="min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 lg:px-8 relative" style={accentVars("product")}>
      <PageAtmosphere module="product" />
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              <MessageSquare className="h-3 w-3" />
              Flagship Product
            </div>
            <p className="script-tagline mb-3">WhatsApp, professionalised.</p>
            <h1 className="display-heading font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              xSender
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              WhatsApp Order Management System for E-commerce Businesses
            </p>
          </ScrollReveal>
        </div>

        {/* Key Features */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" itemClassName="h-full">
            {[
              { icon: <Zap className="h-6 w-6" />, title: "Instant Order Processing", desc: "Automated order capture and processing via WhatsApp" },
              { icon: <Shield className="h-6 w-6" />, title: "Secure Payments", desc: "Integrated payment gateway with end-to-end encryption" },
              { icon: <BarChart className="h-6 w-6" />, title: "Real-time Analytics", desc: "Track orders, revenue, and customer insights in real-time" },
            ].map((feature, i) => (
              <div key={feature.title} className="p-6 rounded-2xl surface-card transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                    <span className="text-emerald-400">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </ScrollReveal>

        {/* Design Document Section */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl surface-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Design Document</h2>
            
            <div className="space-y-6">
              {/* Problem Statement */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">Problem Statement</h3>
                <p className="text-slate-300 leading-relaxed">
                  E-commerce businesses struggle with manual order processing, leading to delays, errors, and poor customer experience. Traditional order management systems are complex and expensive for small businesses.
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">Solution</h3>
                <p className="text-slate-300 leading-relaxed">
                  xSender leverages WhatsApp's massive user base to provide a simple, intuitive order management system. Customers can place orders via WhatsApp, and businesses can manage them through a unified dashboard.
                </p>
              </div>

              {/* Technical Architecture */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">Technical Architecture</h3>
                <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4" itemClassName="h-full">
                  {[
                    "WhatsApp Business API Integration",
                    "Node.js Backend with Express",
                    "React Native Mobile App",
                    "MongoDB Database",
                    "Stripe Payment Integration",
                    "Real-time WebSocket Updates"
                  ].map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      {tech}
                    </div>
                  ))}
                </RevealGroup>
              </div>

              {/* User Flow */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">User Flow</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Customer browses products", desc: "Via WhatsApp catalog or website" },
                    { step: 2, title: "Places order", desc: "Sends product details via WhatsApp" },
                    { step: 3, title: "Automated processing", desc: "System captures and validates order" },
                    { step: 4, title: "Payment", desc: "Secure payment link sent via WhatsApp" },
                    { step: 5, title: "Confirmation", desc: "Order confirmation and tracking updates" }
                  ].map((flow) => (
                    <div key={flow.step} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                        {flow.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{flow.title}</h4>
                        <p className="text-sm text-slate-400">{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Case Study Section */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="mb-16">
          <div className="rounded-3xl surface-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Case Study: Fashion Retailer Implementation</h2>
            
            <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8" itemClassName="h-full">
              {/* Before */}
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-4">Before xSender</h3>
                <ul className="space-y-3">
                  {[
                    "Manual order entry via phone/email",
                    "30+ minutes per order processing time",
                    "40% order error rate",
                    "No real-time inventory tracking",
                    "Poor customer experience"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-1">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-4">After xSender</h3>
                <ul className="space-y-3">
                  {[
                    "Automated WhatsApp order capture",
                    "2 minutes per order processing time",
                    "95% reduction in order errors",
                    "Real-time inventory sync",
                    "Enhanced customer satisfaction"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealGroup>

            {/* Metrics */}
            <RevealGroup className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4" itemClassName="h-full">
              {[
                { metric: "15x", label: "Faster Processing", icon: <Clock className="h-5 w-5" /> },
                { metric: "95%", label: "Error Reduction", icon: <Shield className="h-5 w-5" /> },
                { metric: "3x", label: "Revenue Growth", icon: <BarChart className="h-5 w-5" /> },
                { metric: "4.8", label: "Customer Rating", icon: <Users className="h-5 w-5" /> }
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-slate-800/30 text-center">
                  <div className="flex justify-center mb-2 text-emerald-400">{stat.icon}</div>
                  <p className="text-2xl font-bold text-white">{stat.metric}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">
          <button
            onClick={() => setActiveView("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40"
          >
            Get Started with xSender
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
