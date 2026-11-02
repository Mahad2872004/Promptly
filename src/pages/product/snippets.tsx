import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck,
  Check,
  Inbox,
  Receipt,
  ScanBarcode,
  ShoppingBag,
  Tags,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { SiShopify } from "react-icons/si";
import type { ProductDefinition } from "../../data/products";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

/* Animated UI snippets for product feature rows. Decorative (aria-hidden):
   the feature's heading and text carry the meaning. */

const enter = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { delay: 0.1 + i * 0.22, duration: 0.45, ease: EASE },
});

function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex min-h-[320px] flex-col justify-center gap-3 rounded-panel border border-border bg-bg-sunken/70 p-6 text-sm md:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

const Customer = ({ children, i }: { children: React.ReactNode; i: number }) => (
  <motion.div {...enter(i)} className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-accent-fg">
    {children}
  </motion.div>
);
const Reply = ({ children, i }: { children: React.ReactNode; i: number }) => (
  <motion.div
    {...enter(i)}
    className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-border bg-bg-raised px-4 py-3 text-fg shadow-elev-1"
  >
    {children}
  </motion.div>
);

const xsender = [
  // Answer with context
  () => (
    <Shell>
      <Customer i={0}>Do you have anything vegan for dessert?</Customer>
      <Reply i={1}>
        Yes! Two options today:
        <ul className="mt-2 space-y-1.5">
          {["Coconut panna cotta", "Dark chocolate sorbet"].map((item) => (
            <li key={item} className="flex items-center justify-between gap-6 rounded-lg bg-bg-sunken px-3 py-1.5">
              {item}
              <span className="text-fg-subtle">✓ vegan</span>
            </li>
          ))}
        </ul>
      </Reply>
      <motion.span {...enter(2)} className="inline-flex items-center gap-1.5 self-start pl-1 text-xs text-fg-subtle">
        <BookOpen size={12} /> Answered from your live menu
      </motion.span>
    </Shell>
  ),
  // Capture the next action
  () => (
    <Shell>
      <Customer i={0}>Table for 4 this Saturday at 8?</Customer>
      <motion.div {...enter(1)} className="rounded-card border border-spark/30 bg-bg-raised p-4 shadow-elev-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold text-fg">
            <CalendarCheck size={16} className="text-spark" /> Booking captured
          </span>
          <span className="rounded-full bg-spark px-2 py-0.5 font-mono text-[10px] text-spark-fg uppercase">New</span>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
          {[
            ["Guests", "4"],
            ["Day", "Saturday"],
            ["Time", "8:00 pm"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-bg-sunken px-3 py-2">
              <dt className="text-fg-subtle">{k}</dt>
              <dd className="font-medium text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.div {...enter(2)} className="flex flex-wrap gap-2">
        {[
          [ShoppingBag, "Orders"],
          [CalendarCheck, "Bookings"],
          [UsersRound, "Leads"],
        ].map(([Icon, label], i) => {
          const I = Icon as typeof ShoppingBag;
          return (
            <span
              key={label as string}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                i === 1 ? "border-accent/40 bg-accent-tint text-accent-text" : "border-border text-fg-muted",
              )}
            >
              <I size={12} /> {label as string}
            </span>
          );
        })}
      </motion.div>
    </Shell>
  ),
  // Keep people in the loop
  () => (
    <Shell>
      <Customer i={0}>My order arrived damaged. Can someone help?</Customer>
      <motion.div {...enter(1)} className="flex items-center gap-3 self-center rounded-full border border-border bg-bg-raised px-4 py-2 text-xs text-fg-muted shadow-elev-1">
        <UserRound size={13} className="text-spark" /> Handed to your team · full conversation attached
      </motion.div>
      <motion.div {...enter(2)} className="rounded-card border border-border bg-bg-raised p-4 shadow-elev-1">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-tint font-mono text-xs text-accent-text">
            TM
          </span>
          <span>
            <span className="block font-medium text-fg">Team member</span>
            <span className="block text-xs text-fg-subtle">Picked up in the shared inbox</span>
          </span>
          <Check size={16} className="ml-auto text-accent-icon" />
        </div>
      </motion.div>
    </Shell>
  ),
];

const SampleTag = () => (
  <span className="self-end font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Sample data</span>
);

const Row = ({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) => (
  <motion.div
    {...enter(i)}
    className={cn("flex items-center gap-3 rounded-xl border border-border bg-bg-raised px-4 py-3 shadow-elev-1", className)}
  >
    {children}
  </motion.div>
);

const lumetry = [
  // Connect Shopify
  () => (
    <Shell>
      <Row i={0}>
        <SiShopify className="size-5 text-[#5e8e3e]" aria-hidden />
        <span className="flex-1 font-medium text-fg">Shopify store connected</span>
        <span className="rounded-full bg-accent-tint px-2 py-0.5 text-xs text-accent-text">Read-only</span>
      </Row>
      {["Orders", "Products", "Inventory", "Refunds", "Transactions"].map((item, i) => (
        <motion.div key={item} {...enter(i + 1)} className="flex items-center justify-between px-4 text-fg-muted">
          <span>{item}</span>
          {i < 4 ? <Check size={15} className="text-accent-icon" /> : <span className="text-xs text-spark">Importing…</span>}
        </motion.div>
      ))}
    </Shell>
  ),
  // Understand the numbers
  () => (
    <Shell>
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Net sales", "1.24M", "+8.2%"],
          ["Orders", "1,482", "+5.1%"],
          ["Avg. order value", "836", "+2.9%"],
          ["Refunds", "1.8%", "−0.4%"],
        ].map(([label, value, delta], i) => (
          <motion.div key={label} {...enter(i)} className="rounded-xl border border-border bg-bg-raised p-4 shadow-elev-1">
            <span className="block text-xs text-fg-subtle">{label}</span>
            <span className="tabular mt-1 block text-xl font-semibold tracking-[-0.02em] text-fg">{value}</span>
            <span className="text-xs text-accent-text">{delta} vs last period</span>
          </motion.div>
        ))}
      </div>
      <SampleTag />
    </Shell>
  ),
  // Track data readiness
  () => (
    <Shell>
      <Row i={0}>
        <span className="size-2 rounded-full bg-accent" />
        <span className="flex-1 text-fg">Connection healthy</span>
        <span className="text-xs text-fg-subtle">Last sync 4 min ago</span>
      </Row>
      <motion.div {...enter(1)} className="rounded-xl border border-border bg-bg-raised p-4 shadow-elev-1">
        <div className="flex justify-between text-xs text-fg-muted">
          <span>Historical import</span>
          <span className="tabular">86%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            whileInView={{ width: "86%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </div>
      </motion.div>
      <motion.p {...enter(2)} className="pl-1 text-xs text-fg-subtle">
        Figures use your store’s currency and timezone.
      </motion.p>
    </Shell>
  ),
];

const leadflow = [
  // Capture the first hello
  () => (
    <Shell>
      <motion.div {...enter(0)} className="rounded-xl border border-border bg-bg-raised p-4 shadow-elev-1">
        <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Website form</span>
        {["Name", "Email", "Service interest"].map((f) => (
          <div key={f} className="mt-2 rounded-lg border border-border-input/60 bg-bg px-3 py-2 text-xs text-fg-subtle">
            {f}
          </div>
        ))}
      </motion.div>
      <Row i={1} className="border-accent/40">
        <Inbox size={16} className="text-accent-icon" />
        <span className="flex-1">
          <span className="block font-medium text-fg">New lead</span>
          <span className="text-xs text-fg-muted">Website redesign · source: embedded form</span>
        </span>
        <span className="rounded-full bg-spark px-2 py-0.5 font-mono text-[10px] text-spark-fg uppercase">New</span>
      </Row>
    </Shell>
  ),
  // See the next step
  () => (
    <Shell>
      <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
        {[
          ["New", 3],
          ["Contacted", 2],
          ["Qualified", 1],
          ["Converted", 1],
          ["Lost", 0],
        ].map(([stage, count], i) => (
          <motion.div
            key={stage}
            {...enter(i)}
            className={cn(
              "rounded-lg border px-1 py-3",
              i === 2 ? "border-accent/50 bg-accent-tint" : "border-border bg-bg-raised",
            )}
          >
            <span className="tabular block text-lg font-semibold text-fg">{count}</span>
            <span className="text-fg-muted">{stage}</span>
          </motion.div>
        ))}
      </div>
      <Row i={5}>
        <span className="flex-1 text-fg">Moved to Qualified</span>
        <ArrowRight size={14} className="text-accent-icon" />
      </Row>
      <SampleTag />
    </Shell>
  ),
  // Build a follow-up routine
  () => (
    <Shell>
      <motion.p {...enter(0)} className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
        Due today
      </motion.p>
      {["Send proposal follow-up", "Call back about timeline", "Share case examples"].map((task, i) => (
        <Row key={task} i={i + 1}>
          <motion.span
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            whileInView={i < 2 ? { backgroundColor: "var(--accent)" } : undefined}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.4 }}
            className="inline-flex size-5 items-center justify-center rounded-md border border-border-strong text-accent-fg"
          >
            {i < 2 && <Check size={12} />}
          </motion.span>
          <span className={cn("flex-1", i < 2 ? "text-fg-muted line-through" : "text-fg")}>{task}</span>
        </Row>
      ))}
    </Shell>
  ),
];

