shinyUI(basicPage(
  tags$link(rel='stylesheet', type='text/css', href='lib/jqueryui/css/ui-lightness/jquery-ui-1.10.3.custom.css'),
  tags$script(src='lib/jqueryui/js/jquery-ui-1.10.3.custom.js'),
  tags$script(src='lib/jquery.ui.touch-punch.min.js'),
  tags$script(src='reactnb.js'),
  tags$link(rel='stylesheet', type='text/css', href='reactnb.css'),
  tags$div(id='output'),
  tags$div(class='command_container',
    'Type an R expression to observe:',
    tags$input(type='command', id='command', class='reactnb-command',
               autocomplete='off', autocorrect='off')
  ),
  tags$div(id="trash")
))