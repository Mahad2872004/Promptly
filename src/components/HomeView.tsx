import React, { useState } from "react";
import { ViewType } from "../types";
import { AGENCY_SERVICES, CASE_STUDIES, CLIENT_TESTIMONIALS, TEAM_MEMBERS } from "../data";
import {
  CLIENT_LOGOS,
  AGENCY_STATS,
  STAT_CARD_STYLES,
  PROCESS_STEPS,
  TESTIMONIAL_AVATARS,
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
} from "lucide-react";

interface HomeViewProps {
  setActiveView: (view: ViewType) => void;
  setUserDraftPrompt: (prompt: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  "web-applications": <Monitor className="h-5 w-5 text-cyan-400" />,
  "ai-automation": <Bot className="h-5 w-5 text-indigo-400" />,
  "ai-systems": <Cpu className="h-5 w-5 text-violet-400" />,
  "app-development": <Smartphone className="h-5 w-5 text-teal-400" />,
};

const accentRing: Record<string, string> = {
  cyan: "ring-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  indigo: "ring-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  violet: "ring-violet-500/30 bg-violet-500/10 text-violet-400",
};

function AvatarBadge({ name }: { name: string }) {
  const initials = TESTIMONIAL_AVATARS[name] ?? name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 text-sm font-bold text-white ring-2 ring-slate-800">
      {initials}
    </div>
  );
}

