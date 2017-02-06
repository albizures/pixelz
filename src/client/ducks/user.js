const SET_USER = 'SET_USER';

const initialState = null;

function reducer(state = null, {type, payload}) {
  switch (type) {
    case SET_USER:
      return payload;
    default:
      return state;
  }
}

export const setUser = (user = null) => ({
  type: SET_USER,
  payload: user
});

export default {
  reducer,
  initialState,
  types: {
    SET_USER
  }
};
