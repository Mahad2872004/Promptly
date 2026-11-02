import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Badge, Button, Kbd } from "../ui";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";
import { productLinks, resources, services } from "../../content/navigation";
import { preloadCommandPalette, useCommandPalette, useModKey } from "./CommandPalette";
import { ServicePreview } from "./ServicePreview";
import { MobileMenu } from "./MobileMenu";
import { ThemeButton, Wordmark } from "./Brand";


const triggerClass =
  "group relative inline-flex h-9 items-center gap-1 rounded-control px-3 text-[0.9375rem] text-fg-muted transition-colors " +
  "hover:text-fg data-[state=open]:text-fg data-[active=true]:text-fg";

/**
 * True once the page's own hero CTA (marked `data-hero-cta`) has scrolled out
 * of view — the header CTA then takes over with a soft glow. Pages without a
 * marked CTA fall back to "scrolled past the first screen".
 */
function useHeroCtaHidden(pathname: string) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(false);
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let tries = 0;
    const onScroll = () => setHidden(window.scrollY > window.innerHeight * 0.8);
    const attach = () => {
      const cta = document.querySelector("[data-hero-cta]");
      if (cta) {
        observer = new IntersectionObserver(([e]) => setHidden(!e.isIntersecting && e.boundingClientRect.top < 0), {
          rootMargin: "-64px 0px 0px 0px",
        });
        observer.observe(cta);
        return;
      }
      // Lazy routes render a moment later; look for ~2s before falling back.
      if (tries++ < 120) frame = requestAnimationFrame(attach);
      else window.addEventListener("scroll", onScroll, { passive: true });
    };
    attach();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return hidden;
}

