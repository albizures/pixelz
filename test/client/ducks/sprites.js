const test = require('ava');
const {types, actions, reducer, initialState} = require('../../../src/client/ducks/sprites.js');

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

test('add a sprite', t => {
  const data = {name: 'test'};
  const action = {type: types.ADD_SPRITE, sprite: data, index: 0};

  const result = actions.addSprite(data)(
    act => t.deepEqual(act, action),
    () => ({sprites: []}) 
  );

  t.is(result, 0);

  t.deepEqual(
    reducer([], action),
    [{name: data.name, index: 0, frames: [], palette: [], version: 0}]
  );
});

test('add a frame to a sprite', t => {
  const action = {type: types.ADD_SPRITE_FRAME, frame: 0, sprite: 0};

  t.deepEqual(
    actions.addFrameSprite(0, 0),
    action
  );

  t.deepEqual(
    reducer([{frames: []}], action),
    [{frames: [0]}]
  );
});

test('new sprite version', t => {
  const action = {type: types.NEW_SPRITE_VERSION, sprite: 0};

  t.deepEqual(
    actions.newSpriteVersion(0),
    action
  );

  t.deepEqual(
    reducer([{version: 0}], action),
    [{version: 1}]
  );
});

test('change frame position', t => {
  const action = {type: types.CHANGE_FRAME_POSITION, sprite: 0, fromIndex: 0, toIndex: 1};
  
  t.deepEqual(
    actions.changeFramePosition(0, 0, 1),
    action
  );

  t.deepEqual(
    reducer([{frames: [0, 1]}],action),
    [{frames: [1, 0]}]
  );
});

test('set transparent color', t => {
  const action = {type: types.SET_TRANSPARENT_COLOR, sprite: 0, transparent: '#000'};
  
  t.deepEqual(
    actions.setTransparentColor(0, '#000'),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{transparent: '#000'}]
  );
});

test('set current palette', t => {
  const action = {type: types.SET_CURRENT_PALETTE_SPRITE, sprite: 0, palette: ['#000']};

  t.deepEqual(
    actions.setCurrentPalette(0, ['#000']),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{palette: ['#000']}]
  );
});

test('put name', t => {
  const action = {type: types.PUT_NAME, sprite: 0, name: 'Test'};

  actions.putName({index: 0}, 'Test')(
    act => t.deepEqual(act, action)
  );

  t.deepEqual(
    reducer([{}], action),
    [{name: 'Test'}]
  );
});

test('set id', t => {
  const action = {type: types.SET_SPRITE_ID, sprite: 0, id: 'xxx'};

  t.deepEqual(
    actions.setSpriteId(0, 'xxx'),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{_id: 'xxx'}]
  );
});

test('set artboard', t => {
  const action = {type: types.SET_SPRITE_ARTBOARD, sprite: 0, artboard: {x: 1, y: 1, scale: 1 }};

  t.deepEqual(
    actions.setSpriteArtboard(0, {x: 1, y: 1, scale: 1 }),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{artboard: {x: 1, y: 1, scale: 1 }}]
  );
});

test('select frame', t => {
  const action = {type: types.SELECT_SPRITE_FRAME, sprite: 0, frame: 0};

  t.deepEqual(
    actions.selectSpriteFrame(0, 0),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{frame: 0}]
  );
});

test('select layer', t => {
  const action = {type: types.SELECT_SPRITE_LAYER, sprite: 0, layer: 0};

  t.deepEqual(
    actions.selectSpriteLayer(0, 0),
    action
  );

  t.deepEqual(
    reducer([{}], action),
    [{layer: 0}]
  );
});

test('add sprites', t => {
  const action = {type: types.ADD_SPRITES, sprites: [{index: 0}, {index: 1}]};

  const result = actions.addSprites([{}, {}])(
    act => t.deepEqual(act, action),
    () => ({sprites: []})
  );
  
  t.deepEqual(result, [0, 1]);

  t.deepEqual(
    reducer([], action),
    [{index: 0}, {index: 1}]
  );
});
