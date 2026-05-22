import React from "react";
import { ViewType } from "../types";
import { TEAM_MEMBERS } from "../data";
import { Compass, Shield, Award, Terminal, ArrowRight } from "lucide-react";

interface AboutViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function AboutView({ setActiveView }: AboutViewProps) {
  const corePhilosophy = [
    {
      title: "Absolute Systems Security",
      desc: "We skip insecure client-side credentials. All third-party secrets live inside isolated sever-side proxy gateways.",
      icon: <Shield className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "Swiss Layout Aesthetics",
      desc: "SaaS products deserve elite visual balance. We pair Inter with monospace labels and plenty of breathable white space.",
      icon: <Compass className="w-5 h-5 text-teal-400" />
    },
    {
      title: "Production Speed Assurance",
      desc: "No corporate slow-down. We iterate on weekly sprints with auto-compiled staging domains fully audited.",
      icon: <Award className="w-5 h-5 text-orange-400" />
    }
  ];

  const handleBookBrief = () => {
    setActiveView("contact");
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Summary */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Our Heritage</span>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
              Software Houses Done Right.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
              Promptly was founded by a compact squad of senior systems architects weary of high-overhead agency processes and boilerplate templates. We wanted to build a lean, lightning-fast studio modeling, compiling, and deploying exceptional code.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Today, our teams craft enterprise-grade web tools, NLP microservices, and native mobile apps with strict architectural integrity, serving future-ready firms worldwide.
            </p>
          </div>

          {/* Core Certification Badge Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-5">
            <div className="flex items-center gap-2 pb-3.5 border-b border-slate-800/60 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>root@promptly:~# _ agency_credentials</span>
            </div>

            <div className="space-y-4 font-mono text-xs text-slate-400">
              <div className="flex justify-between">
                <span>FRONTEND PRECISE SPEED:</span>
                <span className="text-cyan-400 font-bold">100 / 100</span>
              </div>
              <div className="flex justify-between">
                <span>SERVER RUNTIME COLD START:</span>
                <span className="text-teal-400 font-bold">95ms average</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY LEAKS DETECTED:</span>
                <span className="text-emerald-400 font-bold">0.00%</span>
              </div>
              <div className="flex justify-between">
                <span>CLIENT REVENUE BOOST SLA:</span>
                <span className="text-cyan-400 font-bold">Guaranteed Milestone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Core Columns */}
        <div className="border-t border-slate-800/40 pt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Engineering Standards</span>
            <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">Our Guiding Framework</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePhilosophy.map((phil, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 space-y-4">
                <div className="p-2.5 rounded-lg bg-slate-950 inline-block border border-slate-805">
                  {phil.icon}
                </div>
                <h3 className="font-sans font-bold text-slate-100">{phil.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{phil.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Team Members Section */}
        <div className="border-t border-slate-800/40 pt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">The Specialists</span>
            <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">Lead Craft Engineers</h2>
            <p className="text-xs text-slate-400">Every project has an assigned principal specialist. No multi-tier junior buffers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="team-cards-grid">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Cyber custom avatar graphic instead of broken images */}
                  <div className="h-16 w-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-xl relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                    <span className="z-10">{member.name[0]}{member.name.split(" ")[1]?.[0]}</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-sans font-bold text-slate-100">{member.name}</p>
                    <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">{member.role}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex flex-wrap gap-1">
                  {member.specialties.map((spec) => (
                    <span key={spec} className="font-mono text-[9px] text-slate-500 bg-[#020617] px-2.5 py-1 rounded border border-slate-800/70">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-6">
          <h3 className="font-sans text-xl font-bold text-slate-200">Want to partner directly with our specialists?</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            We operate in precise development slots to guarantee extreme focus. Lock in your sprint timeframe today.
          </p>
          <button
            onClick={handleBookBrief}
            className="btn-primary cursor-pointer rounded-full px-8 py-3.5 text-xs uppercase tracking-widest"
          >
            Schedule Intake Call
          </button>
        </div>

      </div>
    </div>
  );
}
