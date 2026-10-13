# Split

A row of text beside a figure, alternating sides down the page.

- Markup: `div.np-splits` holding one `section.np-split` per row. Each row holds `div.np-split__text` (an `np-meta` eyebrow, `h3.np-split__title`, `p.np-split__lead`, an optional button) and an `np-figure`.
- Inside `np-splits`, even rows put the text on the right automatically. For a single row, add `np-split--reverse` to flip it.
- Keep text first in the markup. Below 720px rows stack, text above the figure.
- Consumer provides: an eyebrow (`02 · Retrieval`), a title in sentence case, a lead of one or two sentences, and the figure.
- Use for walk-throughs and feature tours. Two to four rows; more becomes a list, so use Feed.
- Don't: put two figures in a row, or a card in place of the figure.
