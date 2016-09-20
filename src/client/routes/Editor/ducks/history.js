const { editProp } = require('utils/ducks.js');

const ADD_UNDO = 'ADD_UNDO';
const ADD_REDO = 'ADD_REDO';

const PAINT = 'PAINT';
// const ERASE = 'ERASE';
// const RESIZE = 'RESIZE';
// const ADD_LAYER = 'ADD_LAYER';
// const DELETE_LAYER = 'DELETE_LAYER';
// const ADD_FRAME = 'ADD_FRAME';
// const DELETE_FRAME = 'DELETE_FRAME';
const DELETE_UNDO = 'DELETE_UNDO';
const DELETE_REDO = 'DELETE_REDO';
const def = {
  undo: [],
  redo: []
};

exports.reducer = function(state = def, {
  type,
  data,
  redo
}) {
  switch (type) {
    case ADD_UNDO:
      return {
        undo: state.undo.concat([editProp(data, 'index', state.undo.length)]),
        redo: redo ? state.redo.slice(0, state.redo.length - 1) : []
      };
    case ADD_REDO:
      return {
        undo: state.undo.slice(0, state.undo.length - 1),
        redo: state.redo.concat([editProp(data, 'index', state.redo.length)])
      };
    default:
      return state;
  }
};

exports.init = def;

exports.actions = {};


exports.actions.deleteRedo = function(index) {
  return {
    type: DELETE_REDO,
    index
  };
};

exports.actions.deleteUndo = function(index) {
  return {
    type: DELETE_UNDO,
    index
  };
};

exports.actions.addUndoPaint = function(data, redo) {
  return {
    type: ADD_UNDO,
    data: {
      type: PAINT,
      data
    },
    redo
  };
};

exports.actions.addRedoPaint = function(data) {
  return {
    type: ADD_REDO,
    data: {
      type: PAINT,
      data
    }
  };
};