const retailflow = [
  // Work at the counter
  () => (
    <Shell>
      <Row i={0}>
        <ScanBarcode size={16} className="text-accent-icon" />
        <span className="tabular flex-1 font-mono text-xs text-fg">8901234567890</span>
        <span className="text-xs text-accent-text">Added</span>
      </Row>
      <motion.div {...enter(1)} className="rounded-xl border border-border bg-bg-raised p-4 shadow-elev-1">
        {[
          ["Notebook A5 × 2", "560"],
          ["Gel pen, blue × 4", "320"],
        ].map(([item, price]) => (
          <div key={item} className="flex justify-between py-1 text-fg-muted">
            <span>{item}</span>
            <span className="tabular">{price}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-fg">
          <span>Total</span>
          <span className="tabular">880</span>
        </div>
      </motion.div>
      <motion.div {...enter(2)} className="flex gap-2">
        {["Cash", "Card", "Wallet"].map((m, i) => (
          <span
            key={m}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              i === 1 ? "border-accent/40 bg-accent-tint text-accent-text" : "border-border text-fg-muted",
            )}
          >
            {m}
          </span>
        ))}
      </motion.div>
    </Shell>
  ),
  // Keep stock in view
  () => (
    <Shell>
      {[
        ["Notebook A5", 64, false],
        ["Gel pen, blue", 9, true],
        ["Sketchbook A4", 31, false],
      ].map(([item, stock, low], i) => (
        <Row key={item as string} i={i}>
          <span className="flex-1 text-fg">{item as string}</span>
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-bg-sunken">
            <span
              className={cn("block h-full rounded-full", low ? "bg-spark" : "bg-accent")}
              style={{ width: `${Math.min(100, (stock as number) * 1.4)}%` }}
            />
          </span>
          <span className="tabular w-8 text-right text-xs text-fg-muted">{stock as number}</span>
          {low && <span className="rounded-full bg-spark px-2 py-0.5 font-mono text-[10px] text-spark-fg uppercase">Low</span>}
        </Row>
      ))}
      <SampleTag />
    </Shell>
  ),
  // Connect store operations
  () => (
    <Shell>
      <div className="grid grid-cols-3 gap-3">
        {[
          [Receipt, "Sales"],
          [UsersRound, "Customers"],
          [Truck, "Suppliers"],
          [Tags, "Categories"],
          [ScanBarcode, "Barcodes"],
          [BarChart3, "Reports"],
        ].map(([Icon, label], i) => {
          const I = Icon as typeof Receipt;
          return (
            <motion.div
              key={label as string}
              {...enter(i)}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-bg-raised px-2 py-4 text-xs text-fg-muted shadow-elev-1"
            >
              <I size={18} className="text-accent-icon" />
              {label as string}
            </motion.div>
          );
        })}
      </div>
    </Shell>
  ),
];

const SNIPPETS: Record<string, React.ComponentType[]> = { xsender, lumetry, leadflow, retailflow };

/** Real screenshot, cropped differently per feature, until a product has bespoke snippets. */
function ScreenshotCrop({ product, index }: { product: ProductDefinition; index: number }) {
  const positions = ["0% 0%", "100% 30%", "30% 100%"];
  return (
    <div className="overflow-hidden rounded-panel border border-border bg-bg-sunken shadow-elev-2">
      <img
        src={product.preview.src}
        alt=""
        loading="lazy"
        decoding="async"
        width={product.preview.width}
        height={product.preview.height}
        className="aspect-[4/3] h-auto w-full scale-[1.6] object-cover"
        style={{ objectPosition: positions[index % positions.length], transformOrigin: positions[index % positions.length] }}
      />
    </div>
  );
}

export function FeatureSnippet({ product, index }: { product: ProductDefinition; index: number }) {
  const Snippet = SNIPPETS[product.id]?.[index];
  return Snippet ? <Snippet /> : <ScreenshotCrop product={product} index={index} />;
}
