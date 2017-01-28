import { expect } from 'chai';

import reducer, {types, actions, initialState} from '../sprites';

it('initialState is an empty array', () => {
  expect(initialState).to.deep.equal([]);
});

it('types name', () => {
  const keys = Object.keys(types);
  for (let i = 0; i < keys.length; i++) {
    let type = keys[i];
    expect(type === keys[i]).to.be.true;
  }
});

it('add a sprite', () => {
  const data = {name: 'test'};
  const action = {type: types.ADD_SPRITE, sprite: data, index: 0};

  const result = actions.addSprite(data)(
    act => expect(act).to.deep.equal(action),
    () => ({sprites: []}) 
  );

  expect(result).to.equal(result, 0);

  expect(
    reducer([], action)
  ).to.deep.equal(
    [{name: data.name, index: 0, frames: [], palette: [], version: 0}]
  );
});

it('add a frame to a sprite', () => {
  const action = {type: types.ADD_SPRITE_FRAME, frame: 0, sprite: 0};

  expect(
    actions.addFrameSprite(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{frames: []}], action)
  ).to.deep.equal(
    [{frames: [0]}]
  );
});

it('new sprite version', () => {
  const action = {type: types.NEW_SPRITE_VERSION, sprite: 0};

  expect(
    actions.newSpriteVersion(0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{version: 0}], action)
  ).to.deep.equal(
    [{version: 1}]
  );
});

it('change frame position', () => {
  const action = {type: types.CHANGE_FRAME_POSITION, sprite: 0, fromIndex: 0, toIndex: 1};
  
  expect(
    actions.changeFramePosition(0, 0, 1)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{frames: [0, 1]}],action)
  ).to.deep.equal(
    [{frames: [1, 0]}]
  );
});

it('set transparent color', () => {
  const action = {type: types.SET_TRANSPARENT_COLOR, sprite: 0, transparent: '#000'};
  
  expect(
    actions.setTransparentColor(0, '#000')
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{transparent: '#000'}]
  );
});

it('set current palette', () => {
  const action = {type: types.SET_CURRENT_PALETTE_SPRITE, sprite: 0, palette: ['#000']};

  expect(
    actions.setCurrentPalette(0, ['#000'])
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{palette: ['#000']}]
  );
});

it('put name', () => {
  const action = {type: types.PUT_NAME, sprite: 0, name: 'Test'};

  actions.putName({index: 0}, 'Test')(
    act => expect(act).to.deep.equal(action)
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{name: 'Test'}]
  );
});

it('set id', () => {
  const action = {type: types.SET_SPRITE_ID, sprite: 0, id: 'xxx'};

  expect(
    actions.setSpriteId(0, 'xxx')
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{_id: 'xxx'}]
  );
});

it('set artboard', () => {
  const action = {type: types.SET_SPRITE_ARTBOARD, sprite: 0, artboard: {x: 1, y: 1, scale: 1 }};

  expect(
    actions.setSpriteArtboard(0, {x: 1, y: 1, scale: 1 })
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{artboard: {x: 1, y: 1, scale: 1 }}]
  );
});

it('select frame', () => {
  const action = {type: types.SELECT_SPRITE_FRAME, sprite: 0, frame: 0};

  expect(
    actions.selectSpriteFrame(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{frame: 0}]
  );
});

it('select layer', () => {
  const action = {type: types.SELECT_SPRITE_LAYER, sprite: 0, layer: 0};

  expect(
    actions.selectSpriteLayer(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{layer: 0}]
  );
});

it('set primary color', () => {
  const action = {type: types.SET_SPRITE_PRIMARY_COLOR, sprite: 0, color: '#000'};

  expect(
    actions.setSpritePrimaryColor(0, '#000')
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{primaryColor: '#000'}]
  );
});

it('set secondary color', () => {
  const action = {type: types.SET_SPRITE_SECONDARY_COLOR, sprite: 0, color: '#000'};

  expect(
    actions.setSpriteSecundaryColor(0, '#000')
  ).to.deep.equal(
    action
  );

  expect(
    reducer([{}], action)
  ).to.deep.equal(
    [{secondaryColor: '#000'}]
  );
});


it('add sprites', () => {
  const action = {type: types.ADD_SPRITES, sprites: [{index: 0}, {index: 1}]};

  const result = actions.addSprites([{}, {}])(
    act => expect(act).to.deep.equal(action),
    () => ({sprites: []})
  );
  
  expect(result).to.deep.equal([0, 1]);

  expect(
    reducer([], action)
  ).to.deep.equal(
    [{index: 0}, {index: 1}]
  );
});
