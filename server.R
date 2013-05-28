options(width=60)

shinyServer(function(input, output, session) {

  builtinsEnv <- new.env()
  sessionEnv <- new.env(parent=builtinsEnv)
  builtinsEnv$temporal <- function(expr=NULL, period=1000) {
    invalidateLater(period, session)
    expr
  }

  observe({
    if (is.null(input$command))
      return()
    command <- input$command
    cmdId <- command$id
    cmdText <- command$text
    cmdType <- command$type
    if (!nzchar(cmdText))
      return()

    if (cmdType == 'plot') {
      output[[paste0(cmdId, '_output')]] <- renderPlot({
        fg <- '#F5F5F5'
        #par(bg='#303030', fg=fg, col=fg, col.axis=fg, col.lab=fg, col.main=fg, col.sub=fg)
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else if (cmdType == 'table') {
      output[[paste0(cmdId, '_output')]] <- renderTable({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else if (cmdType == 'text') {
      output[[paste0(cmdId, '_output')]] <- renderText({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else if (cmdType == 'html' || cmdType == 'ui') {
      output[[paste0(cmdId, '_output')]] <- renderUI({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else {
      output[[paste0(cmdId, '_output')]] <- renderPrint({
        if (grepl('^\\s*#', cmdText))
          invisible(eval(parse(text=cmdText), envir = sessionEnv))
        else
          eval(parse(text=cmdText), envir = sessionEnv)
      })
    }
    outputOptions(output, paste0(cmdId, '_output'), suspendWhenHidden=FALSE)
  })

})