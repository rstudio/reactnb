## Installation

May require the very latest version of Shiny:
```
install.packages('httpuv', repos=c(RStudio='http://rstudio.org/_packages/', CRAN='http://cran.rstudio.com'))
devtools::install_github('shiny', 'rstudio')
```

## Usage

Go into seattle-meetup/reactnb and run Shiny the usual way:

```text
R -e "shiny::runApp(launch.browser=TRUE)"
```

Click commands to prepopulate the input bar with them
Drag output to detach them
Drag detached commands to trash to delete
Click the trash to undelete trashed commands (it's a stack, one restored per click)

Keyboard shortcuts:
- Ctrl+K - Clear non-detached commands
- Ctrl+Shift+K - Clear all commands
- Up/Down - Navigate command history
- Ctrl+G - If commands go past the top or left of the screen, Ctrl+G will gather them back so they're visible

Magic prefixes:

\* - plot (also looks for plot, hist, ggplot, qplot in the command and assumes plotting)  
^ - data frames rendered using xtable  
& - UI (e.g. numericInput or whatever)  
