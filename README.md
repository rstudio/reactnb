## Usage

Go into the `reactnb` directory and run Shiny the usual way:

```text
R -e "shiny::runApp(launch.browser=TRUE)"
```

- Click commands to prepopulate the input bar with them
- Drag output to detach them
- Drag detached commands to trash to delete
- Click the trash to undelete trashed commands (it's a stack, one restored per click)

Keyboard shortcuts:
- Ctrl+K - Clear non-detached commands
- Ctrl+Shift+K - Clear all commands
- Up/Down - Navigate command history
- Ctrl+G - If commands go past the top or left of the screen, Ctrl+G will gather them back so they're visible
- Ctrl+H - Hide all input commands and nondetached output

Magic prefixes:

- [print] - The default
- [plot] - plot (also looks for plot, hist, ggplot, qplot in the command and assumes plotting)
- [table] - data frames rendered using xtable  
- [ui] - UI (e.g. numericInput or whatever)  
- [html] - HTML using Shiny builder functions (or `HTML()` for raw HTML, `includeMarkdown()`, `includeHTML()`, etc.)
- [text] - Display as string instead of print (e.g. `[text] "foo"` would display `foo` instead of `[1] "foo"`)
