const { combineReducers } = require('redux');

const sprites = require('./sprites.js');
const frames = require('./frames.js');
const layers = require('./layers.js');
const panels = require('./panels.js');
const history = require('./history.js');

const actions = {};
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
exports.reducer = combineReducers({
  artboard: getReducer(SET_CURRENT_ARTBOARD, 'artboard'),
  history: history.reducer,
  sprite: getReducer(SET_CURRENT_SPRITE, 'index'),
  frame: getReducer(SET_CURRENT_FRAME, 'index'),
  layer: getReducer(SET_CURRENT_LAYER, 'index'),
  palette: getReducer(SET_CURRENT_PALETTE, 'index'),
  tool: getReducer(SET_CURRENT_TOOL, 'tool'),
  sprites: sprites.reducer,
  frames: frames.reducer,
  layers: layers.reducer,
  panels: panels.reducer,
  _id: getReducer(SET_EDITOR_ID, '_id'),
  //palettes : palettes.reducer,
  tools: function tools(state = tools) {
    return state;
  },
});


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

exports.initialState = {
  history: history.init,
  tools: tools,
  tool: tools[0],
  sprites: sprites.initialState,
  frames: [],
  layers: [],
  panels: panels.init
};

exports.currentActions = actions;

exports.actions = Object.assign({},
  actions,
  history.actions,
  sprites.actions,
  panels.actions,
  frames.actions,
  layers.actions
);