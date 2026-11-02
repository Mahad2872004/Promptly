import React, { createContext, lazy, Suspense, useContext, useEffect, useMemo, useState } from "react";

interface PaletteContext {
  open: () => void;
}
const Ctx = createContext<PaletteContext>({ open: () => {} });

/** `useCommandPalette().open()` — e.g. from the header button or 404 page. */
export const useCommandPalette = () => useContext(Ctx);

/** "⌘" on Apple platforms, "Ctrl" elsewhere. */
export function useModKey() {
  const [mod, setMod] = useState("Ctrl");
  useEffect(() => {
    if (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent)) setMod("⌘");
  }, []);
  return mod;
}

const loadDialog = () => import("./CommandPaletteDialog");
const CommandPaletteDialog = lazy(loadDialog);

/** Warm the palette chunk before it's needed (hover/focus on a search button). */
export const preloadCommandPalette = () => void loadDialog();

/**
 * ⌘K / Ctrl+K anywhere opens the palette. The dialog (and cmdk) is fetched the
 * first time it's opened, then stays mounted so later opens are instant.
 */
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setRequested(true);
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      open: () => {
        setRequested(true);
        setOpen(true);
      },
    }),
    [],
  );
  return (
    <Ctx.Provider value={value}>
      {children}
      {requested && (
        <Suspense fallback={null}>
          <CommandPaletteDialog open={isOpen} onOpenChange={setOpen} />
        </Suspense>
      )}
    </Ctx.Provider>
  );
}
