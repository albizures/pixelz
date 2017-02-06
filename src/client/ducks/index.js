import { combineReducers } from 'redux';

import editor from './editor';
import editorSprites from './editorSprites';
import homeSprites from './homeSprites';
import history from './history';
import frames from './frames';
import layers from './layers';
import palettes from './palettes';
import sprites from './sprites';
import user from './user';

export * from './editor';
export * from './editorSprites';
export * from './homeSprites';
export * from './history';
export * from './frames';
export * from './layers';
export * from './palettes';
export * from './sprites';
export * from './user';

export default {
  reducer: combineReducers({
    editor: editor.reducer,
    editorSprites: editorSprites.reducer,
    homeSprites: homeSprites.reducer,
    history: history.reducer,
    frames: frames.reducer,
    layers: layers.reducer,
    palettes: palettes.reducer,
    sprites: sprites.reducer,
    user: user.reducer
  }),
  initialState: {
    editor: editor.initialState,
    editorSprites: editorSprites.initialState,
    history: history.initialState,
    frames: frames.initialState,
    layers: layers.initialState,
    palettes: palettes.initialState,
    sprites: sprites.initialState,
    user: user.initialState
  }
};