shinyServer(function(input, output, session) {

  sessionEnv = new.env()

  observe({
    if (is.null(input$command))
      return()
    command <- input$command
    cmdId <- command$id
    cmdText <- command$text
    if (!nzchar(cmdText))
      return()

    output[[paste0(cmdId, '_output')]] <- renderPrint({
      eval(parse(text=cmdText), envir = sessionEnv)
    })
    outputOptions(output, paste0(cmdId, '_output'), suspendWhenHidden=FALSE)
  })

})