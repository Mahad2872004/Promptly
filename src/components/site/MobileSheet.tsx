import React from "react";
import { Link } from "react-router-dom";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown, Search, X } from "lucide-react";
import { Badge, Button } from "../ui";
import { productLinks, resources, services, type NavLink } from "../../content/navigation";
import { useCommandPalette } from "./CommandPalette";
import { ThemeButton, Wordmark } from "./Brand";
import { useHideChatWidget } from "./useHideChatWidget";

const groups: { id: string; label: string; links: (NavLink & { live?: boolean })[] }[] = [
  { id: "services", label: "Services", links: services },
  { id: "products", label: "Products", links: [...productLinks, { label: "All products", path: "/products" }] },
  { id: "resources", label: "Resources", links: resources },
];

const bigLink =
  "flex w-full items-center justify-between py-4 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] text-fg";

/** Full-screen menu sheet for < lg. Loaded on first open by MobileMenu. */
export default function MobileSheet({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const palette = useCommandPalette();
  useHideChatWidget(open);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Content
          aria-describedby={undefined}
          className="ds-sheet fixed inset-0 z-[80] flex flex-col bg-bg text-fg lg:hidden"
        >
          <RadixDialog.Title className="sr-only">Menu</RadixDialog.Title>
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-border">
            <Link to="/" aria-label="Promptly home" onClick={() => setOpen(false)}>
              <Wordmark />
            </Link>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                onClick={() => {
                  setOpen(false);
                  palette.open();
                }}
                className="inline-flex size-9 items-center justify-center rounded-control text-fg-muted hover:bg-fg/[0.06]"
              >
                <Search size={18} />
              </button>
              <ThemeButton />
              <RadixDialog.Close
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-control text-fg hover:bg-fg/[0.06]"
              >
                <X size={20} />
              </RadixDialog.Close>
            </div>
          </div>

          <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto overscroll-contain py-4">
            <RadixAccordion.Root type="multiple" className="divide-y divide-border">
              {groups.map((g) => (
                <RadixAccordion.Item key={g.id} value={g.id}>
                  <RadixAccordion.Header asChild>
                    <h2>
                      <RadixAccordion.Trigger className={`group ${bigLink}`}>
                        {g.label}
                        <ChevronDown
                          size={22}
                          aria-hidden
                          className="text-fg-subtle transition-transform duration-300 group-data-[state=open]:rotate-180"
                        />
                      </RadixAccordion.Trigger>
                    </h2>
                  </RadixAccordion.Header>
                  <RadixAccordion.Content className="ds-accordion-content">
                    <ul className="pb-4">
                      {g.links.map((l) => (
                        <li key={l.path}>
                          <Link
                            to={l.path}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-control py-2.5 text-lg text-fg-muted hover:text-fg"
                          >
                            {l.label}
                            {l.live && <Badge variant="live">Live</Badge>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </RadixAccordion.Content>
                </RadixAccordion.Item>
              ))}
              {[
                ["Industries", "/industries"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <Link key={path} to={path} onClick={() => setOpen(false)} className={bigLink}>
                  {label}
                </Link>
              ))}
            </RadixAccordion.Root>
          </nav>

          <div className="wrap shrink-0 border-t border-border pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button to="/contact" size="lg" iconRight className="w-full" onClick={() => setOpen(false)}>
              Start a project
            </Button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
