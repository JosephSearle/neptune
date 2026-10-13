# Input

A mono text field with a `›` prompt, an uppercase label and a hint line.

- Markup: `<label class="np-field">` holding `np-field__label`, `<span class="np-input"><input></span>` and `np-field__hint`. Add `np-field--error` for errors.
- Consumer provides: label (1–2 words), placeholder showing the expected format, and a hint.
- Error hints say what went wrong, then what to do: "Invalid name: spaces not allowed. Use kebab-case."
- Errors: set `aria-invalid="true"` on the control and point `aria-describedby` at the hint's `id`, so the error is announced. The border, prompt and hint turn `alert`. `np-field--error` on the field still works for the look, but always add `aria-invalid` too.
- Disabled: `disabled` on the control. The box sinks to `paper-sunk` and the text mutes. Say why in the hint.
- Read-only: `readonly` on the input. It sits on `paper-sunk`, stays focusable and copyable. Use it for values a reader can see but not change, like an ID.
- The focus ring is on the wrapper (`:focus-within`), so the prompt glyph stays inside it.
