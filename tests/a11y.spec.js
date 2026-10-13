// Accessibility: run axe-core on every component preview in both themes. Serious and critical violations fail.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { previews, themes, openPreview } from "./previews.js";

const FAIL_ON = ["serious", "critical"];

// Rules to skip, per component. Only for preview-only scaffolding that consumers don't copy; say why on each entry.
// Never skip color-contrast: fix the token or the markup instead.
const IGNORE = {};

const report = (violations) =>
  violations
    .map((v) => [`${v.id} (${v.impact}): ${v.help}`, ...v.nodes.map((n) => `  ${n.target.join(" ")}`), `  ${v.helpUrl}`].join("\n"))
    .join("\n\n");

for (const preview of previews) {
  for (const theme of themes) {
    test(`${preview.name} · ${theme} · a11y`, async ({ page }) => {
      await openPreview(page, preview, theme);
      const { violations } = await new AxeBuilder({ page }).disableRules(IGNORE[preview.name] || []).analyze();
      const failing = violations.filter((v) => FAIL_ON.includes(v.impact));
      expect(failing.map((v) => v.id), `${preview.name} in ${theme}:\n\n${report(failing)}\n`).toEqual([]);
    });
  }
}
