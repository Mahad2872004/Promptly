import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import { BOOT_MS } from "../motion/reveal";

/** How long the overlay lingers, fading, after the app has mounted beneath it. */
const EXIT_MS = 260;

/**
 * Boot overlay.
 *
 * Deliberately plain: the mark, and a hairline determinate progress rail.
 * The previous version was a "cinematic" splash — glowing orb, staged status
 * copy ("Initializing systems… Systems online"), a handwritten tagline and an
 * "AI Control Center" label. None of that belongs on a company site.
 *
 * It does NOT unmount the instant the app appears — it cross-fades over
 * EXIT_MS while the page mounts underneath, so the handover isn't a cut.
 */
export default function PageLoader() {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    // Eased to 100% across exactly BOOT_MS, so the bar completes as the overlay
    // releases rather than stalling at a random value.
    const tick = (now: number) => {
      const t = Math.min((now - start) / BOOT_MS, 1);
      setProgress((1 - Math.pow(1 - t, 2)) * 100);
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-base)]"
      aria-live="polite"
      aria-busy={!exiting}
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduced ? 0 : EXIT_MS / 1000, ease: "easeOut" }}
      // Once fading, stop swallowing clicks on the page underneath.
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <div className="flex w-full max-w-[15rem] flex-col items-center">
        <Logo size={40} />

        <div
          className="mt-7 h-[2px] w-full overflow-hidden rounded-full bg-[var(--border)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Loading Promptly"
        >
          <div
            className="h-full bg-[var(--accent)]"
            style={{
              width: `${progress}%`,
              transition: reduced ? "none" : "width 90ms linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
