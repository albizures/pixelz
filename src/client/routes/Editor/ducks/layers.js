const ADD_LAYER = 'ADD_LAYER';
const NEW_LAYER_VERSION = 'NEW_LAYER_VERSION';
const { editProp, updateArrayItem } = require('utils/ducks.js');
const { getNewContext } = require('utils/canvas.js');

exports.reducer = function(state = [], action) {
  switch (action.type) {
    case ADD_LAYER:
      return state.concat([{
        width: action.layer.width,
        height: action.layer.height,
        sprite: action.layer.sprite,
        frame: action.layer.frame,
        context: getNewContext(action.layer),
        index: action.index,
        version: 0
      }]);
    case NEW_LAYER_VERSION:
      return updateArrayItem(
        state,
        action.layer,
        editProp(state[action.layer], 'version', state[action.layer].version + 1)
      );
    default:
      return state;
  }
};
exports.actions = {};

exports.actions.addLayer = function(layer) {
  return (dispatch, getState) => {
    let index = getState().Editor.layers.length;
    dispatch({
      type: ADD_LAYER,
      layer: layer,
      index: index
    });
    return index;
  };
};
exports.actions.newLayerVersion = function(layer) {
  return {
    type: NEW_LAYER_VERSION,
    layer: layer
  };
};