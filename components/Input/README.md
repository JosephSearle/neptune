# Input

A mono text field with a `›` prompt, an uppercase label and a hint line.

- Markup: `<label class="np-field">` holding `np-field__label`, `<span class="np-input"><input></span>` and `np-field__hint`. Add `np-field--error` for errors.
- Consumer provides: label (1–2 words), placeholder showing the expected format, and a hint.
- Error hints say what went wrong, then what to do: "Invalid name: spaces not allowed. Use kebab-case."
- The focus ring is on the wrapper (`:focus-within`), so the prompt glyph stays inside it.
