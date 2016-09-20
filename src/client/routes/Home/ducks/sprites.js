const http = require('../../../utils/http.js');
const { editProp, updateArrayItem, shiftPositions } = require('../../../utils/ducks.js');

const ADD_SPRITE_HOME = 'ADD_SPRITE_HOME';
const ADD_SPRITES_HOME = 'ADD_SPRITES_HOME';

exports.initialState = [];

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_SPRITE_HOME:
      return state.concat([action.sprite]);
    case ADD_SPRITES_HOME:
      return state.concat(action.sprites);
    default:
      return state;
  }
};
const actions = {};

actions.addSpriteHome  = function (sprite) {
  return {
    type : ADD_SPRITE_HOME,
    sprite,
  };
};

actions.addSpritesHome  = function (sprites) {
  return {
    type : ADD_SPRITES_HOME,
    sprites,
  };
};


exports.actions = actions;

exports.types = {
  ADD_SPRITE_HOME,
  ADD_SPRITES_HOME
};