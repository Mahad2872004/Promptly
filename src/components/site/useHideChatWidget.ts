import { useEffect } from "react";

/*
 * Helpers for the third-party Aivastark chat widget injected by index.html.
 * It renders into an open shadow root (#aivastark-widget-host), so page CSS
 * can't reach inside. Everything here is defensive: if the widget changes its
 * markup, these selectors simply stop matching and nothing breaks.
 */

const HOST_ID = "aivastark-widget-host";

/**
 * Hides the chat launcher while a full-screen overlay is open, so it can't sit
 * on top of the menu's pinned CTA, the command palette or a dialog.
 * See `html[data-overlay-open]` in components.css.
 */
export function useHideChatWidget(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.setAttribute("data-overlay-open", "");
    return () => root.removeAttribute("data-overlay-open");
  }, [open]);
}

const WIDGET_CSS = `
  /* Brand focus ring on the launcher buttons. */
  #aivastark-launcher:focus-visible,
  .aivastark-launcher-cluster button:focus-visible {
    outline: 2px solid #00ddc3 !important;
    outline-offset: 3px !important;
  }
  /* Phones: keep the launcher clear of content and the home indicator, and
     drop the greeting bubble that otherwise covers page text and CTAs. */
  @media (max-width: 640px) {
    #aivastark-widget-root {
      right: 16px !important;
      bottom: max(16px, env(safe-area-inset-bottom)) !important;
    }
    #aivastark-teaser-stack { display: none !important; }
  }
`;

/** Adds brand/positioning overrides inside the widget's shadow root once it mounts. */
export function useChatWidgetTheme() {
  useEffect(() => {
    let tries = 0;
    let timer = 0;
    const apply = () => {
      const shadow = document.getElementById(HOST_ID)?.shadowRoot;
      if (shadow) {
        if (!shadow.querySelector("style[data-promptly]")) {
          const style = document.createElement("style");
          style.setAttribute("data-promptly", "");
          style.textContent = WIDGET_CSS;
          shadow.appendChild(style);
        }
        return;
      }
      // The widget script loads async; keep checking for ~15s.
      if (tries++ < 30) timer = window.setTimeout(apply, 500);
    };
    apply();
    return () => window.clearTimeout(timer);
  }, []);
}
