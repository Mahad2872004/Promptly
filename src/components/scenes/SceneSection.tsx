import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useScroll } from "motion/react";
import { useTheme } from "../../theme/ThemeProvider";

interface SceneSectionProps {
  id: string;
  /**
   * How long the scene stays pinned, in extra viewport heights. 1 means the
   * user scrolls one full screen while the content is held in place.
   */
  scrollLength?: number;
  /** Set false for scenes that should never pin, even on desktop. */
  pin?: boolean;
  className?: string;
  /**
   * Receives 0→1 scroll progress through the pinned range, plus whether
   * pinning is actually active (it is not on mobile or under reduced motion).
   */
  children: (ctx: { progress: MotionValue<number>; pinned: boolean }) => React.ReactNode;
}

/** Below this width, pinning fights native scroll momentum and hurts UX. */
const PIN_MIN_WIDTH = 768;

/**
 * ScrollTrigger-style pinned scene, built on position:sticky rather than
 * transform offsets — sticky doesn't hijack the scrollbar, survives address-bar
 * resize on mobile browsers, and degrades to nothing when disabled.
 *
 * Pinning is dropped entirely on small screens and under prefers-reduced-motion;
 * in those cases the scene renders as an ordinary stacked section and `progress`
 * simply never advances past 0.
 */
export default function SceneSection({
  id,
  scrollLength = 1,
  pin = true,
  className = "",
  children,
}: SceneSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useTheme();

  // Resolved SYNCHRONOUSLY on first render, not in an effect. `pinned` decides
  // whether this section gets its tall inline height, and useScroll measures
  // the target during its own first pass — if the height arrives one render
  // later, useScroll keeps the pre-height measurement and scrollYProgress
  // never leaves 0, freezing every scroll-linked child at its start value.
  const [wideEnough, setWideEnough] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${PIN_MIN_WIDTH}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${PIN_MIN_WIDTH}px)`);
    const sync = () => setWideEnough(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pinned = pin && wideEnough && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      style={pinned ? { height: `${(1 + scrollLength) * 100}vh` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen items-center overflow-hidden relative"
            : "relative flex min-h-[100svh] items-center py-20"
        }
      >
        {children({ progress: scrollYProgress, pinned })}
      </div>
    </section>
  );
}
