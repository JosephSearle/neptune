# Textarea

A multi-line field in the Input box. Mono text, resizes vertically.

- Markup: inside `label.np-field`: `span.np-field__label`, `<textarea class="np-textarea">`, optional `span.np-field__hint`.
- Starts at 96px (four lines). Set `rows` for longer expected input.
- No › prompt: that belongs to single-line input.
- Error: add `np-field--error` to the field and put the fix in the hint.
- Consumer provides: a label, a placeholder that shows the format (not a second label), and a length hint if there is a limit.
