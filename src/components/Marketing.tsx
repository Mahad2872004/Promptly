import React from "react";
import {
  ExpertiseShowcase,
  HeroArtwork,
  TechnicalCanvas,
} from "./DesignVisuals";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Workflow,
  Layers3,
  Check,
  MessageSquare,
  Box,
  Command,
  GitBranch,
  Database,
  ShieldCheck,
} from "lucide-react";
import EngineeringStudio from "./EngineeringStudio";
import { DeviceScene, ScrollStory } from "./Experience";
import TeamSection from "./TeamSection";
export const offerings = [
  {
    title: "Software engineering",
    path: "/services/software-development",
    text: "Custom applications, platforms, and integrations. Built around the way your business needs to work.",
    tags: "Web applications / APIs / Business systems",
    icon: Code2,
  },
  {
    title: "AI & business automation",
    path: "/services/ai-solutions",
    text: "Connect your tools, simplify repetitive work, and put intelligence where it makes a practical difference.",
    tags: "Intelligent workflows / AI agents / Data processing",
    icon: Workflow,
  },
  {
    title: "Strategy & architecture",
    path: "/services/startup-support",
    text: "Turn an early idea or a complex technical challenge into a clear, achievable plan for delivery.",
    tags: "Product discovery / MVPs / Technical direction",
    icon: Layers3,
  },
];

