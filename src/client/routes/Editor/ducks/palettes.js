
const ADD_PALETTE = 'ADD_PALETTE';

exports.reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_PALETTE:
      return state.concat([
        Object.assign({}, action.palette, {index : state.length})
      ]);
    default:
      return state;
  }
};
exports.actions = {};
exports.addPalette = function (palette) {
  return {
    type : ADD_PALETTE,
    palette : palette
  };
};