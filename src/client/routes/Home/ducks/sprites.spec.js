const { expect } = require('chai');
const {types, actions, reducer, initialState} = require('./sprites.js');

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

it('add sprite to home', () => {
  const action = {type: types.ADD_SPRITE_HOME, sprite: 0};

  expect(
    actions.addSpriteHome(0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([], action)
  ).to.deep.equal(
    [0]
  );
});

it('add sprites to home', () => {
  const action = {type: types.ADD_SPRITES_HOME, sprites: [0, 1, 2]};

  expect(
    actions.addSpritesHome([0, 1, 2])
  ).to.deep.equal(
    action
  );

  expect(
    reducer([], action)
  ).to.deep.equal(
    [0, 1, 2]
  );
});