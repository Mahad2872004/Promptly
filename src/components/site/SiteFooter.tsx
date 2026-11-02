import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import { Badge, Button } from "../ui";
import {
  company,
  CONTACT_EMAIL,
  legal,
  LINKEDIN_URL,
  LOCATION,
  productLinks,
  resources,
  services,
} from "../../content/navigation";
import { Wordmark } from "./Brand";

const columns = [
  { title: "Services", links: services },
  { title: "Products", links: productLinks },
  { title: "Company", links: company },
  { title: "Resources", links: resources },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-bg text-fg">
      <div className="wrap-wide pt-20 md:pt-28">
        <div className="flex flex-col gap-8 border-b border-border pb-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-h2">
            Thoughtful engineering.
            <br />
            <span className="text-fg-muted">Software with a purpose.</span>
          </p>
          {/* Pages end with a ClosingCTA just above, so the footer stays quiet. */}
          <Button href={`mailto:${CONTACT_EMAIL}`} variant="link" iconRight className="text-lg">
            {CONTACT_EMAIL}
          </Button>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Promptly home" className="inline-flex rounded-control">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-xs text-fg-muted">
              Custom software, intelligent automation, and products we build and run.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg"
                >
                  <Mail size={16} className="text-accent-icon" aria-hidden />
                  {/* TODO: switch to a domain email when one is set up. */}
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg"
                >
                  <Linkedin size={16} className="text-accent-icon" aria-hidden />
                  LinkedIn
                  <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-fg-muted">
                <MapPin size={16} className="text-accent-icon" aria-hidden />
                {LOCATION}
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-eyebrow text-fg-subtle uppercase">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.path}>
                      <Link
                        to={l.path}
                        className="inline-flex items-center gap-2 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
                      >
                        {l.label}
                        {"live" in l && l.live && <Badge variant="live">Live</Badge>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <ul className="flex gap-6">
            {legal.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative watermark. Rendered as generated content so it isn't text
          in the document (and isn't held to text-contrast rules). */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.18em] text-center text-[clamp(5rem,21vw,20rem)] leading-none font-semibold tracking-[-0.065em] whitespace-nowrap text-border select-none before:content-['Promptly.']"
      />
    </footer>
  );
}
