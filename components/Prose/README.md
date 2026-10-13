# Prose

A wrapper that applies Neptune's type to plain article HTML: headings, paragraphs, lists, links, quotes and inline code.

- Markup: `<article class="np-prose">` around rendered Markdown or MDX.
- Consumer provides: the content. No classes needed inside.
- Max width is 68ch. `h2` maps to `heading`, `h3` to `title`, `blockquote` to `quote`.
- Put code blocks in CodeCopy, not bare `<pre>`.
