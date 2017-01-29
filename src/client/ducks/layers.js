import { editProp, updateArrayItem } from 'utils/ducks';
import { getNewContext } from 'utils/canvas';

const ADD_LAYER = 'ADD_LAYER';
const NEW_LAYER_VERSION = 'NEW_LAYER_VERSION';

const initialState = [];
function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_LAYER:
      return state.concat([{
        width: payload.layer.width,
        height: payload.layer.height,
        sprite: payload.layer.sprite,
        frame: payload.layer.frame,
        context: getNewContext(payload.layer),
        index: payload.index,
        version: 0
      }]);
    case NEW_LAYER_VERSION:
      return updateArrayItem(
        state,
        payload,
        editProp(state[payload], 'version', state[payload].version + 1)
      );
    default:
      return state;
  }
}

export const addLayer = (layer) => (dispatch, getState) => {
  let index = getState().layers.length;
  dispatch({
    type: ADD_LAYER,
    payload: {
      layer,
      index
    }
  });
  return index;
};
export const newLayerVersion = layer => ({
  type: NEW_LAYER_VERSION,
  layer: layer
});


export default {
  reducer,
  initialState
};
