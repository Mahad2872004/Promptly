import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { products, type ProductDefinition } from "../data/products";
import "./ProductPortfolio.css";

export function ProductImage({
  product,
  priority = false,
}: {
  product: ProductDefinition;
  priority?: boolean;
}) {
  return (
    <figure className={`product-capture capture-${product.id}`}>
      <div className="capture-chrome" aria-hidden="true">
        <span>● ● ●</span>
        <span>{product.name} / Product view</span>
        <ArrowUpRight size={14} />
      </div>
      <div className="capture-screen">
        <img
          src={product.preview.src}
          alt={product.preview.alt}
          width={product.preview.width}
          height={product.preview.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <figcaption>{product.preview.caption}</figcaption>
    </figure>
  );
}

export function ProductCollection({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`shell portfolio-collection ${compact ? "portfolio-compact" : ""}`}
    >
      {products.map((p) => (
        <article
          key={p.id}
          className={`portfolio-product portfolio-${p.id}`}
          id={p.id}
        >
          <div className="portfolio-product-copy">
            <p className="kicker">{p.category}</p>
            <h2>{p.name}</h2>
            <h3>{p.description}</h3>
            <p>{p.detail}</p>
            <div className="portfolio-product-links">
              <Link className="action primary" to={p.path}>
                Explore {p.name}
                <ArrowUpRight size={17} />
              </Link>
              <a
                className="text-link"
                href={p.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit website
                <ArrowUpRight size={16} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <Link
            className="portfolio-image-link"
            to={p.path}
            aria-label={`Explore ${p.name}`}
          >
            <ProductImage product={p} />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProductDetail({ product }: { product: ProductDefinition }) {
  const p = product;
  return (
    <>
      <section className={`shell portfolio-detail-hero portfolio-${p.id}`}>
        <Link className="text-link" to="/products">
          <ArrowLeft size={16} /> All products
        </Link>
        <div className="portfolio-detail-heading">
          <div>
            <p className="kicker">{p.category} / Built by Promptly</p>
            <p className="portfolio-brand">
              {p.name}
              <span>↗</span>
            </p>
            <h1>{p.description}</h1>
          </div>
          <div>
            <p className="portfolio-audience">{p.audience}</p>
            <p className="intro-lead">{p.detail}</p>
            <a
              className="action primary"
              href={p.url}
              target="_blank"
              rel="noreferrer"
            >
              Explore {p.name}
              <ArrowUpRight size={17} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ProductImage product={p} priority />
      </section>
      <section className="shell portfolio-context">
        <div>
          <p className="kicker">THE PROBLEM IT SOLVES</p>
          <h2>Built around the work.</h2>
        </div>
        <p>{p.problem}</p>
      </section>
      <section
        className="shell portfolio-capabilities"
        aria-label={`${p.name} capabilities`}
      >
        {p.features.map((feature, index) => (
          <article key={feature.title}>
            <span>0{index + 1}</span>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>
      <section className="shell portfolio-availability">
        <div>
          <p className="kicker">CURRENT PRODUCT</p>
          <h2>{p.status}</h2>
        </div>
        <div>
          <p>{p.availability}</p>
          <a
            className="text-link"
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            See {p.name} directly
            <ArrowUpRight size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
      <section className="shell portfolio-related">
        <p className="kicker">MORE FROM PROMPTLY</p>
        <div>
          {products
            .filter((other) => other.id !== p.id)
            .map((other) => (
              <Link key={other.id} to={other.path}>
                <span>{other.category}</span>
                <strong>
                  {other.name}
                  <ArrowUpRight size={23} />
                </strong>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
