import React from "react";
import { useInView } from "../../hooks/useInView";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "zoom-in"
  | "slide-left"
  | "slide-right"
  | "fade";

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  staggerIndex?: number;
}

const animationClass: Record<RevealAnimation, string> = {
  "fade-up": "reveal-fade-up",
  "fade-down": "reveal-fade-down",
  "zoom-in": "reveal-zoom-in",
  "slide-left": "reveal-slide-left",
  "slide-right": "reveal-slide-right",
  fade: "reveal-fade",
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  style,
  staggerIndex,
}: ScrollRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const staggerDelay = staggerIndex != null ? staggerIndex * 90 : 0;
  const totalDelay = delay + staggerDelay;

  return (
    <div
      ref={ref}
      className={`reveal-base ${animationClass[animation]} ${inView ? "reveal-visible" : ""} ${className}`}
      style={
        {
          "--reveal-delay": `${totalDelay}ms`,
          "--reveal-duration": `${duration}ms`,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
