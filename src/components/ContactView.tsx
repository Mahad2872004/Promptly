import React, { useState } from "react";
import { Mail, User, Building, Check, Send, AlertCircle } from "lucide-react";

interface ContactViewProps {
  setActiveView: (view: any) => void;
}

export default function ContactView({ setActiveView }: ContactViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("Enterprise SaaS");
  const [budget, setBudget] = useState("$20,000 – $40,000");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const projectTemplates = [
    "Enterprise SaaS",
    "AI / LLM Integration",
    "Cloud Architecture",
    "Mobile App",
    "Prototyping Sprint",
  ];

  const budgetRanges = [
    "Under $20,000",
    "$20,000 – $40,000",
    "$40,000 – $60,000",
    "$60,000+",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, email, and project details.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, projectType, budget, message }),
      });

      if (!response.ok) throw new Error("Something went wrong. Please try again.");

      const resJson = await response.json();
      if (resJson.success) {
        setSuccessMsg(resJson.message);
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        throw new Error(resJson.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Get in touch
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            Start a project with us
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Tell us about your software needs and we'll get back to you within one business
            day to discuss your project scope and timeline.
          </p>
        </div>

        {/* Form card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl space-y-6">

          <div className="flex items-center gap-2 pb-3.5 border-b border-slate-800 text-xs font-mono text-slate-500">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Accepting new projects</span>
          </div>

          {successMsg ? (
            <div className="p-6 rounded-2xl border border-emerald-900/30 bg-emerald-950/10 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-900/60 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-sans font-extrabold text-lg">Brief received!</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md mx-auto">
                {successMsg} We'll review your project details and be in touch shortly.
              </p>
              <button
                onClick={() => setSuccessMsg("")}
                className="rounded-full border border-emerald-800 hover:bg-emerald-950/25 px-5 py-2 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer"
              >
                Submit another brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Full name *
                  </label>
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
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Work email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className="w-full rounded border border-slate-800 bg-[#020617] pl-9 pr-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>


              {/* Project type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Project type
                  </label>
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
                  <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Estimated budget
                  </label>
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

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Tell us about your project *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your core requirements — user roles, integrations, key features, or any technical constraints..."
                  className="w-full rounded border border-slate-800 bg-[#020617] p-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors leading-relaxed"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 text-xs text-red-400 bg-red-950/20 border border-red-900/40 p-3 rounded">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-3.5 text-xs uppercase tracking-widest select-none disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send project brief"}
                <Send className="w-3.5 h-3.5 text-slate-950" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}