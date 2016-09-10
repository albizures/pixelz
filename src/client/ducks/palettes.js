
const { editProp, updateArrayItem } = require('utils/ducks.js');
const ADD_PALETTES = 'ADD_PALETTES';
const ADD_PALETTE = 'ADD_PALETTE';


exports.initialState = [];

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_PALETTE:
      return state.concat([
        editProp(action.palette, 'index', action.index)
      ]);
    case ADD_PALETTES:
      return state.concat(action.palettes);
    default:
      return state;
  }
};

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

exports.actions = actions;