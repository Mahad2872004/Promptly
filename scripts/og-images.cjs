// Generates the 1200×630 social preview images in public/og/ from an HTML
// template, using Playwright. Run after changing copy or brand colours:
//   node scripts/og-images.cjs
// Uses the system Edge by default; set PLAYWRIGHT_CHANNEL=chrome (or "" for
// Playwright's bundled Chromium) on other machines.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const FAMILIES = {
  default: { eyebrow: "Software · Automation · Products", title: "Your next chapter.<br/>Beautifully <em>engineered</em><b>.</b>" },
  services: { eyebrow: "Services", title: "The right technology.<br/>For the real <em>problem</em><b>.</b>" },
  products: { eyebrow: "Products", title: "Products we build<br/>and <em>run</em><b>.</b>" },
  company: { eyebrow: "Company", title: "Engineering-led.<br/>Product-<em>minded</em><b>.</b>" },
  resources: { eyebrow: "Tools & resources", title: "See how we think<br/>before we <em>talk</em><b>.</b>" },
  contact: { eyebrow: "Contact", title: "Start a project<br/>with <em>us</em><b>.</b>" },
};

// Inlined as data URLs: a setContent() page may not load file:// resources.
const font = (file) =>
  "data:font/woff2;base64," + fs.readFileSync(path.resolve(__dirname, "../public/fonts", file)).toString("base64");
const logo = `<svg width="64" height="64" viewBox="0 0 100 100"><defs>
  <linearGradient id="c" x1="5" y1="5" x2="92" y2="94" gradientUnits="userSpaceOnUse"><stop stop-color="#00ddc3"/><stop offset="1" stop-color="#009bb4"/></linearGradient>
  <linearGradient id="o" x1="40" y1="75" x2="98" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#ff5426"/><stop offset="1" stop-color="#ffab24"/></linearGradient></defs>
  <path d="M33 3H91L61 34H3L33 3Z" fill="url(#c)"/><path d="M3 43H33V99H3V43Z" fill="url(#c)"/>
  <path d="M100 3V35H70L100 3Z" fill="#008ba9"/><path d="M62 35H100V51L74 77H42V54H81L62 35Z" fill="url(#o)"/></svg>`;

const html = ({ eyebrow, title }) => `<!doctype html><html><head><style>
  @font-face { font-family: Inter; src: url("${font("inter-latin-opsz.woff2")}"); font-weight: 100 900; }
  @font-face { font-family: Mono; src: url("${font("jetbrains-mono-latin.woff2")}"); font-weight: 100 800; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0b111a; color: #f2f5f8; font-family: Inter; position: relative; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 80% 70% at 70% 40%, #000 30%, transparent 100%); }
  .orb { position: absolute; border-radius: 50%; }
  .t { width: 900px; height: 900px; right: -260px; top: -360px; background: radial-gradient(closest-side, rgba(0,221,195,.34), transparent); }
  .o { width: 420px; height: 420px; right: 120px; bottom: -220px; background: radial-gradient(closest-side, rgba(255,84,38,.22), transparent); }
  .wrap { position: absolute; inset: 72px 80px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 34px; font-weight: 600; letter-spacing: -0.03em; }
  .brand b { color: #ff5426; }
  .eyebrow { margin-top: auto; font-family: Mono; font-size: 22px; letter-spacing: .14em; text-transform: uppercase; color: #00ddc3; display: flex; align-items: center; gap: 14px; }
  .eyebrow i { width: 10px; height: 10px; border-radius: 50%; background: #00ddc3; }
  h1 { margin-top: 22px; font-size: 84px; line-height: 1.02; letter-spacing: -0.035em; font-weight: 600; }
  h1 em { font-style: normal; background: linear-gradient(120deg, #00ddc3 0%, #009bb4 55%, #ff5426 100%); -webkit-background-clip: text; color: transparent; }
  h1 b { color: #ff5426; }
  .foot { position: absolute; right: 80px; top: 86px; font-family: Mono; font-size: 18px; letter-spacing: .14em; color: #8d9aab; text-transform: uppercase; }
</style></head><body>
  <div class="grid"></div><div class="orb t"></div><div class="orb o"></div>
  <div class="foot">Lahore, Pakistan</div>
  <div class="wrap">
    <div class="brand">${logo}<span>Promptly<b>.</b></span></div>
    <div class="eyebrow"><i></i>${eyebrow}</div>
    <h1>${title}</h1>
  </div>
</body></html>`;

(async () => {
  const outDir = path.resolve(__dirname, "../public/og");
  fs.mkdirSync(outDir, { recursive: true });
  const channel = process.env.PLAYWRIGHT_CHANNEL ?? "msedge";
  const browser = await chromium.launch(channel ? { channel } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [name, family] of Object.entries(FAMILIES)) {
    await page.setContent(html(family), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(outDir, `${name}.png`) });
    console.log(`public/og/${name}.png`);
  }
  await browser.close();
})();
