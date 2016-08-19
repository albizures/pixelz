
const { push, updateArrayItem, editProp } = require('utils/ducks.js');

const SET_STYLE = 'SET_STYLE';
const SET_PARAMS = 'SET_PARAMS';

const def = {
  colorPicker : {
    style : {
      visibility : 'hidden',
      top : 100,
      left : 300
    },
    params : {
      color : 'rgba(0, 0, 0, 1)'
    }
  },
  tools : {
    style : {
      top : 100,
      left : 200,
      width : 60
    }
  },
  history : {
    visible : false
  }
};
exports.reducer = function (state = def, action) {
  switch (action.type) {
    case SET_STYLE:
      return editProp(
        state,
        action.panel,
        editProp(state[action.panel], 'style', Object.assign({}, state[action.panel].style, action.style))
      );
    case SET_PARAMS:
      console.log(action.params);
      return editProp(
        state,
        action.panel,
        editProp(state[action.panel], 'params', Object.assign({}, state[action.panel].params, action.params))
      );
    default:
      return state;
  }
};

exports.init = def;

exports.actions = {};

exports.actions.setStyle = function (panel, style) {
  return {
    type : SET_STYLE,
    panel,
    style
  };
};

exports.actions.setParams = function (panel, params) {
  return {
    type : SET_PARAMS,
    panel,
    params
  };
};