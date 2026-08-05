import React, { useState } from "react";

import { ViewType } from "../types";

import {

  AGENCY_SERVICES,

  CASE_STUDIES,

  CLIENT_TESTIMONIALS,

  TEAM_MEMBERS,

} from "../data";

import {

  CLIENT_LOGOS,

  AGENCY_STATS,

  STAT_CARD_STYLES,

  PROCESS_STEPS,

  TESTIMONIAL_AVATARS,

  INDUSTRIES,

  PARTNERS,

  TECH_STACK,

} from "../data/landing";

import ScrollReveal from "./ui/ScrollReveal";

import AnimatedCounter from "./ui/AnimatedCounter";

import {

  Cpu,

  Bot,

  Smartphone,

  Monitor,

  ArrowRight,

  ShieldCheck,

  Sparkles,

  Star,

  Users,

  Zap,

  ChevronRight,

  Play,

  CheckCircle,

  MoveRight,

  Brain,

  Code,

  Award,

} from "lucide-react";



interface HomeViewProps {

  setActiveView: (view: ViewType) => void;

  setUserDraftPrompt: (prompt: string) => void;

}



// ─── Helpers ──────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {

  cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",

  orange: "border-orange-500/25 bg-orange-500/10 text-orange-400",

  violet: "border-violet-500/25 bg-violet-500/10 text-violet-400",

  indigo: "border-indigo-500/25 bg-indigo-500/10 text-indigo-400",

};



const serviceIcons: Record<string, React.ReactNode> = {

  "ai-powered-solutions": <Bot className="h-5 w-5 text-cyan-400" />,

  "software-development": <Monitor className="h-5 w-5 text-indigo-400" />,

  "digital-transformation": <Cpu className="h-5 w-5 text-emerald-400" />,

  "startup-support": <Smartphone className="h-5 w-5 text-violet-400" />,

};



// ─── Sub‑components ──────────────────────────────────────────────────────

