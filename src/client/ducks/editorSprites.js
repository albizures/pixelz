const OPEN_SPRITE = 'OPEN_SPRITE';

const initialState = [];

function reducer(state = [], action) {
  switch (action.type) {
    case OPEN_SPRITE:
      return state.concat([action.payload]);
    default:
      return state;
  }
}

export const openSprite = sprite => ({
  type: OPEN_SPRITE,
  payload: sprite,
});

// export const types = {
//   OPEN_SPRITE
// };

export default {
  reducer,
  initialState,
  types: {
    OPEN_SPRITE
  }
};
