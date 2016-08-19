
const ADD_SPRITE = 'ADD_SPRITE';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_SPRITE:
      return state.concat([
        Object.assign({}, action.sprite, {index : state.length})
      ]);
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addSprite = function (sprite) {
  return {
    type : ADD_SPRITE,
    sprite : sprite
  };
};