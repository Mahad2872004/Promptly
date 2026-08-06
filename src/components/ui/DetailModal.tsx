import React, { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import { ModuleId, accentFor, accentVars } from "../../theme/tokens";

export interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  accent: ModuleId;
  eyebrow?: string;
  title: string;
  description: string;
  setupCost?: string;
  ongoingCost?: string;
  includes: string[];
  caveats?: string[];
  /** Optional footer action, e.g. "Explore AI Solutions →". */
  action?: { label: string; onClick: () => void };
}

/** Elements that can hold focus inside the dialog. */
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible detail dialog for the Systems scene.
 *
 * Escape to close, click the backdrop to close, focus trapped inside while
 * open, focus returned to the trigger on close, and the page behind is
 * inert to scroll. Rendered through a portal so no ancestor transform or
 * `overflow: hidden` can clip it — SceneSection's pinned wrapper has both.
 */
export default function DetailModal({
  open,
  onClose,
  accent,
  eyebrow,
  title,
  description,
  setupCost,
  ongoingCost,
  includes,
  caveats,
  action,
}: DetailModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();
  const tone = accentFor(accent);

  // Remember what had focus so it can be restored when the dialog closes.
  useEffect(() => {
    if (open) restoreFocusRef.current = document.activeElement as HTMLElement;
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      // Wrap in both directions so Tab can never escape the dialog.
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleKeyDown, true);

    // Lock background scroll, compensating for the scrollbar so the page
    // behind doesn't shift sideways as it disappears.
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    // Move focus in after paint so the browser doesn't scroll to it mid-mount.
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current;
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus]") ??
        panel?.querySelector<HTMLElement>(FOCUSABLE) ??
        panel;
      target?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      cancelAnimationFrame(raf);
      restoreFocusRef.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={accentVars(accent)}
    >
      {/* Backdrop — click to dismiss. aria-hidden so SRs only see the panel. */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 animate-fadeIn bg-[color-mix(in_srgb,var(--bg-base)_78%,transparent)] backdrop-blur-md"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative z-10 max-h-[88vh] w-full max-w-lg animate-fadeIn overflow-y-auto rounded-t-3xl outline-none sm:rounded-3xl"
        style={{
          background: "var(--bg-panel)",
          border: `1.5px solid color-mix(in srgb, ${tone.core} 45%, transparent)`,
          boxShadow: "var(--card-shadow-hover)",
        }}
      >
        {/* Accent bar ties the dialog to the card it came from. */}
        <div
          className="h-1 w-full rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, ${tone.core}, ${tone.deep})`,
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          data-autofocus
          className="btn-secondary absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full p-0"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-7 p-6 sm:p-8">
          <header className="space-y-2 pr-12">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2
              id={titleId}
              className="text-2xl font-extrabold tracking-tight text-[var(--text-heading)]"
            >
              {title}
            </h2>
            <p
              id={descId}
              className="text-sm leading-relaxed text-[var(--text-body)]"
            >
              {description}
            </p>
          </header>

          {(setupCost || ongoingCost) && (
            <div className="grid grid-cols-2 gap-3">
              {setupCost && <CostTile label="Setup cost" value={setupCost} />}
              {ongoingCost && (
                <CostTile label="Ongoing cost" value={ongoingCost} />
              )}
            </div>
          )}

          <section className="space-y-3">
            <h3 className="eyebrow">Includes</h3>
            <ul className="space-y-2.5">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="accent-dot mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-[var(--text-body)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {caveats && caveats.length > 0 && (
            <section className="space-y-3">
              <h3 className="eyebrow">Good to know</h3>
              <ul className="space-y-2.5">
                {caveats.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-micro)]"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-[var(--text-body-soft)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="btn-primary group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold"
            >
              {action.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function CostTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--promptly-surface)",
        border: "1px solid var(--promptly-border)",
      }}
    >
      <p className="eyebrow mb-1.5">{label}</p>
      <p className="text-sm font-bold text-[var(--text-heading)]">{value}</p>
    </div>
  );
}
