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
  Terminal,
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

  const handleNav = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nav = {
    solutions: [
      { label: "Web Applications", view: "services" as ViewType },
      { label: "AI Automation", view: "services" as ViewType },
      { label: "AI Systems", view: "services" as ViewType },
      { label: "App Development", view: "services" as ViewType },
    ],
    company: [
      { label: "About", view: "about" as ViewType },
      { label: "Case Studies", view: "portfolio" as ViewType },
      { label: "AI Architect", view: "ai-architect" as ViewType },
      { label: "Client Portal", view: "client-portal" as ViewType },
    ],
  };

  const socials = [
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Github, label: "GitHub" },
  ];

  return (
    <footer className="site-footer relative text-brand-muted">
      {/* Top gradient accent line */}
      <div
        className="h-px w-full"
        style={{ background: "var(--promptly-gradient)" }}
        aria-hidden
      />

      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="footer-cta-card flex flex-col items-center justify-between gap-8 rounded-2xl p-8 md:flex-row md:p-10 lg:rounded-3xl">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                <Sparkles className="h-3 w-3" />
                Free consultation
              </span>
              <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                Let&apos;s build something{" "}
                <span className="text-gradient-cyan-indigo">exceptional</span>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                Book a 30-minute architecture session with our principal team—scope, stack,
                and timeline included.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="btn-primary group flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm"
              >
                Schedule consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => handleNav("ai-architect")}
                className="btn-secondary flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <Terminal className="h-4 w-4 text-cyan-400" />
                Try AI Architect
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Main footer grid */}
      <div className="border-t border-brand">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <button
                type="button"
                onClick={() => handleNav("home")}
                className="rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-cyan-500/50"
              >
                <Logo size={42} />
              </button>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                Promptly engineers high-fidelity SaaS platforms, cloud-native systems, and
                AI-driven products—with architectural honesty and premium craft at every layer.
              </p>

              <div className="mt-6 flex gap-2.5">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="footer-social flex h-10 w-10 items-center justify-center rounded-xl"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="surface-card mt-6 space-y-2.5 rounded-xl p-4">
                <p className="flex items-center gap-2.5 text-xs text-slate-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  </span>
                  hello@promptly.systems
                </p>
                <p className="flex items-center gap-2.5 text-xs text-slate-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                    <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                  </span>
                  Lahore, Pakistan
                </p>
              </div>
            </div>

            {/* Navigation columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
              <div>
                <h3 className="footer-heading text-xs font-bold uppercase">Solutions</h3>
                <ul className="mt-4 space-y-2">
                  {nav.solutions.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => handleNav(link.view)}
                        className="footer-link text-left text-sm"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="footer-heading text-xs font-bold uppercase">Company</h3>
                <ul className="mt-4 space-y-2">
                  {nav.company.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => handleNav(link.view)}
                        className="footer-link text-left text-sm"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="footer-heading text-xs font-bold uppercase">Quick links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNav("contact")}
                      className="footer-link text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Start a project →
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNav("home")}
                      className="footer-link text-sm"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNav("services")}
                      className="footer-link text-sm"
                    >
                      Services
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <div className="surface-card rounded-2xl p-5">
                <h3 className="footer-heading text-xs font-bold uppercase">
                  Promptly Gazette
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Monthly insights on serverless, API security, and agentic engineering.
                </p>
                <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="footer-input min-w-0 flex-1 rounded-xl px-3.5 py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    className="btn-primary flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl p-0"
                    aria-label="Subscribe"
                  >
                    {subscribed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>
                {subscribed && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Welcome aboard!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand pt-8 md:flex-row">
            <p className="text-center text-xs text-slate-500 md:text-left">
              © 2026 Promptly Systems Inc.{" "}
              <span className="text-slate-600">·</span> Precision software engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy", "Terms", "SLA"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="footer-link text-xs"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
