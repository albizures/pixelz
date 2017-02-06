
import http from '../utils/http';
import { editProp, updateArrayItem } from '../utils/ducks';

const ADD_PALETTES = 'ADD_PALETTES';
const ADD_PALETTE = 'ADD_PALETTE';
const ADD_COLOR = 'ADD_COLOR';
const SAVE_PALETTE = 'SAVE_PALETTE';

const initialState = [];

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_PALETTE:
      return state.concat([
        editProp(payload.palette, 'index', payload.index)
      ]);
    case ADD_PALETTES:
      return state.concat(payload);
    case ADD_COLOR:
      return updateArrayItem(
        state, payload.palette,
        addNewColor(state[payload.palette], payload.color)
      );
    case SAVE_PALETTE:
      return updateArrayItem(
        state, payload,
        editProp(state[payload], 'unsaved', false)
      );
    default:
      return state;
  }
}

const addNewColor = (palette, color) => {
  palette = editProp(palette, 'colors', palette.colors.concat([color]));
  palette.unsaved = true;
  return palette;
};


export const savePalette = (palette) => (dispatch, getState) => {
  let pal = getState().palettes[palette];
  return http.put('/api/palettes/' + pal._id, pal, function () {
    dispatch({
      type: SAVE_PALETTE,
      payload: palette
    });
  });
};

export const addPalette = (palette) => (dispatch, getState) => {
  let index = getState().palettes.length;
  dispatch({
    type: ADD_PALETTE,
    payload: {
      palette,
      index
    }
  });
  return index;
};

export const addPalettes = (palettes) => ({
  type: ADD_PALETTES,
  payload: palettes
});

export const addColor = (palette, color) => ({
  type: ADD_COLOR,
  payload: {
    palette,
    color
  }
});

export default {
  reducer,
  initialState,
  types: {
    ADD_PALETTES,
    ADD_PALETTE,
    ADD_COLOR,
    SAVE_PALETTE
  }
};
