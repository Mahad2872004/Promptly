import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  /** Optional persistent label rendered next to the switch (hero/nav state). */
  label?: string;
}

/**
 * Sun/moon theme switch. Always visible in the header — never inside a menu.
 * Renders both icons and cross-fades between them so the control never
 * reflows, and so the transition reads as one switch rather than a swap.
 */
export default function ThemeToggle({ className = "", label }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {label && (
        <span className="mono-label hidden whitespace-nowrap uppercase lg:inline-block">
          {label}
        </span>
      )}
      <button
        type="button"
        id="theme-toggle"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="btn btn-secondary relative h-9 w-9 shrink-0 p-0"
      >
        <Sun
          aria-hidden
          className={`absolute h-[1.05rem] w-[1.05rem] text-[var(--text-body)] transition-all duration-200 ${
            isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <Moon
          aria-hidden
          className={`absolute h-[1.05rem] w-[1.05rem] text-[var(--text-body)] transition-all duration-200 ${
            isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
