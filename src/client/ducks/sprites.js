import http from '../utils/http';
import { cuid } from 'react-dynamic-layout/lib';
import { add, update, addChild } from 'react-dynamic-layout/lib/store/reducer';
import { shiftPositions } from '../utils/ducks';

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

const initialState = {};

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_SPRITE:
      return add(state, payload);
    case ADD_SPRITE_FRAME:
      return addChild(state, payload, 'frames');
    case ADD_SPRITES:
      return {
        ...state,
        ...payload
      };
    case CHANGE_FRAME_POSITION:
      return update(state, {
        id: payload.sprite,
        frames: shiftPositions(state[payload.sprite].frames, payload.fromIndex, payload.toIndex)
      });
    case NEW_SPRITE_VERSION:
      return update(state, {
        id: payload,
        version: state[payload].version + 1
      });
    case SET_SPRITE_ARTBOARD:
      console.trace(payload);
      return update(state, payload);
    case SET_CURRENT_PALETTE_SPRITE:
    case SET_TRANSPARENT_COLOR:
    case PUT_NAME:
    case SET_SPRITE_ID:
    case SELECT_SPRITE_FRAME:
    case SELECT_SPRITE_LAYER:
    case SET_SPRITE_PRIMARY_COLOR:
    case SET_SPRITE_SECONDARY_COLOR:
      return update(state, payload);
    default:
      return state;
  }
}

export const addSprite = ({
  id = cuid(),
  frames = [],
  version = 0,
  palette = [],
  name,
  _id,
  width,
  height,
  primaryColor = 'rgba(0, 0, 0, 1)',
  secondaryColor = 'rgba(0, 0, 0, 0)'
}) => ({
  type: ADD_SPRITE,
  payload: {
    id,
    frames,
    version,
    palette,
    name,
    _id,
    width,
    height,
    primaryColor,
    secondaryColor
  }
});

export const addFrameSprite = (sprite, frame) => ({
  type: ADD_SPRITE_FRAME,
  payload: {
    id: sprite,
    child: frame
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
    id: sprite,
    transparent
  }
});

export const setCurrentPalette = (sprite, palette) => ({
  type: SET_CURRENT_PALETTE_SPRITE,
  payload: {
    id: sprite,
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
        id: sprite.id,
        name
      }
    });
  }
};

export const addSprites = sprites => dispatch => {
  const idNewSprites = [];
  dispatch({
    type: ADD_SPRITES,
    // array => object
    payload: sprites.reduce((before, current) => {
      const id = cuid();
      before[id] = {
        ...current,
        id
      };
      idNewSprites.push(id);
      return before;
    }, {}),
  });
  return idNewSprites;
};

export const setSpriteId = (sprite, _id) => ({
  type: SET_SPRITE_ID,
  payload: {
    id: sprite,
    _id
  }
});

export const setSpriteArtboard = (sprite, artboard) => ({
  type: SET_SPRITE_ARTBOARD,
  payload: {
    id: sprite,
    artboard
  }
});

export const selectSpriteFrame = (sprite, frame) => ({
  type: SELECT_SPRITE_FRAME,
  payload: {
    id: sprite,
    frame
  }
});

export const selectSpriteLayer = (sprite, layer) => ({
  type: SELECT_SPRITE_LAYER,
  payload: {
    id: sprite,
    layer
  }
});

export const setSpritePrimaryColor = (sprite, color) => ({
  type: SET_SPRITE_PRIMARY_COLOR,
  payload: {
    id: sprite,
    color
  }
});

export const setSpriteSecondaryColor = (sprite, color) => ({
  type: SET_SPRITE_SECONDARY_COLOR,
  payload: {
    id: sprite,
    color
  }
});

export default {
  reducer,
  initialState,
  types: {
    ADD_SPRITE,
    ADD_SPRITE_FRAME,
    CHANGE_FRAME_POSITION,
    NEW_SPRITE_VERSION,
    SET_TRANSPARENT_COLOR,
    SET_CURRENT_PALETTE_SPRITE,
    PUT_NAME,
    ADD_SPRITES,
    SET_SPRITE_ID,
    SET_SPRITE_ARTBOARD,
    SELECT_SPRITE_LAYER,
    SELECT_SPRITE_FRAME,
    SET_SPRITE_PRIMARY_COLOR,
    SET_SPRITE_SECONDARY_COLOR
  }
};
