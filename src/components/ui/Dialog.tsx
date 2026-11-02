import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { usePortalContainer } from "./ThemeScope";
import { useHideChatWidget } from "../site/useHideChatWidget";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export interface DialogContentProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

/** Rendered inside Radix Content, which only mounts while the dialog is open. */
function HideChatWhileOpen() {
  useHideChatWidget(true);
  return null;
}

/** Centered modal with blurred overlay, focus trap and Escape to close. */
export function DialogContent({
  title,
  description,
  size = "md",
  className,
  children,
}: DialogContentProps) {
  const container = usePortalContainer();
  return (
    <RadixDialog.Portal container={container}>
      <RadixDialog.Overlay className="ds-overlay fixed inset-0 z-[90] bg-ink-950/50 backdrop-blur-sm" />
      <RadixDialog.Content
        className={cn(
          "ds-dialog fixed top-1/2 left-1/2 z-[91] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2",
          "max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-panel border border-border bg-bg-raised p-7 text-fg shadow-elev-3 md:p-9",
          widths[size],
          className,
        )}
      >
        <HideChatWhileOpen />
        <RadixDialog.Title className="pr-10 text-h3 text-fg">{title}</RadixDialog.Title>
        {description ? (
          <RadixDialog.Description className="mt-2 text-fg-muted">
            {description}
          </RadixDialog.Description>
        ) : (
          <RadixDialog.Description className="sr-only">{title}</RadixDialog.Description>
        )}
        {children && <div className="mt-6">{children}</div>}
        <RadixDialog.Close
          aria-label="Close"
          className="absolute top-5 right-5 inline-flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
        >
          <X size={18} />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
