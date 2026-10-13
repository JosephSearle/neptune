# Select

A native select in the Input box, mono text, ▾ on the right.

- Markup: inside `label.np-field`: `span.np-field__label`, then `<span class="np-select"><select>…</select></span>`, then an optional `span.np-field__hint`.
- Use for one of seven or more options. Fewer: radio buttons, so every option shows.
- Keep the native `select`: it brings the phone picker and keyboard support for free.
- Errors: set `aria-invalid="true"` on the control and point `aria-describedby` at the hint's `id`, so the error is announced. The border, prompt and hint turn `alert`. `np-field--error` on the field still works for the look, but always add `aria-invalid` too.
- Disabled: `disabled` on the control. The box sinks to `paper-sunk` and the text mutes. Say why in the hint.
- Consumer provides: options in a sensible order (most used first, or alphabetical), and a default.
