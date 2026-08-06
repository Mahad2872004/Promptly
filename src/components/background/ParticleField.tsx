import React, { useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  r: number;
  /** Drift velocity in px/second — time-scaled so speed is frame-rate independent. */
  vx: number;
  vy: number;
  alpha: number;
  /** Twinkle phase; dark mode only. */
  phase: number;
  warm: boolean;
}

/**
 * Single canvas layer for both themes.
 *
 *  dark  → starfield: hundreds of small white/gold dots on a very slow drift
 *  light → dot-grid drift: the same field recoloured to low-opacity navy/teal,
 *          snapped loosely to a grid so it reads as structure, not noise
 *
 * One canvas rather than hundreds of DOM nodes, and one rAF loop that stops
 * entirely when the tab is hidden. Never mounted when the user prefers
 * reduced motion — BackgroundLayer gates that.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport but is capped so a 4K monitor doesn't
      // quietly cost 3x the paint time of a laptop.
      const count = Math.min(340, Math.round((width * height) / 5200));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.15 + 0.45,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5 - 2,
        alpha: Math.random() * 0.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.18, // ~18% gold in dark, teal in light
      }));
    };

    const readVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
      fallback;

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab-switch
      last = now;

      const isDark = themeRef.current === "dark";
      const base = readVar("--particle-color", isDark ? "255,255,255" : "15,23,42");
      const alt = readVar("--particle-alt", isDark ? "251,191,96" : "8,145,178");
      const maxAlpha = parseFloat(readVar("--particle-alpha", isDark ? "0.55" : "0.06"));

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap rather than bounce — bouncing reads as an edge, wrapping as depth.
        if (p.x < -4) p.x = width + 4;
        else if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        else if (p.y > height + 4) p.y = -4;

        const twinkle = isDark
          ? 0.65 + 0.35 * Math.sin(now / 1400 + p.phase)
          : 1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.warm ? alt : base}, ${
          p.alpha * maxAlpha * twinkle
        })`;
        ctx.arc(p.x, p.y, isDark ? p.r : p.r * 1.35, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    // Debounced so a drag-resize doesn't rebuild the field on every frame.
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
