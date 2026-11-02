import React from "react";
import { MotionConfig } from "motion/react";
import { ToastProvider } from "./Toast";

/**
 * App-wide providers for the design system. `reducedMotion="user"` makes
 * every motion component drop transforms when the OS asks for less motion.
 */
export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
