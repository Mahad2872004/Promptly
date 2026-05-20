import React, { useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import { Send, Github, Twitter, Linkedin, Sparkles, Check } from "lucide-react";

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
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Logo size={42} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              We engineer high-fidelity subscription SaaS platforms, automated cloud frameworks, and server-side model pipelines. Crafted with strict architectural honesty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            {/* Clock context representation requested for professional margin headers */}
            <div className="font-mono text-[11px] text-slate-600 bg-slate-900/60 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM CLOCK: UTC 2026-05-20
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-300">Solutions</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <button onClick={() => setActiveView("services")} className="hover:text-white transition-colors">Cognitive Sprints (AI)</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("services")} className="hover:text-white transition-colors">Infrastructure & Cloud</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("services")} className="hover:text-white transition-colors">SaaS Web Engine</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("services")} className="hover:text-white transition-colors">Responsive Android/iOS</button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-300">Company</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <button onClick={() => setActiveView("about")} className="hover:text-white transition-colors">About Story</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("portfolio")} className="hover:text-white transition-colors">Case Studies</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("about")} className="hover:text-white transition-colors">Core Specialists</button>
                  </li>
                  <li>
                    <button onClick={() => setActiveView("contact")} className="hover:text-white transition-colors">Book Architectural Brief</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Dispatch */}
            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-300">Promptly Gazette</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Stay updated on the latest serverless database trends, custom API security, and agentic prompt structures.
              </p>
              
              <form onSubmit={handleSubscribe} className="mt-4 flex max-w-md gap-2" id="footer-newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 flex-auto rounded-md border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors px-3 text-slate-200"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Welcome to our private engineering letter!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Copy lines */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Promptly Systems Inc. All rights reserved. Precision Software Engineering.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Architecture</a>
            <a href="#" className="hover:text-white">API Service Level</a>
            <a href="#" className="hover:text-white">Terms of Cloud Intake</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
