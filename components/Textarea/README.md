# Textarea

A multi-line field in the Input box. Mono text, resizes vertically.

- Markup: inside `label.np-field`: `span.np-field__label`, `<textarea class="np-textarea">`, optional `span.np-field__hint`.
- Starts at 96px (four lines). Set `rows` for longer expected input.
- No › prompt: that belongs to single-line input.
- Errors: set `aria-invalid="true"` on the control and point `aria-describedby` at the hint's `id`, so the error is announced. The border, prompt and hint turn `alert`. `np-field--error` on the field still works for the look, but always add `aria-invalid` too.
- Disabled: `disabled` on the control. The box sinks to `paper-sunk` and the text mutes. Say why in the hint.
- Read-only: `readonly`, same as Input.
- Consumer provides: a label, a placeholder that shows the format (not a second label), and a length hint if there is a limit.

## Keyboard

- Tab focuses; Enter adds a line, so it never submits the form. Tab leaves the field.
