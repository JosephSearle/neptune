# Button

A square, mono-labelled action that lifts on hover with `shadow-press`.

- Markup: `<button class="np-btn">` or `<a class="np-btn">`. Add `np-btn--primary` or `np-btn--ghost`.
- Consumer provides: the label (2–4 words, imperative), and an optional `→` suffix for navigation.
- One `np-btn--primary` per view. Secondary is the default.
- Ghost is for low-weight links in a row of actions.
- States: hover lifts, `:active` presses flat, focus shows the ring. Disabled: `disabled` on a `<button>`; on an `<a>`, drop the `href` and add `aria-disabled="true"`. Busy: `aria-busy="true"` while the action runs; keep the label, a blinking block follows it, and set `disabled` too so it can't fire twice.
- Say why a control is disabled, in a hint or nearby text. A dead button with no reason is a dead end.
- Do: "Read the playbook →", "View source", "Copy".
- Don't: sentence-case labels, icons without text, two primaries side by side.
