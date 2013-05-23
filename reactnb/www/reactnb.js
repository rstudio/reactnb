$(document).on('click', '.input', function(e) {
  $('#command').val($(e.target).text());
  $('#command').select();
});

var commandInputBinding = new Shiny.InputBinding();
$.extend(commandInputBinding, {
  nextId: 0,
  find: function(scope) {
    return $(scope).find('.reactnb-command');
  },
  getValue: function(el) {
    return {
      id: 'cmd' + this.nextId++,
      text: $(el).val()
    };
  },
  subscribe: function(el, callback) {
    var self = this;
    $(el).keyup(function(e) {
      if (e.keyCode == 13) {
        
        var cmdContainer = $('<div id="cmd' + self.nextId + '">');
        var inputDiv = $('<div class="input">');
        inputDiv.text($(el).val());
        var outputDiv = $('<div id="cmd' + self.nextId + '_output" class="output shiny-text-output">');
        cmdContainer.append(inputDiv);
        cmdContainer.append(outputDiv);
        $('#output').append(cmdContainer);
        Shiny.bindAll(cmdContainer);

        callback();
        $(el).val('');
      }
    })
  }
});
Shiny.inputBindings.register(commandInputBinding, 'reactnb-command');