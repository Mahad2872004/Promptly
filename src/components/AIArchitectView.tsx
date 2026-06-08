import React, { useState, useEffect } from "react";
import { ArchitectResponse, ViewType } from "../types";
import {
  Terminal,
  Cpu,
  CalendarRange,
  DollarSign,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import ScrollReveal from "./ui/ScrollReveal";

interface AIArchitectViewProps {
  initialPrompt: string;
  setUserDraftPrompt: (prompt: string) => void;
  setActiveView: (view: ViewType) => void;
}

export default function AIArchitectView({
  initialPrompt,
  setUserDraftPrompt,
  setActiveView
}: AIArchitectViewProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [architectResult, setArchitectResult] =
    useState<ArchitectResponse | null>(null);
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

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length >= 5) {
      handleAnalyze();
    }
  }, [initialPrompt]);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (prompt.trim().length < 5) {
      setErrorText(
        "Please state a descriptive prompt (min 5 characters)."
      );
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setErrorText("");
    setArchitectResult(null);

    const interval = setInterval(() => {
      setLoadingStep((prev) =>
        prev < loadingSequence.length - 1 ? prev + 1 : prev
      );
    }, 450);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "saas" })
      });

      if (!response.ok) {
        throw new Error("Backend analysis failed.");
      }

      const resJson = await response.json();
      clearInterval(interval);

      if (resJson?.success) {
        setArchitectResult(resJson.data);
        setDataSource(
          resJson.source + (resJson.note ? ` (${resJson.note})` : "")
        );
      } else {
        throw new Error(resJson.error || "Analysis failed.");
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorText(err.message);
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
    <div className="bg-slate-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              Generative Cognitive Modeler
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              AI Project Architect
            </h1>
            <p className="text-sm text-slate-400">
              Submit a prompt and get full system architecture instantly.
            </p>
          </div>
        </ScrollReveal>

        {/* Input */}
        {!architectResult && !loading && (
          <ScrollReveal delay={0.1}>
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/50 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>root@promptly:~# _ system_planner</span>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-4">
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 p-4 text-sm"
                />

                {errorText && (
                  <p className="text-xs text-red-500">{errorText}</p>
                )}

                <button className="bg-cyan-500 text-black px-6 py-3 text-xs font-bold rounded">
                  Generate Blueprint <Sparkles className="inline w-4 h-4" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        )}

        {/* Loading */}
        {loading && (
          <ScrollReveal>
            <div className="p-6 border border-cyan-900 text-cyan-400 font-mono text-xs space-y-2">
              {loadingSequence.slice(0, loadingStep + 1).map((l, i) => (
                <div key={i}>▶ {l}</div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* RESULT */}
        {architectResult && !loading && (
          <div className="space-y-8">

            {/* Summary */}
            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-4 p-5 border border-slate-900 bg-slate-900/30 rounded-xl">
                <div>
                  <CalendarRange className="text-cyan-400" />
                  <p className="text-xs text-slate-500">Timeline</p>
                  <p>{architectResult.timeline}</p>
                </div>

                <div>
                  <DollarSign className="text-green-400" />
                  <p className="text-xs text-slate-500">Budget</p>
                  <p>{architectResult.budget}</p>
                </div>

                <div>
                  <Cpu className="text-purple-400" />
                  <p className="text-xs text-slate-500">Source</p>
                  <p className="text-xs">{dataSource}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-12 gap-8">

              {/* Left */}
              <ScrollReveal className="lg:col-span-7 space-y-6">
                <div className="p-6 border border-slate-900 rounded-2xl">
                  <h2 className="text-xl font-bold">
                    {architectResult.name}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {architectResult.description}
                  </p>
                </div>

                <div className="p-6 border border-slate-900 rounded-2xl">
                  <h3 className="text-xs text-slate-500">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {architectResult.techStack.map((t, i) => (
                      <span key={i} className="text-xs text-cyan-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-slate-900 rounded-2xl">
                  <h3 className="text-xs text-yellow-400 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Recommendations
                  </h3>

                  <ul className="text-sm text-slate-400 mt-2 space-y-2">
                    {architectResult.recommendations.map((r, i) => (
                      <ScrollReveal key={i} delay={i * 0.05}>
                        <li>• {r}</li>
                      </ScrollReveal>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Right */}
              <ScrollReveal className="lg:col-span-5 space-y-6">
                <div className="p-6 border border-slate-900 rounded-2xl">
                  <h3 className="text-xs text-slate-500">
                    Implementation Phases
                  </h3>

                  {architectResult.phases.map((p, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div className="mt-4 border-l border-slate-800 pl-4">
                        <p className="text-sm font-bold">{p.name}</p>
                        <p className="text-xs text-cyan-400">{p.duration}</p>
                        <p className="text-xs text-slate-400">
                          {p.details}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveView("contact")}
                    className="flex-1 bg-cyan-500 text-black text-xs font-bold py-3 rounded"
                  >
                    Contact
                  </button>

                  <button
                    onClick={clearBlueprint}
                    className="flex items-center gap-1 border border-slate-800 px-4 py-3 text-xs"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </ScrollReveal>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}