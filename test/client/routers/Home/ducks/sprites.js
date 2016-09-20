const test = require('ava');
const {types, actions, reducer, initialState} = require('../../../../../src/client/routes/Home/ducks/sprites.js');

test('initialState is an empty array', t => {
  t.deepEqual(initialState, []);
});

test('types name', t => {
  const keys = Object.keys(types);
  t.plan(keys.length);
  for (let i = 0; i < keys.length; i++) {
    let type = keys[i];
    t.true(type === keys[i]);
  }
});

test('add sprite to home', t => {
  const action = {type: types.ADD_SPRITE_HOME, sprite: 0};

  t.deepEqual(
    actions.addSpriteHome(0),
    action
  );

  t.deepEqual(
    reducer([], action),
    [0]
  );
});

test('add sprites to home', t => {
  const action = {type: types.ADD_SPRITES_HOME, sprites: [0, 1, 2]};

  t.deepEqual(
    actions.addSpritesHome([0, 1, 2]),
    action
  );

  t.deepEqual(
    reducer([], action),
    [0, 1, 2]
  );
});