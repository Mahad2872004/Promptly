import React from "react";
import { ArrowUpRight } from "lucide-react";
export interface CtaBandProps {
  title: string;
  body?: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}
export default function CtaBand({
  title,
  body,
  primary,
  secondary,
}: CtaBandProps) {
  return (
    <section className="closing">
      <div className="shell closing-inner">
        <div>
          <p className="kicker">LET’S BUILD WHAT’S NEXT</p>
          <h2>{title}</h2>
        </div>
        <div>
          {body && <p>{body}</p>}
          <div className="action-row">
            <button className="action primary" onClick={primary.onClick}>
              {primary.label}
              <ArrowUpRight size={16} />
            </button>
            {secondary && (
              <button className="text-link" onClick={secondary.onClick}>
                {secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
