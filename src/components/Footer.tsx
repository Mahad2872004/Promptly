import React, { useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import ScrollReveal from "./ui/ScrollReveal";
import {
  Send,
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  Check,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";

interface FooterProps {
  setActiveView: (view: ViewType) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setTimeout(() => setEmail(""), 3000);
    }
  };

  const nav = {
    solutions: [
      { label: "AI & Cognitive Systems", view: "services" as ViewType },
      { label: "Cloud Architecture", view: "services" as ViewType },
      { label: "SaaS & Web Products", view: "services" as ViewType },
      { label: "Mobile Engineering", view: "services" as ViewType },
    ],
    company: [
      { label: "About", view: "about" as ViewType },
      { label: "Case Studies", view: "portfolio" as ViewType },
      { label: "AI Architect", view: "ai-architect" as ViewType },
      { label: "Client Portal", view: "client-portal" as ViewType },
    ],
  };

  return (
    <footer className="relative border-t border-slate-800/60 bg-slate-950/90 text-slate-400">
      {/* Consultation CTA band */}
      <div className="border-b border-slate-800/50 bg-gradient-to-r from-cyan-950/20 via-transparent to-indigo-950/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur-sm md:flex-row md:p-10">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                  Let&apos;s build something exceptional
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-400">
                  Book a free 30-minute architecture consultation with our principal team.
                </p>
              </div>
              <button
                onClick={() => setActiveView("contact")}
                className="btn-glow flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950"
              >
                Schedule consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo size={42} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Promptly engineers high-fidelity SaaS platforms, cloud-native systems, and
              AI-driven products—with architectural honesty and premium craft at every layer.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/50 text-slate-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-cyan-500/70" />
                hello@promptly.systems
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-cyan-500/70" />
                Global remote · UTC+0 core hours
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Solutions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {nav.solutions.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setActiveView(link.view)}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {nav.company.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setActiveView(link.view)}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Quick links
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <button
                    onClick={() => setActiveView("contact")}
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Start a project →
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView("home")}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Home
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Promptly Gazette
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Insights on serverless trends, API security, and agentic engineering—monthly, no spam.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3.5 transition-all hover:border-cyan-500/30 hover:bg-slate-700"
              >
                {subscribed ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Send className="h-4 w-4 text-slate-300" />
                )}
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" /> Welcome aboard!
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© 2026 Promptly Systems Inc. Precision software engineering.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              SLA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
