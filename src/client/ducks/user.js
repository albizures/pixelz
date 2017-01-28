const SET_USER = 'SET_USER';

export const initialState = null;

export default function (state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

export const actions = {};

actions.setUser = (user = null) => ({
  type: SET_USER,
  user
});