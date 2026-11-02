import React, { createContext, useContext, useId, useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

type TabsVariant = "underline" | "segmented";

const TabsContext = createContext<{ value: string; variant: TabsVariant; id: string }>({
  value: "",
  variant: "underline",
  id: "",
});

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** `underline`: signature-gradient indicator. `segmented`: pill switch. */
  variant?: TabsVariant;
  className?: string;
  children: React.ReactNode;
}

/** Radix tabs with an animated active indicator. */
export function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  variant = "underline",
  className,
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;
  const id = useId();
  return (
    <TabsContext.Provider value={{ value, variant, id }}>
      <RadixTabs.Root
        value={value}
        onValueChange={(v) => {
          setUncontrolled(v);
          onValueChange?.(v);
        }}
        className={className}
      >
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  /** Accessible name for the tab list. */
  label: string;
}) {
  const { variant } = useContext(TabsContext);
  return (
    <RadixTabs.List
      aria-label={label}
      className={cn(
        variant === "underline"
          ? "flex gap-6 overflow-x-auto border-b border-border"
          : "inline-flex rounded-[12px] border border-border bg-bg-sunken p-1",
        className,
      )}
    >
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;
  const underline = ctx.variant === "underline";
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        "relative inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200",
        underline
          ? "h-12 text-fg-muted hover:text-fg data-[state=active]:text-fg"
          : "h-9 rounded-control px-4 text-fg-muted hover:text-fg data-[state=active]:text-fg",
        className,
      )}
    >
      {active && (
        <motion.span
          layoutId={`tab-indicator-${ctx.id}`}
          aria-hidden
          transition={{ duration: 0.4, ease: EASE }}
          className={
            underline
              ? "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[image:var(--grad-signature)]"
              : "absolute inset-0 rounded-control border border-border bg-bg-raised shadow-elev-1"
          }
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </RadixTabs.Trigger>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixTabs.Content value={value} className={cn("pt-8", className)}>
      {children}
    </RadixTabs.Content>
  );
}
