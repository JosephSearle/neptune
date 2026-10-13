import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const fonts = (pkg, file) => pathToFileURL(join(root, "node_modules/@fontsource", pkg, "files", file)).href;

// Serve the brand fonts from node_modules instead of Google Fonts, so screenshots don't depend on the network.
const face = (family, pkg, w, style = "normal") =>
  `@font-face{font-family:"${family}";font-style:${style};font-weight:${w};src:url(${fonts(pkg, `${pkg}-latin-${w}-${style}.woff2`)}) format("woff2")}`;
const FONT_CSS = [
  ...[300, 400, 500, 600, 700].map((w) => face("Newsreader", "newsreader", w)),
  ...[300, 400, 500].map((w) => face("Newsreader", "newsreader", w, "italic")),
  ...[400, 500, 600].map((w) => face("IBM Plex Mono", "ibm-plex-mono", w)),
].join("\n");

const components = readdirSync(join(root, "components"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, "components", d.name, "preview.html")))
  .map((d) => d.name)
  .sort();

for (const name of components) {
  const file = join(root, "components", name, "preview.html");
  const marker = readFileSync(file, "utf8").split("\n", 1)[0];
  const width = Number((marker.match(/width=(\d+)/) || [])[1] || 960);

  for (const theme of ["light", "dark"]) {
    test(`${name} · ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 600 });
      await page.route("**/fonts.googleapis.com/**", (r) => r.fulfill({ contentType: "text/css", body: FONT_CSS }));
      await page.route("**/fonts.gstatic.com/**", (r) => r.abort());
      await page.goto(pathToFileURL(file).href);
      await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${name}-${theme}.png`, { fullPage: true });
    });
  }
}
