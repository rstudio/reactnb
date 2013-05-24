$(document).on('click', '.input', function(e) {
  $('#command').val($(e.target).text());
  $('#command').select();
});

var maxZIndex = 100;
$(document).on('dragstart', '.past_command', function(e, ui) {
  $(this).data('dragStartOffset', $(this).offset());
  $(this).css({
    zIndex: maxZIndex++
  });
  $(this).addClass('detached');
  $('body>div').append(this);
});
$(document).on('drag', '.past_command', function(e, ui) {
  var startOffset = $(this).data('dragStartOffset');
  $(this).css({
    position: 'fixed',
    top: startOffset.top + (ui.position.top - ui.originalPosition.top),
    left: startOffset.left + (ui.position.left - ui.originalPosition.left)
  });
});

$(document).keydown(function(e) {
  if (e.which == 75 && e.ctrlKey) { // Ctrl-K
    function remove(e) {
      Shiny.unbindAll(this);
      $(this).remove();
    }
    if (!e.shiftKey)
      $('.past_command:not(.detached)').hide('drop', remove);
    else
      $('.past_command').hide('drop', remove);
  }
  if (e.which == 71 && e.ctrlKey) { // Ctrl-G
    $('.past_command.detached').each(function() {
      var props = {};
      if (/^-/.test(this.style.top))
        props.top = 0;
      if (/^-/.test(this.style.left))
        props.left = 0;
      if (Object.keys(props).length > 0) {
        $(this).animate(props, 250);
      }
    });
  }
});

var commandInputBinding = new Shiny.InputBinding();
$.extend(commandInputBinding, {
  nextId: 0,
  history: [],
  historyPos: null,
  find: function(scope) {
    return $(scope).find('.reactnb-command');
  },
  getValue: function(el) {
    return $.extend(true, this.parseInput(el), {
      id: 'cmd' + this.nextId++
    });
  },
  parseInput: function(el) {
    var val = $(el).val();
    // Commands with a leading * are plot commands
    if (/^\*/.test(val)) {
      return {type: 'plot', text: val.substr(1)}
    } else if (/^\^/.test(val)) {
      return {type: 'table', text: val.substr(1)}
    } else if (/^\&/.test(val)) {
      return {type: 'html', text: val.substr(1)}
    } else if (/\b(plot|hist|lattice|ggplot|qplot)\b/.test(val) && !/\blibrary\b/.test(val)) {
      return {type: 'plot', text: val}
    } else if (/^\*/.test(val)) {
      return {type: 'plot', text: val.substr(1)}
    } else {
      return {type: 'print', text: val};
    }
  },
  subscribe: function(el, callback) {
    var self = this;
    $el = $(el);
    $el.keydown(function(e) {
      if (e.which == 38) { // up-arrow
        if (self.historyPos > 0) {
          self.historyPos--;
          $el.val(self.history[self.historyPos]);
          $el.select();
          setTimeout(function() {
            el.setSelectionRange($el.val().length, $el.val().length);
          }, 0);
        }
      }
      if (e.which == 40) { // down-arrow
        if (self.historyPos < self.history.length) {
          self.historyPos++;
          if (self.historyPos == self.history.length)
            $el.val('');
          else
            $el.val(self.history[self.historyPos]);
          $el.select();
          setTimeout(function() {
            el.setSelectionRange($el.val().length, $el.val().length);
          }, 0);
        }
      }
      if (e.keyCode == 13) {

        self.history.push($el.val());
        self.historyPos = self.history.length;
        var parsed = self.parseInput(el);
        
        var cmdContainer = $('<div id="cmd' + self.nextId + '" class="past_command">');
        var inputDiv = $('<div class="input">');
        inputDiv.text($el.val());
        var outputClass = 'highlight-text-output';
        if (parsed.type === 'plot') {
          outputClass = 'shiny-plot-output';
        } else if (parsed.type === 'table') {
          outputClass = 'shiny-html-output';
        } else if (parsed.type === 'html') {
          outputClass = 'shiny-html-output';
        }
        var outputDiv = $('<div id="cmd' + self.nextId + '_output" class="output ' + outputClass + '">');
        cmdContainer.append(inputDiv);
        cmdContainer.append(outputDiv);
        $('#output').append(cmdContainer);
        cmdContainer.draggable();
        Shiny.bindAll(cmdContainer);

        callback();
        $el.val('');
      }
    })
  }
});
Shiny.inputBindings.register(commandInputBinding, 'reactnb-command');

var highlightTextOutputBinding = new Shiny.OutputBinding();
$.extend(highlightTextOutputBinding, {
  find: function(scope) {
    return $(scope).find('.highlight-text-output');
  },
  renderValue: function(el, data) {
    $(el).text(data);
    $(el).addClass('highlight').removeClass('highlight', 800, 'easeInExpo');
    //if (data)
    //  $(el).effect('highlight', 1000);
  }
});
Shiny.outputBindings.register(highlightTextOutputBinding, 'reactnb-highlightTextOutput');


// Trash functionality

var trash = [];
$(function() {
  $('#trash').droppable({
    tolerance: 'pointer',
    drop: function(e, ui) {
      trash.push(ui.draggable);
      ui.draggable.hide('drop');
      $(this).addClass('full');
    }
  });
  $('#trash').click(function(e) {
    if (trash.length > 0) {
      trash.pop().show('drop');
      if (trash.length == 0) {
        $(this).removeClass('full');
      }
    }
  });
  $('#command').select();
});
