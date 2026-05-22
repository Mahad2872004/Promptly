import React, { useEffect, useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import {
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Layout,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

interface NavLink {
  label: string;
  view: ViewType;
  isSpecial?: boolean;
  icon?: React.ReactNode;
}

export default function Header({ activeView, setActiveView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = [
    { label: "Home", view: "home" },
    { label: "Services", view: "services" },
    { label: "Case Studies", view: "portfolio" },
    {
      label: "AI Architect",
      view: "ai-architect",
      isSpecial: true,
      icon: <Terminal className="h-3.5 w-3.5 shrink-0" />,
    },
    { label: "About", view: "about" },
    {
      label: "Client Hub",
      view: "client-portal",
      icon: <Layout className="h-3.5 w-3.5 shrink-0 opacity-70" />,
    },
  ];

  const handleNavClick = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = (link: NavLink) => {
    const active = activeView === link.view;
    const base =
      "nav-link group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold select-none";
    if (link.isSpecial) {
      return `${base} nav-link-special ${active ? "is-active" : ""}`;
    }
    return `${base} ${active ? "is-active" : ""}`;
  };

  return (
    <header
      className={`site-header sticky top-0 z-50 w-full ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="shrink-0 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          id="header-logo-container"
          aria-label="Go to home"
        >
          <Logo size={34} />
        </button>

        {/* Desktop nav — pill track */}
        <nav
          className="hidden items-center gap-0.5 rounded-xl p-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.view}
              type="button"
              id={`nav-link-${link.view}`}
              onClick={() => handleNavClick(link.view)}
              className={linkClass(link)}
            >
              {link.icon}
              <span>{link.label}</span>
              {link.isSpecial && activeView !== link.view && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => handleNavClick("ai-architect")}
            className="btn-secondary hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold lg:flex"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Try AI
          </button>
          <button
            type="button"
            id="nav-btn-contact"
            onClick={() => handleNavClick("contact")}
            className="btn-primary group flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn-secondary flex h-10 w-10 items-center justify-center rounded-xl p-0 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-fadeIn border-t border-brand md:hidden">
          <div
            className="mx-4 mb-4 mt-2 space-y-1 rounded-2xl p-2"
            style={{ background: "var(--promptly-surface)", border: "1px solid var(--promptly-border)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.view}
                type="button"
                id={`mobile-nav-${link.view}`}
                onClick={() => handleNavClick(link.view)}
                className={`${linkClass(link)} w-full rounded-xl px-4 py-3 text-left text-base`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 border-t border-brand pt-3">
              <button
                type="button"
                onClick={() => handleNavClick("ai-architect")}
                className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Try AI
              </button>
              <button
                type="button"
                id="mobile-nav-contact"
                onClick={() => handleNavClick("contact")}
                className="btn-primary flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm"
              >
                Start Project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
