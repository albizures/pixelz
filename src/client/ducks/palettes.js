
const { editProp, updateArrayItem } = require('utils/ducks.js');
const ADD_PALETTES = 'ADD_PALETTES';
const ADD_PALETTE = 'ADD_PALETTE';
const ADD_COLOR = 'ADD_COLOR';

exports.initialState = [];

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_PALETTE:
      return state.concat([
        editProp(action.palette, 'index', action.index)
      ]);
    case ADD_PALETTES:
      return state.concat(action.palettes);
    case ADD_COLOR: 
      return updateArrayItem(
        state, action.palette,
        addColor(state[action.palette], action.color)
      );
    default:
      return state;
  }
};

function addColor(palette, color) {
  palette = editProp(palette, 'colors', palette.colors.concat([color]));
  palette.unsaved = true;
  return palette;
}

const actions = {};

actions.addPalette = function (palette) {
  return (dispatch, getState) => {
    let index = getState().palettes.length;
    dispatch({
      type : palette,
      sprite,
      index
    });
    return index;
  };
};

actions.addPalettes = function (palettes) {
  return {
    type : ADD_PALETTES,
    palettes
  };
};

actions.addColor = function (palette, color) {
  return {
    type: ADD_COLOR,
    palette,
    color
  };
};

exports.actions = actions;