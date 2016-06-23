const { createStore, combineReducers } = require('redux');

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
  sprites : sprites
});


const initialState = {
  sprites: []
};

const store = exports.store = createStore(reducers, initialState);




