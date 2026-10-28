import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
export default function Header(_props: {
  activeView: string;
  setActiveView: (view: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="shell nav-inner">
        <Link to="/" aria-label="Promptly home">
          <Logo size={34} />
        </Link>
        <nav
          id="primary-nav"
          aria-label="Main navigation"
          className={open ? "primary-nav is-open" : "primary-nav"}
        >
          {[
            ["Services", "/services"],
            ["Products", "/products"],
            ["Work", "/portfolio"],
            ["About", "/about"],
          ].map(([label, path]) => (
            <NavLink key={path} to={path}>
              {label}
            </NavLink>
          ))}
          <Link className="mobile-contact" to="/contact">
            Discuss a project <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/contact" className="action primary nav-cta">
            Discuss a project <ArrowUpRight size={15} />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
