import React, { useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import ScrollReveal from "./ui/ScrollReveal";
import { useNavigate } from "react-router-dom";
import { VIEW_PATHS } from "../routes";
import { Send, Linkedin, Check, ArrowRight, Mail, MapPin } from "lucide-react";

interface FooterProps {
  setActiveView: (view: ViewType) => void;
}

/**
 * Site footer.
 *
 * Dark in both themes — a light footer under a light page gives the document
 * nothing to close on. Two bands: a full-width CTA, then a four-column link
 * grid over a legal bar. No gradient panel, no glow, no glass.
 */
export default function Footer({ setActiveView }: FooterProps) {
  const navigate = useNavigate();
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
    navigate(VIEW_PATHS[view]);
  };

  const columns: { heading: string; links: { label: string; view: ViewType }[] }[] = [
    {
      heading: "Services",
      links: [
        { label: "AI Solutions", view: "ai-solutions" },
        { label: "Software Development", view: "software-development" },
        { label: "Digital Transformation", view: "digital-transformation" },
        { label: "Startup Support", view: "startup-support" },
        { label: "All Services", view: "services" },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "xSender", view: "xsender" },
        { label: "All Products", view: "products" },
        { label: "AI Architect", view: "ai-architect" },
        { label: "Client Portal", view: "client-portal" },
      ],
    },
    {
      heading: "Industries",
      links: [
        { label: "Startups", view: "startups" },
        { label: "E-commerce", view: "ecommerce" },
        { label: "Real Estate", view: "realestate" },
        { label: "Enterprise", view: "enterprise" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", view: "about" },
        { label: "Case Studies", view: "portfolio" },
        { label: "Contact", view: "contact" },
        { label: "Book a Consultation", view: "consultation" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      {/* ── CTA band ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <div className="border-b border-white/10">
          <div className="container-page flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Have a project in mind?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/60">
                Book a 30-minute technical session with our engineering team. No deck,
                no pitch — we scope the problem and tell you what it takes to build.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handleNav("consultation")}
                className="btn btn-on-inverse group px-6"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => handleNav("contact")}
                className="btn btn-outline-inverse px-6"
              >
                Send a Brief
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Link grid ─────────────────────────────────────────────────── */}
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand + contact */}
          <div className="lg:col-span-3">
            <button onClick={() => handleNav("home")} aria-label="Promptly — go to home">
              <Logo size={32} onInverse />
            </button>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Promptly is a software engineering company building AI-powered
              platforms, custom business software, and its own products.
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href="mailto:promptlypk@gmail.com"
                className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                promptlypk@gmail.com
              </a>
              <p className="flex items-center gap-2.5 text-white/60">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                Lahore, Pakistan
              </p>
            </div>

            <div className="mt-6 flex gap-2.5">
              <a
                href="https://www.linkedin.com/company/promptlypk/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social h-9 w-9"
                aria-label="Promptly on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="footer-heading">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNav(link.view)}
                        className="footer-link text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="mt-4 text-sm text-white/60">
              Monthly engineering notes. No sales email.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                aria-label="Email address"
                className="footer-input min-w-0 flex-1 px-3.5 py-2.5 text-sm"
                placeholder="you@company.com"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="btn btn-on-inverse h-[42px] w-[42px] shrink-0 p-0 text-[#0b111a]"
              >
                {subscribed ? (
                  <Check className="h-4 w-4" strokeWidth={2.25} />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={2.25} />
                )}
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 text-xs text-[var(--brand-400)]">
                Subscribed — check your inbox.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Legal bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
