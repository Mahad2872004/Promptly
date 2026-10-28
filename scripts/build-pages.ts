import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pageMeta, SITE_URL } from "../src/seo";

// Emit route-specific metadata for crawlers and link previews without changing
// the application's router or introducing a second rendering framework.
const template = await readFile("dist/index.html", "utf8");
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const [route, [title, description]] of Object.entries(pageMeta)) {
  let html = template
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
    );
  if (route === "/client-portal")
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
  const directory = path.join("dist", route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}
console.log(`Generated metadata for ${Object.keys(pageMeta).length} routes.`);
