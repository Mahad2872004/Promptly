import React, { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { TEAM_MEMBERS } from "../data";
import type { TeamMember } from "../types";
import "./TeamSection.css";
function TeamPortrait({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `expertise-${member.id}`;
  return (
    <article
      className={`team-portrait ${open ? "expertise-open" : ""}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          e.stopPropagation();
        }
      }}
    >
      <div className="team-photo-stage">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          width="600"
          height="750"
        />
        <span className="team-index" aria-hidden="true">
          P / 0{index + 1}
        </span>
        <span className="portrait-corner" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
        <div className="team-expertise" id={panelId} aria-hidden={!open}>
          <p>EXPERTISE & FOCUS</p>
          <ul>
            {member.specialties.slice(0, 5).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="team-identity">
        <span className="team-role">{member.role}</span>
        <h3>{member.name}</h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Hide" : "Show"} ${member.name}'s expertise`}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Close expertise" : "Explore expertise"}</span>
          {open ? <Minus size={17} /> : <Plus size={17} />}
        </button>
      </div>
    </article>
  );
}
export default function TeamSection() {
  return (
    <section className="team-editorial shell" aria-labelledby="team-heading">
      <div className="team-section-heading">
        <div>
          <p className="kicker">THE PEOPLE BEHIND PROMPTLY</p>
          <h2 id="team-heading">
            Different perspectives.
            <br />
            <span>One shared standard.</span>
          </h2>
        </div>
        <div>
          <p>
            Architecture, engineering, and research.
            <br />
            Meet the people connecting the pieces.
          </p>
          <span className="team-interaction-hint">
            Explore each person’s expertise <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
      <div className="team-portrait-grid">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamPortrait key={member.id} member={member} index={index} />
        ))}
      </div>
      <div className="team-section-foot">
        <span>THOUGHTFUL PEOPLE. CONSIDERED TECHNOLOGY.</span>
        <span>BASED IN LAHORE · BUILDING WHAT’S NEXT</span>
      </div>
    </section>
  );
}
