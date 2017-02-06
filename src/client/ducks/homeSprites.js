const ADD_SPRITE_HOME = 'ADD_SPRITE_HOME';
const ADD_SPRITES_HOME = 'ADD_SPRITES_HOME';

const initialState = [];

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_SPRITE_HOME:
      return state.concat([payload]);
    case ADD_SPRITES_HOME:
      return state.concat(payload);
    default:
      return state;
  }
}

export const addSpriteHome = sprite => ({
  type: ADD_SPRITE_HOME,
  payload: sprite,
});

export const addSpritesHome = sprites => ({
  type: ADD_SPRITES_HOME,
  payload: sprites,
});

export default {
  reducer,
  initialState,
  types: {
    ADD_SPRITE_HOME,
    ADD_SPRITES_HOME
  }
};

// export const types = {
//   ADD_SPRITE_HOME,
//   ADD_SPRITES_HOME
// };