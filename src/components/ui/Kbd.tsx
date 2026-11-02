import React from "react";
import { cn } from "../../lib/cn";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border-strong bg-bg-raised px-1.5",
        "font-mono text-[0.6875rem] font-medium text-fg-muted shadow-[inset_0_-1px_0_var(--border-strong)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
