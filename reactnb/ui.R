shinyUI(basicPage(
  tags$script(src='reactnb.js'),
  tags$link(rel='stylesheet', type='text/css', href='reactnb.css'),
  tags$div(id='output'),
  tags$input(type='command', id='command', class='reactnb-command')
))