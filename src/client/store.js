import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ducks from './ducks';


let middlewares = [
  applyMiddleware(thunk)
];

if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  middlewares.push(window.devToolsExtension());
}

export const store = createStore(
  ducks.reducer,
  ducks.initialState,
  compose.apply(undefined, middlewares)
);