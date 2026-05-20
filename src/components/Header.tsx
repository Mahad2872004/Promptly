import React, { useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import { Sparkles, Terminal, Menu, X, ArrowUpRight, FolderHeart, Layout, MessageSquareCode } from "lucide-react";

interface HeaderProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export default function Header({ activeView, setActiveView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ label: string; view: ViewType; isSpecial?: boolean; icon?: React.ReactNode }> = [
    { label: "Home", view: "home" },
    { label: "Services", view: "services" },
    { label: "Case Studies", view: "portfolio" },
    { 
      label: "AI Architect", 
      view: "ai-architect", 
      isSpecial: true,
      icon: <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
    },
    { label: "About", view: "about" },
    { 
      label: "Client Hub", 
      view: "client-portal",
      icon: <Layout className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" /> 
    },
  ];

  const handleNavClick = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo Component */}
        <div className="cursor-pointer" onClick={() => handleNavClick("home")} id="header-logo-container">
          <Logo size={34} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.view}
              id={`nav-link-${link.view}`}
              onClick={() => handleNavClick(link.view)}
              className={`group flex items-center gap-1.5 px-3 h-9 text-sm font-semibold transition-colors duration-200 rounded-md select-none
                ${activeView === link.view 
                  ? "bg-slate-800/50 text-white" 
                  : link.isSpecial 
                    ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                }
              `}
            >
              {link.icon && link.icon}
              {link.label}
              {link.isSpecial && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button: Start a Project */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-btn-contact"
            onClick={() => handleNavClick("contact")}
            className="group flex items-center gap-1.5 bg-white text-slate-950 px-5.5 py-2 text-sm font-bold rounded-full shadow-lg shadow-white/5 hover:bg-cyan-50 transition-all duration-300"
          >
            Start a Project
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-950" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#020617] px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.view}
              id={`mobile-nav-${link.view}`}
              onClick={() => handleNavClick(link.view)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-base font-semibold rounded-md text-left transition-colors
                ${activeView === link.view 
                  ? "bg-slate-800/85 text-white" 
                  : link.isSpecial
                    ? "text-cyan-300 bg-cyan-950/10"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              {link.icon && link.icon}
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-900">
            <button
              id="mobile-nav-contact"
              onClick={() => handleNavClick("contact")}
              className="flex w-full items-center justify-center gap-2 bg-white text-slate-950 py-3 text-base font-bold rounded-full shadow-lg hover:bg-cyan-50 transition-all"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
