# Button

A square, mono-labelled action that lifts on hover with `shadow-press`.

- Markup: `<button class="np-btn">` or `<a class="np-btn">`. Add `np-btn--primary` or `np-btn--ghost`.
- Consumer provides: the label (2–4 words, imperative), and an optional `→` suffix for navigation.
- One `np-btn--primary` per view. Secondary is the default.
- Ghost is for low-weight links in a row of actions.
- Do: "Read the playbook →", "View source", "Copy".
- Don't: sentence-case labels, icons without text, two primaries side by side.
