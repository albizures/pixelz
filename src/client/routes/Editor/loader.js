import React from 'react';
import { cuid } from 'react-dynamic-layout/lib';

import http from '../../utils/http';
import { wrapActionCreators } from '../../utils/ducks';
import { bindObject } from '../../utils/object';
import { createSprite } from '../../utils/sprites';
import { store } from '../../store';

import {
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
} from '../../ducks';

const { dispatch } = store;

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
  require.ensure([], (require) => this.cb(require('./Editor').default));
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
  sprite.id = cuid();
  actions.addSprite({
    id: sprite.id,
    _id: sprite._id,
    name: sprite.name,
    width: sprite.width,
    height: sprite.height,
    colors: sprite.colors,
    primaryColor: sprite.primaryColor || sprite.colors[0] || 'rgba(0, 255, 0, 1)',
    secondaryColor: sprite.secondaryColor || 'rgba(0, 0, 0, 0)'
  });
  actions.openSprite(sprite.id);
  actions.setCurrentSprite(sprite.id);
  return new Promise(reject => {
    image.onload = () => {
      context.drawImage(image,
        0, 0, width, height,
        0, 0, width, height
      );
      actions.selectSpriteFrame(
        sprite.id,
        this.createFrameFromContext(sprite, context)
      );
      actions.selectSpriteLayer(sprite.id, 0);
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
  let frame = cuid();
  contextTemp.canvas.width = context.canvas.width = sprite.width;
  contextTemp.canvas.height = context.canvas.height = sprite.height;
  
  for (var j = sprite.layers - 1; j >= 0; j--) {
    context.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
  }
  actions.addFrame({
    id: frame,
    sprite: sprite.id,
    width: sprite.width,
    height: sprite.height,
    context: context,
    layers: []
  });
  actions.addFrameSprite(
    sprite.id,
    frame
  );
  for (let j = 0; j < sprite.layers; j++) {
    let layer;
    contextTemp.canvas.height = sprite.height;// clean
    contextTemp.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
    layer = this.createLayersFromContext(sprite, contextTemp, frame, j);
    actions.addLayerFrame(
      frame,
      layer
    );
  }
  return frame;
};

loader.createLayersFromContext = function(sprite, image, frame, index) {
  const layer = cuid();
  let context = document.createElement('canvas').getContext('2d');
  context.canvas.width = sprite.width;
  context.canvas.height = sprite.height;
  context.drawImage(image.canvas,
    0, 0, sprite.width, sprite.height,
    0, 0, sprite.width, sprite.height
  );
  actions.addLayer({
    id: layer,
    context: context,
    width: sprite.width,
    height: sprite.height,
    sprite: sprite.id,
    frame: frame,
    layerIndex: index
  });
  return layer;
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

export default (cb) => loader.init(cb);