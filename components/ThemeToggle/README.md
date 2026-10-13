# ThemeToggle

A two-state segmented control that switches between the Paper and Deep themes.

- Markup: `<div class="np-theme" role="group" aria-label="Theme">` with two `<button type="button" aria-pressed="false">` children: `data-set="light"` labelled "Paper" and `data-set="dark"` labelled "Deep".
- With no `data-theme` on `<html>`, the page follows the system setting (`prefers-color-scheme`). That is the default: don't set the attribute until the reader picks.
- Behaviour comes from `neptune.js`: a click sets `data-theme="light"` or `"dark"` on `<html>`, flips `aria-pressed` and saves the choice as `np-theme` in `localStorage`. On load, and when the system theme changes, it marks the side the page is actually showing.
- `neptune.js` is deferred, so also apply a saved choice in a one-line inline script in `<head>`, before the stylesheets, or the page flashes the wrong theme. Copy it from the preview.
- The pressed side fills `neptune`. Put it in `np-nav__actions`, after search.

## Keyboard

- Each side is a button: Tab between them, Enter or Space to choose. `aria-pressed` announces the current theme.
