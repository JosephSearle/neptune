# ThemeToggle

A two-state segmented control that switches between the Paper and Deep themes.

- Markup: `<div class="np-theme" role="group" aria-label="Theme">` with two `<button aria-pressed>` children labelled "Paper" and "Deep".
- Consumer provides: the handler. Set `data-theme="light"` or `"dark"` on `<html>` and flip `aria-pressed`. Persist the choice if you like; default to `prefers-color-scheme`.
- The pressed side fills `neptune`. Put it in `np-nav__actions`, after search.
