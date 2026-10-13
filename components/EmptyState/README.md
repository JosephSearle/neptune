# EmptyState

What shows when a list, a search or a page has nothing in it: a mono frame glyph, what is empty, what to do, and at most one action.

- Markup: `div.np-empty` holding `pre.np-empty__art` (`aria-hidden="true"`), `p.np-empty__title`, `p.np-empty__text`, and an optional `div.np-row` with one button.
- Title says what is empty, specifically: `No notes match "gateway".` Not "Nothing here".
- Text says what to do next: `Check the spelling, or search playbooks instead.`
- Art: a small box drawn in box glyphs with `∴` inside. Same art everywhere.
- Inside the SearchDialog it drops its border and background.
- Don't: add an illustration, a joke, or more than one action.
