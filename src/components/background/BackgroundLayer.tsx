import React, { Suspense, lazy, useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";

// Code-split so the canvas never sits on the critical path.
const ParticleField = lazy(() => import("./ParticleField"));

/**
 * Full-bleed fixed atmosphere behind all content.
 *
 * Layers, back to front:
 *   1. flat page colour (--bg-base)
 *   2. two large ambient gradient washes, theme-tuned
 *   3. static dot-grid (light mode only) — the floor the drift sits on
 *   4. animated particle canvas, lazily mounted after first paint
 *
 * Under `prefers-reduced-motion` layer 4 never mounts at all — the result is
 * a completely static background in whichever theme is active.
 */
export default function BackgroundLayer() {
  const { theme, reducedMotion } = useTheme();
  const [mountParticles, setMountParticles] = useState(false);
  const isDark = theme === "dark";

  // Defer the canvas until the browser is idle so it can't block first paint.
  useEffect(() => {
    if (reducedMotion) {
      setMountParticles(false);
      return;
    }
    const idle =
      window.requestIdleCallback?.(() => setMountParticles(true), { timeout: 1800 }) ??
      window.setTimeout(() => setMountParticles(true), 600);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [reducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      {/* Ambient washes — the same teal→orange DNA in both themes, but read as
          "light through frosted glass" on white and "glow in space" on navy. */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% -15%, color-mix(in srgb, var(--mod-ai-core) ${
            isDark ? 16 : 13
          }%, transparent), transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 100% 100%, color-mix(in srgb, var(--mod-product-core) ${
            isDark ? 12 : 10
          }%, transparent), transparent 70%)`,
        }}
      />

      {/* Static lattice under the drift. Dark mode has the starfield instead. */}
      {!isDark && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 100% 80% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 100% 80% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
      )}

      {mountParticles && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}
    </div>
  );
}
