const { createStore, combineReducers, compose, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

function sprites(state = [], action) {
  switch (action.type) {
    case 'ADD_SPRITE':
      return state.concat([action.sprite]);
    case 'ADD_SPRITES':
      return state.concat(action.sprites);
    default:
      return state;
  }
}


const reducers = combineReducers({
  Editor : require('./routes/Editor/ducks').reducer,
  Home : require('./routes/Home/ducks').reducer
});


const initialState = {};

const store = exports.store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
  )
);




