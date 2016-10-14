const http = require('../utils/http');
const { editProp, updateArrayItem, shiftPositions } = require('../utils/ducks.js');

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
exports.initialState = [];

exports.reducer = function(state = [], action) {
  switch (action.type) {
    case ADD_SPRITE:
      return state.concat([
        Object.assign({
          frames: [],
          version: 0,
          palette: [],
          index: action.index
        }, action.sprite)
      ]);
    case ADD_SPRITE_FRAME:
      return state.map((item, index) => {
        if (index !== action.sprite) {
          return item;
        }
        return Object.assign({},
          item, {
            frames: item.frames.concat([action.frame])
          }
        );
      });
    case ADD_SPRITES:
      return state.concat(action.sprites);
    case CHANGE_FRAME_POSITION:
      return updateArrayItem(
        state, action.sprite,
        editProp(
          state[action.sprite],
          'frames',
          shiftPositions(state[action.sprite].frames, action.fromIndex, action.toIndex)
        )
      );
    case NEW_SPRITE_VERSION:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'version', state[action.sprite].version + 1)
      );
    case SET_CURRENT_PALETTE_SPRITE:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'palette', action.palette)
      );
    case SET_TRANSPARENT_COLOR:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'transparent', action.transparent)
      );
    case PUT_NAME:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'name', action.name)
      );
    case SET_SPRITE_ID:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], '_id', action.id)
      );
    case SET_SPRITE_ARTBOARD:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'artboard', action.artboard)
      );
    case SELECT_SPRITE_FRAME:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'frame', action.frame)
      );
    case SELECT_SPRITE_LAYER:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'layer', action.layer)
      );
    default:
      return state;
  }
};
const actions = {};

actions.addSprite = function(sprite) {
  return (dispatch, getState) => {
    let index = getState().sprites.length;
    dispatch({
      type: ADD_SPRITE,
      sprite,
      index
    });
    return index;
  };
};

actions.addFrameSprite = function(sprite, frame) {
  return {
    type: ADD_SPRITE_FRAME,
    sprite,
    frame
  };
};

actions.newSpriteVersion = function(sprite) {
  return {
    type: NEW_SPRITE_VERSION,
    sprite
  };
};

actions.changeFramePosition = function(sprite, fromIndex, toIndex) {
  return {
    type: CHANGE_FRAME_POSITION,
    sprite,
    fromIndex,
    toIndex
  };
};

actions.setTransparentColor = function(sprite, transparent) {
  return {
    type: SET_TRANSPARENT_COLOR,
    sprite,
    transparent
  };
};

actions.setCurrentPalette = function(sprite, palette) {
  return {
    type: SET_CURRENT_PALETTE_SPRITE,
    sprite,
    palette
  };
};

actions.putName = function(sprite, name) {
  return (dispatch) => {
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
        sprite: sprite.index,
        name
      });
    }
  };
};

actions.addSprites = function(sprites) {
  return (dispatch, getState) => {
    let newSprites = setIndex(getState().sprites.length, sprites);
    dispatch({
      type: ADD_SPRITES,
      sprites,
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

actions.setSpriteId = function (sprite, id) {
  return {
    type: SET_SPRITE_ID,
    sprite,
    id
  };
};

actions.setSpriteArtboard = function (sprite, artboard) {
  return {
    type: SET_SPRITE_ARTBOARD,
    sprite,
    artboard
  };
};

actions.selectSpriteFrame = function (sprite, frame) {
  return {
    type: SELECT_SPRITE_FRAME,
    sprite,
    frame
  };
};

actions.selectSpriteLayer = function (sprite, layer) {
  return {
    type: SELECT_SPRITE_LAYER,
    sprite,
    layer
  };
};

exports.types = {
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
  SELECT_SPRITE_FRAME,
  SELECT_SPRITE_LAYER
};

exports.actions = actions;