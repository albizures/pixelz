const $window = $(window);
const { store } = require('../../../store.js');
const execute = require('./actions');
const noop = function() {};

const shortcuts = {
  90: (ctrl) => {
    if (ctrl) {
      let state = store.getState();
      let action = state.Editor.history.undo[state.Editor.history.undo.length - 1];
      if (action) {
        execute[action.type](action.data, state, true);
      }
    }
  },
  89: (ctrl) => {
    if (ctrl) {
      let state = store.getState();
      let action = state.Editor.history.redo[state.Editor.history.redo.length - 1];
      if (action) {
        execute[action.type](action.data, state);
      }
    }
  }
};

exports.init = function() {
  $window.on('keydown.shortcuts', this.onKeydown.bind(this));
  $window.on('keyup.shortcuts', this.onKeyup.bind(this));
};
exports.off = function () {
  $window.off('keydown.shortcuts');
  $window.off('keyup.shortcuts');
};

exports.onKeydown = function(evt) {
  let key = evt.keyCode ? evt.keyCode : evt.which;
  (shortcuts[key] || noop)(evt.ctrlKey);
};
exports.onKeyup = function() {

};