const http = require('http');
const { editProp, updateArrayItem, shiftPositions } = require('utils/ducks.js');

const ADD_SPRITE = 'ADD_SPRITE';
const ADD_SPRITE_FRAME = 'ADD_SPRITE_FRAME';
const CHANGE_FRAME_POSITION = 'CHANGE_FRAME_POSITION';
const NEW_SPRITE_VERSION = 'NEW_SPRITE_VERSION';
const SET_TRANSPARENT_COLOR = 'SET_TRANSPARENT_COLOR';
const SET_CURRENT_PALETTE = 'SET_CURRENT_PALETTE';
const PUT_NAME = 'PUT_NAME';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_SPRITE:
      return state.concat([{
        _id : action.sprite._id,
        name : action.sprite.name,
        width : action.sprite.width,
        height : action.sprite.height,
        colors : action.sprite.colors || [],
        frames : action.sprite.frames || [],
        index : action.index,
        version : 0
      }]);
    case ADD_SPRITE_FRAME:
      return state.map((item, index) =>{
        if (index !== action.sprite) {
          return item;
        }
        return Object.assign({},
          item,
          { frames : item.frames.concat([action.frame])}
        );
      });
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
    case SET_TRANSPARENT_COLOR:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'transparent', action.transparent)
      );
    case SET_CURRENT_PALETTE:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'palette', action.palette)
      );
    case PUT_NAME:
      return updateArrayItem(
        state,
        action.sprite,
        editProp(state[action.sprite], 'name', action.name)
      );
    default:
      return state;
  }
};
const actions = {};

actions.addSprite = function (sprite) {
  return (dispatch, getState) => {
    let index = getState().Editor.sprites.length;
    dispatch({
      type : ADD_SPRITE,
      sprite,
      index
    });
    return index;
  };
};

actions.addFrameSprite  = function (sprite, frame) {
  return {
    type : ADD_SPRITE_FRAME,
    sprite,
    frame
  };
};

actions.newSpriteVersion = function (sprite) {
  return {
    type : NEW_SPRITE_VERSION,
    sprite
  };
};

actions.changeFramePosition = function (sprite, fromIndex, toIndex) {
  return {
    type : CHANGE_FRAME_POSITION,
    sprite,
    fromIndex,
    toIndex
  };
};

actions.setTransparentColor = function (sprite, transparent) {
  return {
    type : SET_TRANSPARENT_COLOR,
    sprite,
    transparent
  };
};

actions.setCurrentPalette = function (sprite, palette) {
  return {
    type : SET_CURRENT_PALETTE,
    sprite,
    palette
  };
};

actions.putName = function (sprite, name) {
  
  return (dispatch, getState) => {
    if (sprite._id) {
      return http.sprite.putName(sprite._id, name, onPut);
    }
    return onPut({ code: 0 });

    function onPut(result) {
      if (result.code !== 0) {
        return;// alert
      }
      dispatch({
        type: PUT_NAME,
        sprite: sprite.index,
        name
      });
    }
  };
};

exports.actions = actions;