const SectionBadge: React.FC<{ label: string; color?: keyof typeof BADGE_STYLES }> = ({

  label,

  color = "cyan",

}) => (

  <span

    className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${BADGE_STYLES[color]}`}

  >

    <span className="h-2 w-2 animate-pulse rounded-full bg-current" />

    {label}

  </span>

);



const SectionHeader: React.FC<{

  badgeLabel: string;

  badgeColor?: keyof typeof BADGE_STYLES;

  title: React.ReactNode;

  subtitle?: string;

  centered?: boolean;

}> = ({ badgeLabel, badgeColor = "cyan", title, subtitle, centered = false }) => (

  <div className={`flex flex-col gap-3 ${centered ? "items-center text-center" : "items-start"}`}>

    <ScrollReveal animation={centered ? "fade-up" : "slide-right"}>

      <SectionBadge label={badgeLabel} color={badgeColor} />

    </ScrollReveal>

    <ScrollReveal animation={centered ? "fade-up" : "slide-right"} delay={80}>

      <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{title}</h2>

    </ScrollReveal>

    {subtitle && (

      <ScrollReveal animation={centered ? "fade-up" : "slide-left"} delay={160}>

        <p

          className={`text-sm leading-relaxed text-slate-400 sm:text-base ${centered ? "mx-auto max-w-2xl" : "max-w-xl"

            }`}

        >

          {subtitle}

        </p>

      </ScrollReveal>

    )}

  </div>

);



const AvatarBadge: React.FC<{ name: string }> = ({ name }) => {

  const initials =

    TESTIMONIAL_AVATARS[name] ??

    name

      .split(" ")

      .map((n) => n[0])

      .join("")

      .slice(0, 2);

  return (

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 text-sm font-bold text-white ring-2 ring-slate-800">

      {initials}

    </div>

  );

};



// ─── Main Component ──────────────────────────────────────────────────────

export default function HomeView({ setActiveView, setUserDraftPrompt }: HomeViewProps) {

  const [draftPrompt, setDraftPrompt] = useState("");

  const [selectedServiceFilter, setSelectedServiceFilter] = useState("all");



  const handlePromptSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (draftPrompt.trim().length >= 5) {

      setUserDraftPrompt(draftPrompt);

      setActiveView("ai-architect");

    }

  };



  const featuredProjects = CASE_STUDIES.filter((p) => p.featured);



  return (

    <div className="bg-[#0b1121] text-white selection:bg-cyan-500/30">



      {/* ─── HERO ────────────────────────────────────────────────────────── */}

      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-32 pb-24 md:pb-32">

        {/* Animated background */}

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900/20 via-transparent to-indigo-900/20" />

        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

        <div className="absolute bottom-1/4 right-1/4 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[120px]" />



        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left */}

            <div className="space-y-10 text-center lg:text-left">

              <ScrollReveal animation="slide-left-full" delay={0} threshold={0.05}>

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-cyan-400">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />

                  </span>

                  Premium Digital Agency

                </div>

              </ScrollReveal>



              <ScrollReveal animation="slide-left-full" delay={100} threshold={0.05}>

                <h1 className="font-sans text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[5rem] lg:leading-[1.02]">

                  AI-Powered{" "}

                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">

                    Digital Solutions

                  </span>{" "}

                  for Startups & Businesses<span className="text-cyan-400">.</span>

                </h1>

              </ScrollReveal>



              <ScrollReveal animation="slide-left-full" delay={200} threshold={0.05}>

                <p className="mx-auto text-lg leading-relaxed text-slate-400 sm:text-xl lg:mx-0 max-w-2xl">

                  Promptly delivers AI-powered digital solutions for startups and businesses — and builds its own products to scale beyond services.

                </p>

              </ScrollReveal>



              <ScrollReveal animation="slide-left-full" delay={300} threshold={0.05}>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">

                  <button

                    onClick={() => setActiveView("contact")}

                    className="group magnetic-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40"

                  >

                    Start Your Project

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  </button>

                  <button

                    onClick={() => setActiveView("portfolio")}

                    className="group magnetic-btn inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-900/70 hover:text-white"

                  >

                    <Play className="h-4 w-4 text-cyan-400" />

                    View Our Work

                  </button>

                </div>

              </ScrollReveal>



              {/* Trust badges */}

              <ScrollReveal animation="slide-left-full" delay={400} threshold={0.05}>

                <div className="flex flex-wrap items-center justify-center gap-8 pt-6 lg:justify-start">

                  <div className="flex items-center gap-2 text-xs text-slate-500">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">

                      <ShieldCheck className="h-4 w-4 text-emerald-400" />

                    </div>

                    <span className="font-medium">Enterprise Security</span>

                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">

                      <Zap className="h-4 w-4 text-amber-400" />

                    </div>

                    <span className="font-medium">Fast Delivery</span>

                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">

                      <Users className="h-4 w-4 text-cyan-400" />

                    </div>

                    <span className="font-medium">Expert Team</span>

                  </div>

                </div>

              </ScrollReveal>

            </div>



            {/* Right – Hero visual */}

            <ScrollReveal animation="scale-in" delay={200} threshold={0.05} className="relative hidden lg:block">

              <div className="relative mx-auto h-[600px] w-full max-w-2xl">

                {/* Background glow effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

                {/* Main floating card */}
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 card-3d">
                  
                  {/* Dashboard Interface */}
                  <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col">
                    
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden">
                          <img 
                            src="/images/Dynamic Logo for Software Agency 'Promptly' (3).png" 
                            alt="Promptly Logo" 
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Promptly Dashboard</p>
                          <p className="text-[10px] text-slate-400">Real-time Analytics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-slate-400">Live</span>
                      </div>
                    </div>

                    {/* Service cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 hover:border-cyan-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-cyan-400" />
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">AI Solutions</p>
                        </div>
                        <p className="text-xs font-semibold text-white">Automation & Intelligence</p>
                      </div>
                      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 hover:border-indigo-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-indigo-400" />
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Development</p>
                        </div>
                        <p className="text-xs font-semibold text-white">Web & Mobile Apps</p>
                      </div>
                      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 hover:border-violet-500/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-violet-400" />
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Innovation</p>
                        </div>
                        <p className="text-xs font-semibold text-white">Cutting-edge Tech</p>
                      </div>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 rounded-xl bg-slate-800/30 border border-slate-700/50 p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5" />
                      <div className="relative h-full flex items-end justify-between gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/60 to-indigo-500/60 transition-all hover:from-cyan-400 hover:to-indigo-400"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom floating elements */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                      <div className="rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm p-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">AI Assistant</p>
                          <p className="text-[10px] text-slate-400">Active</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm p-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Auto-Scaling</p>
                          <p className="text-[10px] text-slate-400">Enabled</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm border border-cyan-500/30 p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-xs font-semibold text-white">Project Complete</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-500/30 p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-violet-400" />
                    <span className="text-xs font-semibold text-white">99.9% Uptime</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Mobile prompt */}
      <ScrollReveal animation="fade-up" delay={200} threshold={0.05} className="mt-12 lg:hidden">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handlePromptSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={draftPrompt}
              onChange={(e) => setDraftPrompt(e.target.value)}
              placeholder="Describe your product vision…"
              className="flex-1 rounded-xl border border-slate-700 bg-[#020617]/80 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25"
            >
              Blueprint
            </button>
          </form>
        </div>
      </ScrollReveal>

      {/* ─── PRODUCTS ───────────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/20 parallax-section">

        <div className="mx-auto max-w-7xl space-y-10">

          <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">

              <Sparkles className="h-3 w-3" />

              Our Products

            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">

              Flagship{" "}

              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">

                Solutions

              </span>

            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-400">

              Production-ready products built by Promptly, designed to solve real business challenges.

            </p>

          </ScrollReveal>



          <ScrollReveal animation="fade-up" delay={100} threshold={0.1}>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* xSender Card */}

              <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 card-3d">

                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                

                <div className="relative">

                  <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform">

                        <Sparkles className="h-6 w-6 text-white" />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">xSender</h3>

                        <p className="text-xs text-emerald-400 font-semibold">WhatsApp Order Management</p>

                      </div>

                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1">

                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />

                      <span className="text-xs font-semibold text-emerald-400">Live</span>

                    </div>

                  </div>



                  <p className="text-sm text-slate-300 leading-relaxed mb-6">

                    Transform messy WhatsApp chats into a professional ordering system. Perfect for businesses of any size, anywhere in the world.

                  </p>



                  <div className="space-y-3 mb-6 stagger-children">

                    <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-400" />

                      <span>Product catalog system</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-400" />

                      <span>One-click WhatsApp ordering</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-400" />

                      <span>Order management dashboard</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-400" />

                      <span>Mobile-first design</span>

                    </div>

                  </div>



                  <button

                    onClick={() => setActiveView("contact")}

                    className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"

                  >

                    Learn More

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  </button>

                </div>

              </div>



              {/* Coming Soon Card */}

              <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-slate-700 card-3d">

                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                

                <div className="relative h-full flex flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 mb-4 group-hover:scale-110 transition-transform">

                    <Zap className="h-8 w-8 text-slate-400 group-hover:text-cyan-400 transition-colors" />

                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">More Coming Soon</h3>

                  <p className="text-sm text-slate-400 max-w-xs">

                    We're building more innovative products. Stay tuned for what's next from Promptly.

                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">

                    <span className="h-2 w-2 rounded-full bg-slate-600 animate-pulse" />

                    <span>In Development</span>

                  </div>

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* ─── CLIENT LOGOS ────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-12">

        <ScrollReveal animation="fade-up" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

            Trusted by industry leaders

          </p>

          <div className="relative overflow-hidden">

            <div className="flex animate-marquee gap-12 whitespace-nowrap">

              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (

                <div

                  key={`${logo.name}-${i}`}

                  className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-800/50 bg-slate-900/30 px-6 py-3 backdrop-blur-sm transition hover:border-slate-700"

                >

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">

                    {logo.initials}

                  </span>

                  <span className="text-sm font-semibold text-slate-400">{logo.name}</span>

                </div>

              ))}

            </div>

          </div>

        </ScrollReveal>

      </section>



      {/* ─── AUTOMATION VALUE PROP ───────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-cyan-950/30 to-indigo-950/30 p-8 md:p-12 backdrop-blur-sm">

              {/* Glow effects */}
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl -translate-y-1/2" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl translate-y-1/2" />

              <div className="relative flex flex-col items-center text-center gap-8">
                {/* Label */}
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
                  <Zap className="h-3 w-3" />
                  What We Do
                </span>

                {/* Main statement */}
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl max-w-3xl leading-tight">
                  We automate the repetitive tasks that your employees spend{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    hours doing every day
                  </span>
                </h2>

                {/* Supporting line */}
                <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
                  Reducing costs, saving time, and allowing your team to focus on what truly drives growth.
                </p>

                {/* Benefit icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-2">
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <MoveRight className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-sm font-semibold text-white">Reduce Costs</p>
                    <p className="text-xs text-slate-500 text-center">Cut overhead by eliminating manual, repetitive work</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <Zap className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-sm font-semibold text-white">Save Time</p>
                    <p className="text-xs text-slate-500 text-center">Reclaim hours every day with intelligent automation</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Users className="h-5 w-5 text-cyan-400" />
                    </div>
                    <p className="text-sm font-semibold text-white">Focus on Growth</p>
                    <p className="text-xs text-slate-500 text-center">Let your team do the work that actually moves the needle</p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setActiveView("contact")}
                  className="group magnetic-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40"
                >
                  Start Automating
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── INDUSTRIES ─────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="Who We Help"

            badgeColor="indigo"

            title={

              <>

                Industries{" "}

                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">

                  We Serve

                </span>

              </>

            }

            subtitle="From startups to enterprises, we deliver tailored solutions across diverse sectors."

            centered

          />



          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {INDUSTRIES.map((industry, i) => (

              <div key={industry.id}>

                <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>

                  <button

                    onClick={() => setActiveView("portfolio")}

                    className="group magnetic-btn relative flex h-full w-full flex-col justify-between rounded-3xl border border-slate-800/70 bg-slate-900/40 p-6 text-left backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-800/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 card-3d"

                  >

                    <div className="space-y-4">

                      <div className="flex items-center gap-4">

                        <span className="text-4xl">{industry.icon}</span>

                        <div>

                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">

                            {industry.name}

                          </h3>

                          <p className="text-xs text-slate-500">{industry.description}</p>

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {industry.services.map((service) => (

                          <span

                            key={service}

                            className="rounded-full border border-slate-700/60 bg-slate-800/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:border-indigo-500/40 group-hover:text-indigo-400 transition-colors"

                          >

                            {service}

                          </span>

                        ))}

                      </div>

                    </div>

                    <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors group-hover:text-indigo-400">

                      View Projects <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />

                    </div>

                  </button>

                </ScrollReveal>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ─── PARTNERS ─────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-12 px-4 sm:px-6 lg:px-8">

        <ScrollReveal animation="fade-up" className="mx-auto max-w-7xl">

          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

            Powered by industry leaders

          </p>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">

            {PARTNERS.map((partner) => (

              <div

                key={partner.name}

                className="flex items-center justify-center rounded-xl border border-slate-800/50 bg-slate-900/30 px-6 py-4 backdrop-blur-sm transition hover:border-slate-700 hover:bg-slate-900/50"

              >

                <span className="text-sm font-semibold text-slate-400">{partner.name}</span>

              </div>

            ))}

          </div>

        </ScrollReveal>

      </section>



      {/* ─── TECH STACK ─────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="Our Stack"

            badgeColor="violet"

            title={

              <>

                Technologies{" "}

                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">

                  We Use

                </span>

              </>

            }

            subtitle="Modern, scalable technologies to build production-ready solutions."

            centered

          />



          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            {Object.entries(TECH_STACK).map(([category, technologies], categoryIndex) => (
              <div key={category} className="h-full">
                <ScrollReveal animation="fade-up" staggerIndex={categoryIndex} threshold={0.1} className="h-full">
                  <div className="group magnetic-btn relative flex flex-col h-full overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:bg-slate-800/40 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 card-3d">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                    

                    <div className="relative">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 group-hover:scale-110 transition-transform">

                          <Cpu className="h-5 w-5 text-violet-400 group-hover:text-cyan-400 transition-colors" />

                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-violet-400 transition-colors capitalize">

                          {category}

                        </h3>

                      </div>

                      

                      <div className="flex flex-wrap gap-2">

                        {technologies.map((tech) => {

                          const IconComponent = tech.icon;

                          return (

                            <div

                              key={tech.name}

                              className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:border-violet-500/40 hover:text-violet-400 hover:bg-slate-800/70 hover:scale-105"

                            >

                              {IconComponent && <IconComponent className="h-4 w-4" />}

                              <span>{tech.name}</span>

                            </div>

                          );

                        })}

                      </div>

                    </div>

                  </div>

                </ScrollReveal>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ─── LEADERSHIP ─────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="Leadership"

            badgeColor="cyan"

            title={

              <>

                Meet the{" "}

                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">

                  Founder

                </span>

              </>

            }

            subtitle="Building the future of AI-powered digital solutions."

            centered

          />



          <ScrollReveal animation="fade-up" threshold={0.1}>

            <div className="max-w-4xl mx-auto">

              <div className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 card-3d">

                <div className="flex flex-col md:flex-row items-center gap-8">

                  <div className="relative shrink-0">

                    <div className="h-48 w-48 md:h-56 md:w-56 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-xl">

                      <img 

                        src="/images/212.png" 

                        alt="Promptly Founder" 

                        className="h-full w-full object-cover"

                      />

                    </div>

                    <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg">

                      <CheckCircle className="h-5 w-5 text-white" />

                    </div>

                  </div>

                  

                  <div className="flex-1 text-center md:text-left">

                    <h3 className="text-3xl font-bold text-white mb-2">Promptly Founder</h3>

                    <p className="text-base text-cyan-400 font-semibold mb-4">Founder & CEO</p>

                    

                    <p className="text-slate-400 text-base leading-relaxed mb-6">

                      Passionate about building AI-powered solutions that transform businesses. With expertise in software development, AI automation, and digital transformation, leading a team dedicated to delivering exceptional results.

                    </p>

                    

                    <button

                      onClick={() => {
                        setActiveView("about");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}

                      className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"

                    >

                      Learn More

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* ─── TEAM ────────────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="The Team"

            badgeColor="violet"

            title={

              <>

                Senior specialists,{" "}

                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">

                  one cohesive squad

                </span>

              </>

            }

            subtitle="Architects, designers, and AI engineers working in tight collaboration—not handoffs between siloed vendors."

            centered

          />

          {/* Strategic Advisor Centered Prominent Card */}
          {TEAM_MEMBERS.filter(member => member.role === "Strategic Advisor").map((advisor) => (
            <div key={advisor.id} className="max-w-2xl mx-auto mt-16 w-full px-4 sm:px-0">
              <ScrollReveal animation="fade-up" threshold={0.1}>
                <div className="group relative pt-16 text-center">

                  {/* Circular photo with violet→indigo gradient ring */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 p-[3px] shadow-xl group-hover:shadow-violet-500/40 transition-shadow">
                      <div className="h-full w-full rounded-full overflow-hidden ring-4 ring-slate-900">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 shadow-lg border border-violet-400">
                      <Award className="h-4.5 w-4.5 text-white" />
                    </div>
                  </div>

                  {/* Dark card body - in sync with other cards but slightly larger text and violet theme */}
                  <div className="rounded-3xl border border-violet-500/30 bg-slate-900/60 backdrop-blur-sm shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/50 transition-all hover:-translate-y-1 px-8 pt-16 pb-7 flex flex-col h-full">
                    <h3 className="text-2xl font-extrabold text-white mb-0.5">{advisor.name}</h3>
                    <p className="text-sm font-semibold text-violet-400 mb-4">{advisor.role}</p>

                    <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xl mx-auto">{advisor.bio}</p>

                    <div className="border-t border-slate-700/50 mb-4" />

                    <p className="text-sm font-bold text-slate-200 mb-3">⭐ Expert in</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-5">
                      {advisor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300 group-hover:bg-violet-500/20 transition-colors"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 pt-16 items-stretch">

            {TEAM_MEMBERS.filter(member => member.name !== "Mahad Mateen Butt" && member.role !== "Strategic Advisor").map((member, i) => (

              <div key={member.id} className="h-full">

                <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1} className="h-full">

                  <div className="group relative pt-16 text-center h-full">

                    {/* Circular photo with cyan→violet gradient ring */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
                      <div className="h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 p-[3px] shadow-xl group-hover:shadow-cyan-500/40 transition-shadow">
                        <div className="h-full w-full rounded-full overflow-hidden ring-4 ring-slate-900">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dark card body */}
                    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all hover:-translate-y-1 px-6 pt-16 pb-7 flex flex-col h-full">
                      <h3 className="text-xl font-extrabold text-white mb-0.5">{member.name}</h3>
                      <p className="text-sm font-semibold text-cyan-400 mb-4">{member.role}</p>

                      <p className="text-sm text-slate-400 leading-relaxed mb-5">{member.bio}</p>

                      <div className="border-t border-slate-700/50 mb-4" />

                      <p className="text-sm font-bold text-slate-200 mb-3">⭐ Expert in</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-300 group-hover:bg-cyan-500/20 transition-colors"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </ScrollReveal>

              </div>

            ))}

          </div>



          <ScrollReveal animation="fade-up" threshold={0.1}>

            <div className="text-center">

              <button

                onClick={() => setActiveView("about")}

                className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40"

              >

                Meet the full team

                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              </button>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* ─── STATISTICS ──────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">

          {AGENCY_STATS.map((stat, i) => {

            const style = STAT_CARD_STYLES[stat.accent];

            return (

              <div key={stat.label} className="h-full">

                <ScrollReveal animation="fade-up" staggerIndex={i} className="h-full">

                  <div

                    className={`relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border px-5 py-8 text-center backdrop-blur-sm transition hover:scale-[1.02] sm:px-6 sm:py-10 ${style.card}`}

                  >

                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.bar}`} />

                    <AnimatedCounter

                      value={stat.value}

                      suffix={stat.suffix}

                      decimals={stat.decimals}

                      className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"

                    />

                    <p className="mt-3 text-[10px] font-semibold uppercase leading-snug tracking-widest text-slate-500 sm:text-[11px]">

                      {stat.label}

                    </p>

                  </div>

                </ScrollReveal>

              </div>

            );

          })}

        </div>

      </section>



      {/* ─── SERVICES ───────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="Our Services"

            badgeColor="cyan"

            title={

              <>

                Whatever you need,{" "}

                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">

                  we'll build it

                </span>

              </>

            }

            subtitle="Web applications, AI automation, AI systems, and app development—every solution we ship is AI‑native, production‑ready, and built to scale."

            centered

          />



          {/* Filter Bar */}

          <ScrollReveal animation="fade-up" threshold={0.1}>

            <div className="flex flex-wrap justify-center gap-2 mb-8">

              <button

                onClick={() => setSelectedServiceFilter("all")}

                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${

                  selectedServiceFilter === "all"

                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"

                    : "bg-slate-800/50 text-slate-400 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-400"

                }`}

              >

                All

              </button>

              <button

                onClick={() => setSelectedServiceFilter("AI & Automation")}

                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${

                  selectedServiceFilter === "AI & Automation"

                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"

                    : "bg-slate-800/50 text-slate-400 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-400"

                }`}

              >

                AI & Automation

              </button>

              <button

                onClick={() => setSelectedServiceFilter("Software Development")}

                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${

                  selectedServiceFilter === "Software Development"

                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"

                    : "bg-slate-800/50 text-slate-400 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-400"

                }`}

              >

                Software Development

              </button>

            </div>

          </ScrollReveal>



          {/* Unified Grid */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {AGENCY_SERVICES.filter(

              serv => selectedServiceFilter === "all" || serv.category === selectedServiceFilter

            ).map((serv, i) => {

              const isAI = serv.category === "AI & Automation";

              

              return (

                <div key={serv.id}>

                  <ScrollReveal animation="fade-up" staggerIndex={i} threshold={0.1}>

                    <button

                      onClick={() => setActiveView("services")}

                      className={`group magnetic-btn relative flex h-full w-full flex-col justify-between rounded-3xl border border-slate-800/70 bg-slate-900/40 p-6 text-left backdrop-blur-sm transition-all hover:bg-slate-800/40 hover:shadow-xl hover:-translate-y-1 card-3d ${

                        isAI 

                          ? 'hover:border-cyan-500/40 hover:shadow-cyan-500/10' 

                          : 'hover:border-indigo-500/40 hover:shadow-indigo-500/10'

                      }`}

                      style={{ minHeight: "320px" }}

                    >

                      <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br rounded-full blur-3xl group-hover:blur-2xl transition-all ${

                        isAI ? 'from-cyan-500/10 to-transparent' : 'from-indigo-500/10 to-transparent'

                      }`} />

                      

                      <div className="relative space-y-4">

                        <div className="flex items-start justify-between">

                          <div className={`inline-flex rounded-2xl p-4 transition-colors group-hover:scale-110 ${

                            isAI 

                              ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 group-hover:from-cyan-500/20 group-hover:to-cyan-500/10' 

                              : 'bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 group-hover:from-indigo-500/20 group-hover:to-indigo-500/10'

                          }`}>

                            {serviceIcons[serv.id]}

                          </div>

                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${

                            isAI 

                              ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' 

                              : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'

                          }`}>

                            {serv.category}

                          </span>

                        </div>

                        

                        <h3 className={`text-lg font-bold text-slate-100 transition-colors ${

                          isAI ? 'group-hover:text-cyan-400' : 'group-hover:text-indigo-400'

                        }`}>

                          {serv.title}

                        </h3>

                        <p className="line-clamp-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">

                          {serv.description}

                        </p>

                      </div>

                      

                      <div className={`relative mt-auto pt-4 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors ${

                        isAI ? 'group-hover:text-cyan-400' : 'group-hover:text-indigo-400'

                      }`}>

                        Explore <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />

                      </div>

                    </button>

                  </ScrollReveal>

                </div>

              );

            })}

          </div>

        </div>

      </section>



      {/* ─── PORTFOLIO ────────────────────────────────────────────────────

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="Selected Work"

            badgeColor="cyan"

            title={

              <>

                Projects that drive{" "}

                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">

                  measurable impact

                </span>

              </>

            }

            subtitle="Real results for real businesses. Explore our latest case studies and success stories."

            centered

          />



          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {featuredProjects.map((proj, i) => (

              <div key={proj.id}>

                <ScrollReveal

                  animation="fade-up"

                  staggerIndex={i}

                  threshold={0.1}

                >

                  <article

                    className="group magnetic-btn relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-800/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 card-3d"

                    onClick={() => setActiveView("portfolio")}

                  >

                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                    

                    <div className={`h-1.5 bg-gradient-to-r ${proj.visualTheme}`} />

                    <div className="relative flex-1 p-6 md:p-8">

                      <div className="flex items-center justify-between mb-4">

                        <span className="text-xs font-mono uppercase text-slate-500 font-semibold group-hover:text-cyan-400 transition-colors">

                          {proj.clientName}

                        </span>

                        <span

                          className={`rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400`}

                        >

                          {proj.category}

                        </span>

                      </div>

                      

                      <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-cyan-400 line-clamp-2 mb-3">

                        {proj.title}

                      </h3>

                      <p className="text-sm leading-relaxed text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors mb-4">

                        {proj.tagline}

                      </p>

                      

                      <div className="flex flex-wrap gap-2 mb-6">

                        {proj.technologies.slice(0, 3).map((tech) => (

                          <span

                            key={tech}

                            className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] text-slate-400 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-colors"

                          >

                            {tech}

                          </span>

                        ))}

                        {proj.technologies.length > 3 && (

                          <span className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] text-slate-400">

                            +{proj.technologies.length - 3}

                          </span>

                        )}

                      </div>

                      

                      <div className="space-y-3 border-t border-slate-800/50 pt-5">

                        {proj.metrics.slice(0, 2).map((met) => (

                          <div key={met} className="flex items-center gap-2 text-xs font-semibold text-emerald-400">

                            <ShieldCheck className="h-4 w-4 shrink-0" />

                            {met}

                          </div>

                        ))}

                      </div>

                    </div>

                    

                    <div className="p-6 pt-0">

                      <button className="magnetic-btn w-full group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40">

                        View case study

                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />

                      </button>

                    </div>

                  </article>

                </ScrollReveal>

              </div>

            ))}

          </div>



          <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">

            <button

              onClick={() => setActiveView("portfolio")}

              className="magnetic-btn group inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:text-white hover:scale-105"

            >

              Explore full portfolio

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </button>

          </ScrollReveal>

        </div>

      </section> */}



      {/* ─── WHY US & PROCESS ───────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/20">

        <div className="mx-auto max-w-7xl space-y-16">

          <SectionHeader

            badgeLabel="Why Promptly"

            badgeColor="cyan"

            title="Built differently. Built better."

            subtitle="We combine deep technical expertise with a product‑first mindset to deliver solutions that outperform expectations."

            centered

          />



          <div className="grid gap-8 md:grid-cols-3">

            {PROCESS_STEPS.map((step, i) => (

              <div key={step.id}>

                <ScrollReveal animation="fade-up" staggerIndex={i}>

                  <div className={`group relative rounded-3xl border p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl
                    ${step.accent === 'cyan'   ? 'border-cyan-500/20   bg-gradient-to-b from-cyan-950/30   to-slate-900/30 hover:border-cyan-500/40   hover:shadow-cyan-500/10'   : ''}
                    ${step.accent === 'indigo' ? 'border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-slate-900/30 hover:border-indigo-500/40 hover:shadow-indigo-500/10' : ''}
                    ${step.accent === 'violet' ? 'border-violet-500/20 bg-gradient-to-b from-violet-950/30 to-slate-900/30 hover:border-violet-500/40 hover:shadow-violet-500/10' : ''}
                  `}>

                    {/* Icon box */}
                    <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl
                      ${step.accent === 'cyan'   ? 'bg-cyan-500/15   text-cyan-400'   : ''}
                      ${step.accent === 'indigo' ? 'bg-indigo-500/15 text-indigo-400' : ''}
                      ${step.accent === 'violet' ? 'bg-violet-500/15 text-violet-400' : ''}
                    `}>
                      <step.icon className="h-8 w-8" strokeWidth={1.6} />
                    </div>

                    <div className={`mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold
                      ${step.accent === 'cyan'   ? 'bg-cyan-500/10   text-cyan-400'   : ''}
                      ${step.accent === 'indigo' ? 'bg-indigo-500/10 text-indigo-400' : ''}
                      ${step.accent === 'violet' ? 'bg-violet-500/10 text-violet-400' : ''}
                    `}>
                      <span className="font-mono">0{i + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white">{step.title}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>

                  </div>

                </ScrollReveal>

              </div>

            ))}

          </div>



          {/* Trust Signals — Premium */}
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {/* Security */}
              <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/40 to-slate-950/60 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10">
                {/* Ambient glow orb */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-emerald-500/15 blur-2xl group-hover:bg-emerald-500/25 transition-all" />
                {/* Icon */}
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="h-7 w-7 text-emerald-400" strokeWidth={1.5} />
                </div>
                {/* Stat */}
                <p className="text-3xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent leading-none mb-1">100%</p>
                {/* Accent bar */}
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Security Compliant</p>
              </div>

              {/* Delivery */}
              <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/40 to-slate-950/60 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl group-hover:bg-cyan-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/25 shadow-lg shadow-cyan-500/10">
                  <Zap className="h-7 w-7 text-cyan-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent leading-none mb-1">&lt;8wks</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Avg Delivery</p>
              </div>

              {/* Support */}
              <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 to-slate-950/60 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-indigo-500/15 blur-2xl group-hover:bg-indigo-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/25 shadow-lg shadow-indigo-500/10">
                  <Users className="h-7 w-7 text-indigo-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent leading-none mb-1">24/7</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Support Available</p>
              </div>

              {/* Rating */}
              <div className="group relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-950/40 to-slate-950/60 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl group-hover:bg-violet-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 border border-violet-500/25 shadow-lg shadow-violet-500/10">
                  <Star className="h-7 w-7 text-violet-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent leading-none mb-1">4.9/5</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Client Rating</p>
              </div>

            </div>
          </ScrollReveal>


        </div>

      </section>



      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}

      <section className="border-t border-slate-800/40 py-12 md:py-16">

        {/* Heading — stays in normal content width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
          <SectionHeader

            badgeLabel="Client Stories"

            badgeColor="cyan"

            title="What Our Clients Say"

            centered

          />
        </div>

        {/* Full-width marquee — no container constraint */}
        <div className="relative w-full overflow-hidden py-4">
            {/* Left and right fade overlays to enhance layout */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10 hidden md:block" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10 hidden md:block" />

            {/* Infinite Marquee Track */}
            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
              {/* First Set of Testimonials */}
              {CLIENT_TESTIMONIALS.map((t, i) => (
                <div key={`first-${t.id}`} className="shrink-0">
                  <div className="flex w-[480px] max-w-[85vw] min-h-[220px] rounded-3xl border border-slate-800/50 bg-slate-950/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:shadow-2xl">
                    {/* Left Column: Author Info */}
                    <div className="w-[140px] shrink-0 flex flex-col items-center justify-center text-center border-r border-slate-800/40 pr-4 mr-4">
                      {t.avatar === "panther" ? (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-cyan-500/20">
                          <div className="h-full w-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center text-cyan-400">
                            <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c-.6 0-1.1.3-1.4.8L8.2 6.5C7.4 6.2 6.5 6 5.5 6c-2 0-3.5 1.5-3.5 3.5 0 2.2 1.5 4.5 3.5 5.5 1 2.5 3.5 4 6.5 4s5.5-1.5 6.5-4c2-1 3.5-3.3 3.5-5.5C22 7.5 20.5 6 18.5 6c-1 0-1.9.2-2.7.5L13.4 2.8c-.3-.5-.8-.8-1.4-.8zm-4 7c.8 0 1.5.7 1.5 1.5S8.8 12 8 12s-1.5-.7-1.5-1.5S7.2 9 8 9zm8 0c.8 0 1.5.7 1.5 1.5S16.8 12 16 12s-1.5-.7-1.5-1.5S15.2 9 16 9zm-4 4.5c1.4 0 2.5 1.1 2.5 2.5H9.5c0-1.4 1.1-2.5 2.5-2.5z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-slate-700/50">
                          <div className="h-full w-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center text-slate-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-extrabold text-white leading-tight mb-1">{t.author}</p>
                      <p className="text-[10px] text-slate-400 font-semibold leading-tight mb-2">
                        {t.role}, {t.company}
                      </p>
                      {t.flag && t.country && (
                        <div className="flex items-center gap-1 bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-800/80">
                          <span className="text-xs leading-none">{t.flag}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{t.country}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Review Text & Stars */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-[13px] leading-relaxed text-slate-300 italic font-medium mt-1">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex justify-end gap-0.5 mt-2">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicated Second Set for Seamless Loop */}
              {CLIENT_TESTIMONIALS.map((t, i) => (
                <div key={`second-${t.id}`} className="shrink-0">
                  <div className="flex w-[480px] max-w-[85vw] min-h-[220px] rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:shadow-2xl">
                    {/* Left Column: Author Info */}
                    <div className="w-[140px] shrink-0 flex flex-col items-center justify-center text-center border-r border-slate-800/40 pr-4 mr-4">
                      {t.avatar === "panther" ? (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-cyan-500/20">
                          <div className="h-full w-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center text-cyan-400">
                            <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c-.6 0-1.1.3-1.4.8L8.2 6.5C7.4 6.2 6.5 6 5.5 6c-2 0-3.5 1.5-3.5 3.5 0 2.2 1.5 4.5 3.5 5.5 1 2.5 3.5 4 6.5 4s5.5-1.5 6.5-4c2-1 3.5-3.3 3.5-5.5C22 7.5 20.5 6 18.5 6c-1 0-1.9.2-2.7.5L13.4 2.8c-.3-.5-.8-.8-1.4-.8zm-4 7c.8 0 1.5.7 1.5 1.5S8.8 12 8 12s-1.5-.7-1.5-1.5S7.2 9 8 9zm8 0c.8 0 1.5.7 1.5 1.5S16.8 12 16 12s-1.5-.7-1.5-1.5S15.2 9 16 9zm-4 4.5c1.4 0 2.5 1.1 2.5 2.5H9.5c0-1.4 1.1-2.5 2.5-2.5z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-slate-700/50">
                          <div className="h-full w-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center text-slate-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-extrabold text-white leading-tight mb-1">{t.author}</p>
                      <p className="text-[10px] text-slate-400 font-semibold leading-tight mb-2">
                        {t.role}, {t.company}
                      </p>
                      {t.flag && t.country && (
                        <div className="flex items-center gap-1 bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-800/80">
                          <span className="text-xs leading-none">{t.flag}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{t.country}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Review Text & Stars */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-[13px] leading-relaxed text-slate-300 italic font-medium mt-1">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex justify-end gap-0.5 mt-2">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

      </section>

    </div>

  );

}