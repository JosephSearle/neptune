# Toast

A short machine message after something happens: dark like the terminal in both themes, mono, bottom right.

- Markup: one `section.np-toasts` per page with `aria-label="Notifications"` and `aria-live="polite"`, present from page load (empty). Add `div.np-toast` children: `p.np-toast__label` (`np-dot` + word), `p.np-toast__text`, `button.np-toast__close` ("Dismiss"), optional `div.np-toast__actions` with one `button.np-toast__action`.
- Variants: `np-toast--ok` (label `term-ok`), `np-toast--alert` (label `term-alert`, and `role="alert"` on the toast so it's announced at once). Default is neutral.
- Timing: ok and neutral toasts leave after 6s, paused while hovered or focused. Alert toasts stay until dismissed. A toast with an action stays until acted on or dismissed.
- Words: label is the result in one word (`Saved`, `Copied`, `Failed`); text is what happened, then what to do: "Deploy failed: missing `API_BASE_URL`. Set it in `.env`."
- At most three on screen; the oldest goes first. Newest at the bottom.
- Consumer provides: the region, the timer, and the handlers. The preview has a small script to copy.
- Don't: toast something the user can see changed on the page, put the only copy of an error in a toast, or use a toast for a decision (use a Dialog). CodeCopy says "Copied" in its own button; no toast.

## Anatomy

```text
┌ section.np-toasts (live region) ───────────────┐
│ np-toast        __label ● word       Dismiss   │
│                 __text                         │
│                 __actions: one __action        │
└────────────────────────────────────────────────┘
```

## Keyboard

- Toasts never take focus. Tab reaches Dismiss and the action in place; alert toasts are announced at once.
- An ok toast's timer pauses while it holds focus.
