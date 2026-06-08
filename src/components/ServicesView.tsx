import React, { useState } from "react";
import { ViewType } from "../types";
import { AGENCY_SERVICES } from "../data";
import { Cpu, Bot, Monitor, Smartphone, CheckCircle2, ArrowRight, Shield, Rocket } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface ServicesViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function ServicesView({ setActiveView }: ServicesViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("web-applications");

  const activeService =
    AGENCY_SERVICES.find((s) => s.id === selectedServiceId) || AGENCY_SERVICES[0];

  const handleBookBrief = () => {
    setActiveView("contact");
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-7xl space-y-16">

        {/* Header Block */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              AI-First Solutions
            </span>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Web, AI & App Development
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              From web applications and AI automation to full AI systems and mobile apps—every competency is built with intelligent, production-grade AI at the core.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Selector Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="services-selector-tabs">
            {AGENCY_SERVICES.map((serv) => {
              const isSelected = serv.id === selectedServiceId;

              return (
                <button
                  key={serv.id}
                  onClick={() => setSelectedServiceId(serv.id)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 select-none cursor-pointer
                    ${
                      isSelected
                        ? "bg-[#020617] border-cyan-505 shadow-xl shadow-cyan-950/15 scale-[1.02]"
                        : "bg-slate-900/40 border-slate-800/60 hover:border-slate-705 hover:bg-slate-900/70"
                    }
                  `}
                >
                  <div
                    className={`p-2.5 rounded-xl mb-3
                    ${isSelected ? "bg-cyan-950/45 text-cyan-400" : "bg-slate-950 text-slate-400"}
                  `}
                  >
                    {serv.id === "web-applications" && <Monitor className="w-5 h-5" />}
                    {serv.id === "ai-automation" && <Bot className="w-5 h-5" />}
                    {serv.id === "ai-systems" && <Cpu className="w-5 h-5" />}
                    {serv.id === "app-development" && <Smartphone className="w-5 h-5" />}
                  </div>

                  <span className="font-sans font-bold text-xs sm:text-sm text-slate-200">
                    {serv.title}
                  </span>

                  {serv.badge && (
                    <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] bg-slate-950 border border-slate-800 text-slate-500 uppercase tracking-wide">
                      {serv.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Service Dashboard */}
        <ScrollReveal delay={0.2}>
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-md"
          >
            {/* Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`h-1.5 w-16 bg-gradient-to-r ${activeService.heroColor} rounded-full`} />

              <div className="space-y-3">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                  Active Specification Overview
                </span>
                <h2 className="font-sans text-2xl font-extrabold text-slate-100 md:text-3xl">
                  {activeService.title}
                </h2>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                {activeService.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850 space-y-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block">
                  INTEGRITY MATRIX STANDARD
                </span>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Zero-leak credential proxies implemented</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Rocket className="w-4 h-4 text-teal-400" />
                  <span>Cloud optimized production pipelines</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-7 space-y-5 lg:border-l lg:border-slate-800/60 lg:pl-8">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-semibold">
                STANDARDIZED CORE MODULES DEPLOYED
              </span>

              <div className="space-y-3.5">
                {activeService.details.map((detail, index) => (
                  <ScrollReveal key={index} delay={index * 0.05}>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 border border-slate-900/60 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookBrief}
                  className="btn-primary flex-1 flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-xs cursor-pointer"
                >
                  Schedule Kickoff Brief
                  <ArrowRight className="w-4 h-4 text-[#020617]" />
                </button>

                <button
                  onClick={() => setActiveView("portfolio")}
                  className="btn-secondary flex-1 rounded-full px-5 py-3 text-xs font-bold text-center cursor-pointer"
                >
                  Inspect Case Studies
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* QA Section */}
        <ScrollReveal delay={0.3}>
          <div className="border-t border-slate-808/30 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

              <div className="space-y-2.5">
                <span className="text-xs font-bold font-mono text-cyan-400">
                  01 / MICRO-SPRINT FLOW
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100">
                  Agile Weekly Milestones
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Weekly deployable builds with real-time feedback loops.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold font-mono text-teal-400">
                  02 / EXTREME SECURITY
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100">
                  Zero-Leak Guardrails
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All credentials isolated in server-side environments.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold font-mono text-cyan-400">
                  03 / LIFETIME CARE
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100">
                  Continuous Handoff
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clean, documented code delivered for long-term ownership.
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}