import { expect } from 'chai';

import duck, {
  // addSprite,
  addFrameSprite,
  newSpriteVersion,
  changeFramePosition,
  setTransparentColor,
  setCurrentPalette,
  // putName,
  setSpriteId,
  setSpriteArtboard,
  selectSpriteFrame,
  selectSpriteLayer//,
  // setSpritePrimaryColor,
  // setSpriteSecundaryColor/*,
  // addSprites*/
} from '../sprites';

const { initialState, types, reducer } = duck;

it('initialState is an empty array', () => {
  expect(initialState).to.deep.equal({});
});

it('types name', () => {
  const keys = Object.keys(types);
  for (let i = 0; i < keys.length; i++) {
    let type = keys[i];
    expect(type === keys[i]).to.be.true;
  }
});

// it('add a sprite', () => {
//   const data = {name: 'test'};
//   const action = {type: types.ADD_SPRITE, payload: {sprite: data, index: 0}};

//   const result = addSprite(data)(
//     act => expect(act).to.deep.equal(action),
//     () => ({sprites: []}) 
//   );

//   expect(result).to.equal(result, 0);

//   expect(
//     reducer([], action)
//   ).to.deep.equal(
//     [{name: data.name, index: 0, frames: [], palette: [], version: 0}]
//   );
// });

it('add a frame to a sprite', () => {
  const action = {type: types.ADD_SPRITE_FRAME, payload: {id: 0, child: 0}};

  expect(
    addFrameSprite(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {frames: []}}, action)
  ).to.deep.equal(
    {0: {frames: [0]}}
  );
});

it('new sprite version', () => {
  const action = {type: types.NEW_SPRITE_VERSION, payload: 0};

  expect(
    newSpriteVersion(0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {version: 0}}, action)
  ).to.deep.equal(
    {0: {version: 1, id: 0}}
  );
});

it('change frame position', () => {
  const action = {type: types.CHANGE_FRAME_POSITION, payload: {sprite: 0, fromIndex: 0, toIndex: 1}};
  
  expect(
    changeFramePosition(0, 0, 1)
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {frames: [0, 1]}},action)
  ).to.deep.equal(
    {0: {frames: [1, 0], id: 0}}
  );
});

it('set transparent color', () => {
  const action = {type: types.SET_TRANSPARENT_COLOR, payload: {id: 0, transparent: '#000'}};
  
  expect(
    setTransparentColor(0, '#000')
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {transparent: '#000', id: 0}}
  );
});

it('set current palette', () => {
  const action = {type: types.SET_CURRENT_PALETTE_SPRITE, payload: {id: 0, palette: ['#000']}};

  expect(
    setCurrentPalette(0, ['#000'])
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {palette: ['#000'], id: 0}}
  );
});

// it('put name', () => {
//   const action = {type: types.PUT_NAME, payload: {id: 0, name: 'Test'}};

//   putName({index: 0}, 'Test')(
//     act => expect(act).to.deep.equal(action)
//   );

//   expect(
//     reducer([{}], action)
//   ).to.deep.equal(
//     [{name: 'Test'}]
//   );
// });

it('set id', () => {
  const action = {type: types.SET_SPRITE_ID, payload: {id: 0, _id: 'xxx'}};

  expect(
    setSpriteId(0, 'xxx')
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {_id: 'xxx', id: 0}}
  );
});

it('set artboard', () => {
  const action = {type: types.SET_SPRITE_ARTBOARD, payload: {id: 0, artboard: {x: 1, y: 1, scale: 1 }}};

  expect(
    setSpriteArtboard(0, {x: 1, y: 1, scale: 1 })
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {artboard: {x: 1, y: 1, scale: 1 }, id: 0}}
  );
});

it('select frame', () => {
  const action = {type: types.SELECT_SPRITE_FRAME, payload: {id: 0, frame: 0}};

  expect(
    selectSpriteFrame(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {frame: 0, id: 0}}
  );
});

it('select layer', () => {
  const action = {type: types.SELECT_SPRITE_LAYER, payload: {id: 0, layer: 0}};

  expect(
    selectSpriteLayer(0, 0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer({0: {}}, action)
  ).to.deep.equal(
    {0: {layer: 0, id: 0}}
  );
});

// it('set primary color', () => {
//   const action = {type: types.SET_SPRITE_PRIMARY_COLOR, payload: {id: 0, color: '#000'}};

//   expect(
//     setSpritePrimaryColor(0, '#000')
//   ).to.deep.equal(
//     action
//   );

//   expect(
//     reducer({0: {}}, action)
//   ).to.deep.equal(
//     {0: {primaryColor: '#000', id: 0}}
//   );
// });

// it('set secondary color', () => {
//   const action = {type: types.SET_SPRITE_SECONDARY_COLOR, payload: {id: 0, color: '#000'}};

//   expect(
//     setSpriteSecundaryColor(0, '#000')
//   ).to.deep.equal(
//     action
//   );

//   expect(
//     reducer({0: {}}, action)
//   ).to.deep.equal(
//     {0: {secondaryColor: '#000', id: 0}}
//   );
// });

// it('add sprites', () => {
//   const action = {type: types.ADD_SPRITES, sprites: [{index: 0}, {index: 1}]};

//   const result = addSprites([{}, {}])(
//     act => expect(act).to.deep.equal(action),
//     () => ({sprites: []})
//   );
  
//   expect(result).to.deep.equal([0, 1]);

//   expect(
//     reducer([], action)
//   ).to.deep.equal(
//     [{index: 0}, {index: 1}]
//   );
// });
