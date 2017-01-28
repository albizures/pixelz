const React = require('react');
const http = require('http');
const { wrapActionCreators } = require('utils/ducks.js');
const { bindObject } = require('../../utils/object.js');
const { createSprite } = require('../../utils/sprites.js');
const { store: { dispatch } } = require('../../store.js');
const { addSprite, selectSpriteFrame, addFrameSprite, selectSpriteLayer } = require('../../ducks/sprites.js').actions;
const { openSprite } = require('./ducks/sprites.js').actions;
const { setEditorId, setCurrentSprite } = require('./ducks/index.js').currentActions;
const { addFrame, addLayerFrame } = require('./ducks/frames.js').actions;
const { addLayer } = require('./ducks/layers.js').actions;

const actions = wrapActionCreators(dispatch, {
  setEditorId,
  addSprite,
  openSprite,
  selectSpriteFrame,
  setCurrentSprite,
  addFrame,
  addFrameSprite,
  addLayer,
  addLayerFrame,
  selectSpriteLayer
});

const loader = {};

loader.ensure = function () {
  require.ensure([], (require) => this.cb(require('./Editor.js')));
};

loader.onClose = function () {
  this.ensure();
};

loader.onGetEditor = function (result) {
  actions.setEditorId(result._id);
  let promises = [];
  for (var index = 0; index < result.sprites.length; index++) {
    var sprite = result.sprites[index];
    promises.push(
      http.get('/api/sprites/' + sprite)
        .then(this.onGetSprite)
        //.catch()
        // TODO: create toast alerts
    );
  }
  Promise.all(promises)
    .then(this.ensure)
    .catch(console.error);
};

loader.onGetSprite = function (sprite) {
  let image = new Image(), width, height;
  let context = document.createElement('canvas').getContext('2d');
  context.canvas.width = width = sprite.width * sprite.layers;
  context.canvas.height = height = sprite.height;
  sprite.index = actions.addSprite({
    _id: sprite._id,
    name: sprite.name,
    width: sprite.width,
    height: sprite.height,
    colors: sprite.colors,
    primaryColor: sprite.primaryColor || sprite.colors[0] || 'rgba(0, 0, 0, 1)',
    secondaryColor: sprite.secondaryColor || 'rgba(0, 0, 0, 0)'
  });
  actions.openSprite(sprite.index);
  actions.setCurrentSprite(sprite.index);
  return new Promise(reject => {
    image.onload = () => {
      context.drawImage(image,
        0, 0, width, height,
        0, 0, width, height
      );
      actions.selectSpriteFrame(
        sprite.index,
        this.createFrameFromContext(sprite, context)
      );
      actions.selectSpriteLayer(sprite.index,0);
      for (let j = 1; j < sprite.frames; j++) {
        context.canvas.height = height;// clean
        context.drawImage(image,
          0, j * height, width, height,
          0, 0, width, height
        );
        this.createFrameFromContext(sprite, context);
      }
      reject();
    };
    image.src = `/api/sprites/${sprite._id}/file`;
  });
};

loader.createFrameFromContext = function(sprite, image) {
  let context = document.createElement('canvas').getContext('2d');
  let contextTemp = document.createElement('canvas').getContext('2d');
  let index;
  contextTemp.canvas.width = context.canvas.width = sprite.width;
  contextTemp.canvas.height = context.canvas.height = sprite.height;
  
  for (var j = sprite.layers - 1; j >= 0; j--) {
    context.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
  }
  index = actions.addFrame({
    sprite: sprite.index,
    width: sprite.width,
    height: sprite.height,
    context: context,
    layers: []
  });
  actions.addFrameSprite(
    sprite.index,
    index
  );
  for (let j = 0; j < sprite.layers; j++) {
    let layer;
    contextTemp.canvas.height = sprite.height;// clean
    contextTemp.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
    layer = this.createLayersFromContext(sprite, contextTemp, index, j);
    actions.addLayerFrame(
      index,
      layer
    );
  }
  return index;
};

loader.createLayersFromContext = function(sprite, image, frame, index) {
  let context = document.createElement('canvas').getContext('2d');
  context.canvas.width = sprite.width;
  context.canvas.height = sprite.height;
  context.drawImage(image.canvas,
    0, 0, sprite.width, sprite.height,
    0, 0, sprite.width, sprite.height
  );
  return actions.addLayer({
    context: context,
    width: sprite.width,
    height: sprite.height,
    sprite: sprite.index,
    frame: frame,
    layerIndex: index
  });
};


loader.init = function (cb) {
  http.get('/api/editor/user/last')
    .then(this.onGetEditor)
    .catch(err => {
      console.log(err);
      createSprite({current: true});
      this.ensure();
    });
  this.cb = cb;
};

bindObject(loader);

module.exports = (cb) => loader.init(cb);