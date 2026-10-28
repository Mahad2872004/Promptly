import React, { useState } from "react";
import {
  Code2,
  Workflow,
  Database,
  ArrowUpRight,
  Check,
  GitBranch,
  LockKeyhole,
  ArrowRight,
  CircleDot,
} from "lucide-react";
import Logo from "./Logo";
const layers = [
  {
    name: "Software engineering",
    icon: Code2,
    label: "A foundation for your next product",
    input: "A business challenge",
    middle: "Application services",
    output: "A useful experience",
    items: [
      "Customer-facing applications",
      "Internal tools & dashboards",
      "APIs & connected platforms",
    ],
    code: [
      "POST /api/workflows",
      "  validate(input)",
      "  applyBusinessRules()",
      "  persist(transaction)",
      "  return result",
    ],
  },
  {
    name: "Intelligent automation",
    icon: Workflow,
    label: "Bring your operations into flow",
    input: "An event in your business",
    middle: "Workflow orchestration",
    output: "An action, with context",
    items: [
      "Connect existing systems",
      "Keep people in the loop",
      "Make repeatable work reliable",
    ],
    code: [
      "on event.received",
      "  validate(payload)",
      "  enrich(context)",
      "  requestReviewIfNeeded()",
      "  execute(action)",
    ],
  },
  {
    name: "Product architecture",
    icon: Database,
    label: "Think beyond the first release",
    input: "A product opportunity",
    middle: "A considered architecture",
    output: "Room to evolve",
    items: [
      "A focused first release",
      "Clear system boundaries",
      "Maintainable foundations",
    ],
    code: [
      "product.define({",
      "  users: understood,",
      "  scope: focused,",
      "  interfaces: explicit,",
      "  next: adaptable",
      "})",
    ],
  },
];
export default function EngineeringStudio() {
  const [selected, setSelected] = useState(0);
  const layer = layers[selected];
  return (
    <div className="engineering-studio">
      <div className="studio-titlebar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>PROMPTLY / ENGINEERING STUDIO</span>
        <span className="studio-caption">
          Interactive system overview <ArrowUpRight size={12} />
        </span>
      </div>
      <div
        className="studio-tabs"
        role="group"
        aria-label="Explore Promptly capabilities"
      >
        {layers.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <item.icon size={17} />
            <span>{item.name}</span>
            <small>0{i + 1}</small>
          </button>
        ))}
      </div>
      <div className="studio-workspace">
        <aside className="studio-brief">
          <p className="studio-eyebrow">THE INTENT</p>
          <h2>{layer.label}</h2>
          <ul>
            {layer.items.map((item) => (
              <li key={item}>
                <Check size={14} />
                {item}
              </li>
            ))}
          </ul>
          <div className="studio-bottom-note">
            <LockKeyhole size={14} />
            <span>Clarity at every layer.</span>
          </div>
        </aside>
        <div className="studio-blueprint">
          <div className="blueprint-label">
            <span>
              <CircleDot size={12} /> SYSTEM MAP
            </span>
            <span>ILLUSTRATIVE</span>
          </div>
          <div className="system-endpoint">
            <span className="endpoint-icon">
              <GitBranch size={17} />
            </span>
            <div>
              <small>INPUT</small>
              <strong>{layer.input}</strong>
            </div>
          </div>
          <div className="flow-connector">
            <span />
          </div>
          <div className="system-engine">
            <Logo size={36} showText={false} />
            <div>
              <small>DESIGNED & BUILT BY PROMPTLY</small>
              <strong>{layer.middle}</strong>
            </div>
            <span className="engine-light" />
          </div>
          <div className="flow-connector">
            <span />
          </div>
          <div className="system-endpoint">
            <span className="endpoint-icon orange">
              <ArrowUpRight size={18} />
            </span>
            <div>
              <small>OUTCOME</small>
              <strong>{layer.output}</strong>
            </div>
          </div>
        </div>
        <aside className="studio-code">
          <div>
            <Code2 size={15} />
            <span>logic / illustrative.ts</span>
          </div>
          <pre aria-label="Illustrative system logic">
            {layer.code.map((line, i) => (
              <span key={`${selected}-${i}`}>
                <b>{i + 1}</b>
                {line}
              </span>
            ))}
          </pre>
          <div className="code-checks">
            <p>
              <Check size={13} /> Explicit interfaces
            </p>
            <p>
              <Check size={13} /> Considered edge cases
            </p>
            <p>
              <Check size={13} /> A maintainable foundation
            </p>
          </div>
        </aside>
      </div>
      <div className="studio-status">
        <span>
          <span className="status-dot" /> FROM BUSINESS CONTEXT TO WORKING
          SOFTWARE
        </span>
        <span>
          Explore a layer above <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
