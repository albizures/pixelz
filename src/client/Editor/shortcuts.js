'use strict';

let shortcuts = {
  90 : (ctrl) => {
    if (ctrl) {
      Editor.panels.Actions.undo();
    }
  },
  89 : (ctrl) => {
    if (ctrl) {
      Editor.panels.Actions.redo();
    }
  }
};

module.exports = {
  init : function () {
    $(window).on('keydown.shortcuts', this.onKeydown.bind(this));
    $(window).on('keyup.shortcuts', this.onKeyup.bind(this));
  },
  onKeydown : function (evt) {
    let key = evt.keyCode ? evt.keyCode :  evt.which;
    (shortcuts[key] || function () {})(evt.ctrlKey);
  },
  onKeyup : function (evt) {

  }
};
