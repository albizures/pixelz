'use strict';
const Frame = require('./Frame.js');
const Palette = require('../panels/Palette');
const Gif = require('./gif/gif.js');
const Action = require('./Action.js');
const Frames = require('../panels/Frames.js');
const Actions = require('../panels/Actions.js');
const colors = require('../workers/colors.js')();
const { downloadBlob } = require('utils/file.js');
const Preview = require('../panels/Preview.js');
const http = require('http');

/**
 * Prototype of Sprite
 *
 * @param {number} width (description)
 * @param {number} height (description)
 */
function Sprite(width, height, id, cb) {
  this._id = id;
  this.width = width;
  this.height = height;
  this.frames = [];
  this.cb = cb;
  if (this._id) {
    http.get('/api/sprites/' + id, this.initFromID.bind(this));
  } else {
    this.frames.push(new Frame(this, 0, true));
    Preview.selectSprite(this);
  }
}
Sprite.prototype.initFromID = function (result) {
  var data = result.data;
  var sprite = this;
  var context, image = new Image();
  if (result.code !== 0) {
    return;
  }
  context = document.createElement('canvas').getContext('2d');
  this.width = data.width;
  context.canvas.height = this.height = data.height;
  image.onload = () => {
    for (var j = 0; j < data.frames; j++) {
      context.canvas.width = image.width;
      context.drawImage(image,
        0, j * this.height, image.width, this.height,
        0, 0, image.width, this.height
      );
      var frame = Frame.fetchFrame(sprite, j, context.canvas);
      this.frames.push(frame);
    }
    Preview.selectSprite(this);
    if (this.cb) {
      this.cb(this);
    }
  };
  image.src = '/api/images/sprite/' + data._id;
};
Sprite.prototype.getFrame = function (index) {
  return this.frames[index];
};
Sprite.prototype.deleteFrame = function (index, unsaved) {
  if (this.frames.length == 1) {
    // TODO: create alert
    alert('can\'t delete last frames');
    return false;
  } else {
    let frameDelete = this.frames.splice(index, 1)[0];
    this.reIndexing();
    if (!unsaved) {
      Actions.addUndo(new Action(Action.DELETE_FRAME, {frame : frameDelete}, 0));
    }
    if (frameDelete && frameDelete.index == Editor.canvas.artboard.layer.frame.index) {
      if (this.frames.length <= index) {
        index--;
      }
      this.frames[index].select();
    }
    return true;
  }
};
Sprite.prototype.getTransparentColor = function (cb) {
  let dataList = [], self = this;
  for (let i = 0; i < this.frames.length; i++) {
    dataList.push(this.frames[i].imageData.data);
  }
  colors.postMessage({type : 'transparent', data : dataList});
  colors.onmessage = onGetTransparentColor.bind(this);

  function onGetTransparentColor(evt) {
    if (cb) {
      self.transparentColor = evt.data;
      cb(evt.data);
    }
  }
};
Sprite.prototype.getAllDataImage = function () {
  let dataList = [];
  for (let i = 0; i < this.frames.length; i++) {
    dataList = dataList.concat(this.frames[i].getDataList());
  }
  return dataList;
};
Sprite.prototype.getGeneralColors = function (cb) {
  let dataList = this.getAllDataImage();
  colors.postMessage({type : 'general', data : dataList});
  colors.onmessage =  onGetGeneralColors.bind(this);

  function onGetGeneralColors(evt) {
    this.currentColors = evt.data;
    cb(evt.data);
  }
};
Sprite.prototype.generateGif = function (scale, cb) {
  let gif = new Gif({
    quality: 1,
    repeat: 0,
    height: this.height * scale,
    width: this.width * scale,
    preserveColors: true
  });
  gif.on('finished', cb);
  if (Editor.timeoutGetTransparentColor) {
    Editor.addCallbackGetColor(generate.bind(this));
  } else {
    //transparent = parseInt(this.transparentColor.substring(1), 16);
    generate.call(this, this.transparentColor);
  }

  function generate(color) {
    let transparent = color;
    for (let i = 0; i < this.frames.length; i++) {
      gif.addFrame(this.frames[i].generatePreview(scale, transparent), {
        transparent : parseInt(transparent.substring(1), 16)
      });
    }
    gif.render();
  }

};
Sprite.prototype.reIndexing = function () {
  for (let i = 0; i < this.frames.length; i++) {
    this.frames[i].index = i;
  }
};
Sprite.prototype.resize = function (width, height, content, x, y) {
  this.width = width;
  this.height = height;
  for (let i = 0; i < this.frames.length; i++) {
    this.frames[i].resize(content, x, y);
  }
  Preview.selectSprite(this);
};
Sprite.prototype.moveFrame = function (oldIndex, newIndex) {
  let frame = this.frames.splice(oldIndex, 1),
    tempFrames;
  Preview.stop();
  tempFrames = this.frames.splice(newIndex);
  this.frames = this.frames.concat(frame, tempFrames);
  this.reIndexing();
  Preview.selectFrame();
  Preview.start();
};
Sprite.prototype.paint = function () {};
Sprite.prototype.selectFrame = function (frame) {
  if (Number.isInteger(frame)) {
    frame = this.frames[frame];
  } else if (!(frame instanceof Frame)) {
    throw new Error();
  }
  frame.select();
};
Sprite.prototype.addFrame = function (frameClone, newIndex, restore) {
  let clone = false,
    newFrame;
  if (restore) {
    newFrame = frameClone;
    Frames.addPreview(newFrame);
  } else {
    if (frameClone instanceof Frame) {
      clone = true;
    } else if (Number.isInteger(frameClone)) {
      clone = true;
      frameClone = this.frames[frameClone];
    }
    if (!Number.isInteger(newIndex)) {
      newIndex = clone ? frameClone.index + 1 : this.frames.length;
    }
    newFrame = clone ? frameClone.clone() : new Frame(this, newIndex, true);
    if (clone) {
      newFrame.index = newIndex;
      newFrame.layers = frameClone.cloneLayers(newFrame);
    }
  }

  let tempFrames = this.frames.splice(newIndex);

  if (tempFrames.length !== 0) {
    this.frames = this.frames.concat([newFrame], tempFrames);
    this.reIndexing();
  } else {
    this.frames.push(newFrame);
  }
  if (clone) {
    newFrame.init();
  }
  newFrame.select();
  newFrame.paint();
  if (!restore) {
    Actions.addUndo(new Action(Action.ADD_FRAME, {frame : newFrame}, 0));
  }
  return newFrame;
};
Sprite.prototype.putImagesData = function (data) {
  for (let f = 0; f < data.length; f++) {
    let layers = data[f];
    for (let l = 0; l < layers.length; l++) {
      this.frames[f].layers[l].context.putImageData(layers[l], 0, 0);
    }
  }
};

