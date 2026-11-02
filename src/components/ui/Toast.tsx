import React, { createContext, useCallback, useContext, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../../lib/cn";

type ToastVariant = "success" | "error" | "info";

interface ToastData {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

type ToastInput = Omit<ToastData, "id" | "variant"> & { variant?: ToastVariant };

const ToastContext = createContext<((t: ToastInput) => void) | null>(null);

/** `const toast = useToast(); toast({ title, description, variant })` */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const icons = {
  success: <CheckCircle2 size={18} className="text-accent-icon" aria-hidden />,
  error: <AlertCircle size={18} className="text-danger" aria-hidden />,
  info: <Info size={18} className="text-fg-muted" aria-hidden />,
};

let nextId = 1;

/**
 * Form success/error feedback. Errors are announced assertively; everything
 * else politely. Top-right on desktop, so it never sits on the chat launcher.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const push = useCallback((t: ToastInput) => {
    setToasts((all) => [...all, { variant: "info", ...t, id: nextId++ }]);
  }, []);
  const remove = (id: number) => setToasts((all) => all.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={push}>
      <RadixToast.Provider swipeDirection="right" duration={5000}>
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            type={t.variant === "error" ? "foreground" : "background"}
            onOpenChange={(open) => !open && remove(t.id)}
            className={cn(
              "ds-toast relative flex items-start gap-3 rounded-card border border-border bg-bg-raised p-4 pr-10 text-fg shadow-elev-3",
              t.variant === "error" && "border-danger/40",
            )}
          >
            <span className="mt-0.5">{icons[t.variant]}</span>
            <div className="min-w-0">
              <RadixToast.Title className="font-medium">{t.title}</RadixToast.Title>
              {t.description && (
                <RadixToast.Description className="mt-1 text-sm text-fg-muted">
                  {t.description}
                </RadixToast.Description>
              )}
            </div>
            <RadixToast.Close
              aria-label="Dismiss"
              className="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-full text-fg-subtle hover:bg-fg/[0.06] hover:text-fg"
            >
              <X size={15} />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed top-20 right-0 z-[100] flex w-full max-w-[420px] flex-col gap-3 p-4 outline-none sm:right-4" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
