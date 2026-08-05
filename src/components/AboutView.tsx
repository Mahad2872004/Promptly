import React from "react";
import { ViewType } from "../types";
import { TEAM_MEMBERS } from "../data";
import { Target, Zap, Shield, Users, Award, ArrowRight, Sparkles, CheckCircle, MessageSquare, CheckCircle as CheckIcon } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface AboutViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function AboutView({ setActiveView }: AboutViewProps) {
  const corePrinciples = [
    {
      title: "Build Real Things",
      desc: "We focus on solutions that actually work in the real world. No over-engineering, no unnecessary complexity.",
      icon: <Target className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "AI First, Always",
      desc: "When approaching any problem, we ask: how can AI or automation make this better? It's a default, not an option.",
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "Clients Are Partners",
      desc: "We treat clients as long-term partners, not transactions. Their success is our success.",
      icon: <Users className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Products > Projects",
      desc: "Alongside client work, we invest in our own products (like xSender) so the company grows beyond hourly billing.",
      icon: <Award className="w-5 h-5 text-violet-400" />
    },
    {
      title: "Speed with Quality",
      desc: "We move fast, but we don't cut corners. Speed matters only if the output is good.",
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Clear Communication Always",
      desc: "We communicate clearly — with clients, with each other, and about our products. No jargon, no confusion.",
      icon: <MessageSquare className="w-5 h-5 text-teal-400" />
    }
  ];

  const differentiators = [
    {
      title: "AI at the Core",
      desc: "We don't just use buzzwords. Every solution we design is genuinely powered by modern AI tools and automation.",
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />
    },
    {
      title: "Speed to Market",
      desc: "We move fast. Clients get working products quickly — not months of back and forth with no results.",
      icon: <Zap className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Global Mindset",
      desc: "We build for a global audience. xSender and our solutions work for businesses anywhere, not just locally.",
      icon: <Shield className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Agency + Product",
      desc: "We are both a service agency AND a product company. This means better cash flow, more stability, and a stronger long-term business.",
      icon: <Award className="w-6 h-6 text-violet-400" />
    },
    {
      title: "Real Partnerships",
      desc: "We don't take one-off projects and disappear. We build long-term relationships with the clients and businesses we work with.",
      icon: <Users className="w-6 h-6 text-teal-400" />
    },
    {
      title: "Structured Systems",
      desc: "We deliver real systems, not patchwork fixes. Every product is designed to be clean, maintainable, and scalable.",
      icon: <CheckCircle className="w-6 h-6 text-amber-400" />
    }
  ];

  const handleBookBrief = () => {
    setActiveView("contact");
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-6xl space-y-20">

        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              About Promptly
            </span>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              AI-Powered Digital Solutions for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Startups & Businesses
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Promptly is a software agency delivering AI-powered digital solutions for startups and businesses — and building its own products to scale beyond services.
            </p>
          </div>
        </ScrollReveal>

        {/* Core Principles */}
        <ScrollReveal>
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
                How We Work
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                Our Core Principles
              </h2>
              <p className="text-sm text-slate-400">
                These principles guide how every person at Promptly thinks, works, and makes decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePrinciples.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 space-y-4 hover:border-cyan-500/30 transition-all"
                >
                  <div className="p-3 rounded-xl bg-slate-950 inline-block border border-slate-800">
                    {principle.icon}
                  </div>
                  <h3 className="font-sans font-bold text-slate-100">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Why Promptly */}
        <ScrollReveal>
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
                Why Choose Us
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                Why Promptly?
              </h2>
              <p className="text-sm text-slate-400">
                There are many agencies out there. Here is why clients and partners choose Promptly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((diff, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 space-y-4 hover:border-emerald-500/30 transition-all"
                >
                  <div className="p-3 rounded-xl bg-slate-950 inline-block border border-slate-800">
                    {diff.icon}
                  </div>
                  <h3 className="font-sans font-bold text-slate-100">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Leadership Section */}
        <ScrollReveal animation="fade-up" threshold={0.1}>
          <div className="border-t border-slate-800/40 pt-16 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
                Leadership
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                Meet the{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Founder & CEO
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Full Stack Developer & AI Consultant driving Promptly's vision.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 card-3d">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative shrink-0">
                    <div className="h-48 w-48 md:h-56 md:w-56 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-xl">
                      <img 
                        src="/images/212.png" 
                        alt="Mahad Mateen Butt" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
                      <CheckIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-1">Mahad Mateen Butt</h3>
                    <p className="text-base text-cyan-400 font-semibold mb-1">Founder &amp; CEO</p>
                    <p className="text-xs text-slate-500 font-medium mb-4 uppercase tracking-widest">Full Stack Developer &amp; AI Consultant</p>

                    <p className="text-slate-400 text-base leading-relaxed mb-6">
                      Driving Promptly's business strategy, product vision, and AI &amp; automation architecture. Mahad leads client consulting and strategic partnerships — the final decision maker behind every major move the agency makes.
                    </p>

                    <button
                      onClick={() => {
                        setActiveView("consultation");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                    >
                      Get in Touch
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Team Section */}
        <ScrollReveal animation="fade-up" threshold={0.1}>
          <div className="border-t border-slate-800/40 pt-16 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-mono">
                The Team
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                Senior specialists,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  one cohesive squad
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Architects, designers, and AI engineers working in tight collaboration—not handoffs between siloed vendors.
              </p>
            </div>

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
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="border-t border-slate-800/40 pt-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ready to Build Something Great?
              </h2>
              <p className="text-sm text-slate-400">
                Let's discuss how Promptly can help your startup or business with AI-powered digital solutions.
              </p>
              <button
                onClick={handleBookBrief}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.02]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}