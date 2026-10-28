import React from "react";
import { HeroArtwork } from "../DesignVisuals";
import { ArrowUpRight } from "lucide-react";
export interface PageHeroAction {
  label: string;
  onClick: () => void;
}
export interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  primary?: PageHeroAction;
  secondary?: PageHeroAction;
  stats?: { value: string; label: string }[];
  parent?: string;
}
export default function PageHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  parent,
}: PageHeroProps) {
  return (
    <section className="editorial-hero shell composed-hero">
      <div className="hero-copy">
        <p className="kicker">
          {parent ? `${parent} / ` : ""}
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {lead && <p className="intro-lead">{lead}</p>}
        <div className="action-row">
          {primary && (
            <button className="action primary" onClick={primary.onClick}>
              {primary.label}
              <ArrowUpRight size={17} />
            </button>
          )}
          {secondary && (
            <button className="action secondary" onClick={secondary.onClick}>
              {secondary.label}
              <ArrowUpRight size={17} />
            </button>
          )}
        </div>
      </div>
      <HeroArtwork label={eyebrow} />
    </section>
  );
}