/** Signature-gradient underline that slides between active top-level items. */
function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active"
      aria-hidden
      transition={{ duration: 0.45, ease: EASE }}
      className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-[image:var(--grad-signature)]"
    />
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const palette = useCommandPalette();
  const mod = useModKey();
  const [scrolled, setScrolled] = useState(false);
  const [preview, setPreview] = useState(services[0].path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaGlow = useHeroCtaHidden(pathname);

  const section = (prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);
  const resourceActive = resources.some((r) => section(r.path));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border bg-bg-overlay backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-[70] rounded-control bg-accent px-4 py-2 font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="wrap-wide flex h-full items-center gap-4">
        <Link to="/" aria-label="Promptly home" className="shrink-0 rounded-control">
          <Wordmark />
        </Link>

        <NavigationMenu.Root
          aria-label="Main"
          className="relative ml-6 hidden lg:block"
          delayDuration={80}
        >
          <NavigationMenu.List className="flex items-center gap-0.5">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass} data-active={section("/services")}>
                Services
                <ChevronDown size={14} aria-hidden className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                {section("/services") && <ActiveBar />}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="ds-navmenu-content">
                <div className="grid w-[720px] grid-cols-[1fr_250px] gap-3 p-3">
                  <ul className="grid gap-1">
                    {services.map((s) => {
                      const Icon = s.icon!;
                      return (
                        <li key={s.path}>
                          <NavigationMenu.Link asChild>
                            <Link
                              to={s.path}
                              onPointerEnter={() => setPreview(s.path)}
                              onFocus={() => setPreview(s.path)}
                              className="group/item flex gap-3.5 rounded-card p-3 transition-colors hover:bg-fg/[0.04] focus-visible:bg-fg/[0.04]"
                            >
                              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-bg-raised text-accent-icon shadow-elev-1">
                                <Icon size={18} aria-hidden />
                              </span>
                              <span>
                                <span className="block font-medium text-fg">{s.label}</span>
                                <span className="mt-0.5 block text-sm text-fg-muted">{s.description}</span>
                              </span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <div className="h-36">
                      <ServicePreview path={preview} />
                    </div>
                    <NavigationMenu.Link asChild>
                      <Link
                        to="/process"
                        className="group/link mt-auto flex items-center justify-between rounded-card border border-border bg-bg-raised p-4 text-sm transition-colors hover:border-border-strong"
                      >
                        <span>
                          <span className="block font-medium text-fg">How we work</span>
                          <span className="text-fg-muted">Discover → Improve</span>
                        </span>
                        <ArrowRight size={16} className="text-fg-subtle transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass} data-active={section("/products")}>
                Products
                <ChevronDown size={14} aria-hidden className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                {section("/products") && <ActiveBar />}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="ds-navmenu-content">
                <div className="w-[680px] p-3">
                  <ul className="grid grid-cols-2 gap-2">
                    {productLinks.map((p) => (
                      <li key={p.path}>
                        <NavigationMenu.Link asChild>
                          <Link
                            to={p.path}
                            className="group/item block rounded-card p-2 transition-colors hover:bg-fg/[0.04]"
                          >
                            <span className="relative block aspect-[16/8] overflow-hidden rounded-control border border-border bg-bg-sunken">
                              <img
                                src={p.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                width={320}
                                height={160}
                                className="h-full w-full object-cover object-top transition-transform duration-500 ease-brand group-hover/item:scale-[1.03]"
                              />
                            </span>
                            <span className="mt-3 flex items-center gap-2 px-1">
                              <span className="font-medium text-fg">{p.label}</span>
                              {p.live && <Badge variant="live">Live demo</Badge>}
                            </span>
                            <span className="mt-0.5 block px-1 pb-1 text-sm text-fg-muted">{p.description}</span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                  <NavigationMenu.Link asChild>
                    <Link
                      to="/products"
                      className="mt-2 flex items-center justify-between rounded-card border-t border-border px-3 pt-3 pb-1 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      All products
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </NavigationMenu.Link>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {[
              ["Industries", "/industries"],
              ["About", "/about"],
            ].map(([label, path]) => (
              <NavigationMenu.Item key={path}>
                <NavigationMenu.Link asChild active={section(path)}>
                  <Link to={path} className={triggerClass} data-active={section(path)}>
                    {label}
                    {section(path) && <ActiveBar />}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass} data-active={resourceActive}>
                Resources
                <ChevronDown size={14} aria-hidden className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                {resourceActive && <ActiveBar />}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="ds-navmenu-content">
                <ul className="grid w-[520px] grid-cols-2 gap-1 p-3">
                  {resources.map((r) => {
                    const Icon = r.icon!;
                    return (
                      <li key={r.path}>
                        <NavigationMenu.Link asChild>
                          <Link
                            to={r.path}
                            className="flex gap-3 rounded-card p-3 transition-colors hover:bg-fg/[0.04]"
                          >
                            <Icon size={18} className="mt-0.5 shrink-0 text-accent-icon" aria-hidden />
                            <span>
                              <span className="block font-medium text-fg">{r.label}</span>
                              <span className="mt-0.5 block text-sm text-fg-muted">{r.description}</span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <div className="absolute top-full left-0 flex justify-start pt-3">
            <NavigationMenu.Viewport className="ds-navmenu-viewport relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-left overflow-hidden rounded-panel border border-border bg-bg-raised shadow-elev-3" />
          </div>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={palette.open}
            onPointerEnter={preloadCommandPalette}
            onFocus={preloadCommandPalette}
            aria-keyshortcuts="Control+K Meta+K"
            className="hidden h-9 items-center gap-2.5 rounded-control border border-border bg-bg-raised/60 pr-1.5 pl-3 text-sm text-fg-subtle transition-colors hover:border-border-strong hover:text-fg-muted md:inline-flex"
          >
            <Search size={15} aria-hidden />
            <span className="mr-4">Search</span>
            <Kbd>{mod} K</Kbd>
          </button>
          <button
            type="button"
            onClick={palette.open}
            onPointerEnter={preloadCommandPalette}
            onFocus={preloadCommandPalette}
            aria-label="Search"
            className="inline-flex size-9 items-center justify-center rounded-control text-fg-muted hover:bg-fg/[0.06] hover:text-fg md:hidden"
          >
            <Search size={17} />
          </button>
          <ThemeButton />
          <Button
            to="/contact"
            size="sm"
            iconRight
            className={cn(
              "ml-1.5 hidden transition-shadow duration-500 sm:inline-flex",
              ctaGlow && "shadow-[0_0_0_1px_rgba(0,221,195,0.4),0_8px_30px_-6px_var(--accent-glow)]",
            )}
          >
            Start a project
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
