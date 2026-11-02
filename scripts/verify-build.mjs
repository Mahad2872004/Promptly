import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const port = 3199;
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["dist/server.cjs"], {
  env: {
    ...process.env,
    PORT: String(port),
    NODE_ENV: "production",
    GEMINI_API_KEY: "",
  },
  stdio: ["ignore", "pipe", "pipe"],
  windowsHide: true,
});
let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      ready = (await fetch(`${base}/api/health`)).ok;
    } catch {}
    if (ready) break;
    if (server.exitCode !== null)
      throw new Error(`Production server exited: ${output}`);
    await delay(100);
  }
  assert.ok(ready, "Production server becomes ready");
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  assert.ok(!urls.includes("/portal-demo"), "Noindex route stays out of sitemap");
  for (const route of [...urls, "/portal-demo"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.ok(
      html.includes(`href="https://promptly-seven-opal.vercel.app${route}"`),
      `Canonical for ${route}`,
    );
    assert.match(html, /<script type="module" crossorigin src="\/assets\//);
    if (route === "/portal-demo") assert.ok(html.includes("noindex,follow"));
  }
  const redirects = {
    "/portfolio": "/products",
    "/portfolio/xsender": "/products/xsender",
    "/ai-architect": "/blueprint",
    "/client-portal": "/portal-demo",
    "/consultation": "/contact#book",
    "/industries/startups": "/industries#startups",
    "/industries/ecommerce": "/industries#ecommerce",
    "/industries/realestate": "/industries#realestate",
    "/industries/enterprise": "/industries#enterprise",
  };
  for (const [from, to] of Object.entries(redirects)) {
    for (const path of [from, `${from}/`]) {
      const response = await fetch(base + path, { redirect: "manual" });
      assert.equal(response.status, 301, `${path} redirects`);
      assert.equal(response.headers.get("location"), to, `${path} → ${to}`);
    }
  }
  assert.equal((await fetch(base + "/unavailable-page")).status, 404);
  assert.equal((await fetch(base + "/robots.txt")).status, 200);
  assert.equal((await fetch(base + "/sitemap.xml")).status, 200);
  assert.equal((await fetch(base + "/products/")).status, 200);
  const invalid = await fetch(base + "/api/gemini/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "x" }),
  });
  assert.equal(invalid.status, 400);
  const fallback = await fetch(base + "/api/gemini/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: "Create an internal order tracking application.",
    }),
  });
  const result = await fallback.json();
  assert.equal(result.success, true);
  assert.match(result.source, /Fallback/);
  assert.ok(result.data.phases.length > 0);
  console.log(
    `PASS: ${urls.length + 1} routes, ${Object.keys(redirects).length * 2} redirects, metadata, canonical links, sitemap, robots, 404, trailing slash, API health, validation and labeled offline estimator.`,
  );
} finally {
  server.kill();
}
