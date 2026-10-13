# Dialog

A native modal for confirmations and short tasks: bracketed label, serif title, body, and actions on a sunk footer.

- Markup: `<dialog class="np-dialog" aria-labelledby="…" aria-describedby="…">` holding `form.np-dialog__box` with `method="dialog"`: `p.np-dialog__label` (`[ Confirm ]`), `h2.np-dialog__title`, `div.np-dialog__body`, `div.np-dialog__foot`.
- Open with `showModal()`: give the trigger `data-np-open="<dialog id>"` and `neptune.js` does it. The browser gives the focus trap, Esc and the backdrop. On close, focus returns to the button that opened it; set it yourself if that button is gone.
- Buttons in the foot carry `value`; read `dialog.returnValue` on `close`. Esc returns an empty value: treat it as Cancel.
- Order: Cancel, then the action, right-aligned. On phones they stack, action on top.
- Consumer provides: a title that asks the question ("Delete mcp-gateway?"), one or two sentences on what happens, and a button that names the action ("Delete project", never "OK" or "Yes").

## Destructive actions

- Add `np-dialog--danger`: the label turns `alert` and reads `[ Delete ]` or `[ Irreversible ]`.
- The confirm button is `np-btn--danger`, the only place it appears. Put `autofocus` on Cancel, so Enter can't destroy anything by accident.
- Say what is lost, with numbers where you have them: "its 14 runs and 3 API keys".
- Irreversible and large: add an Input asking for the name, and keep the action `disabled` until it matches. Put `data-np-confirm="<name>"` on the input and `neptune.js` enables the `np-btn--danger` button when the trimmed text matches.

- Don't: open a dialog on page load, stack two dialogs, or use one for a message that needs no decision (use a Toast).

## Anatomy

```text
┌ dialog.np-dialog ──────────────────────────────┐
│ __label         [ Confirm ]                    │
├────────────────────────────────────────────────┤
│ __title         the question                   │
│ __body          what happens; optional field   │
├────────────────────────────────────────────────┤
│ __foot          Cancel   Action                │
└────────────────────────────────────────────────┘
```

## Keyboard

- Tab cycles inside the dialog only; Esc cancels; Enter on a focused button presses it.
- Focus starts on Cancel in a danger dialog, on the first field otherwise.
