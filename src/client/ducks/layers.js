import { cuid } from 'react-dynamic-layout/lib';
import { add, update, remove } from 'react-dynamic-layout/lib/store/reducer';
// import { editProp, updateArrayItem } from 'utils/ducks';
import { getNewContext } from '../utils/canvas';

const ADD_LAYER = 'ADD_LAYER';
const REMOVE_LAYER = 'REMOVE_LAYER';
const NEW_LAYER_VERSION = 'NEW_LAYER_VERSION';

const initialState = {};
function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_LAYER:
      return add(state, payload);
    case REMOVE_LAYER:
      return remove(state, payload);
    case NEW_LAYER_VERSION:
      return update(state, {
        id: payload,
        version: state[payload].version + 1
      });
    default:
      return state;
  }
}

export const addLayer = ({
  width,
  height,
  sprite,
  frame,
  context = getNewContext(width, height),
  id = cuid(),
  version = 0
}) => ({
  type: ADD_LAYER,
  payload: {
    width,
    height,
    sprite,
    frame,
    context,
    id,
    version
  }
});

export const removeLayer = layer => ({
  type: REMOVE_LAYER,
  payload: layer
});

export const newLayerVersion = layer => ({
  type: NEW_LAYER_VERSION,
  payload: layer
});


export default {
  reducer,
  initialState,
  types: {
    ADD_LAYER,
    REMOVE_LAYER,
    NEW_LAYER_VERSION
  }
};
