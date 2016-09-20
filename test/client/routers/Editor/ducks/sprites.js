const test = require('ava');
const {types, actions, reducer, initialState} = require('../../../../../src/client/routes/Editor/ducks/sprites.js');

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

test('open sprite', t => {
  const action = {type: types.OPEN_SPRITE, sprite: 0};

  t.deepEqual(
    actions.openSprite(0),
    action
  );

  t.deepEqual(
    reducer([], action),
    [0]
  );
});

test.todo('close sprite');
test.todo('change position');