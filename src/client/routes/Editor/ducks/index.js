const { combineReducers } = require('redux');

const sprites = require('./sprites.js');
const frames = require('./frames.js');
const layers = require('./layers.js');
const palettes = require('./palettes');

const actions = {};
const SET_CURRENT_SPRITE = 'SET_CURRENT_SPRITE';
const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
const SET_CURRENT_LAYER = 'SET_CURRENT_LAYER';
 

function props(type) {
  return function (state = null, action) {
    switch (action.type) {
      case type:
        return action.index;
      default:
        return state;
    }
  };
}

exports.reducer = combineReducers({
  sprite : props(SET_CURRENT_SPRITE),
  frame : props(SET_CURRENT_FRAME),
  layer : props(SET_CURRENT_LAYER),
  sprites : sprites.reducer,
  frames : frames.reducer,
  layers : layers.reducer,
  palettes : palettes.reducer
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
exports.currentActions = actions;

exports.actions = Object.assign({},
  actions,
  sprites.actions,
  frames.actions,
  layers.actions,
  palettes.actions
);