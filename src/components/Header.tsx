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
  ChevronDown,
  Briefcase,
  Building2,
  Users,
  Package,
} from "lucide-react";

interface HeaderProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

interface NavLink {
  label: string;
  view?: ViewType;
  isSpecial?: boolean;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; view: ViewType; description?: string }[];
}

export default function Header({ activeView, setActiveView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    { 
      label: "What We Do", 
      hasDropdown: true,
      icon: <Briefcase className="h-3.5 w-3.5 shrink-0" />,
      dropdownItems: [
        { label: "AI Solutions", view: "services", description: "AI automation & intelligent systems" },
        { label: "Software Development", view: "services", description: "Web apps & custom software" },
        { label: "Digital Transformation", view: "services", description: "Business process automation" },
        { label: "Startup Support", view: "services", description: "MVP development & scaling" },
      ]
    },
    { 
      label: "Products", 
      hasDropdown: true,
      icon: <Package className="h-3.5 w-3.5 shrink-0" />,
      dropdownItems: [
        { label: "xSender", view: "home", description: "WhatsApp Order Management" },
        { label: "Coming Soon", view: "home", description: "More products in development" },
      ]
    },
    { 
      label: "Who We Help", 
      hasDropdown: true,
      icon: <Building2 className="h-3.5 w-3.5 shrink-0" />,
      dropdownItems: [
        { label: "Startups", view: "portfolio", description: "Early-stage to growth" },
        { label: "E-commerce", view: "portfolio", description: "Retail & D2C brands" },
        { label: "Real Estate", view: "portfolio", description: "PropTech solutions" },
        { label: "Enterprise", view: "portfolio", description: "Scale-up businesses" },
      ]
    },
    { label: "About", view: "about", icon: <Users className="h-3.5 w-3.5 shrink-0" /> },
  ];

  const handleNavClick = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const linkClass = (link: NavLink) => {
    const base =
      "nav-link group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold select-none relative";
    if (link.isSpecial) {
      return `${base} nav-link-special`;
    }
    return `${base}`;
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

        {/* Desktop nav — mega-menu style */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              <button
                type="button"
                id={`nav-link-${link.view || link.label}`}
                onClick={() => link.hasDropdown ? toggleDropdown(link.label) : link.view && handleNavClick(link.view)}
                onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                className={linkClass(link)}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              {/* Mega-menu dropdown */}
              {link.hasDropdown && openDropdown === link.label && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-4 z-50 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="space-y-1">
                    {link.dropdownItems?.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.view)}
                        className="w-full text-left rounded-xl px-3 py-2.5 hover:bg-slate-800/50 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            id="nav-btn-portfolio"
            onClick={() => handleNavClick("portfolio")}
            className="btn-secondary group flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            <span>View Work</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            type="button"
            id="nav-btn-contact"
            onClick={() => handleNavClick("contact")}
            className="btn-primary group flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              <div key={link.label}>
                <button
                  type="button"
                  id={`mobile-nav-${link.view || link.label}`}
                  onClick={() => link.hasDropdown ? toggleDropdown(link.label) : link.view && handleNavClick(link.view)}
                  className={`${linkClass(link)} w-full rounded-xl px-4 py-3 text-left text-base`}
                >
                  {link.icon}
                  <span className="flex-1">{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {/* Mobile dropdown */}
                {link.hasDropdown && openDropdown === link.label && (
                  <div className="ml-4 mt-1 space-y-1 animate-fadeIn">
                    {link.dropdownItems?.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.view)}
                        className="w-full text-left rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 border-t border-brand pt-3 mt-3">
              <button
                type="button"
                id="mobile-nav-portfolio"
                onClick={() => handleNavClick("portfolio")}
                className="btn-secondary flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold"
              >
                View Work
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                id="mobile-nav-contact"
                onClick={() => handleNavClick("contact")}
                className="btn-primary flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold"
              >
                Let's Talk
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
