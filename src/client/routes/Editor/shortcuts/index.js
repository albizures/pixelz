const $window = $(window);
import { store } from '../../../store';
import execute from './actions';
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

export const init = function() {
  $window.on('keydown.shortcuts', this.onKeydown.bind(this));
  $window.on('keyup.shortcuts', this.onKeyup.bind(this));
};
export const off = function () {
  $window.off('keydown.shortcuts');
  $window.off('keyup.shortcuts');
};

export const onKeydown = function(evt) {
  let key = evt.keyCode ? evt.keyCode : evt.which;
  (shortcuts[key] || noop)(evt.ctrlKey);
};
export const onKeyup = function() {

};