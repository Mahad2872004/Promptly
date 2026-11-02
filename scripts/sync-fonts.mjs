// Copies the self-hosted variable fonts from @fontsource-variable into
// public/fonts (referenced by src/styles/fonts.css and preloaded in index.html).
// Run after upgrading either font package.
import { copyFile } from "node:fs/promises";

const files = {
  "@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2": "inter-latin-opsz.woff2",
  "@fontsource-variable/inter/files/inter-latin-ext-opsz-normal.woff2": "inter-latin-ext-opsz.woff2",
  "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2": "jetbrains-mono-latin.woff2",
  "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-ext-wght-normal.woff2": "jetbrains-mono-latin-ext.woff2",
};

for (const [from, to] of Object.entries(files)) {
  await copyFile(`node_modules/${from}`, `public/fonts/${to}`);
  console.log(`public/fonts/${to}`);
}
