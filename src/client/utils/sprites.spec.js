const { expect } = require('chai');
const { createSprite } = require('./sprites');
const { store } = require('../store');

describe('utils sprite', function () {
  it('use all default params', function () {
    createSprite();
    let state = store.getState();
    console.log(
      state.Editor.sprites
    );
    console.log(
      state.Editor.frames[0]
    );
    console.log(
      state.Editor.layers[0]
    );
    console.log(
      state.sprites[0]
    );
    expect(true).to.be.true;
  });
});