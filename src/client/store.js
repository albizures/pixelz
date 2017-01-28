import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as Editor from './routes/Editor/ducks';
import * as Home from './routes/Home/ducks';


import * as editorSprites from './ducks/editorSprites';
import * as palettes from './ducks/palettes';
import * as user from './ducks/user';
import * as sprites from './ducks/sprites';


const reducers = combineReducers({
  Editor: Editor.default,
  editorSprites: editorSprites.default,
  sprites: sprites.default,
  palettes: palettes.default,
  Home: Home.default,
  user: user.default
});


const initialState = {
  Editor: Editor.initialState,
  Home: Home.initialState,
  palettes: palettes.initialState,
  user: user.initialState,
  sprites: sprites.initialState,
  editorSprites: editorSprites.initialState
};


let middlewares = [
  applyMiddleware(thunk)
];

if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  middlewares.push(window.devToolsExtension());
}

export const store = createStore(
  reducers,
  initialState,
  compose.apply(undefined, middlewares)
);