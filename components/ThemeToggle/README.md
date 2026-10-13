# ThemeToggle

A two-state segmented control that switches between the Paper and Deep themes.

- Markup: `<div class="np-theme" role="group" aria-label="Theme">` with two `<button aria-pressed>` children labelled "Paper" and "Deep".
- With no `data-theme` on `<html>`, the page follows the system setting (`prefers-color-scheme`). That is the default: don't set the attribute until the reader picks.
- Consumer provides: the handler. On click, set `data-theme="light"` or `"dark"` on `<html>`, flip `aria-pressed`, and save the choice.
- On load, mark the side the page is actually showing as pressed, whether it came from the saved choice or the system.
- Apply a saved choice in an inline script in `<head>`, before the stylesheets, so the page doesn't flash the wrong theme. The preview has both scripts.
- The pressed side fills `neptune`. Put it in `np-nav__actions`, after search.

## Keyboard

- Each side is a button: Tab between them, Enter or Space to choose. `aria-pressed` announces the current theme.
