import { editProp } from 'utils/ducks';

const SET_STYLE = 'SET_STYLE';
const SET_PARAMS = 'SET_PARAMS';

const def = {
  colorPicker: {
    style: {
      visibility: 'hidden',
      top: 100,
      left: 300
    },
    params: {
      color: 'rgba(0, 0, 0, 1)'
    }
  },
  tools: {
    style: {
      top: 100,
      left: 200,
      width: 60
    }
  },
  history: {
    visible: false
  }
};
export default function reducer(state = def, action) {
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
}

export const init = def;

export const actions = {};

actions.setStyle = function(panel, style) {
  return {
    type: SET_STYLE,
    panel,
    style
  };
};

actions.setParams = function(panel, params) {
  return {
    type: SET_PARAMS,
    panel,
    params
  };
};