options(width=60)

shinyServer(function(input, output, session) {

  sessionEnv = new.env()
  #sessionEnv$v <- reactiveValues()

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
      }, width=400, height=300)
    } else if (cmdType == 'table') {
      output[[paste0(cmdId, '_output')]] <- renderTable({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else if (cmdType == 'html') {
      output[[paste0(cmdId, '_output')]] <- renderUI({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    } else {
      output[[paste0(cmdId, '_output')]] <- renderPrint({
        eval(parse(text=cmdText), envir = sessionEnv)
      })
    }
    outputOptions(output, paste0(cmdId, '_output'), suspendWhenHidden=FALSE)
  })

})