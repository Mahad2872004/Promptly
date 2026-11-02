import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  ArrowRight,
  Box,
  CalendarDays,
  CornerDownLeft,
  FileText,
  HelpCircle,
  Home,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "../../theme/ThemeProvider";
import { Kbd } from "../ui";
import {
  BOOKING_URL,
  company,
  CONTACT_EMAIL,
  legal,
  productLinks,
  resources,
  services,
} from "../../content/navigation";
import { faqs } from "../../content/faq";
import { useHideChatWidget } from "./useHideChatWidget";

/* The ⌘K dialog itself. Loaded on demand by CommandPaletteProvider so cmdk
   and the dialog code stay out of the initial bundle. */

const pages = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Box },
  { label: "Products", path: "/products", icon: Box },
  ...company,
  ...legal.map((l) => ({ ...l, icon: FileText })),
];

/**
 * Word-based matching instead of cmdk's fuzzy default, which ranks
 * "Email promptlypk@…" for "price" because the letters appear in order.
 * Every term must appear in the label or keywords; dropping a long term's
 * last letter catches simple inflections ("price" → "pricing").
 */
function filter(value: string, search: string, keywords?: string[]) {
  const label = value.toLowerCase();
  const haystack = `${label} ${(keywords ?? []).join(" ").toLowerCase()}`;
  const terms = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const hit = (text: string, t: string) =>
    text.includes(t) || (t.length >= 5 && text.includes(t.slice(0, -1)));
  if (!terms.every((t) => hit(haystack, t))) return 0;
  return terms.every((t) => hit(label, t)) ? 1 : 0.5;
}

const itemClass =
  "group flex cursor-pointer items-center gap-3 rounded-control px-3 py-2.5 text-[0.9375rem] text-fg-muted outline-none " +
  "data-[selected=true]:bg-fg/[0.06] data-[selected=true]:text-fg";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:pb-2 " +
  "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:tracking-[0.14em] " +
  "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-fg-subtle";

function Icon({ icon: I }: { icon?: React.ComponentType<{ size?: number; className?: string }> }) {
  const Glyph = I ?? ArrowRight;
  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-sunken text-fg-subtle group-data-[selected=true]:text-accent-icon">
      <Glyph size={16} />
    </span>
  );
}

export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  useHideChatWidget(open);

  const run = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      action();
    },
    [onOpenChange],
  );
  const go = (path: string) => run(() => navigate(path));

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="ds-overlay fixed inset-0 z-[90] bg-ink-950/50 backdrop-blur-sm" />
        <RadixDialog.Content
          className="ds-dialog fixed top-[12vh] left-1/2 z-[91] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-panel border border-border bg-bg-raised text-fg shadow-elev-3"
          aria-describedby={undefined}
        >
          <RadixDialog.Title className="sr-only">Search Promptly</RadixDialog.Title>
          <Command label="Search Promptly" loop filter={filter}>
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search size={18} className="shrink-0 text-fg-subtle" aria-hidden />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search pages, services, products, answers…"
                className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-fg-subtle"
              />
              <Kbd>Esc</Kbd>
            </div>
            <Command.List className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-3 py-10 text-center text-fg-muted">
                No results for “{query}”.
              </Command.Empty>

              <Command.Group heading="Actions" className={groupClass}>
                <Command.Item className={itemClass} onSelect={() => go("/contact")} keywords={["contact", "brief", "hire"]}>
                  <Icon icon={ArrowRight} /> Start a project
                </Command.Item>
                <Command.Item
                  className={itemClass}
                  onSelect={() => run(() => window.open(BOOKING_URL, "_blank", "noopener"))}
                  keywords={["call", "meeting", "calendly", "consultation"]}
                >
                  <Icon icon={CalendarDays} /> Book a 30-min call
                </Command.Item>
                <Command.Item
                  className={itemClass}
                  onSelect={() => run(() => (window.location.href = `mailto:${CONTACT_EMAIL}`))}
                  keywords={["email", "mail", "contact", "lahore", "pakistan", "location", "address"]}
                >
                  <Icon icon={Mail} /> Email {CONTACT_EMAIL}
                </Command.Item>
                <Command.Item className={itemClass} onSelect={() => run(toggleTheme)} keywords={["theme", "dark", "light", "mode"]}>
                  <Icon icon={theme === "dark" ? Sun : Moon} /> Switch to {theme === "dark" ? "light" : "dark"} theme
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Services" className={groupClass}>
                {services.map((s) => (
                  <Command.Item key={s.path} value={`service ${s.label}`} keywords={[s.description ?? ""]} className={itemClass} onSelect={() => go(s.path)}>
                    <Icon icon={s.icon} />
                    <span className="min-w-0">
                      <span className="block text-fg">{s.label}</span>
                      <span className="block truncate text-sm text-fg-subtle">{s.description}</span>
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Products" className={groupClass}>
                {productLinks.map((p) => (
                  <Command.Item key={p.path} value={`product ${p.label}`} keywords={[p.category, p.description]} className={itemClass} onSelect={() => go(p.path)}>
                    <Icon icon={Box} />
                    <span className="min-w-0">
                      <span className="block text-fg">{p.label}</span>
                      <span className="block truncate text-sm text-fg-subtle">{p.category}</span>
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Pages & tools" className={groupClass}>
                {[...resources, ...pages].map((p) => (
                  <Command.Item key={p.path} value={`page ${p.label}`} keywords={[p.description ?? ""]} className={itemClass} onSelect={() => go(p.path)}>
                    <Icon icon={p.icon} /> {p.label}
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Answers stay hidden until there's a query, to keep the list short. */}
              {query && (
                <Command.Group heading="Answers" className={groupClass}>
                  {faqs.map((f) => (
                    <Command.Item key={f.id} value={`faq ${f.question}`} keywords={[f.category, f.answer]} className={itemClass} onSelect={() => go(`/faq#${f.id}`)}>
                      <Icon icon={HelpCircle} />
                      <span className="min-w-0">
                        <span className="block text-fg">{f.question}</span>
                        <span className="block truncate text-sm text-fg-subtle">{f.answer}</span>
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>
            <div className="flex items-center gap-4 border-t border-border bg-bg-sunken/60 px-5 py-2.5 text-xs text-fg-subtle">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeft size={11} />
                </Kbd>
                to open
              </span>
            </div>
          </Command>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
