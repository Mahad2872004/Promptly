import React from "react";
import { ArrowUpRight, Linkedin, Plus } from "lucide-react";
import {
  Badge,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "../../components/ui";
import { TEAM_MEMBERS } from "../../content/team";
import type { TeamMember } from "../../types";

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

function Portrait({ member, className }: { member: TeamMember; className?: string }) {
  if (!member.image) {
    return (
      <div
        aria-hidden
        className={`flex items-center justify-center bg-[image:var(--grad-brand)] text-5xl font-semibold tracking-[-0.04em] text-accent-fg ${className}`}
      >
        {initials(member.name)}
      </div>
    );
  }
  return (
    <img
      src={member.image}
      alt=""
      loading="lazy"
      decoding="async"
      width={720}
      height={900}
      className={`object-cover object-top ${className}`}
    />
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Dialog>
      <Card as="article" padded={false} interactive className="group relative flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden border-b border-border bg-bg-sunken">
          <Portrait
            member={member}
            className="h-full w-full saturate-[0.85] transition-[transform,filter] duration-700 ease-brand group-hover:scale-[1.03] group-hover:saturate-100"
          />
          {/* Specialties rise in on hover/focus (desktop); the profile dialog has them all. */}
          <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink-950/85 via-ink-950/50 to-transparent p-5 pt-16 opacity-0 transition-[opacity,transform] duration-500 ease-brand group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
            <ul className="flex flex-wrap gap-1.5" aria-hidden>
              {member.specialties.slice(0, 3).map((s) => (
                <li key={s} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm font-medium text-accent-text">{member.role}</p>
          <h3 className="mt-2 text-xl leading-snug font-semibold tracking-[-0.02em] text-fg">{member.name}</h3>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            {member.experience ? <Badge>{member.experience}</Badge> : <span />}
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-fg-muted transition-colors after:absolute after:inset-0 after:content-[''] hover:text-fg"
              >
                View profile
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-border transition-[transform,background-color,color,border-color] duration-300 group-hover:rotate-90 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                  <Plus size={14} />
                </span>
              </button>
            </DialogTrigger>
          </div>
        </div>
      </Card>

      <DialogContent
        title={member.name}
        description={[member.role, member.experience && `${member.experience} experience`].filter(Boolean).join(" · ")}
        size="lg"
      >
        <div className="grid gap-7 sm:grid-cols-[200px_1fr]">
          <Portrait member={member} className="aspect-[4/5] w-full rounded-card border border-border" />
          <div>
            <p className="leading-relaxed text-fg-muted">{member.bio}</p>
            <p className="mt-7 font-mono text-eyebrow text-fg-subtle uppercase">Expertise & focus</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {member.specialties.map((s) => (
                <li key={s} className="rounded-full border border-border bg-bg-sunken px-3 py-1 text-sm text-fg">
                  {s}
                </li>
              ))}
            </ul>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:underline"
              >
                <Linkedin size={16} aria-hidden /> LinkedIn <ArrowUpRight size={14} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Team() {
  return (
    <section id="team" className="section-y scroll-mt-16 border-t border-border" aria-labelledby="team-heading">
      <div className="wrap-wide">
        <SectionHeader
          id="team-heading"
          index="03"
          eyebrow="The people behind Promptly"
          title={
            <>
              Different perspectives.
              <br />
              <span className="text-fg-subtle">One shared standard.</span>
            </>
          }
          lead="Architecture, engineering, and research. Meet the people connecting the pieces."
          align="split"
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((m) => (
            <StaggerItem key={m.id}>
              <MemberCard member={m} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase sm:flex-row sm:justify-between">
          <span>Thoughtful people. Considered technology.</span>
          <span>Based in Lahore · Building what’s next</span>
        </div>
      </div>
    </section>
  );
}
