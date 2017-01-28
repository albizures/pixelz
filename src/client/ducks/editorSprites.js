const OPEN_SPRITE = 'OPEN_SPRITE';

export const initialState = [];

export default function reducer(state = [], action) {
  switch (action.type) {
    case OPEN_SPRITE:
      return state.concat([action.sprite]);
    default:
      return state;
  }
}
export const actions = {};

actions.openSprite = sprite => ({
  type: OPEN_SPRITE,
  sprite,
});

export const types = {
  OPEN_SPRITE
};