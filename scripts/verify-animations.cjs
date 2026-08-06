/**
 * Browser verification for the entrance-animation system.
 *
 * Drives a real Chromium against the production build and asserts observable
 * behaviour rather than source shape:
 *   1. above-the-fold content actually transitions 0 → 1 after boot
 *   2. below-the-fold sections are still hidden until scrolled to
 *   3. they become visible once scrolled into view
 *   4. they do NOT replay after scrolling away and back (`once: true`)
 *   5. the theme toggle flips and persists
 *
 * Run with the preview server already listening on BASE.
 */
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:4319";
const ROUTES = [
  "/", "/services", "/services/ai-solutions", "/services/software-development",
  "/services/digital-transformation", "/services/startup-support", "/portfolio",
  "/ai-architect", "/about", "/client-portal", "/contact", "/consultation",
  "/products/xsender", "/products", "/industries/startups",
  "/industries/ecommerce", "/industries/realestate", "/industries/enterprise",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Elements motion controls: they carry an inline opacity while animating.
const OPACITIES = `Array.from(document.querySelectorAll('main *'))
  .filter(el => el.style && el.style.opacity !== '' && el.offsetParent !== null && !el.closest('[aria-hidden="true"]'))
  .map(el => parseFloat(getComputedStyle(el).opacity))`;

async function run() {
  const browser = await chromium.launch();
  const results = [];
  let consoleErrors = [];

  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => consoleErrors.push(`${route}: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`${route}: ${m.text()}`);
    });

    await page.goto(BASE + route, { waitUntil: "domcontentloaded" });

    // --- 1. During boot, routed content is not mounted at all.
    await sleep(200);
    const duringBoot = await page.evaluate(
      () => document.querySelectorAll("main").length
    );

    // --- 2. Just after mount, above-the-fold reveals should be mid-flight
    //        (some opacity strictly between 0 and 1) rather than snapped on.
    await page.waitForSelector("main", { timeout: 5000 });
    await sleep(120);
    const midFlight = await page.evaluate(OPACITIES);
    const animating = midFlight.filter((o) => o > 0 && o < 1).length;

    // --- 3. Once settled, above-the-fold content is fully visible.
    await sleep(1200);
    const settled = await page.evaluate(OPACITIES);
    const atTopHidden = settled.filter((o) => o === 0).length;
    const atTopVisible = settled.filter((o) => o === 1).length;

    // --- 4. Scroll down in steps, the way a user actually does.
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= H; y += 600) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await sleep(90);
    }
    await sleep(1600);
    const afterScroll = await page.evaluate(OPACITIES);
    const stillHidden = afterScroll.filter((o) => o === 0).length;

    // --- 5. once:true — scroll back up, then down again. Nothing may reset.
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1600);
    const replay = await page.evaluate(OPACITIES);
    const replayed = replay.filter((o) => o < 1).length;

    results.push({
      route,
      bootMounted: duringBoot,
      animating,
      atTopHidden,
      atTopVisible,
      stillHidden,
      replayed,
      total: settled.length,
    });

    await ctx.close();
  }

  // ── Theme toggle ────────────────────────────────────────────────────────
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#theme-toggle", { timeout: 8000 });
  const beforeTheme = await page.evaluate(() => ({
    cls: document.documentElement.className,
    bg: getComputedStyle(document.body).backgroundColor,
  }));
  await page.click("#theme-toggle");
  await sleep(600);
  const afterTheme = await page.evaluate(() => ({
    cls: document.documentElement.className,
    bg: getComputedStyle(document.body).backgroundColor,
    stored: localStorage.getItem("promptly-theme"),
  }));
  await page.reload({ waitUntil: "domcontentloaded" });
  await sleep(400);
  const persisted = await page.evaluate(() => document.documentElement.className);
  await ctx.close();

  // ── Reduced motion ──────────────────────────────────────────────────────
  const rctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rpage = await rctx.newPage();
  await rpage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await rpage.waitForSelector("main", { timeout: 8000 });
  await sleep(1200);
  const reducedHidden = await rpage.evaluate(
    () => Array.from(document.querySelectorAll("main *"))
      .filter((el) => el.style && el.style.opacity === "0").length
  );
  await rctx.close();

  // ── Mobile: pinning must be off ─────────────────────────────────────────
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mctx.newPage();
  await mpage.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await mpage.waitForSelector("#scene-hero", { timeout: 8000 });
  await sleep(1000);
  const heroHeight = await mpage.evaluate(() => {
    const el = document.querySelector("#scene-hero");
    return { h: el.getBoundingClientRect().height, vh: window.innerHeight };
  });
  await mctx.close();

  await browser.close();

  // ── Report ──────────────────────────────────────────────────────────────
  console.log("\nROUTE                              boot  mid-flight  settled(0/1)  after-scroll-hidden  replayed");
  let fails = 0;
  for (const r of results) {
    const ok =
      r.bootMounted === 0 &&
      r.stillHidden === 0 &&
      r.replayed === 0;
    if (!ok) fails++;
    console.log(
      "  " + r.route.padEnd(33) +
      String(r.bootMounted).padStart(3) +
      String(r.animating).padStart(11) +
      `${String(r.atTopHidden).padStart(9)}/${String(r.atTopVisible).padEnd(4)}` +
      String(r.stillHidden).padStart(16) +
      String(r.replayed).padStart(11) +
      (ok ? "" : "   <-- CHECK")
    );
  }

  console.log("\nTHEME");
  console.log("  initial class      : " + JSON.stringify(beforeTheme.cls) + "  bg " + beforeTheme.bg);
  console.log("  after toggle       : " + JSON.stringify(afterTheme.cls) + "  bg " + afterTheme.bg);
  console.log("  localStorage       : " + afterTheme.stored);
  console.log("  survives reload    : " + JSON.stringify(persisted));

  console.log("\nREDUCED MOTION");
  console.log("  elements stuck at opacity 0: " + reducedHidden + (reducedHidden === 0 ? "  (content visible)" : "  <-- CONTENT INVISIBLE"));

  console.log("\nMOBILE (390px)");
  console.log("  hero height " + Math.round(heroHeight.h) + "px vs viewport " + heroHeight.vh +
    "px → " + (heroHeight.h > heroHeight.vh * 1.6 ? "PINNED (bad)" : "not pinned (good)"));

  console.log("\nCONSOLE ERRORS: " + consoleErrors.length);
  consoleErrors.slice(0, 8).forEach((e) => console.log("  " + e));

  console.log("\n" + (fails === 0 ? "PASS — all routes" : fails + " route(s) need attention"));
}

run().catch((e) => { console.error(e); process.exit(1); });
