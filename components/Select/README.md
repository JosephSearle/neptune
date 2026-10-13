# Select

A native select in the Input box, mono text, ▾ on the right.

- Markup: inside `label.np-field`: `span.np-field__label`, then `<span class="np-select"><select>…</select></span>`, then an optional `span.np-field__hint`.
- Use for one of seven or more options. Fewer: radio buttons, so every option shows.
- Keep the native `select`: it brings the phone picker and keyboard support for free.
- Error: add `np-field--error` to the field and say what to do in the hint.
- Consumer provides: options in a sensible order (most used first, or alphabetical), and a default.
