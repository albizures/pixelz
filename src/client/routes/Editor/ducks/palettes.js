
const { push, updateArrayItem, editProp } = require('utils/ducks.js');

const ADD_PALETTE = 'ADD_PALETTE';
const ADD_COLOR = 'ADD_COLOR';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_PALETTE:
      return push(
        state,
        editProp(action.palette, 'index', state.length)
      );
    case ADD_COLOR:
      let palette = state[action.palette];
      return updateArrayItem(
        state, action.palette,
        editProp(palette, 'colors', push(palette.colors, action.color))
      );
    default:
      return state;
  }
};

exports.actions = {};

exports.actions.addPalette = function (palette) {
  return {
    type : ADD_PALETTE,
    palette : palette
  };
};

exports.actions.addColor = function (palette, color) {
  return {
    type : ADD_PALETTE,
    palette : palette,
    color : color
  };
};