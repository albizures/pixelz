
const { push, updateArrayItem, editProp } = require('utils/ducks.js');

const ADD_FRAME = 'ADD_FRAME';
const ADD_lAYER_FRAME = 'ADD_lAYER_FRAME';


exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_FRAME:
      return push(state, {
        width : action.frame.width,
        height : action.frame.height,
        index : action.index,
        layers : action.frame.layers,
        sprite : action.frame.sprite,
        context : action.frame.context
      });
    case ADD_lAYER_FRAME:
      let frame = state[action.frame];
      return updateArrayItem(
        state, action.frame,
        editProp(frame, 'layers', push(frame.layers, action.layer))
      );
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addFrame = function (frame) {
  return (dispatch, getState) => {
    let index = getState().Editor.frames.length;
    dispatch({
      type : ADD_FRAME,
      frame : frame,
      index : index
    });
    return index;
  };
};
exports.actions.addLayerFrame = function (frame, layer) {
  return {
    type : ADD_lAYER_FRAME,
    frame,
    layer
  };
};