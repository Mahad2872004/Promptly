import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NOINDEX, ogImage, pageMeta, SITE_URL } from "../src/seo";
import { products } from "../src/data/products";
import { faqs } from "../src/content/faq";

// For every public route: pre-render the page into the HTML shell (the client
// hydrates it — see src/main.tsx) and emit route-specific metadata for
// crawlers and link previews. The server bundle comes from `vite build --ssr`.
// @ts-expect-error — build output, generated before this script runs.
const { render } = (await import("../dist-ssr/entry-server.js")) as {
  render: (url: string) => Promise<string>;
};
const template = await readFile("dist/index.html", "utf8");
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const [route, [title, description]] of Object.entries(pageMeta)) {
  const body = await render(route);
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(title)} | Promptly</title>`,
    )
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escape(title)} | Promptly" />`,
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${SITE_URL}${route}" />`,
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${SITE_URL}${route}" />`,
    )
    .replace(
      /<meta property="og:image" [^>]*>/,
      `<meta property="og:image" content="${ogImage(route)}" />`,
    )
    .replace(
      /<meta name="twitter:image"[^>]*>/,
      `<meta name="twitter:image" content="${ogImage(route)}" />`,
    );
  const product = products.find((p) => p.path === route);
  if (product) {
    // Describes the product only — no ratings, prices or reviews we can't back up.
    const app = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: product.name,
      description: product.detail,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: product.url,
      image: `${SITE_URL}${product.preview.src}`,
      publisher: { "@type": "Organization", name: "Promptly", url: SITE_URL },
    };
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(app)}</script></head>`,
    );
  }
  if (NOINDEX.has(route))
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex,follow" /></head>',
    );
  if (route === "/") {
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Promptly",
      url: SITE_URL,
      email: "promptlypk@gmail.com",
      sameAs: ["https://www.linkedin.com/company/promptlypk/"],
    };
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(organization)}</script></head>`,
    );
  }
  if (route === "/faq") {
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(faqPage)}</script></head>`,
    );
  }
  const directory = path.join("dist", route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}
console.log(`Generated metadata for ${Object.keys(pageMeta).length} routes.`);

// The sitemap is generated from the same metadata, so it can't drift from the
// router. Unindexed routes (NOINDEX) and redirects are left out.
const sitemapRoutes = Object.keys(pageMeta).filter((route) => !NOINDEX.has(route));
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapRoutes
    .map((route) => `<url><loc>${SITE_URL}${route}</loc></url>`)
    .join("")}</urlset>\n`,
);
console.log(`Generated sitemap with ${sitemapRoutes.length} routes.`);
