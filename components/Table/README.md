# Table

A data table with mono uppercase headers on `paper-sunk`, serif cells, hairline rows and right-aligned tabular numbers.

- Markup: `<div class="np-table-wrap"><table class="np-table">`. Add `class="num"` to numeric headers and cells, `class="idx"` to an index column.
- Consumer provides: column headers (1–2 words), rows, and units in the cell ("420 ms"), not the header.
- Use Tag for status columns, with a word. Rows highlight `neptune-soft` on hover.
- The wrapper scrolls horizontally on phones; don't hide columns.
- Optional `<caption>` for a mono source line: "Source: evals, 2026-10-07".
