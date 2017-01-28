import { combineReducers } from 'redux';
import http from 'http';

import * as sprites from './sprites';
import * as frames from './frames';
import * as layers from './layers';
import * as panels from './panels';
import * as history from './history';

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

function getReducer(type, prop) {
  return function(state = null, action) {
    switch (action.type) {
      case type:
        return action[prop];
      default:
        return state;
    }
  };
}
export default combineReducers({
  artboard: getReducer(SET_CURRENT_ARTBOARD, 'artboard'),
  history: history.default,
  sprite: getReducer(SET_CURRENT_SPRITE, 'index'),
  frame: getReducer(SET_CURRENT_FRAME, 'index'),
  layer: getReducer(SET_CURRENT_LAYER, 'index'),
  palette: getReducer(SET_CURRENT_PALETTE, 'index'),
  tool: getReducer(SET_CURRENT_TOOL, 'tool'),
  sprites: sprites.default,
  frames: frames.default,
  layers: layers.default,
  panels: panels.default,
  _id: getReducer(SET_EDITOR_ID, '_id'),
  //palettes : palettes.reducer,
  tools: function tools(state = tools) {
    return state;
  },
});

export const actions = Object.assign({},
  history.actions,
  sprites.actions,
  panels.actions,
  frames.actions,
  layers.actions
);

actions.setCurrentPalette = function(index) {
  return {
    type: SET_CURRENT_PALETTE,
    index
  };
};

actions.setCurrentSprite = function(index) {
  return {
    type: SET_CURRENT_SPRITE,
    index
  };
};

actions.setCurrentTool = function(tool) {
  return {
    type: SET_CURRENT_TOOL,
    tool
  };
};

actions.setEditorId = function (_id) {
  return {
    type: SET_EDITOR_ID,
    _id
  };
};

actions.saveEditor = () => (dispatch, getState) => {
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
    }).then(id => dispatch(actions.setEditorId(id)));
  }
};

export const initialState = {
  history: history.init,
  tools: tools,
  tool: tools[0],
  sprites: sprites.initialState,
  frames: [],
  layers: [],
  panels: panels.init
};

export const editorActions = actions;
export const currentActions = actions;
