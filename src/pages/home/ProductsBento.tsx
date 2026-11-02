import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products, type ProductDefinition } from "../../data/products";
import {
  Badge,
  Button,
  Card,
  GlowOrb,
  GridBackground,
  SectionHeader,
  Stagger,
  StaggerItem,
  ThemeScope,
} from "../../components/ui";
import { cn } from "../../lib/cn";

function Screenshot({ product, className }: { product: ProductDefinition; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-xl border border-b-0 border-border bg-bg-sunken shadow-elev-2 transition-transform duration-500 ease-brand group-hover:-translate-y-1.5",
        className,
      )}
    >
      <img
        src={product.preview.src}
                    srcSet={product.preview.srcSet}
                    sizes="(min-width: 1024px) 840px, 100vw"
        alt={product.preview.alt}
        width={product.preview.width}
        height={product.preview.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

function ViewCue() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:opacity-100">
      View product <ArrowRight size={15} />
    </span>
  );
}

export function ProductsBento() {
  const [xsender, ...others] = products;
  return (
    <ThemeScope theme="dark" as="section" aria-labelledby="our-products" className="relative isolate overflow-hidden">
      <GridBackground fade="bottom" noise />
      <GlowOrb color="teal" size={700} className="-top-80 -left-40" />
      <div className="wrap-wide section-y">
        <SectionHeader
          id="our-products"
          index="02"
          eyebrow="Our own products"
          title={
            <>
              We don’t just build for others.
              <br />
              We build what we believe in.
            </>
          }
          action={
            <Button variant="link" to="/products" iconRight>
              The product portfolio
            </Button>
          }
          align="split"
        />

        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          <StaggerItem className="lg:col-span-2 lg:row-span-2">
            <Card size="panel" padded={false} interactive className="group relative flex h-full flex-col overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-eyebrow text-fg-subtle uppercase">
                    Built by Promptly · {xsender.category}
                  </span>
                  <Badge variant="live">Live demo</Badge>
                </div>
                <h3 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.035em] text-fg">
                  xSender
                </h3>
                <p className="mt-4 text-h3 text-fg">
                  Conversations in. <span className="text-fg-muted">Clarity out.</span>
                </p>
                <p className="mt-3 max-w-lg text-fg-muted">
                  Customer conversations across WhatsApp, Instagram, and Facebook. Answers, orders, bookings, and a
                  clear handoff to your team.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to={xsender.path} iconRight>
                    Meet xSender
                  </Button>
                  <Button href={xsender.url} variant="secondary" iconRight={<ArrowUpRight size={16} />}>
                    Try the live demo
                  </Button>
                </div>
              </div>
              <div className="mt-auto px-8 md:px-10">
                <Screenshot product={xsender} />
              </div>
            </Card>
          </StaggerItem>

          {others.map((p, i) => (
            <StaggerItem key={p.id} className={cn(i === 2 && "lg:col-span-3")}>
              <Card
                as="article"
                padded={false}
                interactive
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden",
                  i === 2 && "lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-end",
                )}
              >
                <div className="p-7">
                  <span className="font-mono text-eyebrow text-fg-subtle uppercase">{p.category}</span>
                  <h3 className="mt-3 text-h3 text-fg">
                    <Link to={p.path} className="after:absolute after:inset-0 after:content-['']">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-fg-muted">{p.description}</p>
                  <div className="mt-4 h-5">
                    <ViewCue />
                  </div>
                </div>
                <div className={cn("mt-auto px-7", i === 2 && "lg:pt-7")}>
                  <Screenshot product={p} className="max-h-48 lg:max-h-56" />
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </ThemeScope>
  );
}
