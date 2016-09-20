const OPEN_SPRITE = 'OPEN_SPRITE';

exports.initialState = [];

exports.reducer = function(state = [], action) {
  switch (action.type) {
    case OPEN_SPRITE:
      return state.concat([action.sprite]);
    default:
      return state;
  }
};
const actions = {};

actions.openSprite = function(sprite) {
  return {
    type: OPEN_SPRITE,
    sprite,
  };
};

exports.actions = actions;

exports.types = {
  OPEN_SPRITE
};