Sprite.prototype.save = function () {
  let isGif = this.frames.length > 1;
  let isNew = !this._id;
  let context = document.createElement('canvas').getContext('2d');
  let width = this.frames[0].layers.length * this.width;
  let height = this.frames.length * this.height;
  let sprite = this;
  let files = [];

  context.canvas.width = width;
  context.canvas.height = height;

  this.frames.forEach(function (frame, index) {
    context.drawImage(frame.save().canvas,
      0, 0, width, sprite.height,
      0, sprite.height * index, width, sprite.height
    );
  });

  isGif?
    this.generateGif(1, onGeneratePreview)
    : this.frames[0].context.canvas.toBlob(onGeneratePreview);

  function onGeneratePreview(blob) {
    files.push({file : blob, name: 'preview.'  + (isGif? 'gif' : 'png')});
    context.canvas.toBlob(onGenerateBlob);
  }
  function onGenerateBlob(blob) {
    var method, url;
    if (isNew) {
      method = 'POST';
      url = '/api/sprites';
    } else {
      method = 'PUT';
      url = '/api/sprites/' + sprite._id;
    }

    files.push({file : blob, name: 'sprite.png'});

    http.upload(url, {
      name: 'test',
      width: sprite.width,
      height: sprite.height,
      frames: sprite.frames.length,
      layers: sprite.frames[0].layers.length,
      type: isGif? 'gif' : 'png',
      private: false,
      colors: sprite.currentColors.array
    }, files, method, onUpload);
  }

  function onUpload(result) {
    console.log('save result', result);
  }
  return context.canvas;
};

module.exports = Sprite;