export function Action({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`action ${secondary ? "secondary" : "primary"}`} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Closing() {
  return (
    <section className="closing">
      <div className="shell closing-inner">
        <div>
          <p className="kicker">THE NEXT THING STARTS HERE</p>
          <h2>
            What should your
            <br />
            software make possible?
          </h2>
        </div>
        <div>
          <p>
            Bring us the problem, the idea, or the system you’ve outgrown. Let’s
            work out what comes next.
          </p>
          <Action to="/contact">Discuss a project</Action>
        </div>
      </div>
    </section>
  );
}
export function Intro({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="editorial-hero shell composed-hero">
      <div className="hero-copy">
        <p className="kicker">{label}</p>
        <h1>{title}</h1>
        <p className="intro-lead">{lead}</p>
      </div>
      <HeroArtwork label={label} />
    </section>
  );
}
export function ProductPreview() {
  return (
    <figure className="product-preview">
      <div className="preview-bar">
        <span className="xsender-word">
          <span>↗</span> xSender
        </span>
        <span>ORDER WORKSPACE</span>
        <span className="avatar-dot">S</span>
      </div>
      <div className="preview-body">
        <aside>
          <span className="preview-selected">▦ &nbsp; Orders</span>
          <span>◷ &nbsp; Activity</span>
          <span>☷ &nbsp; Customers</span>
          <span>⚙ &nbsp; Settings</span>
        </aside>
        <div className="order-content">
          <div className="order-heading">
            <div>
              <small>YOUR WORKSPACE</small>
              <h3>Orders, organized.</h3>
            </div>
            <span className="sample-label">Sample data</span>
          </div>
          <div className="order-summary">
            <span>
              <small>New</small>
              <strong>08</strong>
            </span>
            <span>
              <small>In progress</small>
              <strong>12</strong>
            </span>
            <span>
              <small>Completed</small>
              <strong>24</strong>
            </span>
          </div>
          <div className="order-table">
            <div className="order-row table-label">
              <span>ORDER</span>
              <span>CUSTOMER</span>
              <span>STATUS</span>
            </div>
            {[
              ["#1048", "Sample customer A", "New"],
              ["#1047", "Sample customer B", "Processing"],
              ["#1046", "Sample customer C", "Completed"],
            ].map((row) => (
              <div className="order-row" key={row[0]}>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
                <span className="order-status">{row[2]}</span>
              </div>
            ))}
          </div>
          <div className="order-event">
            <MessageSquare size={17} />
            <span>Conversation → Order → Follow-through</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
      <figcaption>
        Illustrative interface · Product scope and availability confirmed on
        enquiry.
      </figcaption>
    </figure>
  );
}
export function Capabilities() {
  return <ExpertiseShowcase />;
}
export function Process() {
  return (
    <section className="shell section-pad">
      <div className="section-heading">
        <div>
          <p className="kicker">HOW WE WORK</p>
          <h2>
            From the right question
            <br />
            to the right solution.
          </h2>
        </div>
        <p>
          Clear decisions. Visible progress. A shared understanding of what
          we’re building and why.
        </p>
      </div>
      <ol className="delivery-timeline">
        {[
          [
            "Discover",
            "Understand the business, the users, and the constraints.",
          ],
          [
            "Architect",
            "Define the scope, system, and path to a useful first release.",
          ],
          ["Build", "Develop in reviewable increments, with quality built in."],
          ["Launch", "Test the whole experience and prepare for real use."],
          ["Improve", "Learn from use and prioritize what comes next."],
        ].map(([title, body], i) => (
          <li key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function Home() {
  return (
    <>
      <section className="home-stage">
        <div className="shell">
          <div className="hero-editorial">
            <p className="kicker">
              <span className="status-dot" /> INDEPENDENT THINKING. CONNECTED
              ENGINEERING.
            </p>
            <h1>
              Your next chapter.
              <br />
              <span>Beautifully engineered</span>
            </h1>
            <p className="hero-summary">
              Custom software. Intelligent automation. Products with purpose.
              <br className="desktop-break" /> We turn business challenges into
              systems that move you forward.
            </p>
            <div className="action-row">
              <Action to="/contact">Discuss a project</Action>
              <Action to="/products" secondary>
                Explore our products
              </Action>
            </div>
            <p className="hero-footnote">
              YOUR BUSINESS CONTEXT. OUR ENGINEERING MINDSET.
            </p>
          </div>
          <DeviceScene />
          <div className="stage-bottom">
            <span>ENGINEERING MEETS BUSINESS UNDERSTANDING</span>
            <span>
              SCROLL TO EXPLORE <span>↓</span>
            </span>
          </div>
        </div>
      </section>
      <section className="expertise-section">
        <div className="shell section-pad">
          <div className="section-heading">
            <div>
              <p className="kicker">01 — WHAT WE DO</p>
              <h2>
                The ambition is yours.
                <br />
                The engineering is ours.
              </h2>
            </div>
            <div>
              <p>
                Build a new platform. Connect fragmented operations. Find the
                right technical direction. We work from the problem, all the way
                through to the product.
              </p>
              <Link className="text-link" to="/services">
                Explore our expertise <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <Capabilities />
          <div className="expertise-note">
            <span className="note-symbol">↗</span>
            <p>
              From the first architecture decision to the next product release.
              <br />
              <strong>One partner who sees the whole picture.</strong>
            </p>
            <Link to="/services/digital-transformation">
              Explore digital transformation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="product-band">
        <div className="shell">
          <div className="section-heading product-section-heading">
            <div>
              <p className="kicker">02 — OUR OWN PRODUCTS</p>
              <h2>
                We don’t just build for others.
                <br />
                We build what we believe in.
              </h2>
            </div>
            <Link className="text-link" to="/products">
              The product portfolio <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="product-feature">
            <div>
              <span className="product-label">
                BUILT BY PROMPTLY / COMMERCE
              </span>
              <h3 className="product-name">
                xSender<span>↗</span>
              </h3>
              <h2>
                Conversations in.
                <br />
                Clarity out.
              </h2>
              <p>
                A focused product for organizing WhatsApp commerce. Connecting
                the customer conversation to the operational work behind every
                order.
              </p>
              <Action to="/products/xsender">Meet xSender</Action>
              <Link className="text-link" to="/portfolio">
                Explore the work <ArrowRight size={16} />
              </Link>
            </div>
            <ProductPreview />
          </div>
        </div>
      </section>
      <ScrollStory />
      <Process />
      <section className="principle-band">
        <div className="shell principles">
          <p className="kicker">THE PROMPTLY PERSPECTIVE</p>
          <h2>
            Think like a partner.
            <br />
            Build like an owner<span className="orange-dot">.</span>
          </h2>
          <div>
            <p>
              Good software is more than a successful handoff. It should be
              understandable, maintainable, and useful long after launch.
            </p>
            <p>
              Building our own products keeps us close to those decisions. We
              bring that same care to the systems we build with you.
            </p>
            <Link className="text-link" to="/about">
              Get to know Promptly <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}
export function Services() {
  return (
    <>
      <Intro
        label="OUR EXPERTISE"
        title="The right technology. For the real problem."
        lead="Engineering, automation, and technical direction — connected around what your business needs to accomplish."
      />
      <section className="shell service-studio">
        <EngineeringStudio />
      </section>
      <section className="shell section-pad compact-top">
        <Capabilities />
        <Link
          className="transformation-link"
          to="/services/digital-transformation"
        >
          <span>
            <strong>Bringing an established business online?</strong>
            <br />
            Explore digital transformation, commerce, and process modernization.
          </span>
          <ArrowUpRight />
        </Link>
      </section>
      <Process />
      <Closing />
    </>
  );
}
export function Products() {
  return (
    <>
      <Intro
        label="THE PRODUCT PORTFOLIO"
        title="Built here. Made to be useful."
        lead="Alongside client work, we develop software of our own. Focused products for the everyday problems worth solving well."
      />
      {products.map((p) => (
        <section className="shell product-feature product-listing" key={p.id}>
          <div>
            <p className="kicker">{p.audience}</p>
            <h2>{p.name}</h2>
            <h3>{p.description}</h3>
            <p>{p.detail}</p>
            <Action to={p.path}>Explore {p.name}</Action>
          </div>
          {p.preview.kind === "image" ? (
            <img
              className="product-actual-preview"
              src={p.preview.src}
              alt={p.preview.alt}
              loading="lazy"
            />
          ) : (
            <ProductPreview />
          )}
        </section>
      ))}
      <Closing />
    </>
  );
}
export function XSender() {
  return (
    <>
      <Intro
        label="A PROMPTLY PRODUCT / XSENDER"
        title="From a conversation to an organized order."
        lead="xSender focuses on WhatsApp order management for e-commerce businesses. A clearer way to connect customer conversations with operational follow-through."
      />
      <section className="shell product-detail-preview">
        <ProductPreview />
      </section>
      <section className="shell section-pad split-story">
        <div>
          <p className="kicker">THE PROBLEM</p>
          <h2>
            Conversations move fast.
            <br />
            Operations need structure.
          </h2>
        </div>
        <div>
          <p>
            When orders arrive in chats, details can become scattered across
            conversations and spreadsheets. Keeping track of what needs
            attention becomes a task of its own.
          </p>
          <p>
            xSender’s product direction brings those steps into a focused order
            workflow. Contact us to see the current product, discuss your
            process, and confirm supported capabilities.
          </p>
          <Action to="/contact?product=xsender">
            Request a product walkthrough
          </Action>
        </div>
      </section>
      <section className="shell workflow-story">
        <p className="kicker">THE PRODUCT WORKFLOW</p>
        <div>
          {[
            "Customer conversation",
            "Order details",
            "Operational review",
            "Customer follow-through",
          ].map((s, i) => (
            <article key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
            </article>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
export function Work() {
  return (
    <>
      <Intro
        label="OUR WORK"
        title="The thinking behind the software."
        lead="Explore our own product direction and the working tools in this site. We show what can be inspected, without attaching unverified customer results."
      />
      <section className="shell product-feature product-listing">
        <div>
          <p className="kicker">01 / PROPRIETARY PRODUCT</p>
          <h2>xSender</h2>
          <p>
            A focused approach to organizing WhatsApp commerce. Explore the
            business problem, product direction, and illustrative workflow.
          </p>
          <Action to="/portfolio/xsender">Explore the project</Action>
        </div>
        <ProductPreview />
      </section>
      <section className="shell section-pad work-tools">
        <article>
          <TechnicalCanvas kind="automation" small />
          <Code2 />
          <p className="kicker">02 / INTERACTIVE TOOL</p>
          <h2>Project architect</h2>
          <p>
            A working brief-to-blueprint experience with a server-side AI
            integration and an explicitly labeled offline fallback. Estimates
            are exploratory, not quotes.
          </p>
          <Action to="/ai-architect" secondary>
            Try the estimator
          </Action>
        </article>
        <article>
          <TechnicalCanvas kind="architecture" small />
          <Layers3 />
          <p className="kicker">03 / INTERFACE DEMO</p>
          <h2>Client workspace</h2>
          <p>
            Explore project tasks, invoices, and messaging in the existing
            browser-local portal demonstration. Sample information illustrates
            the interaction model.
          </p>
          <Action to="/client-portal" secondary>
            Explore the portal demo
          </Action>
        </article>
      </section>
      <Closing />
    </>
  );
}
export function About() {
  return (
    <>
      <Intro
        label="ABOUT PROMPTLY"
        title="Engineering-led. Product-minded. Business-aware."
        lead="Promptly is a technology company in Lahore, Pakistan, working across software engineering, intelligent automation, and proprietary software products."
      />
      <section className="shell split-story section-pad compact-top">
        <h2>We connect what a business needs with what technology can do.</h2>
        <div>
          <p>
            Some challenges need a new application. Others need better
            connections between tools, a simpler workflow, or a clearer
            technical direction. We start with the problem.
          </p>
          <p>
            Our ambition is to build lasting value through both client
            partnerships and software of our own. That means thinking beyond
            launch: about usability, maintainability, and the next stage of the
            business.
          </p>
        </div>
      </section>
      <section className="principle-band">
        <div className="shell section-pad">
          <p className="kicker">OUR WORKING PRINCIPLES</p>
          <div className="values-grid">
            {[
              [
                "Understand before building",
                "Start with the people, constraints, and decisions that shape the problem.",
              ],
              [
                "Keep complexity earned",
                "Use AI and automation where they help. Choose architecture for its purpose.",
              ],
              [
                "Make progress visible",
                "Review working software and agree on the next useful increment.",
              ],
              [
                "Build for ownership",
                "Favor clear systems and maintainable foundations that can evolve.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <TeamSection />
      <Closing />
    </>
  );
}
export function Consultation() {
  return (
    <>
      <Intro
        label="LET’S TALK"
        title="A good project starts with a conversation."
        lead="Book a 30-minute consultation to talk through your idea, existing system, or technical challenge."
      />
      <section className="shell booking-layout">
        <div>
          <p className="kicker">WHAT WE’LL COVER</p>
          {[
            [
              "The business problem",
              "What you’re trying to change and who the solution is for.",
            ],
            [
              "The practical constraints",
              "Existing tools, timing, budget, and technical dependencies.",
            ],
            [
              "A useful next step",
              "The questions to resolve and a sensible way forward.",
            ],
          ].map(([h, p]) => (
            <article key={h}>
              <Check size={18} />
              <div>
                <h2>{h}</h2>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="booking-panel">
          <span className="kicker">30 MINUTES / ONLINE</span>
          <h2>
            Find a time that
            <br />
            works for you.
          </h2>
          <p>Choose an available time in our booking calendar.</p>
          <a
            className="action primary"
            href="https://calendly.com/promptlypk/30min"
            target="_blank"
            rel="noreferrer"
          >
            Open booking calendar <ArrowUpRight size={17} />
          </a>
          <Link className="text-link" to="/contact">
            Prefer to send a brief? <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
