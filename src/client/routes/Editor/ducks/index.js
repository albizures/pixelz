const { combineReducers } = require('redux');

const sprites = require('./sprites.js');
const frames = require('./frames.js');
const layers = require('./layers.js');
const palettes = require('./palettes');

const actions = {};
const SET_CURRENT_SPRITE = 'SET_CURRENT_SPRITE';
const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
const SET_CURRENT_LAYER = 'SET_CURRENT_LAYER';
const SET_CURRENT_TOOL = 'SET_CURRENT_TOOL';
const SET_CURRENT_ARTBOARD = 'SET_CURRENT_ARTBOARD';

const tools = [
  'pencil',
  'erase',
  'pick',
  'bucket',
  'line',
  'rect'
];

function getReducer(type, prop) {
  return function (state = null, action) {
    switch (action.type) {
      case type:
        return action[prop];
      default:
        return state;
    }
  };
}
exports.reducer = combineReducers({
  sprite : getReducer(SET_CURRENT_SPRITE, 'index'),
  frame : getReducer(SET_CURRENT_FRAME, 'index'),
  layer : getReducer(SET_CURRENT_LAYER, 'index'),
  tool : getReducer(SET_CURRENT_TOOL, 'tool'),
  sprites : sprites.reducer,
  frames : frames.reducer,
  layers : layers.reducer,
  palettes : palettes.reducer,
  tools : function tools(state = tools) {return state;},
  artboard : getReducer(SET_CURRENT_ARTBOARD, 'artboard'),
});


actions.setCurrentSprite = function (index) {
  return {
    type : SET_CURRENT_SPRITE,
    index
  };
};

actions.setCurrentFrame = function (index) {
  return {
    type : SET_CURRENT_FRAME,
    index
  };
};

actions.setCurrentLayer = function (index) {
  return {
    type : SET_CURRENT_LAYER,
    index
  };
};

actions.setCurrentTool = function (tool) {
  return {
    type : SET_CURRENT_TOOL,
    tool
  };
};

actions.setCurrentArtboard = function (artboard) {
  return {
    type : SET_CURRENT_ARTBOARD,
    artboard
  };
};


exports.initialState = {
  tools : tools,
  sprites : [],
  frames : [],
  layers : []
};

exports.currentActions = actions;

exports.actions = Object.assign({},
  actions,
  sprites.actions,
  frames.actions,
  layers.actions,
  palettes.actions
);