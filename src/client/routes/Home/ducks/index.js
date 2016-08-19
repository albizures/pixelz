const { combineReducers } = require('redux');

const sprites = require('./sprites.js');



exports.reducer = combineReducers({
  sprites : sprites.reducer
});

exports.actions = {};//Object.assign({}, sprites.actions);