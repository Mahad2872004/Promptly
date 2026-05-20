import React, { useState, useEffect } from "react";
import { ArchitectResponse, ViewType } from "../types";
import { Terminal, Cpu, Database, CalendarRange, Milestone, DollarSign, Hammer, Lightbulb, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

interface AIArchitectViewProps {
  initialPrompt: string;
  setUserDraftPrompt: (prompt: string) => void;
  setActiveView: (view: ViewType) => void;
}

export default function AIArchitectView({ initialPrompt, setUserDraftPrompt, setActiveView }: AIArchitectViewProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [architectResult, setArchitectResult] = useState<ArchitectResponse | null>(null);
  const [errorText, setErrorText] = useState("");
  const [dataSource, setDataSource] = useState("");

  const loadingSequence = [
    "root@promptly:~# _ initialize_systems_analyser",
    "Connecting to Promply server-side API proxy...",
    "Invoking Gemini 3.5 Flash neural blueprint compiler...",
    "Parsing functional requirements and scoping data constraints...",
    "Resolving database RLS tables and API route structures...",
    "Estimating development schedules and optimal sprint budgets...",
    "Assembling comprehensive architecture package..."
  ];

  // Auto-run if there's an initial prompt fed from home screen
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length >= 5) {
      handleAnalyze();
    }
  }, [initialPrompt]);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (prompt.trim().length < 5) {
      setErrorText("Please state a descriptive prompt explaining your software idea (min 5 characters).");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setErrorText("");
    setArchitectResult(null);

    // Dynamic terminal loading effect
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSequence.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 450);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, type: "saas" }),
      });

      if (!response.ok) {
        throw new Error("Local gateway or Gemini compiler reported an error reading functional brief.");
      }

      const resJson = await response.json();
      clearInterval(interval);

      if (resJson && resJson.success) {
        setArchitectResult(resJson.data);
        setDataSource(resJson.source + (resJson.note ? ` (${resJson.note})` : ""));
      } else {
        throw new Error(resJson.error || "Blueprint synthesis returned unsuccessful state.");
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorText(err.message || "Gateway error. Please verify the backend integrity.");
    } finally {
      setLoading(false);
    }
  };

  const clearBlueprint = () => {
    setArchitectResult(null);
    setPrompt("");
    setUserDraftPrompt("");
    setErrorText("");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Title Information */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Generative Cognitive Modeler</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            AI Project Architect
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Submit a prompt describing your software objectives. Promptly's analytical engine compiles specific technology tags, sprint phases, and budget forecasts instantly.
          </p>
        </div>

        {/* Input Terminal Block */}
        {!architectResult && !loading && (
          <div className="p-5 sm:p-6 rounded-2xl border border-slate-900 bg-slate-900/50 shadow-2xl backdrop-blur-sm space-y-6">
            <div className="flex items-center gap-2 pb-3.5 border-b border-slate-900 text-xs font-mono text-slate-500">
              <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>root@promptly:~# _ system_planner --intent=blueprint</span>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4" id="ai-architect-form">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">State Your Software Objective</label>
                <textarea
                  required
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: I want to build a dental office appointment booking application with SMS alerts (Twilio), secure user registration, and a calendar view for administrators to drag/drop booking spots."
                  className="w-full rounded-md border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-400 transition-all font-sans leading-relaxed"
                />
              </div>

              {errorText && (
                <p className="text-xs text-red-500 bg-red-950/20 border border-red-900/40 p-3 rounded">{errorText}</p>
              )}

              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-[10px] sm:text-xs text-slate-500 max-w-sm">
                  ⚡ Fully connected to our server's safe Gemini cognitive broker.
                </span>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-6 py-3 text-xs font-extrabold text-slate-950 rounded uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Generate Blueprint
                  <Sparkles className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading Terminal Screen */}
        {loading && (
          <div className="p-6 sm:p-8 rounded-2xl border border-cyan-950 bg-slate-950 font-mono text-xs sm:text-sm text-cyan-400 shadow-2xl space-y-4 min-h-[250px] flex flex-col justify-between">
            <div className="space-y-2">
              {loadingSequence.slice(0, loadingStep + 1).map((link, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 font-bold">▶</span>
                  <p className="leading-relaxed">{link}</p>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-cyan-950/50">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] text-slate-500">DYNAMIC ANALYSIS ENGINE ACTIVE</span>
              </div>
              <span className="text-xs font-bold text-cyan-500/80">COMPILING... {Math.round(((loadingStep + 1) / loadingSequence.length) * 100)}%</span>
            </div>
          </div>
        )}

        {/* Formulated Architectural Result Sheet */}
        {architectResult && !loading && (
          <div className="space-y-8 animate-fadeIn" id="blueprint-result-dashboard">
            
            {/* Top Stat Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl border border-slate-900 bg-slate-900/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-900">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">ESTIMATED TIMEFRAME</span>
                  <p className="text-sm font-bold text-white">{architectResult.timeline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">AGENCY DEVELOPMENT FEE</span>
                  <p className="text-sm font-bold text-emerald-400">{architectResult.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-purple-950/40 text-purple-400 border border-purple-900">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">INTELLIGENCE KERNEL</span>
                  <p className="text-xs font-bold text-slate-300 leading-tight">{dataSource}</p>
                </div>
              </div>
            </div>

            {/* Core Blueprint Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Proposed scope & stack */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Proposal Summary */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-4">
                  <span className="font-mono text-[9px] text-cyan-400 font-semibold uppercase tracking-widest block">PROPOSED SOFTWARE ARCHITECTURE</span>
                  <h3 className="font-sans font-extrabold text-2xl text-slate-100">{architectResult.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">{architectResult.description}</p>
                </div>

                {/* Stack Tags */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-4">
                  <span className="font-mono text-[9px] text-slate-500 font-semibold uppercase tracking-widest block">RECOMMENDED SYSTEMS STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {architectResult.techStack.map((tech) => (
                      <span key={tech} className="font-mono text-[11px] text-cyan-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-900">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-4">
                  <span className="font-mono text-[9px] text-slate-500 font-semibold uppercase tracking-widest block flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                    ARCHITECTURAL STRATEGY RECOMMENDATIONS
                  </span>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
                    {architectResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-2 leading-relaxed">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Sprint Roadmaps */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-4">
                  <span className="font-mono text-[9px] text-slate-500 font-semibold uppercase tracking-widest block">SUGGESTED IMPLEMENTATION PHASES</span>
                  
                  <div className="space-y-5">
                    {architectResult.phases.map((phase, index) => (
                      <div key={index} className="relative pl-5 before:absolute before:inset-0 before:left-0.5 before:w-0.5 before:bg-slate-800">
                        {/* Bullet */}
                        <div className="absolute left-[-1.5px] top-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-200">{phase.name}</span>
                            <span className="text-[10px] text-cyan-400 font-mono whitespace-nowrap">{phase.duration}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{phase.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setActiveView("contact")}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-650 px-5 py-3 text-xs font-bold text-white uppercase tracking-wider rounded text-center transition-colors shadow-lg shadow-orange-950/30"
                  >
                    Brief Us on this Blueprint
                  </button>
                  <button
                    onClick={clearBlueprint}
                    className="flex items-center justify-center gap-1.5 border border-slate-950 bg-slate-900/40 hover:bg-slate-900/80 px-4 py-3 text-xs font-bold text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
