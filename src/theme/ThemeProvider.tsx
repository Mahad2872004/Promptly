import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "promptly-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  /** True while the ~300ms cross-fade between themes is running. */
  isTransitioning: boolean;
  /** Mirrors the `prefers-reduced-motion` media query. */
  reducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the boot theme. Light is the product default; the OS preference is
 * consulted only when the user has never chosen for themselves.
 *
 * Mirrors the inline no-flash script in index.html — keep the two in sync.
 */
function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = readStoredTheme();
  if (stored) return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Apply to <html>. The class drives Tailwind's `dark:` variant; the
  // color-scheme property fixes native form controls and scrollbars.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState((prev) => {
        if (prev === next) return prev;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* private mode — theme still applies for this session */
        }
        return next;
      });
    },
    []
  );

  // Drive the cross-fade with a class on <html> rather than a global
  // `transition: all`, which would make every hover on the page feel laggy.
  useEffect(() => {
    if (reducedMotion) return;
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setIsTransitioning(true);
    const t = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      setIsTransitioning(false);
    }, 320);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("theme-transition");
    };
  }, [theme, reducedMotion]);

  // Follow the OS only for users who have never made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      setThemeState(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isTransitioning, reducedMotion }),
    [theme, setTheme, toggleTheme, isTransitioning, reducedMotion]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** Standalone reduced-motion hook for components outside the provider tree. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}
