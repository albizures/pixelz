const SET_USER = 'SET_USER';

exports.initialState = null;

exports.reducer = function (state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const actions = {};

actions.setUser = function (user = null) {
  return {
    type: SET_USER,
    user
  };
};

exports.actions = actions;