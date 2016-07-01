
const ADD_LAYER = 'ADD_LAYER';
const { getNewContext } = require('utils/canvas.js');

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_LAYER:
      return state.concat([{
        width : action.layer.width,
        height : action.layer.height,
        sprite : action.layer.sprite,
        frame : action.layer.frame,
        context : getNewContext(action.layer),
        index : action.index
      }]);
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addLayer = function (layer) {
  return (dispatch, getState) => {
    let index = getState().Editor.layers.length;
    dispatch({
      type : ADD_LAYER,
      layer : layer,
      index : index
    });
    return index;
  };
};