import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
export default function Footer(_props: any) {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <Link to="/" aria-label="Promptly home">
            <Logo onInverse size={36} />
          </Link>
          <p>
            Thoughtful engineering.
            <br />
            Software with a purpose.
          </p>
          <a href="mailto:promptlypk@gmail.com">promptlypk@gmail.com ↗</a>
        </div>
        <div>
          <h2>Expertise</h2>
          <Link to="/services/software-development">Software engineering</Link>
          <Link to="/services/ai-solutions">AI & automation</Link>
          <Link to="/services/digital-transformation">
            Digital transformation
          </Link>
          <Link to="/services/startup-support">Strategy & startup support</Link>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/products/xsender">xSender</Link>
          <Link to="/portfolio">Our work</Link>
          <Link to="/about">About Promptly</Link>
          <Link to="/consultation">Book a consultation</Link>
        </div>
        <div>
          <h2>Connect</h2>
          <a
            href="https://www.linkedin.com/company/promptlypk/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <Link to="/ai-architect">Project estimator</Link>
          <Link to="/client-portal">Portal demo</Link>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
      <div className="shell footer-signature" aria-hidden="true">
        Promptly<span>.</span>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Promptly. All rights reserved.</span>
        <span>Engineering · Automation · Products</span>
      </div>
    </footer>
  );
}
