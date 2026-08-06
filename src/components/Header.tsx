import React, { useEffect, useMemo, useRef, useState } from "react";
import { ViewType } from "../types";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { VIEW_PATHS } from "../routes";
import {
  Menu,
  X,
  ArrowUpRight,
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
  icon?: React.ReactNode;
  dropdownItems?: { label: string; view: ViewType; description?: string }[];
}

/** Desktop nav appears at lg, not md: five items plus two CTAs cannot fit 768px. */
export default function Header({ activeView, setActiveView }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

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

  // Any navigation closes whatever is open.
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape closes the open menu; click outside the nav does the same.
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
        label: "What We Do",
        icon: <Briefcase className="h-3.5 w-3.5 shrink-0" />,
        dropdownItems: [
          { label: "AI Solutions", view: "ai-solutions", description: "AI automation & intelligent systems" },
          { label: "Software Development", view: "software-development", description: "Web apps & custom software" },
          { label: "Digital Transformation", view: "digital-transformation", description: "Business process automation" },
          { label: "Startup Support", view: "startup-support", description: "MVP development & scaling" },
        ],
      },
      {
        label: "Products",
        icon: <Package className="h-3.5 w-3.5 shrink-0" />,
        dropdownItems: [
          { label: "xSender", view: "xsender", description: "WhatsApp Order Management" },
          { label: "All Products", view: "products", description: "View our product portfolio" },
        ],
      },
      {
        label: "Who We Help",
        icon: <Building2 className="h-3.5 w-3.5 shrink-0" />,
        dropdownItems: [
          { label: "Startups", view: "startups", description: "Early-stage to growth" },
          { label: "E-commerce", view: "ecommerce", description: "Retail & D2C brands" },
          { label: "Real Estate", view: "realestate", description: "PropTech solutions" },
          { label: "Enterprise", view: "enterprise", description: "Scale-up businesses" },
        ],
      },
      { label: "About", view: "about", icon: <Users className="h-3.5 w-3.5 shrink-0" /> },
    ],
    []
  );

  /**
   * A top-level item is active when it IS the current view, or when the current
   * view is one of its dropdown children — so "What We Do" stays lit while the
   * user is on /services/ai-solutions.
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

  const linkClass = (link: NavLink) =>
    `nav-link group flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold select-none ${
      isActive(link) ? "is-active" : ""
    }`;

  return (
    <header
      className={`site-header sticky top-0 z-50 w-full ${scrolled ? "is-scrolled" : ""}`}
    >
      <div
        ref={navRef}
        className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="shrink-0 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--promptly-border-active)]"
          id="header-logo-container"
          aria-label="Promptly — go to home"
        >
          <Logo size={34} />
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
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
                  className={linkClass(link)}
                  aria-haspopup={hasDropdown || undefined}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  aria-current={link.view === activeView ? "page" : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      aria-hidden
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {hasDropdown && isOpen && (
                  /* pt-2 rather than mt-2: the padding bridges the gap so the
                     pointer never leaves the hover target on the way down. */
                  <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-2">
                    <div
                      className="animate-fadeIn rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
                      style={{
                        background: "var(--bg-panel)",
                        border: "1px solid var(--promptly-border)",
                        boxShadow: "var(--card-shadow-hover)",
                      }}
                      role="menu"
                    >
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
                              <span className="nav-dropdown-label">
                                {item.label}
                              </span>
                              <ArrowUpRight className="nav-dropdown-arrow h-3.5 w-3.5 shrink-0" />
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

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle />
          {/* Secondary CTA yields first on narrower desktops so the primary
              CTA and the nav never collide. */}
          <button
            type="button"
            id="nav-btn-portfolio"
            onClick={() => handleNavClick("portfolio")}
            className="btn-secondary group hidden items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold xl:flex"
          >
            <span>View Work</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            type="button"
            id="nav-btn-contact"
            onClick={() => handleNavClick("contact")}
            className="btn-primary group flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile / tablet: theme switch stays visible, never buried in the drawer. */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary flex h-10 w-10 items-center justify-center rounded-xl p-0"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="animate-fadeIn border-t border-brand lg:hidden">
          <div
            className="mx-4 mb-4 mt-2 max-h-[calc(100vh-6.5rem)] space-y-1 overflow-y-auto rounded-2xl p-2"
            style={{
              background: "var(--bg-panel)",
              border: "1px solid var(--promptly-border)",
            }}
          >
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdownItems;
              const isOpen = openDropdown === link.label;
              return (
                <div key={link.label}>
                  <button
                    type="button"
                    id={`mobile-nav-${link.view || link.label}`}
                    onClick={() =>
                      hasDropdown
                        ? setOpenDropdown(isOpen ? null : link.label)
                        : link.view && handleNavClick(link.view)
                    }
                    className={`${linkClass(link)} w-full rounded-xl px-4 py-3 text-left text-base`}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                  >
                    {link.icon}
                    <span className="flex-1">{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        aria-hidden
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {hasDropdown && isOpen && (
                    <div className="ml-3 mt-1 animate-fadeIn space-y-0.5 border-l border-[var(--promptly-border)] pl-3">
                      {link.dropdownItems?.map((item) => {
                        const itemActive = item.view === activeView;
                        return (
                          <button
                            key={item.label}
                            onClick={() => handleNavClick(item.view)}
                            className={`w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                              itemActive
                                ? "accent-text font-semibold"
                                : "text-[var(--text-body-soft)] hover:text-[var(--text-heading)]"
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

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-brand pt-3">
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
                Let&apos;s Talk
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