export default function HomeView({ setActiveView, setUserDraftPrompt }: HomeViewProps) {
  const [draftPrompt, setDraftPrompt] = useState("");

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftPrompt.trim().length >= 5) {
      setUserDraftPrompt(draftPrompt);
      setActiveView("ai-architect");
    }
  };

  const featuredProjects = CASE_STUDIES.filter((p) => p.featured);

  return (
    <div className="bg-transparent text-white selection:bg-cyan-500/30">

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden section-pad pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8 text-center lg:text-left">
              <ScrollReveal animation="fade-up" delay={0}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                  Premium Digital Agency
                </span>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={80}>
                <h1 className="font-sans text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
                  We build{" "}
                  <span className="text-gradient-hero">high-converting</span>{" "}
                  digital products that{" "}
                  <span className="text-gradient-cyan-indigo">scale</span>
                  <span className="text-cyan-400">.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={160}>
                <p className="content-width mx-auto text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                  Promptly engineers AI platforms, cloud-native SaaS, and bespoke enterprise
                  experiences—with the polish of a world-class product studio and the velocity of
                  an elite dev team.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={240}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <button
                    onClick={() => setActiveView("contact")}
                    className="btn-primary group flex items-center gap-2 rounded-full px-8 py-4 text-sm"
                  >
                    Start Your Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => setActiveView("portfolio")}
                    className="btn-secondary card-lift flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
                  >
                    <Play className="h-4 w-4 text-cyan-400" />
                    View Case Studies
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero visual composition */}
            <ScrollReveal animation="zoom-in" delay={120} className="relative hidden lg:block">
              <div className="relative mx-auto h-[420px] w-full max-w-lg">
                <div className="animate-float absolute -left-4 top-8 h-28 w-28 rounded-2xl glass-panel p-4 shadow-2xl">
                  <Zap className="h-6 w-6 text-cyan-400" />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">38-day MVPs</p>
                </div>
                <div className="animate-float-slow absolute -right-2 top-24 h-32 w-36 rounded-2xl glass-panel-strong p-4 shadow-2xl" style={{ animationDelay: "-2s" }}>
                  <div className="text-2xl font-extrabold text-white">99.99%</div>
                  <p className="text-[10px] text-slate-500">Uptime SLA</p>
                </div>
                <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-panel-strong p-6 shadow-2xl ring-1 ring-white/5">
                  <div className="mb-3 flex items-center gap-3 border-b border-slate-800/60 pb-3">
                    <div className="flex items-center gap-1.5" aria-hidden>
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-xs text-slate-500">promptly · architect</span>
                  </div>
                  <form onSubmit={handlePromptSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={draftPrompt}
                      onChange={(e) => setDraftPrompt(e.target.value)}
                      placeholder="Describe your product vision..."
                      className="w-full rounded-xl border border-slate-800 bg-[#020617]/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="btn-glow w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 text-sm font-bold text-white"
                    >
                      Generate Blueprint
                    </button>
                  </form>
                  <p className="mt-2 text-[11px] text-slate-500">AI-powered scope, stack & timeline in seconds</p>
                </div>
                <div className="animate-float absolute bottom-6 left-8 flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-2 backdrop-blur-md" style={{ animationDelay: "-1s" }}>
                  <Users className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-300">250+ specialists</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mobile prompt module */}
          <ScrollReveal animation="fade-up" delay={200} className="mt-12 lg:hidden">
            <div className="glass-panel-strong mx-auto max-w-xl rounded-2xl p-5 shadow-2xl">
              <form onSubmit={handlePromptSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={draftPrompt}
                  onChange={(e) => setDraftPrompt(e.target.value)}
                  placeholder="Describe your product vision..."
                  className="flex-1 rounded-xl border border-slate-800 bg-[#020617]/80 px-4 py-3 text-sm outline-none focus:border-cyan-500 font-mono"
                />
                <button type="submit" className="btn-glow rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950">
                  Blueprint
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Client logos ─── */}
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
                  className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-800/50 bg-slate-900/30 px-6 py-3"
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

      {/* ─── Statistics ─── */}
      <section className="border-t border-slate-800/40 section-pad py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
          {AGENCY_STATS.map((stat, i) => {
            const style = STAT_CARD_STYLES[stat.accent];
            return (
              <div key={stat.label} className="h-full">
                <ScrollReveal animation="fade-up" staggerIndex={i} className="h-full">
                  <div
                    className={`card-lift relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border px-5 py-8 text-center backdrop-blur-sm sm:px-6 sm:py-10 ${style.card}`}
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

      {/* ─── Services bento ─── */}
      <section className="border-t border-slate-800/40 section-pad">
        <div className="mx-auto max-w-7xl space-y-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <ScrollReveal animation="slide-right">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Our Competencies
              </span>
              <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Technical mastery,{" "}
                <span className="text-gradient-cyan-indigo">delivered promptly</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slide-left">
              <p className="content-width text-sm leading-relaxed text-slate-400 sm:text-base">
                Web applications, AI automation, AI systems, and app development—every solution
                we ship is AI-native, production-ready, and built to scale with your business.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {AGENCY_SERVICES.map((serv, i) => (
              <div key={serv.id}>
              <ScrollReveal animation="zoom-in" staggerIndex={i}>
                <button
                  onClick={() => setActiveView("services")}
                  className="card-lift group flex h-full w-full flex-col justify-between rounded-2xl border border-slate-800/70 bg-slate-900/40 p-6 text-left backdrop-blur-sm hover:border-cyan-500/25"
                >
                  <div className="space-y-4">
                    <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 transition-colors group-hover:bg-cyan-500/10">
                      {serviceIcons[serv.id]}
                    </div>
                    <span className="inline-block rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {serv.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 transition-colors group-hover:text-cyan-400">
                      {serv.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">
                      {serv.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors group-hover:text-cyan-400">
                    Explore <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Process ─── */}
      <section className="border-t border-slate-800/40 section-pad bg-slate-900/20">
        <div className="mx-auto max-w-7xl space-y-14">
          <ScrollReveal animation="fade-up" className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Our Process
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              From vision to launch,{" "}
              <span className="text-gradient-cyan-indigo">with clarity</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              A proven three-phase framework that keeps stakeholders aligned and ships on schedule.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.id}>
                <ScrollReveal animation="fade-up" staggerIndex={i}>
                  <div className="card-lift relative flex h-full flex-col rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur-sm">
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-cyan-500/50 to-transparent md:block lg:w-10" />
                    )}
                    <div
                      className={`mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${accentRing[step.accent]}`}
                    >
                      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} aria-hidden />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">{step.number}</span>
                    <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Portfolio ─── */}
      <section className="border-t border-slate-800/40 section-pad">
        <div className="mx-auto max-w-7xl space-y-14">
          <ScrollReveal animation="fade-up" className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Selected Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Projects that drive measurable impact
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredProjects.map((proj, i) => (
              <div key={proj.id}>
              <ScrollReveal
                animation={i % 2 === 0 ? "slide-right" : "slide-left"}
                staggerIndex={i}
              >
                <article
                  className="group card-lift relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 cursor-pointer"
                  onClick={() => setActiveView("portfolio")}
                >
                  <div className={`h-1 bg-gradient-to-r ${proj.visualTheme}`} />
                  <div className="relative p-6 md:p-8">
                    <div className="project-card-preview absolute inset-0 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm">
                      <span className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-400">
                        View case study <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                      <span>{proj.clientName}</span>
                      <span className="rounded border border-slate-800 px-2 py-0.5 text-orange-400">
                        {proj.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-extrabold text-white transition-colors group-hover:text-cyan-400">
                      {proj.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{proj.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-slate-800/70 bg-[#020617] px-2.5 py-1 font-mono text-[10px] text-slate-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 space-y-2 border-t border-slate-800/50 pt-5">
                      {proj.metrics.slice(0, 2).map((met) => (
                        <div key={met} className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                          <ShieldCheck className="h-4 w-4 shrink-0" />
                          {met}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal animation="fade-up" className="text-center">
            <button
              onClick={() => setActiveView("portfolio")}
              className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-white"
            >
              Explore full portfolio
              <ArrowRight className="h-4 w-4" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="border-t border-slate-800/40 section-pad bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="mx-auto max-w-7xl space-y-12">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Client Stories
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by teams who ship at scale
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {CLIENT_TESTIMONIALS.map((t, i) => (
              <div key={t.id}>
              <ScrollReveal animation="zoom-in" staggerIndex={i}>
                <div className="card-lift flex h-full flex-col rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-800/50 pt-5">
                    <AvatarBadge name={t.author} />
                    <div>
                      <p className="text-sm font-bold text-white">{t.author}</p>
                      <p className="text-xs text-slate-500">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team / Collaboration ─── */}
      <section className="border-t border-slate-800/40 section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal animation="slide-right">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                The Team
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Senior specialists,{" "}
                <span className="text-gradient-cyan-indigo">one cohesive squad</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                Architects, designers, and AI engineers working in tight collaboration—not
                handoffs between siloed vendors.
              </p>
              <button
                onClick={() => setActiveView("about")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Meet the team <ChevronRight className="h-4 w-4" />
              </button>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={member.id}>
                <ScrollReveal animation="fade-up" staggerIndex={i}>
                  <div className="card-lift rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 text-center backdrop-blur-sm">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 text-lg font-bold text-white overflow-hidden">
                      <img src={member.image} alt={member.name} className="h-14 w-14 rounded-2xl object-cover" />
                    </div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">{member.role}</p>
                  </div>
                </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Success metrics bento ─── */}
      <section className="border-t border-slate-800/40 section-pad py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            <ScrollReveal animation="zoom-in" className="md:col-span-2">
              <div className="card-lift flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-indigo-950/30 p-8">
                <Sparkles className="h-8 w-8 text-cyan-400" />
                <div>
                  <p className="text-4xl font-extrabold text-white">38 days</p>
                  <p className="mt-2 text-sm text-slate-400">Average full-cycle MVP delivery</p>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid gap-4">
            {[
              { label: "Uptime SLA", value: "99.99%", icon: ShieldCheck },
              { label: "Code handoff", value: "100%", icon: Zap },
            ].map((item, i) => (
              <div key={item.label}>
              <ScrollReveal animation="fade-up" staggerIndex={i + 1}>
                <div className="card-lift flex h-full items-center gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                  <item.icon className="h-8 w-8 shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-2xl font-extrabold text-white">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                </div>
              </ScrollReveal>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad border-t border-slate-800/40 py-20">
        <ScrollReveal animation="fade-up">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-10 text-center backdrop-blur-xl sm:p-14">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to architect your next product?
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Get an instant stack recommendation, timeline, and scope estimate—or book a
              consultation with our principal architects.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setActiveView("ai-architect")}
                className="btn-primary rounded-full px-8 py-4 text-sm"
              >
                Launch AI Architect
              </button>
              <button
                onClick={() => setActiveView("contact")}
                className="rounded-full border border-slate-700 px-8 py-4 text-sm font-semibold text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
              >
                Book a consultation
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
