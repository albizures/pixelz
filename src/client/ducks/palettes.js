
import http from '../utils/http';
import { editProp, updateArrayItem } from '../utils/ducks';

const ADD_PALETTES = 'ADD_PALETTES';
const ADD_PALETTE = 'ADD_PALETTE';
const ADD_COLOR = 'ADD_COLOR';
const SAVE_PALETTE = 'SAVE_PALETTE';

export const initialState = [];

export default function (state = [], action) {
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
    case SAVE_PALETTE:
      return updateArrayItem(
        state, action.palette,
        editProp(state[action.palette], 'unsaved', false)
      );
    default:
      return state;
  }
}

const addColor = (palette, color) => {
  palette = editProp(palette, 'colors', palette.colors.concat([color]));
  palette.unsaved = true;
  return palette;
};

export const actions = {};

actions.savePalette = (palette) => (dispatch, getState) => {
  let pal = getState().palettes[palette];
  return http.put('/api/palettes/' + pal._id, pal, function () {
    dispatch({
      type: SAVE_PALETTE,
      palette
    });
  });
};

actions.addPalette = (palette) => (dispatch, getState) => {
  let index = getState().palettes.length;
  dispatch({
    type: ADD_PALETTE,
    palette,
    index
  });
  return index;
};

actions.addPalettes = (palettes) => ({
  type: ADD_PALETTES,
  palettes
});

actions.addColor = (palette, color) => ({
  type: ADD_COLOR,
  palette,
  color
});