shinyUI(basicPage(
  tags$link(rel='stylesheet', type='text/css', href='jqueryui/css/ui-lightness/jquery-ui-1.10.3.custom.css'),
  tags$script(src='jqueryui/js/jquery-ui-1.10.3.custom.js'),
  tags$script(src='reactnb.js'),
  tags$link(rel='stylesheet', type='text/css', href='reactnb.css'),
  tags$div(id='output'),
  tags$div(class='command_container',
    'Type an R expression to observe:',
    tags$input(type='command', id='command', class='reactnb-command')
  ),
  tags$div(id="trash")
))