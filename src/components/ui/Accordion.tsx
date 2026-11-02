import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** `single` keeps one item open at a time. */
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}

/** Radix accordion with a smooth height animation and a rotating + icon. */
export function Accordion({ items, type = "single", defaultValue, className }: AccordionProps) {
  const rootProps =
    type === "single"
      ? ({ type: "single", collapsible: true, defaultValue } as const)
      : ({ type: "multiple", defaultValue: defaultValue ? [defaultValue] : undefined } as const);

  return (
    <RadixAccordion.Root {...rootProps} className={cn("border-t border-border", className)}>
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id} className="border-b border-border">
          <RadixAccordion.Header asChild>
            <h3>
              <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium text-fg transition-colors hover:text-accent-text">
                {item.title}
                <span
                  aria-hidden
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-fg-muted transition-[transform,background-color,color,border-color] duration-300 ease-brand group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent/40 group-data-[state=open]:bg-accent-tint group-data-[state=open]:text-accent-text"
                >
                  <Plus size={16} />
                </span>
              </RadixAccordion.Trigger>
            </h3>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="ds-accordion-content">
            <div className="max-w-2xl pb-6 text-fg-muted">{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
