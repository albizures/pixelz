const { createStore, combineReducers, compose, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

const Editor = require('./routes/Editor/ducks');
const Home = require('./routes/Home/ducks');
const palettes = require('./ducks/palettes.js');
const user = require('./ducks/user.js');
const sprites = require('./ducks/sprites.js');


const reducers = combineReducers({
  Editor: Editor.reducer,
  sprites: sprites.reducer,
  palettes: palettes.reducer,
  Home: Home.reducer,
  user: user.reducer
});


const initialState = {
  Editor: Editor.initialState,
  Home: Home.initialState,
  palettes: palettes.initialState,
  user: user.initialState,
  sprites: sprites.initialState
};


exports.store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
  )
);




