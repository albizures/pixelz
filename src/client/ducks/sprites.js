import http from '../utils/http';
import { editProp, updateArrayItem, shiftPositions } from '../utils/ducks';

const ADD_SPRITE = 'ADD_SPRITE';
const ADD_SPRITE_FRAME = 'ADD_SPRITE_FRAME';
const CHANGE_FRAME_POSITION = 'CHANGE_FRAME_POSITION';
const NEW_SPRITE_VERSION = 'NEW_SPRITE_VERSION';
const SET_TRANSPARENT_COLOR = 'SET_TRANSPARENT_COLOR';
const SET_CURRENT_PALETTE_SPRITE = 'SET_CURRENT_PALETTE_SPRITE';
const PUT_NAME = 'PUT_NAME';
const ADD_SPRITES = 'ADD_SPRITES';
const SET_SPRITE_ID = 'SET_SPRITE_ID';
const SET_SPRITE_ARTBOARD = 'SET_SPRITE_ARTBOARD';
const SELECT_SPRITE_LAYER = 'SELECT_SPRITE_LAYER';
const SELECT_SPRITE_FRAME = 'SELECT_SPRITE_FRAME';
const SET_SPRITE_PRIMARY_COLOR = 'SET_SPRITE_PRIMARY_COLOR';
const SET_SPRITE_SECONDARY_COLOR = 'SET_SPRITE_SECONDARY_COLOR';

const initialState = [];

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_SPRITE:
      return state.concat([
        Object.assign({
          frames: [],
          version: 0,
          palette: [],
          index: payload.index
        }, payload.sprite)
      ]);
    case ADD_SPRITE_FRAME:
      return state.map((item, index) => {
        if (index !== payload.sprite) {
          return item;
        }
        return Object.assign({},
          item, {
            frames: item.frames.concat([payload.frame])
          }
        );
      });
    case ADD_SPRITES:
      return state.concat(payload);
    case CHANGE_FRAME_POSITION:
      return updateArrayItem(
        state, payload.sprite,
        editProp(
          state[payload.sprite],
          'frames',
          shiftPositions(state[payload.sprite].frames, payload.fromIndex, payload.toIndex)
        )
      );
    case NEW_SPRITE_VERSION:
      return updateArrayItem(
        state,
        payload,
        editProp(state[payload], 'version', state[payload].version + 1)
      );
    case SET_CURRENT_PALETTE_SPRITE:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'palette', payload.palette)
      );
    case SET_TRANSPARENT_COLOR:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'transparent', payload.transparent)
      );
    case PUT_NAME:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'name', payload.name)
      );
    case SET_SPRITE_ID:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], '_id', payload.id)
      );
    case SET_SPRITE_ARTBOARD:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'artboard', payload.artboard)
      );
    case SELECT_SPRITE_FRAME:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'frame', payload.frame)
      );
    case SELECT_SPRITE_LAYER:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'layer', payload.layer)
      );
    case SET_SPRITE_PRIMARY_COLOR:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'primaryColor', payload.color)
      );
    case SET_SPRITE_SECONDARY_COLOR:
      return updateArrayItem(
        state,
        payload.sprite,
        editProp(state[payload.sprite], 'secondaryColor', payload.color)
      );
    default:
      return state;
  }
}

export const addSprite = (sprite) => (dispatch, getState) => {
  let index = getState().sprites.length;
  dispatch({
    type: ADD_SPRITE,
    payload: {
      sprite,
      index
    }
  });
  return index;
};

export const addFrameSprite = (sprite, frame) => ({
  type: ADD_SPRITE_FRAME,
  payload: {
    sprite,
    frame
  }
});

export const newSpriteVersion = (sprite) => ({
  type: NEW_SPRITE_VERSION,
  payload: sprite
});

export const changeFramePosition = (sprite, fromIndex, toIndex) => ({
  type: CHANGE_FRAME_POSITION,
  payload: {
    sprite,
    fromIndex,
    toIndex
  }
});

export const setTransparentColor = (sprite, transparent) => ({
  type: SET_TRANSPARENT_COLOR,
  payload: {
    sprite,
    transparent
  }
});

export const setCurrentPalette = (sprite, palette) => ({
  type: SET_CURRENT_PALETTE_SPRITE,
  payload: {
    sprite,
    palette
  }
});

export const putName = (sprite, name) => (dispatch) => {
  if (sprite._id) {
    return http.sprite.putName(sprite._id, name, onPut);
  }
  onPut({
    code: 0
  });
  return Promise.resolve({
    code: 0
  });

  function onPut(result) {
    if (result.code !== 0) {
      return; // alert
    }
    dispatch({
      type: PUT_NAME,
      payload: {
        sprite: sprite.index,
        name
      }
    });
  }
};

export const addSprites = (sprites) => {
  return (dispatch, getState) => {
    let newSprites = setIndex(getState().sprites.length, sprites);
    dispatch({
      type: ADD_SPRITES,
      payload: sprites,
    });
    return newSprites;
  };

  function setIndex(initIndex, sprites) {
    let newSprites = [];
    for (var j = 0; j < sprites.length; j++) {
      sprites[j].index = j + initIndex;
      newSprites.push(j + initIndex);
    }
    return newSprites;
  }
};

export const setSpriteId = (sprite, id) => ({
  type: SET_SPRITE_ID,
  payload: {
    sprite,
    id
  }
});

export const setSpriteArtboard = (sprite, artboard) => ({
  type: SET_SPRITE_ARTBOARD,
  payload: {
    sprite,
    artboard
  }
});

export const selectSpriteFrame = (sprite, frame) => ({
  type: SELECT_SPRITE_FRAME,
  payload: {
    sprite,
    frame
  }
});

export const selectSpriteLayer = (sprite, layer) => ({
  type: SELECT_SPRITE_LAYER,
  payload: {
    sprite,
    layer
  }
});

export const setSpritePrimaryColor = (sprite, color) => ({
  type: SET_SPRITE_PRIMARY_COLOR,
  payload: {
    sprite,
    color
  }
});

export const setSpriteSecundaryColor = (sprite, color) => ({
  type: SET_SPRITE_SECONDARY_COLOR,
  payload: {
    sprite,
    color
  }
});


// export const types = {
//   ADD_SPRITE,
//   ADD_SPRITE_FRAME,
//   CHANGE_FRAME_POSITION,
//   NEW_SPRITE_VERSION,
//   SET_TRANSPARENT_COLOR,
//   SET_CURRENT_PALETTE_SPRITE,
//   PUT_NAME,
//   ADD_SPRITES,
//   SET_SPRITE_ID,
//   SET_SPRITE_ARTBOARD,
//   SELECT_SPRITE_LAYER,
//   SELECT_SPRITE_FRAME,
//   SET_SPRITE_PRIMARY_COLOR,
//   SET_SPRITE_SECONDARY_COLOR
// };

export default {
  reducer,
  initialState
};
