import React, { useEffect, useMemo, useRef, useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { VIEW_PATHS } from "../routes";
import { Menu, X, ChevronDown, ArrowRight, Mail, MapPin, Linkedin } from "lucide-react";

interface HeaderProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

interface NavLink {
  label: string;
  view?: ViewType;
  /** Two-column mega panel when present, simple list when absent. */
  dropdownItems?: { label: string; view: ViewType; description?: string }[];
}

/**
 * Site header.
 *
 * Three bands, top to bottom:
 *   1. utility strip — contact details, the standard B2B software pattern
 *   2. main bar — wordmark, underline nav, one solid CTA
 *   3. mega panel / mobile drawer, on demand
 *
 * Nav items carry no icons and no pill backgrounds; the active item is marked
 * with a 2px brand underline. Desktop nav appears at lg — five items plus two
 * actions cannot fit 768px.
 */
export default function Header({ activeView, setActiveView }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  // Any navigation closes whatever is open.
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape closes the open menu; a click outside the nav does the same.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const navLinks: NavLink[] = useMemo(
    () => [
      { label: "Home", view: "home" },
      {
        label: "Services",
        dropdownItems: [
          { label: "AI Solutions", view: "ai-solutions", description: "AI automation & intelligent systems" },
          { label: "Software Development", view: "software-development", description: "Web apps & custom software" },
          { label: "Digital Transformation", view: "digital-transformation", description: "Business process automation" },
          { label: "Startup Support", view: "startup-support", description: "MVP development & scaling" },
        ],
      },
      {
        label: "Products",
        dropdownItems: [
          { label: "xSender", view: "xsender", description: "WhatsApp order management platform" },
          { label: "All Products", view: "products", description: "The full product portfolio" },
        ],
      },
      {
        label: "Industries",
        dropdownItems: [
          { label: "Startups", view: "startups", description: "Early-stage to growth" },
          { label: "E-commerce", view: "ecommerce", description: "Retail & D2C brands" },
          { label: "Real Estate", view: "realestate", description: "PropTech solutions" },
          { label: "Enterprise", view: "enterprise", description: "Scale-up businesses" },
        ],
      },
      { label: "Work", view: "portfolio" },
      { label: "Company", view: "about" },
    ],
    []
  );

  /**
   * A top-level item is active when it IS the current view, or when the
   * current view is one of its children — so "Services" stays underlined
   * while the user is on /services/ai-solutions.
   */
  const isActive = (link: NavLink) =>
    link.view === activeView ||
    !!link.dropdownItems?.some((i) => i.view === activeView);

  const handleNavClick = (view: ViewType) => {
    navigate(VIEW_PATHS[view]);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  // Small grace period so the pointer can cross the trigger→panel gap.
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 140);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* ── Utility strip ─────────────────────────────────────────────── */}
      <div className="topbar hidden lg:block">
        <div className="container-page flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:promptlypk@gmail.com"
              className="flex items-center gap-2 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              promptlypk@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Lahore, Pakistan
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavClick("client-portal")}
              className="transition-colors hover:text-white"
            >
              Client Portal
            </button>
            <a
              href="https://www.linkedin.com/company/promptlypk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors"
              aria-label="Promptly on LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main bar ──────────────────────────────────────────────────── */}
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div
          ref={navRef}
          className="container-page flex h-16 items-center justify-between gap-6"
        >
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="shrink-0 rounded-md outline-none transition-opacity hover:opacity-80"
            id="header-logo-container"
            aria-label="Promptly — go to home"
          >
            <Logo size={30} />
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdownItems;
              const isOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && openNow(link.label)}
                  onMouseLeave={() => hasDropdown && closeSoon()}
                >
                  <button
                    type="button"
                    id={`nav-link-${link.view || link.label}`}
                    onClick={() =>
                      hasDropdown
                        ? setOpenDropdown(isOpen ? null : link.label)
                        : link.view && handleNavClick(link.view)
                    }
                    className={`nav-link ${isActive(link) ? "is-active" : ""}`}
                    aria-haspopup={hasDropdown || undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    aria-current={link.view === activeView ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {hasDropdown && isOpen && (
                    /* pt-3 rather than mt-3: the padding bridges the gap so
                       the pointer never leaves the hover target on the way
                       down to the panel. */
                    <div className="absolute left-1/2 top-full z-50 w-[21rem] -translate-x-1/2 pt-3">
                      <div className="nav-panel animate-fadeIn p-2" role="menu">
                        {link.dropdownItems?.map((item) => {
                          const itemActive = item.view === activeView;
                          return (
                            <button
                              key={item.label}
                              role="menuitem"
                              onClick={() => handleNavClick(item.view)}
                              className={`nav-dropdown-item ${itemActive ? "is-active" : ""}`}
                              aria-current={itemActive ? "page" : undefined}
                            >
                              <span className="flex items-center justify-between gap-2">
                                <span className="nav-dropdown-label">{item.label}</span>
                                <ArrowRight className="nav-dropdown-arrow h-3.5 w-3.5 shrink-0" />
                              </span>
                              {item.description && (
                                <span className="mt-0.5 block text-xs text-[var(--text-micro)]">
                                  {item.description}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <ThemeToggle />
            <button
              type="button"
              id="nav-btn-contact"
              onClick={() => handleNavClick("contact")}
              className="btn btn-primary px-5 py-2.5"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile / tablet: theme switch stays visible, never buried. */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary h-10 w-10 p-0"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ───────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="animate-fadeIn border-t border-[var(--border)] bg-[var(--bg-base)] lg:hidden"
          >
            <div className="container-page max-h-[calc(100vh-7rem)] overflow-y-auto py-4">
              {navLinks.map((link) => {
                const hasDropdown = !!link.dropdownItems;
                const isOpen = openDropdown === link.label;
                return (
                  <div key={link.label} className="border-b border-[var(--border)] last:border-0">
                    <button
                      type="button"
                      id={`mobile-nav-${link.view || link.label}`}
                      onClick={() =>
                        hasDropdown
                          ? setOpenDropdown(isOpen ? null : link.label)
                          : link.view && handleNavClick(link.view)
                      }
                      className={`flex w-full items-center justify-between py-3.5 text-left text-[0.9375rem] font-medium transition-colors ${
                        isActive(link)
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-heading)]"
                      }`}
                      aria-expanded={hasDropdown ? isOpen : undefined}
                    >
                      <span>{link.label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          aria-hidden
                          className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {hasDropdown && isOpen && (
                      <div className="mb-3 ml-1 animate-fadeIn border-l border-[var(--border)] pl-4">
                        {link.dropdownItems?.map((item) => {
                          const itemActive = item.view === activeView;
                          return (
                            <button
                              key={item.label}
                              onClick={() => handleNavClick(item.view)}
                              className={`block w-full py-2.5 text-left text-sm transition-colors ${
                                itemActive
                                  ? "font-semibold text-[var(--accent)]"
                                  : "text-[var(--text-body)]"
                              }`}
                              aria-current={itemActive ? "page" : undefined}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="mobile-nav-portfolio"
                  onClick={() => handleNavClick("portfolio")}
                  className="btn btn-secondary"
                >
                  View Work
                </button>
                <button
                  type="button"
                  id="mobile-nav-contact"
                  onClick={() => handleNavClick("contact")}
                  className="btn btn-primary"
                >
                  Contact Us
                </button>
              </div>

              <p className="mt-5 text-xs text-[var(--text-micro)]">
                <a href="mailto:promptlypk@gmail.com" className="hover:text-[var(--accent)]">
                  promptlypk@gmail.com
                </a>
                {" · "}
                Lahore, Pakistan
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
