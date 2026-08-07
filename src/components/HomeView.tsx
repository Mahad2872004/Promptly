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

  PARTNERS,

  TECH_STACK,

} from "../data/landing";

import ScrollReveal from "./ui/ScrollReveal";

import RevealGroup from "./ui/RevealGroup";

import AnimatedCounter from "./ui/AnimatedCounter";

import HeroScene from "./scenes/HeroScene";

import SystemsScene from "./scenes/SystemsScene";

import WorkflowScene from "./scenes/WorkflowScene";

import AudienceScene from "./scenes/AudienceScene";

import CtaScene from "./scenes/CtaScene";

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

      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">{title}</h2>

    </ScrollReveal>

    {subtitle && (

      <ScrollReveal animation={centered ? "fade-up" : "slide-left"} delay={160}>

        <p

          className={`text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base ${centered ? "mx-auto max-w-2xl" : "max-w-xl"

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

    <div className="bg-transparent text-slate-900 dark:text-white transition-colors duration-300 selection:bg-cyan-500/30">



      {/* ─── SCENE 1 — HERO ─────────────────────────────────────────────── */}
      <HeroScene setActiveView={setActiveView} />

      {/* Mobile prompt */}
      <ScrollReveal animation="fade-up" delay={200} threshold={0.05} className="mt-12 lg:hidden">
        <div className="surface-card mx-auto max-w-xl rounded-2xl p-5">
          <form onSubmit={handlePromptSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={draftPrompt}
              onChange={(e) => setDraftPrompt(e.target.value)}
              placeholder="Describe your product vision…"
              className="footer-input flex-1 rounded-xl px-4 py-3 text-sm outline-none font-mono"
            />
            <button
              type="submit"
              className="btn-primary rounded-xl px-6 py-3 text-sm font-bold"
            >
              Blueprint
            </button>
          </form>
        </div>
      </ScrollReveal>

      {/* ─── PRODUCTS ───────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-100/40 dark:to-slate-900/20 parallax-section">

        <div className="mx-auto max-w-7xl space-y-10">

          <ScrollReveal animation="fade-up" threshold={0.1} className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">

              <Sparkles className="h-3 w-3" />

              Our Products

            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">

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

              <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-br dark:from-emerald-950/40 dark:to-slate-900/80 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 shadow-md dark:shadow-none card-3d">

                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                

                <div className="relative">

                  <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform">

                        <Sparkles className="h-6 w-6 text-white" />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">xSender</h3>

                        <p className="text-xs text-emerald-400 font-semibold">WhatsApp Order Management</p>

                      </div>

                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1">

                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />

                      <span className="text-xs font-semibold text-emerald-400">Live</span>

                    </div>

                  </div>



                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">

                    Transform messy WhatsApp chats into a professional ordering system. Perfect for businesses of any size, anywhere in the world.

                  </p>



                  <div className="space-y-3 mb-6 stagger-children">

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                      <span>Product catalog system</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                      <span>One-click WhatsApp ordering</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                      <span>Order management dashboard</span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">

                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

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

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/50 bg-white/90 dark:bg-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-md dark:shadow-none card-3d">

                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                

                <div className="relative h-full flex flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 group-hover:scale-110 transition-transform">

                    <Zap className="h-8 w-8 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">More Coming Soon</h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">

                    We're building more innovative products. Stay tuned for what's next from Promptly.

                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">

                    <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-pulse" />

                    <span>In Development</span>

                  </div>

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* ─── CLIENT LOGOS ────────────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-12">

        <ScrollReveal animation="fade-up" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

            Trusted by industry leaders

          </p>

          <div className="relative overflow-hidden">

            <div className="flex animate-marquee gap-12 whitespace-nowrap">

              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (

                <div

                  key={`${logo.name}-${i}`}

                  className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 px-6 py-3 backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-700 shadow-md dark:shadow-none"

                >

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-300">

                    {logo.initials}

                  </span>

                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-400">{logo.name}</span>

                </div>

              ))}

            </div>

          </div>

        </ScrollReveal>

      </section>



      {/* ─── AUTOMATION VALUE PROP ───────────────────────────────────────── */}
      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal animation="fade-up" threshold={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900/90 dark:via-cyan-950/40 dark:to-indigo-950/40 p-8 md:p-12 backdrop-blur-sm shadow-xl dark:shadow-none">

              {/* Glow effects */}
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl -translate-y-1/2" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl translate-y-1/2" />

              <div className="relative flex flex-col items-center text-center gap-8">
                {/* Label */}
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  <Zap className="h-3 w-3" />
                  What We Do
                </span>

                {/* Main statement */}
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl max-w-3xl leading-tight">
                  We automate the repetitive tasks that your employees spend{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    hours doing every day
                  </span>
                </h2>

                {/* Supporting line */}
                <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  Reducing costs, saving time, and allowing your team to focus on what truly drives growth.
                </p>

                {/* Benefit icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-2">
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <MoveRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Reduce Costs</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500 text-center">Cut overhead by eliminating manual, repetitive work</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Save Time</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500 text-center">Reclaim hours every day with intelligent automation</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm dark:shadow-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Focus on Growth</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500 text-center">Let your team do the work that actually moves the needle</p>
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




      {/* ─── PARTNERS ─────────────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-12 px-4 sm:px-6 lg:px-8">

        <ScrollReveal animation="fade-up" className="mx-auto max-w-7xl">

          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">

            Powered by industry leaders

          </p>

          <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6" itemClassName="h-full">

            {PARTNERS.map((partner) => (

              <div

                key={partner.name}

                className="flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 px-6 py-4 backdrop-blur-sm transition hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none"

              >

                <span className="text-sm font-semibold text-slate-700 dark:text-slate-400">{partner.name}</span>

              </div>

            ))}

          </RevealGroup>

        </ScrollReveal>

      </section>



      {/* ─── TECH STACK ──────────────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

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
                  <div className="group magnetic-btn relative flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 shadow-md dark:shadow-none card-3d">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                    

                    <div className="relative">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 group-hover:scale-110 transition-transform">

                          <Cpu className="h-5 w-5 text-violet-600 dark:text-violet-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />

                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors capitalize">

                          {category}

                        </h3>

                      </div>

                      

                      <div className="flex flex-wrap gap-2">

                        {technologies.map((tech) => {

                          const IconComponent = tech.icon;

                          return (

                            <div

                              key={tech.name}

                              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-300 transition-all hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-200 dark:hover:bg-slate-800/70 hover:scale-105"

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

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

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

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 shadow-md dark:shadow-none card-3d">

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

                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Promptly Founder</h3>

                    <p className="text-base text-cyan-600 dark:text-cyan-400 font-semibold mb-4">Founder & CEO</p>

                    

                    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">

                      Passionate about building AI-powered solutions that transform businesses. With expertise in software development, AI automation, and digital transformation, leading a team dedicated to delivering exceptional results.

                    </p>

                    

                    <button

                      onClick={() => {
                        setActiveView("about");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}

                      className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"

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

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 parallax-section">

        <div className="mx-auto max-w-7xl space-y-12">

          <SectionHeader

            badgeLabel="The Team"

            badgeColor="violet"

            title={

              <>

                Senior specialists,{" "}

                <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">

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
                      <div className="h-full w-full rounded-full overflow-hidden ring-4 ring-slate-200 dark:ring-slate-900">
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

                  {/* Card body */}
                  <div className="rounded-3xl border border-slate-200 dark:border-violet-500/30 bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/50 transition-all hover:-translate-y-1 px-8 pt-16 pb-7 flex flex-col h-full">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-0.5">{advisor.name}</h3>
                    <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-4">{advisor.role}</p>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 max-w-xl mx-auto">{advisor.bio}</p>

                    <div className="border-t border-slate-200 dark:border-slate-700/50 mb-4" />

                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">⭐ Expert in</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-5">
                      {advisor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300 group-hover:bg-violet-500/20 transition-colors"
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
                        <div className="h-full w-full rounded-full overflow-hidden ring-4 ring-slate-200 dark:ring-slate-900">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all hover:-translate-y-1 px-6 pt-16 pb-7 flex flex-col h-full">
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-0.5">{member.name}</h3>
                      <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-4">{member.role}</p>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{member.bio}</p>

                      <div className="border-t border-slate-200 dark:border-slate-700/50 mb-4" />

                      <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">⭐ Expert in</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 group-hover:bg-cyan-500/20 transition-colors"
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

                className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-500 dark:to-cyan-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40"

              >

                Meet the full team

                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              </button>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* ─── STATISTICS ──────────────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 px-4 sm:px-6 lg:px-8 py-12 md:py-16">

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

                      className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"

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



      {/* ─── SCENE 2 — SYSTEMS ──────────────────────────────────────────── */}
      <SystemsScene setActiveView={setActiveView} />



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

                    className="group magnetic-btn relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 shadow-md dark:shadow-none card-3d cursor-pointer"

                    onClick={() => setActiveView("portfolio")}

                  >

                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all" />

                    

                    <div className={`h-1.5 bg-gradient-to-r ${proj.visualTheme}`} />

                    <div className="relative flex-1 p-6 md:p-8">

                      <div className="flex items-center justify-between mb-4">

                        <span className="text-xs font-mono uppercase text-slate-500 font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">

                          {proj.clientName}

                        </span>

                        <span

                          className={`rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400`}

                        >

                          {proj.category}

                        </span>

                      </div>

                      

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400 line-clamp-2 mb-3">

                        {proj.title}

                      </h3>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors mb-4">

                        {proj.tagline}

                      </p>

                      

                      <div className="flex flex-wrap gap-2 mb-6">

                        {proj.technologies.slice(0, 3).map((tech) => (

                          <span

                            key={tech}

                            className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] text-slate-700 dark:text-slate-400 group-hover:border-cyan-500/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"

                          >

                            {tech}

                          </span>

                        ))}

                        {proj.technologies.length > 3 && (

                          <span className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] text-slate-700 dark:text-slate-400">

                            +{proj.technologies.length - 3}

                          </span>

                        )}

                      </div>

                      

                      <div className="space-y-3 border-t border-slate-200 dark:border-slate-800/50 pt-5">

                        {proj.metrics.slice(0, 2).map((met) => (

                          <div key={met} className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">

                            <ShieldCheck className="h-4 w-4 shrink-0" />

                            {met}

                          </div>

                        ))}

                      </div>

                    </div>

                    

                    <div className="p-6 pt-0">

                      <button className="magnetic-btn w-full group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 cursor-pointer">

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

              className="magnetic-btn group inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 transition hover:border-cyan-500/40 hover:text-slate-900 dark:hover:text-white hover:scale-105 cursor-pointer"

            >

              Explore full portfolio

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </button>

          </ScrollReveal>

        </div>

      </section> */}



      {/* ─── WHY US & PROCESS ───────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-100/40 dark:to-slate-900/20">

        <div className="mx-auto max-w-7xl space-y-16">

          {/* ─── SCENE 3 — WORKFLOW ─────────────────────────────────────── */}
          <WorkflowScene />



          {/* Trust Signals — Premium */}
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {/* Security */}
              <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-emerald-950/50 dark:to-slate-950/80 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 shadow-md dark:shadow-none">
                {/* Ambient glow orb */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-emerald-500/15 blur-2xl group-hover:bg-emerald-500/25 transition-all" />
                {/* Icon */}
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                </div>
                {/* Stat */}
                <p className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent leading-none mb-1">100%</p>
                {/* Accent bar */}
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 dark:text-slate-400">Security Compliant</p>
              </div>

              {/* Delivery */}
              <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-cyan-950/50 dark:to-slate-950/80 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 shadow-md dark:shadow-none">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl group-hover:bg-cyan-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/25 shadow-lg shadow-cyan-500/10">
                  <Zap className="h-7 w-7 text-cyan-600 dark:text-cyan-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-300 dark:to-sky-300 bg-clip-text text-transparent leading-none mb-1">&lt;8wks</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 dark:text-slate-400">Avg Delivery</p>
              </div>

              {/* Support */}
              <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-indigo-950/50 dark:to-slate-950/80 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 shadow-md dark:shadow-none">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-indigo-500/15 blur-2xl group-hover:bg-indigo-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/25 shadow-lg shadow-indigo-500/10">
                  <Users className="h-7 w-7 text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-300 dark:to-blue-300 bg-clip-text text-transparent leading-none mb-1">24/7</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 dark:text-slate-400">Support Available</p>
              </div>

              {/* Rating */}
              <div className="group relative overflow-hidden rounded-3xl border border-violet-500/20 bg-white/90 dark:bg-slate-900 dark:bg-gradient-to-b dark:from-violet-950/50 dark:to-slate-950/80 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10 shadow-md dark:shadow-none">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl group-hover:bg-violet-500/25 transition-all" />
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 border border-violet-500/25 shadow-lg shadow-violet-500/10">
                  <Star className="h-7 w-7 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent leading-none mb-1">4.9/5</p>
                <div className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 dark:text-slate-400">Client Rating</p>
              </div>

            </div>
          </ScrollReveal>


        </div>

      </section>

      {/* ─── SCENE 4 — BUILT FOR YOUR WORLD ──────────────────────────── */}
      <AudienceScene setActiveView={setActiveView} />



      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}

      <section className="border-t border-slate-200 dark:border-slate-800/40 py-12 md:py-16">

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
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent pointer-events-none z-10 hidden md:block" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent pointer-events-none z-10 hidden md:block" />

            {/* Infinite Marquee Track */}
            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
              {/* First Set of Testimonials */}
              {CLIENT_TESTIMONIALS.map((t, i) => (
                <div key={`first-${t.id}`} className="shrink-0">
                  <div className="flex w-[480px] max-w-[85vw] min-h-[220px] rounded-3xl border border-slate-200 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:shadow-2xl shadow-md dark:shadow-none">
                    {/* Left Column: Author Info */}
                    <div className="w-[140px] shrink-0 flex flex-col items-center justify-center text-center border-r border-slate-200 dark:border-slate-800/40 pr-4 mr-4">
                      {t.avatar === "panther" ? (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-cyan-500/20">
                          <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                            <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c-.6 0-1.1.3-1.4.8L8.2 6.5C7.4 6.2 6.5 6 5.5 6c-2 0-3.5 1.5-3.5 3.5 0 2.2 1.5 4.5 3.5 5.5 1 2.5 3.5 4 6.5 4s5.5-1.5 6.5-4c2-1 3.5-3.3 3.5-5.5C22 7.5 20.5 6 18.5 6c-1 0-1.9.2-2.7.5L13.4 2.8c-.3-.5-.8-.8-1.4-.8zm-4 7c.8 0 1.5.7 1.5 1.5S8.8 12 8 12s-1.5-.7-1.5-1.5S7.2 9 8 9zm8 0c.8 0 1.5.7 1.5 1.5S16.8 12 16 12s-1.5-.7-1.5-1.5S15.2 9 16 9zm-4 4.5c1.4 0 2.5 1.1 2.5 2.5H9.5c0-1.4 1.1-2.5 2.5-2.5z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-slate-300 dark:border-slate-700/50">
                          <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center text-slate-600 dark:text-slate-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{t.author}</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold leading-tight mb-2">
                        {t.role}, {t.company}
                      </p>
                      {t.flag && t.country && (
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800/80">
                          <span className="text-xs leading-none">{t.flag}</span>
                          <span className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-wider">{t.country}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Review Text & Stars */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 italic font-medium mt-1">
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
                  <div className="flex w-[480px] max-w-[85vw] min-h-[220px] rounded-3xl border border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:shadow-2xl shadow-md dark:shadow-none">
                    {/* Left Column: Author Info */}
                    <div className="w-[140px] shrink-0 flex flex-col items-center justify-center text-center border-r border-slate-200 dark:border-slate-800/40 pr-4 mr-4">
                      {t.avatar === "panther" ? (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-cyan-500/20">
                          <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                            <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c-.6 0-1.1.3-1.4.8L8.2 6.5C7.4 6.2 6.5 6 5.5 6c-2 0-3.5 1.5-3.5 3.5 0 2.2 1.5 4.5 3.5 5.5 1 2.5 3.5 4 6.5 4s5.5-1.5 6.5-4c2-1 3.5-3.3 3.5-5.5C22 7.5 20.5 6 18.5 6c-1 0-1.9.2-2.7.5L13.4 2.8c-.3-.5-.8-.8-1.4-.8zm-4 7c.8 0 1.5.7 1.5 1.5S8.8 12 8 12s-1.5-.7-1.5-1.5S7.2 9 8 9zm8 0c.8 0 1.5.7 1.5 1.5S16.8 12 16 12s-1.5-.7-1.5-1.5S15.2 9 16 9zm-4 4.5c1.4 0 2.5 1.1 2.5 2.5H9.5c0-1.4 1.1-2.5 2.5-2.5z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950 p-[2px] shadow-lg mb-3 flex items-center justify-center border border-slate-300 dark:border-slate-700/50">
                          <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center text-slate-600 dark:text-slate-500">
                            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{t.author}</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold leading-tight mb-2">
                        {t.role}, {t.company}
                      </p>
                      {t.flag && t.country && (
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800/80">
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

      {/* ─── SCENE 5 — CTA CLOSE ─────────────────────────────────────── */}
      <CtaScene setActiveView={setActiveView} />

    </div>

  );

}