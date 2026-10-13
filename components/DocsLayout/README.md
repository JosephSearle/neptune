# DocsLayout

The three-column docs page: Sidebar, content, On this page.

- Markup: `div.np-docs` inside `np-container`, holding `aside.np-docs__side` (Sidebar), `article.np-docs__main` and `aside.np-docs__toc` (Toc), in that order.
- Columns: 240px · fluid · 200px. Below `bp-lg` (1080px) the Toc column hides. Below `bp-md` (720px) one column, Sidebar first.
- Main runs: Breadcrumb, `display` title, Prose (with Callouts and Tabs), Rule, Pager. The README's Docs pages section has the full recipe.
- The side columns are sticky at `space-8` from the top.
- Consumer provides: the three regions. Nothing else goes in the grid.
