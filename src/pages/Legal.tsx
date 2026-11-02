import React, { useEffect, useState } from "react";
import { Badge, Eyebrow, ScrollProgress } from "../components/ui";
import { cn } from "../lib/cn";
import { privacy, terms, type LegalDocument } from "../content/legal";

/** Long-form legal layout: sticky table of contents, 68ch reading measure. */
function LegalPage({ doc }: { doc: LegalDocument }) {
  const [active, setActive] = useState(doc.sections[0].id);

  // Highlight the section currently near the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [doc]);

  return (
    <>
      <ScrollProgress />
      <header className="wrap pt-36 pb-14 md:pt-44">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 text-h1 text-fg">{doc.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <span>Last updated {doc.updated}</span>
          <Badge variant="neutral">Draft · pending legal review</Badge>
        </div>
      </header>

      <div className="wrap grid gap-12 border-t border-border pt-14 pb-28 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-eyebrow text-fg-subtle uppercase">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-border">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      active === s.id
                        ? "border-accent text-fg"
                        : "border-transparent text-fg-muted hover:text-fg",
                    )}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="measure lg:col-span-8 lg:col-start-5">
          <p className="text-lead text-fg">{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 pt-12">
              <h2 className="text-h3 text-fg">{s.title}</h2>
              {s.body.map((block, i) =>
                typeof block === "string" ? (
                  <p key={i} className="mt-4 leading-relaxed text-fg-muted">
                    {block}
                  </p>
                ) : (
                  <ul key={i} className="mt-4 space-y-2.5">
                    {block.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

export function Privacy() {
  return <LegalPage doc={privacy} />;
}

export function Terms() {
  return <LegalPage doc={terms} />;
}
