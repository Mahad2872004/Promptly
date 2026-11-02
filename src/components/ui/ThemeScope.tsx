import React, { createContext, useContext, useState } from "react";
import { cn } from "../../lib/cn";

const PortalContainerContext = createContext<HTMLElement | null>(null);

/** Container for portalled overlays, so they adopt the nearest forced theme. */
export function usePortalContainer() {
  return useContext(PortalContainerContext) ?? undefined;
}

/**
 * Forces a theme on a band or panel regardless of the site theme — e.g. the
 * dark product band on a light page. Dialogs and tooltips opened inside
 * render inside it so they match.
 */
export function ThemeScope({
  theme,
  as: Tag = "div",
  className,
  children,
  ...rest
}: {
  theme: "light" | "dark";
  as?: "div" | "section" | "aside";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  return (
    <Tag
      ref={setNode as React.Ref<HTMLDivElement>}
      data-theme={theme}
      className={cn("bg-bg text-fg", className)}
      {...rest}
    >
      <PortalContainerContext.Provider value={node}>{children}</PortalContainerContext.Provider>
    </Tag>
  );
}
