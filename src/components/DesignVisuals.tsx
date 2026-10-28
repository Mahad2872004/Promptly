import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Workflow,
  Layers3,
  Check,
  Command,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";
export type VisualKind = "software" | "automation" | "architecture";
export function TechnicalCanvas({
  kind = "software",
  small = false,
}: {
  kind?: VisualKind;
  small?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      className={`technical-canvas canvas-kind-${kind} ${small ? "canvas-small" : ""}`}
      aria-label={`${kind} concept illustration`}
      role="img"
    >
      <div className="canvas-grid" />
      <span className="canvas-coordinate">
        P / {kind === "software" ? "01" : kind === "automation" ? "02" : "03"}
      </span>
      <span className="canvas-corner">DESIGN → ENGINEER → EVOLVE</span>
      {kind === "software" ? (
        <div className="canvas-software">
          <div className="canvas-window">
            <div className="canvas-window-bar">
              <i />
              <i />
              <i />
              <span>Application / workspace</span>
            </div>
            <div className="canvas-app-head">
              <span className="canvas-app-icon">
                <Command size={21} />
              </span>
              <div>
                <small>YOUR BUSINESS, IN FOCUS</small>
                <strong>One connected workspace.</strong>
              </div>
            </div>
            <div className="canvas-bars">
              {[65, 90, 48, 76, 58, 85, 100, 72, 91].map((h, i) => (
                <motion.i
                  key={i}
                  initial={reduced ? false : { scaleY: 0.1 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.055 }}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="canvas-app-foot">
              <span>
                <i /> Thoughtfully engineered
              </span>
              <ArrowUpRight size={15} />
            </div>
          </div>
          <div className="canvas-code">
            <Code2 size={16} />
            <span>
              interface Experience {"{"}
              <br />
              <em> clarity: true;</em>
              <br /> builtToEvolve: true;
              <br />
              {"}"}
            </span>
          </div>
        </div>
      ) : kind === "automation" ? (
        <div className="canvas-workflow">
          <div className="flow-source">
            <MessageIcon />
            <span>Business event</span>
          </div>
          <div className="canvas-flow-track">
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 1 }}
            />
          </div>
          <div className="flow-intelligence">
            <Logo size={38} showText={false} />
            <div>
              <small>INTELLIGENCE WITH CONTEXT</small>
              <strong>The right next action.</strong>
            </div>
            <Sparkles size={18} />
          </div>
          <div className="flow-branches">
            <span />
            <span />
          </div>
          <div className="flow-destinations">
            <div>
              <Check size={18} />
              <span>Automate</span>
              <small>Repeatable work</small>
            </div>
            <div>
              <Layers3 size={18} />
              <span>Human review</span>
              <small>Considered decisions</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="canvas-architecture">
          {["Experience", "Application", "Infrastructure"].map((s, i) => (
            <motion.div
              className={`architecture-layer layer-${i}`}
              key={s}
              initial={reduced ? false : { y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (2 - i) * 0.12 }}
            >
              <span>0{i + 1}</span>
              <Layers3 size={24} />
              <strong>{s}</strong>
              <i />
            </motion.div>
          ))}
          <span className="architecture-foundation">
            STRONG FOUNDATIONS. OPEN POSSIBILITIES.
          </span>
        </div>
      )}
      <span className="canvas-footnote">ILLUSTRATIVE SYSTEM CONCEPT</span>
    </div>
  );
}
function MessageIcon() {
  return <Workflow size={19} />;
}
const expertise = [
  {
    title: "Software, shaped around you.",
    name: "Software engineering",
    kind: "software" as const,
    path: "/services/software-development",
    body: "From the first interaction to the systems behind it. Custom applications, platforms and integrations designed to work as one.",
    tags: ["Web applications", "Business platforms", "APIs & integrations"],
  },
  {
    title: "Make the complex feel effortless.",
    name: "AI & automation",
    kind: "automation" as const,
    path: "/services/ai-solutions",
    body: "Connect your tools, remove repetitive steps, and bring intelligence into everyday operations—with people in control.",
    tags: ["Connected workflows", "AI solutions", "Operational automation"],
  },
  {
    title: "A clear direction. A stronger foundation.",
    name: "Strategy & architecture",
    kind: "architecture" as const,
    path: "/services/startup-support",
    body: "Turn an ambitious idea into a considered technical plan. Make the decisions today that give your product room to grow.",
    tags: ["Product discovery", "Technical architecture", "MVP planning"],
  },
];
export function ExpertiseShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = expertise[active];
  return (
    <div className="expertise-showcase">
      <div
        className="expertise-selector"
        role="group"
        aria-label="Explore expertise"
      >
        {expertise.map((e, i) => (
          <button
            key={e.kind}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>0{i + 1}</span>
            {e.name}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div className="expertise-scene">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="expertise-active"
            key={item.kind}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="expertise-copy">
              <p className="kicker">CAPABILITY / 0{active + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ul>
                {item.tags.map((t) => (
                  <li key={t}>
                    <Check size={14} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link className="action primary" to={item.path}>
                Explore {item.name.toLowerCase()} <ArrowUpRight size={17} />
              </Link>
            </div>
            <TechnicalCanvas kind={item.kind} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="expertise-bottom">
        <span>FROM THE FIRST QUESTION TO THE NEXT RELEASE.</span>
        <Link to="/services">
          All expertise <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
export function HeroArtwork({ label }: { label: string }) {
  const kind: VisualKind = /AI|automation|commerce|Contact|TALK|XSENDER/i.test(
    label,
  )
    ? "automation"
    : /ABOUT|strategy|startup|architecture|Industries/i.test(label)
      ? "architecture"
      : "software";
  return (
    <div className="hero-artwork">
      <TechnicalCanvas kind={kind} small />
    </div>
  );
}
