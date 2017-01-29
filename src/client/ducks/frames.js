import { push, updateArrayItem, editProp, shiftPositions } from 'utils/ducks';
import { getNewContext } from 'utils/canvas';

const ADD_FRAME = 'ADD_FRAME';
const ADD_lAYER_FRAME = 'ADD_lAYER_FRAME';
const NEW_FRAME_VERSION = 'NEW_FRAME_VERSION';
const CHANGE_LAYER_POSITION = 'CHANGE_LAYER_POSITION';

function reducer(state = [], {type, payload}) {
  switch (type) {
    case ADD_FRAME:
      return push(state, {
        width: payload.frame.width,
        height: payload.frame.height,
        sprite: payload.frame.sprite,
        layers: payload.frame.layers || [],
        context: getNewContext(payload.frame),
        index: payload.index,
        version: 0
      });
    case ADD_lAYER_FRAME:
      return state.map((item, index) => {
        if (index !== payload.frame) {
          return item;
        }
        return Object.assign({},
          item, {
            layers: item.layers.concat([payload.layer])
          }
        );
      });
    case ADD_lAYER_FRAME:
      let frame = state[payload.frame];
      return updateArrayItem(
        state, payload.frame,
        editProp(frame, 'layers', push(frame.layers, payload.layer))
      );
    case NEW_FRAME_VERSION:
      return updateArrayItem(
        state,
        payload.frame,
        editProp(state[payload.frame], 'version', state[payload].version + 1)
      );
    case CHANGE_LAYER_POSITION:
      return updateArrayItem(
        state, payload.frame,
        editProp(
          state[payload.frame],
          'layers',
          shiftPositions(state[payload.frame].layers, payload.fromIndex, payload.toIndex)
        )
      );
    default:
      return state;
  }
}

export const addFrame = frame => (dispatch, getState) => {
  let index = getState().frames.length;
  dispatch({
    type: ADD_FRAME,
    payload: {
      frame: frame,
      index: index
    }
  });
  return index;
};
export const addLayerFrame = (frame, layer) => ({
  type: ADD_lAYER_FRAME,
  payload: {
    frame,
    layer
  }
});

export const newFrameVersion = frame => ({
  type: NEW_FRAME_VERSION,
  payload: frame
});

export const changeLayerPosition = (frame, fromIndex, toIndex) => ({
  type: CHANGE_LAYER_POSITION,
  payload: {
    frame,
    fromIndex,
    toIndex
  }
});

const initialState = [];

export default {
  reducer,
  initialState
};
