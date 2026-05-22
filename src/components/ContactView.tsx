import React, { useState, useEffect } from "react";
import { ViewType, FAQItem } from "../types";
import { SYSTEM_FAQS } from "../data";
import { Mail, User, Building, Landmark, ChevronDown, Check, Send, AlertCircle, HelpCircle } from "lucide-react";

interface ContactViewProps {
  setActiveView: (view: ViewType) => void;
}

interface SubmittedBrief {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  status: string;
}

export default function ContactView({ setActiveView }: ContactViewProps) {
  // Contact Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("Enterprise Multi-Tenant SaaS");
  const [budget, setBudget] = useState("$30,000 - $50,000");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Simulated live queue logged from Express `/api/contacts`
  const [liveQueue, setLiveQueue] = useState<SubmittedBrief[]>([]);
  const [faqOpenId, setFaqOpenId] = useState<string | null>("faq-1");

  const projectTemplates = [
    "Enterprise Multi-Tenant SaaS",
    "Agentic AI Pipeline / LLM Custom Web",
    "High-Performance Cloud Architecture",
    "Bespoke Responsive Mobile App",
    "General Prototyping Sprint"
  ];

  const budgetRanges = [
    "Under $20,000",
    "$20,000 - $40,000",
    "$40,000 - $60,005",
    "$60,000+"
  ];

  // Fetch live queue on mount
  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await fetch("/api/contacts");
      if (response.ok) {
        const data = await response.json();
        setLiveQueue(data);
      }
    } catch (e) {
      console.warn("Could not retrieve live queue fallback log:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Local interface port failed to submit database records.");
      }

      const resJson = await response.json();
      if (resJson.success) {
        setSuccessMsg(resJson.message);
        // Clear inputs
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        // Re-fetch queue to show live submit dynamically
        fetchQueue();
      } else {
        throw new Error(resJson.error || "Failed registration session.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Endpoint error submitting blueprint parameters.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (id: string) => {
    setFaqOpenId(faqOpenId === id ? null : id);
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Project Intake</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            Intake Architectural Form
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Ready to bring your software ideas alive? Provide details on your software agency brief below, and lock in our upcoming weekly sprint target.
          </p>
        </div>

        {/* Form and Live Queue Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Block - The Brief Intake Form (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-6">
            
            <div className="flex items-center gap-2 pb-3.5 border-b border-slate-805 text-xs font-mono text-slate-500">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SECURED INGESTION BLOCK active</span>
            </div>

            {successMsg ? (
              <div className="p-6 rounded-2xl border border-emerald-900/30 bg-emerald-950/10 text-center space-y-4 animate-fadeIn">
                <div className="h-12 w-12 rounded-full bg-emerald-900/60 border border-emerald-700 text-emerald-400 items-center justify-center flex mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-sans font-extrabold text-lg text-slate-205">Architectural Intake Submitted!</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md mx-auto">
                  {successMsg} Our principal designer and head systems engineer Kamil Vance are preparing your introductory code spec package.
                </p>
                <button
                  onClick={() => setSuccessMsg("")}
                  className="rounded-full border border-emerald-750 hover:bg-emerald-950/25 px-5 py-2 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer"
                >
                  Submit Another Intake
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left" id="agency-intake-brief-form">
                
                {/* Name & Email Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full rounded border border-slate-800 bg-[#020617] pl-9 pr-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@corp.com"
                        className="w-full rounded border border-slate-800 bg-[#020617] pl-9 pr-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Company / Product Entity</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Lumina Systems"
                      className="w-full rounded border border-slate-800 bg-[#020617] pl-9 pr-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Project selector dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Project Scope Template</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-[#020617] p-2 text-xs sm:text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors"
                    >
                      {projectTemplates.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Target Development Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-[#020617] p-2 text-xs sm:text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Scope Brief Box */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">Tell Us About the Software Core Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on user management, custom reporting, integrations, or payment gateways..."
                    className="w-full rounded border border-slate-800 bg-[#020617] p-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors leading-relaxed font-sans"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 bg-red-955/10 border border-red-950 p-2 rounded">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-3.5 text-xs uppercase tracking-widest select-none"
                >
                  {loading ? "Registering system Brief..." : "Submit Architectural Brief"}
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                </button>

              </form>
            )}

          </div>

          {/* Right Block - Live Ingress Queue Monitoring (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Queue Box */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="border-b border-slate-802 pb-3 flex items-center justify-between text-left">
                <div className="space-y-0.5">
                  <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-300">Live Ingress Stream</h3>
                  <p className="text-[10px] text-slate-555">Real-time submitted agency briefs registry</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto" id="live-contacts-registry-list">
                {liveQueue.map((brief) => (
                  <div key={brief.id} className="p-3.5 rounded-xl bg-[#020617] border border-slate-850 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-sans font-bold text-xs text-slate-200">{brief.name}</span>
                        <p className="text-[9px] text-slate-500 font-mono uppercase">{brief.company || "Independent"}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase
                        ${brief.status === "Pending" ? "bg-slate-900 text-slate-500 border border-slate-800" : ""}
                        ${brief.status === "In Contact" ? "bg-cyan-950/40 text-cyan-400 border border-cyan-900 animate-pulse" : ""}
                        ${brief.status === "Kickoff Scheduled" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900" : ""}
                      `}>
                        {brief.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal font-sans line-clamp-2">
                       {brief.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-900/60 font-mono text-[9px] text-slate-500">
                      <span>TEMPLATE: {brief.projectType.split("/")[0].split(" ")[0]}</span>
                      <span>BUDGET: {brief.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Block */}
        <div className="border-t border-slate-800/40 pt-16 space-y-8 text-left">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">Answers to Core Queries</h2>
            <p className="text-xs text-slate-400">Review system constraints and security certifications before kicking off a sprint.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3" id="faq-accordion-group">
            {SYSTEM_FAQS.map((faq) => {
              const isOpen = faqOpenId === faq.id;
              return (
                <div key={faq.id} className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors hover:border-cyan-500/20">
                  <button
                    id={`btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 bg-transparent text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "transform rotate-180 text-cyan-400" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-slate-950/40 border-t border-slate-800/60 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-normal" id={`ans-${faq.id}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
