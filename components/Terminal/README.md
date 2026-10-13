# Terminal

A dark code and command block with a mono title bar; stays dark in both themes.

- Markup: `<div class="np-term">` with `np-term__bar` and `<pre class="np-term__body">`. Inside the body: `.p` for prompts and comments, `.c` for commands, `.cur` for the block cursor.
- Consumer provides: a bar label (`[ TUI ] ~/path`), real commands and real output.
- Show commands people can copy. Keep output honest and short.
- One blinking cursor per page at most. It stops under reduced motion.
- Don't: add macOS traffic-light dots, syntax-highlight with more than `term-accent`.
