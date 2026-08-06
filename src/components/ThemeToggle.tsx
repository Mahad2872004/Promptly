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
        <span className="eyebrow hidden lg:inline-block whitespace-nowrap">
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
        className="btn-secondary relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--promptly-border-active)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
      >
        <Sun
          aria-hidden
          className={`absolute h-[1.05rem] w-[1.05rem] transition-all duration-300 ${
            isDark
              ? "scale-50 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
          style={{ color: "var(--mod-product-text)" }}
        />
        <Moon
          aria-hidden
          className={`absolute h-[1.05rem] w-[1.05rem] transition-all duration-300 ${
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-50 -rotate-90 opacity-0"
          }`}
          style={{ color: "var(--mod-ai-text)" }}
        />
      </button>
    </div>
  );
}
