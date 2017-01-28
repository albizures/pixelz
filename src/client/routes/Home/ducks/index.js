import { combineReducers } from 'redux';
import * as sprites from './sprites';

export const initialState = {
  sprites: sprites.initialState
};

export default combineReducers({
  sprites: sprites.default
});

export const actions = Object.assign({}, sprites.actions);