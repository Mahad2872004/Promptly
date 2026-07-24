import React, { useState } from "react";
import { ViewType } from "../types";
import { AGENCY_SERVICES } from "../data";
import { Cpu, Bot, Monitor, Smartphone, CheckCircle2, ArrowRight, Shield, Rocket } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface ServicesViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function ServicesView({ setActiveView }: ServicesViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("ai-powered-solutions");

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
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              AI-First Solutions
            </span>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Digital Solutions for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Real Business
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              AI-powered solutions, software development, digital transformation, and startup support — every service built with intelligent automation at the core.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Selector Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" id="services-selector-tabs">
            {AGENCY_SERVICES.map((serv, index) => {
              const isSelected = serv.id === selectedServiceId;
              const gradients = {
                "ai-powered-solutions": "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
                "software-development": "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
                "digital-transformation": "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
                "startup-support": "from-violet-500/20 via-purple-500/20 to-pink-500/20"
              };
              const borderColors = {
                "ai-powered-solutions": "border-cyan-500/50",
                "software-development": "border-blue-500/50",
                "digital-transformation": "border-emerald-500/50",
                "startup-support": "border-violet-500/50"
              };
              const iconColors = {
                "ai-powered-solutions": "text-cyan-400",
                "software-development": "text-blue-400",
                "digital-transformation": "text-emerald-400",
                "startup-support": "text-violet-400"
              };

              return (
                <button
                  key={serv.id}
                  onClick={() => setSelectedServiceId(serv.id)}
                  className={`group relative flex flex-col items-center justify-center p-8 rounded-3xl border text-center transition-all duration-500 select-none cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${
                      isSelected
                        ? `bg-gradient-to-br ${gradients[serv.id as keyof typeof gradients]} ${borderColors[serv.id as keyof typeof borderColors]} shadow-2xl scale-[1.03]`
                        : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/60 hover:scale-[1.01]"
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${serv.title} service`}
                >
                  {/* Active indicator dot */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className={`relative inline-flex h-2 w-2 rounded-full ${iconColors[serv.id as keyof typeof iconColors]}`} />
                    </div>
                  )}
                  
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[serv.id as keyof typeof gradients]} opacity-0 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                  
                  {/* Decorative glow */}
                  {isSelected && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-xl opacity-50" />
                  )}
                  
                  <div className={`relative p-4 rounded-2xl mb-5 transition-all duration-500 backdrop-blur-sm
                    ${isSelected 
                      ? `bg-slate-950/50 ${iconColors[serv.id as keyof typeof iconColors]} scale-110 shadow-lg` 
                      : "bg-slate-950/50 text-slate-400 group-hover:scale-105 group-hover:bg-slate-950/70"}
                  `}
                  >
                    {serv.id === "ai-powered-solutions" && <Bot className="w-7 h-7" />}
                    {serv.id === "software-development" && <Monitor className="w-7 h-7" />}
                    {serv.id === "digital-transformation" && <Cpu className="w-7 h-7" />}
                    {serv.id === "startup-support" && <Smartphone className="w-7 h-7" />}
                  </div>

                  <span className={`relative font-sans font-bold text-base sm:text-lg transition-colors duration-300
                    ${isSelected ? "text-white" : "text-slate-200 group-hover:text-white"}
                  `}>
                    {serv.title}
                  </span>

                  {serv.badge && (
                    <span className={`relative mt-3 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border
                      ${isSelected 
                        ? `bg-slate-950/80 ${iconColors[serv.id as keyof typeof iconColors]} ${borderColors[serv.id as keyof typeof borderColors]}` 
                        : "bg-slate-950/50 border-slate-800 text-slate-500 group-hover:border-slate-700"}
                    `}>
                      {serv.badge}
                    </span>
                  )}

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Selection indicator line */}
                  {isSelected && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[serv.id as keyof typeof gradients]}`} />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Service Dashboard */}
        <ScrollReveal delay={0.2}>
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/40 to-slate-950/40 backdrop-blur-md transition-all duration-500"
            key={selectedServiceId}
          >
            {/* Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`h-1.5 w-20 bg-gradient-to-r ${activeService.heroColor} rounded-full animate-pulse`} />

              <div className="space-y-4">
                <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest font-semibold">
                  Service Overview
                </span>
                <h2 className="font-sans text-3xl font-extrabold text-slate-100 md:text-4xl leading-tight">
                  {activeService.title}
                </h2>
              </div>

              <p className="text-slate-300 text-base leading-relaxed font-sans">
                {activeService.description}
              </p>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/50 space-y-4">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">
                  Why This Service
                </span>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                      <Shield className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span>Enterprise-grade security standards</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <Rocket className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Fast deployment & time-to-market</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span>AI-first approach & automation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-slate-800/60 lg:pl-8">
              <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest block font-semibold">
                What's Included
              </span>

              <div className="space-y-4">
                {activeService.details.map((detail, index) => (
                  <div key={index}>
                    <ScrollReveal delay={index * 0.05}>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/30 hover:bg-slate-950/50 border border-slate-900/60 transition-all hover:border-slate-700 hover:translate-x-1 cursor-default">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 mt-0.5 group-hover:bg-cyan-500/30 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span className="text-sm text-slate-300 font-sans leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookBrief}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold cursor-pointer hover:scale-105 transition-transform"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 text-[#020617]" />
                </button>

                <button
                  onClick={() => setActiveView("portfolio")}
                  className="btn-secondary flex-1 rounded-full px-6 py-4 text-sm font-bold text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Process Section */}
        <ScrollReveal delay={0.3}>
          <div className="border-t border-slate-800/40 py-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
                Our Process
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight text-white sm:text-3xl mt-4">
                How We Deliver Excellence
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-3xl border border-slate-800/60 bg-slate-900/30 hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  01 / SPEED
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100 mt-2">
                  Agile Weekly Milestones
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-3">
                  Weekly deployable builds with real-time feedback loops. We move fast without cutting corners.
                </p>
              </div>

              <div className="group p-6 rounded-3xl border border-slate-800/60 bg-slate-900/30 hover:border-emerald-500/30 hover:bg-slate-900/50 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                  02 / SECURITY
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100 mt-2">
                  Zero-Leak Guardrails
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-3">
                  All credentials isolated in server-side environments. Enterprise-grade security by default.
                </p>
              </div>

              <div className="group p-6 rounded-3xl border border-slate-800/60 bg-slate-900/30 hover:border-violet-500/30 hover:bg-slate-900/50 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-violet-400" />
                </div>
                <span className="text-xs font-bold font-mono text-violet-400 uppercase tracking-wider">
                  03 / QUALITY
                </span>
                <h3 className="font-sans font-bold text-lg text-slate-100 mt-2">
                  Continuous Handoff
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-3">
                  Clean, documented code delivered for long-term ownership. Built to scale and maintain.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}