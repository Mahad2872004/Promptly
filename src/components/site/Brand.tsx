import React from "react";
import { Moon, Sun } from "lucide-react";
import Logo from "../Logo";
import { cn } from "../../lib/cn";
import { useTheme } from "../../theme/ThemeProvider";

/** Logo mark + "Promptly." wordmark (orange dot), in token colours. */
export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={size} showText={false} />
      <span className="text-[1.1875rem] font-semibold tracking-[-0.03em] text-fg">
        Promptly<span className="text-spark">.</span>
      </span>
    </span>
  );
}

/**
 * Theme switch. Both icons are rendered and CSS shows the right one (keyed on
 * the `.dark` class the boot script sets), so pre-rendered HTML and the
 * hydrated app always match whatever theme the visitor has.
 */
export function ThemeButton({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch colour theme"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-control text-fg-muted transition-colors hover:bg-fg/[0.06] hover:text-fg",
        className,
      )}
    >
      <Sun size={17} aria-hidden className="hidden dark:block" />
      <Moon size={17} aria-hidden className="dark:hidden" />
    </button>
  );
}
