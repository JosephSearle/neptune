# PageGrid

A 12-column grid (4 below `bp-md`) with an optional hairline rule at every column edge: the visible grid the brand book asks for.

- Markup: `div.np-grid` inside `np-container`. Children take `np-span-3`, `-4`, `-6`, `-8`, `-9` or `-12`. Add `np-grid--rules` to draw the column rules in `line`.
- Column gap is `gutter`; row gap is `space-8`. Below `bp-md` every child spans the full width and the rules redraw for 4 columns.
- Use the rules on index pages, landing sections and anything laid out as a sheet. Leave them off behind long reading text.
- Content with its own surface (Card, Figure) sits over the rules; bare text sits between them.
- Common splits: 8 + 4 (content and aside), 4 + 4 + 4 (cards), 3 + 9 (label and body).
- Don't: nest grids, or set column widths inline.
