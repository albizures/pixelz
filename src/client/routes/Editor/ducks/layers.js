
const ADD_LAYER = 'ADD_LAYER';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_LAYER:
      return state.concat([{
        width : action.layer.width,
        height : action.layer.height,
        context : action.layer.context,
        sprite : action.layer.sprite,
        frame : action.layer.frame,
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