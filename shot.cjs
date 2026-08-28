const { chromium } = require("playwright");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:5199";
const OUT = process.env.OUT || "e:/Promptly/promptly/Promptly/shots/rev";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// route, tag, scrollY
const JOBS = (process.env.JOBS ? JSON.parse(process.env.JOBS) : [
  ["/", "home-hero", 0],
  ["/", "home-mid", 2400],
  ["/", "home-mid2", 4200],
  ["/", "home-low", 6500],
  ["/services", "services", 0],
  ["/about", "about", 400],
  ["/contact", "contact", 0],
  ["/portfolio", "portfolio", 300],
]);

(async () => {
  const browser = await chromium.launch();
  for (const theme of (process.env.THEMES || "light,dark").split(",")) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await ctx.addInitScript((t) => {
      try { localStorage.setItem("promptly-theme", t); } catch (e) {}
    }, theme);
    const page = await ctx.newPage();
    for (const [route, tag, y] of JOBS) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await sleep(2600);
      if (y) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await sleep(1400); }
      await page.screenshot({ path: path.join(OUT, `${tag}-${theme}.png`) });
    }
    await ctx.close();
  }
  await browser.close();
  console.log("done");
})();
