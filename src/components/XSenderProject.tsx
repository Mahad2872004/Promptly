import React from "react";
import { Action, Closing, Intro, ProductPreview } from "./Marketing";
export default function XSenderProject() {
  return (
    <>
      <Intro
        label="PRODUCT WORK / XSENDER"
        title="Giving conversational commerce a clear next step."
        lead="A look at the business problem and product thinking behind Promptly’s WhatsApp order-management product."
      />
      <section className="shell case-overview">
        <div>
          <span>PROJECT TYPE</span>
          <strong>Proprietary product</strong>
        </div>
        <div>
          <span>FOCUS</span>
          <strong>Commerce operations</strong>
        </div>
        <div>
          <span>THE WORK</span>
          <strong>Order workflow design</strong>
        </div>
      </section>
      <section className="shell product-detail-preview">
        <ProductPreview />
      </section>
      <section className="shell section-pad case-story">
        <aside>
          <p className="kicker">THE PROJECT</p>
          <h2>From scattered messages to a considered workflow.</h2>
          <Action to="/products/xsender">Explore the product</Action>
        </aside>
        <div>
          {[
            [
              "01 / Context",
              "Commerce happens in conversations.",
              "For businesses that receive orders through WhatsApp, a customer conversation is also the start of an operational process. Details need to move from the chat into a consistent way of managing the order.",
            ],
            [
              "02 / Challenge",
              "Keep the context. Add structure.",
              "The design challenge is to reduce fragmented information without making a simple interaction unnecessarily complicated. Each order needs a clear next step, and the people handling it need the relevant context.",
            ],
            [
              "03 / Product direction",
              "Organize the handoff.",
              "The documented xSender concept centers on a unified order workflow, connecting customer conversation, order details, operational review, and follow-through. The interface shown here illustrates that direction; it is not a production screenshot.",
            ],
            [
              "04 / Current evidence",
              "Explore the product directly.",
              "This project page describes product intent, not a claimed customer outcome. A walkthrough is the next step to review current functionality, integration support, and availability with Promptly.",
            ],
          ].map(([label, title, body]) => (
            <article key={label}>
              <p className="kicker">{label}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
