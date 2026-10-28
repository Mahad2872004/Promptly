import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  Layers3,
  MessageSquare,
  Workflow,
  Code2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export function DeviceScene({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -3]);
  const y = useTransform(scrollYProgress, [0, 1], [45, -35]);
  return (
    <div ref={ref} className={`device-scene ${compact ? "compact-scene" : ""}`}>
      <div className="scene-orbit orbit-one" aria-hidden="true" />
      <div className="scene-orbit orbit-two" aria-hidden="true" />
      <motion.div
        className="desktop-device"
        style={reduced ? {} : { rotateX, y }}
      >
        <div className="device-toolbar">
          <Logo size={21} showText={false} />
          <span>Promptly / Operations</span>
          <span className="device-url">workspace / overview</span>
          <i />
        </div>
        <div className="device-app">
          <aside>
            <Layers3 size={22} />
            <span className="selected">
              <Layers3 size={15} /> Overview
            </span>
            <span>
              <Workflow size={15} /> Workflows
            </span>
            <span>
              <MessageSquare size={15} /> Activity
            </span>
            <small>
              YOUR SYSTEMS.
              <br />
              WORKING TOGETHER.
            </small>
          </aside>
          <div className="device-main">
            <div className="device-greeting">
              <div>
                <small>WORKSPACE OVERVIEW</small>
                <h3>A clearer way to work.</h3>
              </div>
              <span className="concept-badge">Interface concept</span>
            </div>
            <div className="device-summary">
              <div>
                <span>01</span>
                <strong>Capture</strong>
                <small>A customer request</small>
              </div>
              <ArrowRight size={16} />
              <div>
                <span>02</span>
                <strong>Connect</strong>
                <small>The right context</small>
              </div>
              <ArrowRight size={16} />
              <div>
                <span>03</span>
                <strong>Deliver</strong>
                <small>A useful outcome</small>
              </div>
            </div>
            <div className="device-grid">
              <div className="activity-graph">
                <small>CONNECTED OPERATIONS</small>
                <svg viewBox="0 0 420 130" aria-hidden="true">
                  <defs>
                    <linearGradient id="graphFade" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#00c9b5" stopOpacity=".25" />
                      <stop offset="1" stopColor="#00c9b5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 110 C40 110 45 65 90 70 S150 105 190 60 S250 75 290 30 S355 50 420 10 L420 130 L0 130Z"
                    fill="url(#graphFade)"
                  />
                  <path
                    className="signal-path"
                    d="M0 110 C40 110 45 65 90 70 S150 105 190 60 S250 75 290 30 S355 50 420 10"
                    fill="none"
                    stroke="#00bda9"
                    strokeWidth="3"
                  />
                </svg>
                <div>
                  <span>Business context</span>
                  <span>Connected systems</span>
                </div>
              </div>
              <div className="review-panel">
                <span className="mini-icon">
                  <Check size={19} />
                </span>
                <h4>People in the loop.</h4>
                <p>
                  Automation where it helps.
                  <br />
                  Oversight where it matters.
                </p>
                <span className="review-tag">Designed with intention</span>
              </div>
            </div>
            <div className="device-task">
              <span className="task-dot" />
              <div>
                <strong>Customer request</strong>
                <small>Context captured · Ready for review</small>
              </div>
              <span>
                Review queue <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="phone-device" style={reduced ? {} : { y }}>
        <div className="phone-island" />
        <div className="phone-status">
          9:41 <span>••• ▰</span>
        </div>
        <div className="phone-app">
          <div className="phone-brand">
            <Logo size={23} showText={false} />
            <span>In the flow.</span>
          </div>
          <p>YOUR WORK, CONNECTED</p>
          <h3>
            From anywhere.
            <br />
            To what’s next.
          </h3>
          <div className="phone-message">
            <span>
              <MessageSquare size={15} /> New conversation
            </span>
            <p>Can you help us bring our orders into one place?</p>
          </div>
          <div className="phone-connection">
            <i />
            <i />
            <i />
          </div>
          <div className="phone-outcome">
            <span>
              <Check size={17} />
            </span>
            <strong>Context, connected.</strong>
            <p>
              One request.
              <br />A coordinated next step.
            </p>
          </div>
          <small className="phone-caption">ILLUSTRATIVE EXPERIENCE</small>
        </div>
        <div className="phone-home" />
      </motion.div>
      <div className="scene-label">
        <span className="status-dot" /> ONE CONNECTED EXPERIENCE{" "}
        <span>WEB ↔ MOBILE ↔ OPERATIONS</span>
      </div>
    </div>
  );
}
const chapters = [
  {
    title: "A better experience. At every touchpoint.",
    label: "01 / SOFTWARE ENGINEERING",
    body: "The customer-facing product and the systems behind it, designed as one experience. Clear interfaces. Considered architecture. Software that fits your business.",
    path: "/services/software-development",
    icon: Code2,
  },
  {
    title: "Less friction. More forward motion.",
    label: "02 / INTELLIGENT AUTOMATION",
    body: "Connect fragmented tools and turn repetitive tasks into thoughtful workflows. Keep your team in control while the right work happens in the background.",
    path: "/services/ai-solutions",
    icon: Workflow,
  },
  {
    title: "Built to launch. Ready to evolve.",
    label: "03 / PRODUCT THINKING",
    body: "Start with a useful first release and an architecture that leaves room for what comes next. We connect business priorities with practical engineering decisions.",
    path: "/services/startup-support",
    icon: Layers3,
  },
];
export function ScrollStory() {
  return (
    <section className="scroll-story shell">
      <div className="story-heading">
        <p className="kicker">THE CONNECTED PICTURE</p>
        <h2>
          Great software is
          <br />
          never just a screen.
        </h2>
        <p>It’s everything working beautifully together.</p>
      </div>
      <div className="story-layout">
        <div className="story-art">
          <div className="architecture-art">
            <div className="art-orbit" />
            <div className="art-orbit second" />
            <div className="art-core">
              <Logo size={82} showText={false} />
            </div>
            <span className="art-node node-a">
              <Code2 /> Experience
            </span>
            <span className="art-node node-b">
              <Workflow /> Intelligence
            </span>
            <span className="art-node node-c">
              <Layers3 /> Architecture
            </span>
            <div className="art-caption">
              THOUGHTFULLY CONNECTED.
              <br />
              PURPOSEFULLY ENGINEERED.
            </div>
          </div>
        </div>
        <div className="story-chapters">
          {chapters.map((c) => (
            <article className="story-chapter" key={c.label}>
              <p className="kicker">{c.label}</p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <Link className="text-link" to={c.path}>
                Explore the capability <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
