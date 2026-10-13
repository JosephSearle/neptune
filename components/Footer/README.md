# Footer

The page closer on `paper-sunk`: link columns with mono headings, a metadata line, and an oversized serif wordmark cropped by the page edge.

- Markup: `<footer class="np-footer">` with `np-footer__cols` (each `np-footer__col` an `h4` + `ul`), `np-footer__meta`, and `p.np-footer__giant` marked `aria-hidden`.
- Consumer provides: 2–4 columns of 3–5 links, the version stamp, and the copyright line.
- The giant wordmark is decorative and sits flush with the bottom edge, cropped at the descenders. It stays type: the mark is for small sizes and the Nav.
- One footer per page.
