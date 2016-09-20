const { push, updateArrayItem, editProp, shiftPositions } = require('utils/ducks.js');
const { getNewContext } = require('utils/canvas.js');

const ADD_FRAME = 'ADD_FRAME';
const ADD_lAYER_FRAME = 'ADD_lAYER_FRAME';
const NEW_FRAME_VERSION = 'NEW_FRAME_VERSION';
const CHANGE_LAYER_POSITION = 'CHANGE_LAYER_POSITION';


exports.reducer = function(state = [], action) {
  switch (action.type) {
    case ADD_FRAME:
      return push(state, {
        width: action.frame.width,
        height: action.frame.height,
        sprite: action.frame.sprite,
        layers: action.frame.layers || [],
        context: getNewContext(action.frame),
        index: action.index,
        version: 0
      });
    case ADD_lAYER_FRAME:
      return state.map((item, index) => {
        if (index !== action.frame) {
          return item;
        }
        return Object.assign({},
          item, {
            layers: item.layers.concat([action.layer])
          }
        );
      });
    case ADD_lAYER_FRAME:
      let frame = state[action.frame];
      return updateArrayItem(
        state, action.frame,
        editProp(frame, 'layers', push(frame.layers, action.layer))
      );
    case NEW_FRAME_VERSION:
      return updateArrayItem(
        state,
        action.frame,
        editProp(state[action.frame], 'version', state[action.frame].version + 1)
      );
    case CHANGE_LAYER_POSITION:
      return updateArrayItem(
        state, action.frame,
        editProp(
          state[action.frame],
          'layers',
          shiftPositions(state[action.frame].layers, action.fromIndex, action.toIndex)
        )
      );
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addFrame = function(frame) {
  return (dispatch, getState) => {
    let index = getState().Editor.frames.length;
    dispatch({
      type: ADD_FRAME,
      frame: frame,
      index: index
    });
    return index;
  };
};
exports.actions.addLayerFrame = function(frame, layer) {
  return {
    type: ADD_lAYER_FRAME,
    frame,
    layer
  };
};

exports.actions.newFrameVersion = function(frame) {
  return {
    type: NEW_FRAME_VERSION,
    frame
  };
};

exports.actions.changeLayerPosition = function(frame, fromIndex, toIndex) {
  return {
    type: CHANGE_LAYER_POSITION,
    frame,
    fromIndex,
    toIndex
  };
};