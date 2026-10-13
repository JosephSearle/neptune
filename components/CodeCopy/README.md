# CodeCopy

A dark code block with a language label and a Copy button, plus a light inline code style.

- Markup: `<div class="np-code">` with `np-code__head` (language + `button.np-code__copy`) and `<pre><code>`. Inside, `.p` for prompts and `.c` for commands. Inline: `<code class="np-code-inline">`.
- Consumer provides: the language label, the code, and the copy handler. Strip prompts (`$ `) from the copied text.
- The button reads "Copy", then "Copied" for 1.5s with `data-copied` set. No toast.
- Use Terminal for transcripts with output; use CodeCopy for things people paste.
