import { combineReducers } from 'redux';
import http from '../utils/http';


const SET_CURRENT_SPRITE = 'SET_CURRENT_SPRITE';
const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
const SET_CURRENT_LAYER = 'SET_CURRENT_LAYER';
const SET_CURRENT_TOOL = 'SET_CURRENT_TOOL';
const SET_CURRENT_ARTBOARD = 'SET_CURRENT_ARTBOARD';
const SET_CURRENT_PALETTE = 'SET_CURRENT_PALETTE';
const SET_EDITOR_ID = 'SET_EDITOR_ID';

const tools = [
  'pencil',
  'eraser',
  'pick',
  'bucket',
  'line',
  'rect'
];

function getReducer(type) {
  return function(state = null, action) {
    switch (action.type) {
      case type:
        return action.payload;
      default:
        return state;
    }
  };
}
const reducer = combineReducers({
  artboard: getReducer(SET_CURRENT_ARTBOARD),
  sprite: getReducer(SET_CURRENT_SPRITE),
  frame: getReducer(SET_CURRENT_FRAME),
  layer: getReducer(SET_CURRENT_LAYER),
  palette: getReducer(SET_CURRENT_PALETTE),
  tool: getReducer(SET_CURRENT_TOOL),
  _id: getReducer(SET_EDITOR_ID),
  tools: function tools(state = tools) {
    return state;
  },
});

export const setCurrentSprite = index => ({
  type: SET_CURRENT_SPRITE,
  payload: index
});

export const setCurrentTool = tool => ({
  type: SET_CURRENT_TOOL,
  payload: tool
});

export const setEditorId = _id => ({
  type: SET_EDITOR_ID,
  payload: _id
});

export const saveEditor = () => (dispatch, getState) => {
  let state = getState();
  let sprites = state.Editor.sprites
    .filter(index => !!state.sprites[index]._id)
    .map(index => state.sprites[index]._id);
  if (state.Editor._id) {
    return http.put('/api/editor/' + state.Editor._id, {
      sprites
    });
  } else {
    return http.post('/api/editor/', {
      sprites
    }).then(id => dispatch(setEditorId(id)));
  }
};

const initialState = {
  tools: tools,
  tool: tools[0],
};

export default {
  reducer,
  initialState
};
