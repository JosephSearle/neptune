# SectionHead

The opener for a page section: an optional indexed rule, a serif heading, an optional lead and an optional action on the right.

- Markup: `<header class="np-section-head">` with an optional `div.np-rule`, then `div.np-section-head__row` holding `h2.np-section-head__title` and an optional ghost button, then an optional `p.np-section-head__lead`. Add `np-section-head--sm` for sub-sections.
- Consumer provides: the index and name for the rule (`01 · Notes`), the heading in sentence case, and at most one action.
- Index sections in page order. The heading drops to `heading` size below 640px.
- Use this instead of styling `h2` inline.
