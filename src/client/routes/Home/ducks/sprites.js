const ADD_SPRITE_HOME = 'ADD_SPRITE_HOME';
const ADD_SPRITES_HOME = 'ADD_SPRITES_HOME';

export const initialState = [];

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_SPRITE_HOME:
      return state.concat([action.sprite]);
    case ADD_SPRITES_HOME:
      return state.concat(action.sprites);
    default:
      return state;
  }
}

export const actions = {};

actions.addSpriteHome = function (sprite) {
  return {
    type: ADD_SPRITE_HOME,
    sprite,
  };
};

actions.addSpritesHome = function (sprites) {
  return {
    type: ADD_SPRITES_HOME,
    sprites,
  };
};


export const types = {
  ADD_SPRITE_HOME,
  ADD_SPRITES_HOME
};