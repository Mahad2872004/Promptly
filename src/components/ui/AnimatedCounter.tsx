import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useInView } from "../../hooks/useInView";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduced = useReducedMotion() ?? false;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
