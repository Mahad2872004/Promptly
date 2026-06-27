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
  "web-applications": <Monitor className="h-5 w-5 text-cyan-400" />,
  "ai-automation": <Bot className="h-5 w-5 text-indigo-400" />,
  "ai-systems": <Cpu className="h-5 w-5 text-violet-400" />,
  "app-development": <Smartphone className="h-5 w-5 text-teal-400" />,
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
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-16 md:pb-20">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900/20 via-transparent to-indigo-900/20" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left */}
            <div className="space-y-6 text-center lg:text-left">
              <ScrollReveal animation="fade-up" delay={0}>
                <SectionBadge label="Premium Digital Agency" color="cyan" />
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={80}>
                <h1 className="font-sans text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
                  Building{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    AI & Software
                  </span>{" "}
                  Solutions That Scale<span className="text-cyan-400">.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={160}>
                <p className="mx-auto text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                  Promptly engineers AI platforms, cloud-native SaaS, and bespoke enterprise
                  experiences with the polish of a world‑class product studio and the velocity of
                  an elite dev team.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={240}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <button
                    onClick={() => setActiveView("contact")}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.02]"
                  >
                    Let's Start
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => setActiveView("portfolio")}
                    className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:text-white"
                  >
                    <Play className="h-4 w-4 text-cyan-400" />
                    View Case Studies
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right – Hero visual */}
            <ScrollReveal animation="zoom-in" delay={120} className="relative hidden lg:block">
              <div className="relative mx-auto h-[420px] w-full max-w-lg">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-2xl" />
                <img
                  src="/images/heroimage.png"
                  alt="Promptly Hero Visual"
                  className="relative h-full w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <Zap className="h-4 w-4" />
                    <span>AI‑Native since 2020</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mobile prompt */}
          <ScrollReveal animation="fade-up" delay={200} className="mt-12 lg:hidden">
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
      <section className="border-t border-slate-800/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {AGENCY_SERVICES.map((serv, i) => (
              <div key={serv.id}>
                <ScrollReveal animation="zoom-in" staggerIndex={i}>
                  <button
                    onClick={() => setActiveView("services")}
                    className="group relative flex h-full w-full flex-col justify-between rounded-2xl border border-slate-800/70 bg-slate-900/40 p-6 text-left backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-800/40 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="space-y-4">
                      <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 transition-colors group-hover:bg-cyan-500/10">
                        {serviceIcons[serv.id]}
                      </div>
                      <span className="inline-block rounded-full border border-slate-700/60 bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
                      Explore <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ──────────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeader
            badgeLabel="Selected Work"
            badgeColor="orange"
            title="Projects that drive measurable impact"
            centered
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredProjects.map((proj, i) => (
              <div key={proj.id}>
                <ScrollReveal
                  animation={i % 2 === 0 ? "slide-right" : "slide-left"}
                  staggerIndex={i}
                >
                  <article
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 transition hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5"
                    onClick={() => setActiveView("portfolio")}
                  >
                    <div className={`h-1 bg-gradient-to-r ${proj.visualTheme}`} />
                    <div className="relative p-6 md:p-8">
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-400">
                          View case study <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                        <span>{proj.clientName}</span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${BADGE_STYLES.orange}`}
                        >
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
              className="group inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
            >
              Explore full portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WHY US & PROCESS ───────────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
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
                <ScrollReveal animation="zoom-in" staggerIndex={i}>
                  <div className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/30 p-6 text-center transition hover:border-cyan-500/30 hover:bg-slate-800/30">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-2xl font-bold text-cyan-400">
                      {typeof step.icon === "string" ? step.icon : "🔷"}
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeader
            badgeLabel="Client Stories"
            badgeColor="cyan"
            title="Trusted by teams who ship at scale"
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            {CLIENT_TESTIMONIALS.map((t, i) => (
              <div key={t.id}>
                <ScrollReveal animation="zoom-in" staggerIndex={i}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:shadow-xl">
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

      {/* ─── TEAM ────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <ScrollReveal animation="slide-right">
              <div className="space-y-4">
                <SectionBadge label="The Team" color="violet" />
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Senior specialists,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    one cohesive squad
                  </span>
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-slate-400">
                  Architects, designers, and AI engineers working in tight collaboration—not
                  handoffs between siloed vendors.
                </p>
                <button
                  onClick={() => setActiveView("about")}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Meet the team <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={member.id}>
                  <ScrollReveal animation="fade-up" staggerIndex={i}>
                    <div className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 text-center backdrop-blur-sm transition hover:border-cyan-500/30 hover:bg-slate-800/40">
                      <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/30">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
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
    </div>
  );
}