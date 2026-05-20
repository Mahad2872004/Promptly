import React, { useState } from "react";
import { ViewType } from "../types";
import { AGENCY_SERVICES, CASE_STUDIES } from "../data";
import { Terminal, Cpu, Cloud, Smartphone, Monitor, ArrowRight, ShieldCheck, Zap, Activity, Users, FileLock, Layers } from "lucide-react";

interface HomeViewProps {
  setActiveView: (view: ViewType) => void;
  setUserDraftPrompt: (prompt: string) => void;
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

  const handleServiceClick = () => {
    setActiveView("services");
  };

  const activeStats = [
    { label: "Average Delivery Time", value: "38 Days", desc: "For full-cycle MVPs" },
    { label: "Engine Uptime SLA", value: "99.99%", desc: "On Google Cloud Run" },
    { label: "Prompt Architecture Integrity", value: "100%", desc: "Direct git code handoff" },
    { label: "Active Project Streams", value: "12 Client Nodes", desc: "Monitored concurrently" },
  ];

  return (
    <div className="bg-transparent text-white selection:bg-cyan-500/30 font-sans">
      
      {/* 1. Hero Section & Prompt Intake */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
          
          {/* Subheader Badge */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Scale Beyond Boundaries
          </span>

          {/* Majestic Hero Typography */}
          <h1 className="font-sans text-5xl font-extrabold tracking-tight sm:text-7xl text-white max-w-4xl mx-auto leading-[1.08] md:leading-[1.12]">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-extrabold">High-Impact</span> Digital Products<span className="text-cyan-400">.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Promptly is an elite software engineering house specializing in AI-driven platforms, cloud architecture, and bespoke enterprise solutions. Type what you want below, and watch our compiler scaffold custom blueprints.
          </p>

          {/* Interactive Hero Prompt Command Module */}
          <div className="mt-10 max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:border-cyan-500/20 transition-all shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800/60 text-xs font-mono text-slate-500">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>root@promptly:~# _ initialize_architect_brief</span>
            </div>

            <form onSubmit={handlePromptSubmit} className="flex flex-col sm:flex-row gap-3" id="hero-prompt-analyser-form">
              <input
                type="text"
                required
                value={draftPrompt}
                onChange={(e) => setDraftPrompt(e.target.value)}
                placeholder="PROMPT US: I want a multi-tenant client-portal with custom Stripe tiers..."
                className="flex-1 rounded-md border border-slate-800 bg-[#020617]/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
              <button
                type="submit"
                className="rounded-full bg-white hover:bg-cyan-50 px-6 py-3 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-1.5 shrink-0"
              >
                Compile Blueprint
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </form>
            
            <p className="mt-2.5 text-left text-xs text-slate-500 font-mono">
              💡 Write a short sentence summarizing your project scope to preview specific stacks and sprint roadmaps dynamically.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Statistics Matrix (Swiss Grid, Minimalist) */}
      <section className="border-t border-slate-800/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-center gap-8 md:gap-14 items-center">
          <div className="space-y-1 text-center sm:text-left min-w-[124px]">
            <div className="text-3xl font-extrabold text-white">250+</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Engineers</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800/70"></div>
          
          <div className="space-y-1 text-center sm:text-left min-w-[124px]">
            <div className="text-3xl font-extrabold text-white">12y</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Experience</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800/70"></div>
          
          <div className="space-y-1 text-center sm:text-left min-w-[124px]">
            <div className="text-3xl font-extrabold text-white">98%</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Retention</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800/70"></div>

          <div className="space-y-1 text-center sm:text-left min-w-[124px]">
            <div className="text-3xl font-extrabold text-white">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Audited SLAs</div>
          </div>
        </div>
      </section>

      {/* 3. Core Capabilities Overview */}
      <section className="border-t border-slate-800/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Our Competencies</span>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
                Technical Mastery Delivered Promptly.
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
              We skip generic template styling and focus core strength on secure, high-uptime architectures built to execute natively in Cloud Container targets.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" id="services-brief-grid">
            {AGENCY_SERVICES.map((serv) => (
              <div 
                key={serv.id} 
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 shadow-md"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-cyan-400 transition-colors">
                    {serv.id === "ai-intelligence" && <Cpu className="w-5 h-5 text-cyan-400" />}
                    {serv.id === "cloud-native" && <Cloud className="w-5 h-5 text-indigo-400" />}
                    {serv.id === "client-experiences" && <Monitor className="w-5 h-5 text-purple-400" />}
                    {serv.id === "mobile-mobility" && <Smartphone className="w-5 h-5 text-teal-400" />}
                  </div>
                  <h3 className="font-sans font-bold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-950 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-300 cursor-pointer" onClick={handleServiceClick}>
                  <span>Explore competencies</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Highlight Portfolio Showcase */}
      <section className="border-t border-slate-800/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Case Records</span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Verified Operational Success
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We compile and maintain state-of-the-art architectures for standard platforms. Inspect featured builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="featured-projects-showcase">
            {CASE_STUDIES.filter(p => p.featured).map((proj) => (
              <div 
                key={proj.id} 
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Visual Header Grid Accent */}
                <div className={`h-1.5 bg-gradient-to-r ${proj.visualTheme}`} />
                
                <div className="p-6 md:p-8 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 uppercase">CLIENT: {proj.clientName}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-850 text-orange-400 border border-slate-800/40 font-semibold">{proj.category}</span>
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl text-slate-100 group-hover:text-orange-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {proj.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="font-mono text-[10px] text-slate-550 bg-[#020617] px-2.5 py-1 rounded border border-slate-800/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Impact metrics highlight */}
                  <div className="grid grid-cols-1 gap-2 pt-4 border-t border-slate-900/60">
                    {proj.metrics.slice(0, 2).map((met, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{met}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className="px-6 py-4 border-t border-slate-800/30 bg-slate-900/20 text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-between cursor-pointer"
                  onClick={() => setActiveView("portfolio")}
                >
                  <span>Review technical blueprint study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Promptly Agile Engineering Cycle */}
      <section className="border-t border-slate-800/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Our Architecture Pipeline</span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white">
              The Promptly Software Method
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              We leverage smart models and top developers to deliver ultra-reliable production code with velocity.
            </p>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-800/40" id="methodology-timeline">
            {/* Step 1 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
              <div className="absolute left-1.5 sm:left-1/2 transform -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 ring-4 ring-cyan-950/50" />
              <div className="sm:w-1/2 pl-8 sm:pl-0 sm:pr-8 sm:text-right space-y-2">
                <span className="font-mono text-xs text-cyan-400 font-semibold">STAGE 01</span>
                <h4 className="font-sans font-bold text-lg text-white">Intake & Scaffolding</h4>
                <p className="text-xs text-slate-400 max-w-sm sm:ml-auto leading-relaxed">
                  We process user prompts using our server-side analytical pipeline, resolving database constraints, layout requirements, and system scopes quickly.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center">
              <div className="absolute left-1.5 sm:left-1/2 transform -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-400 ring-4 ring-indigo-950/50" />
              <div className="sm:w-1/2 pl-8 sm:pl-8 space-y-2">
                <span className="font-mono text-xs text-indigo-400 font-semibold">STAGE 02</span>
                <h4 className="font-sans font-bold text-lg text-white">Full-Stack Implementation</h4>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  Elite developers construct custom microservice hooks and sleek frontends powered by standard Vite, React, and Tailwind, ensuring absolute modularity.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
              <div className="absolute left-1.5 sm:left-1/2 transform -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-400 ring-4 ring-purple-950/50" />
              <div className="sm:w-1/2 pl-8 sm:pl-0 sm:pr-8 sm:text-right space-y-2">
                <span className="font-mono text-xs text-purple-400 font-semibold">STAGE 03</span>
                <h4 className="font-sans font-bold text-lg text-white">Continuous Verification (QA)</h4>
                <p className="text-xs text-slate-400 max-w-sm sm:ml-auto leading-relaxed">
                  Our pipelines execute rigorous compliance verifications (TypeScript audits, linter scans, responsive screen tests) to ensure reliable deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Secure Trust Footer Banner */}
      <section className="bg-slate-900/10 border-t border-slate-800/40 py-20 px-4">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Layers className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="font-sans text-2xl font-bold text-white">
            Ready to explore an instant architecture calculation?
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Give our AI Architect any idea and see specific technologies, timelines, and budget estimations in real-time.
          </p>
          <button
            onClick={() => setActiveView("ai-architect")}
            className="rounded-full bg-white hover:bg-cyan-50 px-8 py-3.5 text-xs font-bold text-slate-950 uppercase tracking-widest transition-all shadow-md shadow-white/5"
          >
            Launch Prompt Architect
          </button>
        </div>
      </section>

    </div>
  );
}
