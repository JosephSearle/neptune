// Visual regression for every component preview, in both themes.
// Baselines are made in the Playwright container (see .github/workflows/visual.yml) so they match CI pixel for pixel.
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: { toHaveScreenshot: { maxDiffPixels: 20, animations: "disabled", caret: "hide" } },
  use: { browserName: "chromium", launchOptions: process.env.NP_CHROMIUM ? { executablePath: process.env.NP_CHROMIUM } : {}, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "reduce" },
});
