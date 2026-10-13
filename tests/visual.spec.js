// Visual regression: screenshot every component preview in both themes and compare with tests/__screenshots__.
import { test, expect } from "@playwright/test";
import { previews, themes, openPreview } from "./previews.js";

for (const preview of previews) {
  for (const theme of themes) {
    test(`${preview.name} · ${theme}`, async ({ page }) => {
      await openPreview(page, preview, theme);
      await expect(page).toHaveScreenshot(`${preview.name}-${theme}.png`, { fullPage: true });
    });
  }
}
