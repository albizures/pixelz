import { expect } from 'chai';
import  duck, { openSprite } from '../editorSprites';

const { types, reducer, initialState } = duck;


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

it('open sprite', () => {
  const action = {type: types.OPEN_SPRITE, payload: 0};

  expect(
    openSprite(0)
  ).to.deep.equal(
    action
  );

  expect(
    reducer([], action)
  ).to.deep.equal(
    [0]
  );
});

// test.todo('close sprite');
// test.todo('change position');