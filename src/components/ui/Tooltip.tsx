import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { usePortalContainer } from "./ThemeScope";

export const TooltipProvider = RadixTooltip.Provider;

/**
 * Short hint on hover/focus. The child must be focusable (a button or link)
 * and should already have an accessible name — tooltips are supplementary.
 */
export function Tooltip({
  content,
  side = "top",
  children,
}: {
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
}) {
  const container = usePortalContainer();
  // Each tooltip carries its own provider, so pages without tooltips don't
  // pull Radix Tooltip into the main bundle.
  return (
    <RadixTooltip.Provider delayDuration={300}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal container={container}>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          className="ds-tooltip z-[95] max-w-xs rounded-lg border border-border bg-bg-raised px-3 py-1.5 text-[0.8125rem] text-fg shadow-elev-2"
        >
          {content}
          <RadixTooltip.Arrow className="fill-[var(--bg-raised)]" width={10} height={5} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
