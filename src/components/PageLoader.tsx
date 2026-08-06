import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import GlowOrb from "./ui/GlowOrb";
import { BOOT_MS } from "../motion/reveal";

/** How long the overlay lingers, fading, after the app has mounted beneath it. */
const EXIT_MS = 360;

/** Status line steps, paced to land the last one as the overlay releases. */
const STAGES = ["Initializing systems", "Loading modules", "Systems online"];

/**
 * Cinematic boot overlay.
 *
 * Shares the control-center language with the rest of the site: the orb behind
 * the mark, eyebrow micro-copy, the script tagline, and a hairline progress
 * rail in the brand gradient. Theme-aware through the same tokens, and fully
 * static under `prefers-reduced-motion`.
 *
 * It does NOT unmount the instant the app appears — it cross-fades out over
 * EXIT_MS while the page animates in underneath, so the handover reads as one
 * continuous motion rather than a cut.
 */
export default function PageLoader() {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    // Eased to 100% across exactly BOOT_MS, so the bar completes as the
    // overlay releases rather than stalling at a random value.
    const tick = (now: number) => {
      const t = Math.min((now - start) / BOOT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setProgress(eased * 100);
      setStage(t < 0.45 ? 0 : t < 0.85 ? 1 : 2);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const toExit = window.setTimeout(() => setExiting(true), BOOT_MS);
    const toUnmount = window.setTimeout(
      () => setMounted(false),
      BOOT_MS + (reduced ? 0 : EXIT_MS)
    );

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(toExit);
      window.clearTimeout(toUnmount);
    };
  }, [reduced]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--bg-base)]"
      aria-live="polite"
      aria-busy={!exiting}
      initial={false}
      animate={
        exiting
          ? { opacity: 0, scale: reduced ? 1 : 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reduced ? 0 : EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
      // Once fading, stop swallowing clicks on the page underneath.
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      {/* Same orb that opens the hero — the overlay hands off to it. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <GlowOrb color="ai" size={560} halo intensity={0.5} />
      </div>

      <div className="relative flex w-full max-w-md flex-col items-center px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <Logo size={62} showText={false} />

          <p className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            Promptly
          </p>

          <p className="script-tagline mt-1">Software that thinks ahead.</p>
        </motion.div>

        {/* Progress rail */}
        <div className="mt-10 w-full">
          <div
            className="h-px w-full overflow-hidden rounded-full"
            style={{ background: "var(--promptly-border)" }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Loading Promptly"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "var(--promptly-gradient)",
                boxShadow: "0 0 12px color-mix(in srgb, var(--mod-ai-core) 70%, transparent)",
                transition: reduced ? "none" : "width 90ms linear",
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="eyebrow">{STAGES[stage]}</span>
            <span className="font-mono text-[0.6875rem] font-bold tabular-nums text-[var(--text-micro)]">
              {String(Math.round(progress)).padStart(3, "0")}%
            </span>
          </div>
        </div>

        <p className="eyebrow mt-8 opacity-70">AI Control Center</p>
      </div>
    </motion.div>
  );
}
