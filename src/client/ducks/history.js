import { editProp } from 'utils/ducks';

const ADD_UNDO = 'ADD_UNDO';
const ADD_REDO = 'ADD_REDO';

const PAINT = 'PAINT';
// const ERASE = 'ERASE';
// const RESIZE = 'RESIZE';
// const ADD_LAYER = 'ADD_LAYER';
// const DELETE_LAYER = 'DELETE_LAYER';
// const ADD_FRAME = 'ADD_FRAME';
// const DELETE_FRAME = 'DELETE_FRAME';
const DELETE_UNDO = 'DELETE_UNDO';
const DELETE_REDO = 'DELETE_REDO';
const initialState = {
  undo: [],
  redo: []
};

function reducer(state = initialState, {
  type,
  payload
}) {
  switch (type) {
    case ADD_UNDO:
      return {
        undo: state.undo.concat([editProp(payload.data, 'index', state.undo.length)]),
        redo: payload.redo ? state.redo.slice(0, state.redo.length - 1) : []
      };
    case ADD_REDO:
      return {
        undo: state.undo.slice(0, state.undo.length - 1),
        redo: state.redo.concat([editProp(payload.data, 'index', state.redo.length)])
      };
    default:
      return state;
  }
}


export const deleteRedo = index => ({
  type: DELETE_REDO,
  payload: index
});

export const deleteUndo = index => ({
  type: DELETE_UNDO,
  payload: index
});

export const addUndoPaint = (data, redo) => ({
  type: ADD_UNDO,
  payload: {
    data: {
      type: PAINT,
      data
    },
    redo
  }
});

export const addRedoPaint = data => ({
  type: ADD_REDO,
  payload: {
    data: {
      type: PAINT,
      data
    }
  }
});

export default {
  reducer,
  initialState
};
