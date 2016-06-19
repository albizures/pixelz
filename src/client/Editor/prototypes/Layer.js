'use strict';
const { imageSmoothing } = require('utils/canvas.js');
const Layers = require('../panels/Layers.js');
const Select = require('./Select.js');
const Action = require('./Action.js');
const Actions = require('../panels/Actions.js');
const { TRANSPARENT_COLOR } = require('../constants');

function Layer(frame, index, status, context, bitmap) {
  this.frame = frame;
  this.index = index;
  this.status = status;
  this.context = context || document.createElement('canvas').getContext('2d');
  this.bitmap =  bitmap || new Array(this.frame.width);
  if (!bitmap) {
    for (let i = 0; i < this.bitmap.length; i++) {
      this.bitmap[i] = new Array(this.frame.height).fill(TRANSPARENT_COLOR);
    }
  }
  if (!context) {
    this.init();
  }
}
Layer.fromContext = function (frame, index, context) {
  return new Layer(frame, index, true, context);
};
Layer.prototype = {
  constructor: Layer,
  get canvas() {
    return Editor.canvas;
  },
  get imageData() {
    return this.context.getImageData(0, 0, this.sprite.width, this.sprite.height);
  },
  get width() {
    return this.frame.width;
  },
  get height() {
    return this.frame.height;
  },
  get sprite() {
    return this.frame.sprite;
  }
};
Layer.prototype.init = function () {
  let tempData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
  imageSmoothing(this.context, false);
  this.context.canvas.width = this.width;
  this.context.canvas.height = this.height;
  this.context.putImageData(tempData, 0, 0);
  if (Editor.canvas && Editor.canvas.artboard.layer.frame == this.frame) {
    Layers.addPreview(this);
  }
};
Layer.prototype.cloneBitmap = function () {
  let newBitmap = [];
  for (let i = 0; i < this.bitmap.length; i++) {
    newBitmap.push(this.bitmap[i].slice(0));
  }
  return newBitmap;
};
Layer.prototype.resize = function (content, x, y) {
  let newContext = document.createElement('canvas').getContext('2d'),
    x1, y1, x2, y2, width1, width2, height1, height2;

  x1 = 0;
  y1 = 0;
  width1 = this.context.canvas.width;
  height1 = this.context.canvas.height;

  x2 = x;
  y2 = y;
  if (content) {
    width2 = this.width;
    height2 = this.height;
  } else {
    width2 = this.context.canvas.width;
    height2 = this.context.canvas.height;
  }
  newContext.canvas.width = this.width;
  newContext.canvas.height = this.height;

  imageSmoothing(newContext, false);
  console.log(x1, y1, width1, height1, x2, y2, width2, height2);

  newContext.drawImage(this.context.canvas, x1, y1, width1, height1, x2, y2, width2, height2);

  this.context = newContext;
  Layers.resizeLayer(this.index);
  Editor.canvas.resize();
};
Layer.prototype.saveImageData = function () {
  this.prevImageDataState = this.imageData;
};
Layer.prototype.saveStatus = function () {
  this.prevStatus = document.createElement('canvas');
  this.prevStatus.width = this.width;
  this.prevStatus.height = this.height;
  this.prevStatus.getContext('2d').drawImage(this.context.canvas, 0, 0);
};
Layer.prototype.delete = function (unsaved) {
  if (this.frame.deleteLayer(this.index, unsaved)) {
    Layers.deletePreview(this.index);
  }
};
Layer.prototype.getIMG = function () {
  let image = document.createElement('img');
  image.src = this.context.canvas.toDataURL();
  return image;
};
Layer.prototype.clone = function (frame) {
  frame = frame || this.frame;
  return new Layer(frame, this.index, this.status, this.cloneContext(), this.cloneBitmap());
};
Layer.prototype.select = function () {
  Editor.canvas.changeLayer(this);
  Layers.createPreviewLayer();
  Layers.selectLayer(this.index);
};
Layer.prototype.cloneContext = function () {
  let clone = this.context.canvas.cloneNode().getContext('2d');
  clone.drawImage(this.context.canvas, 0, 0);
  return clone;
};
Layer.prototype.validCord = function (cord) {
  return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Layer.prototype.isSameColor = function (x, y, components1, components2) {
  var index = (x + y * this.width) * 4;
  if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    if (this.prevImageDataState.data[index] == components1[0] &&
      this.prevImageDataState.data[index + 1] == components1[1] &&
      this.prevImageDataState.data[index + 2] == components1[2] &&
      this.prevImageDataState.data[index + 3] / 255 == components1[3]) {
      this.prevImageDataState.data[index] = components2[0];
      this.prevImageDataState.data[index + 1] = components2[1];
      this.prevImageDataState.data[index + 2] = components2[2];
      this.prevImageDataState.data[index + 3] = components2[3] * 255;
      return true;
    }
  }
  return false;
};
Layer.prototype.getColorPixel = function (cord) {
  var index = (cord.x + cord.y * this.width) * 4;
  if (index >= 0 && index <= this.prevImageDataState.data.length) {
    return 'rgba(' + this.prevImageDataState.data[index] + ', ' + this.prevImageDataState.data[index + 1] + ', ' + this.prevImageDataState.data[index + 2] + ', ' + this.prevImageDataState.data[index + 3] / 255 + ')';
  }
};
Layer.prototype.cleanAt = function (cord) {
  this.context.clearRect(cord.x, cord.y, 1, 1);
  this.canvas.cleanAt(cord, TRANSPARENT_COLOR);
};
Layer.prototype.fillCleanAt = function (cord) {
  this.context.clearRect(cord.x, cord.y, 1, 1);
};
Layer.prototype.fillAt = function (cord, color) {
  this.context.fillStyle = color;
  this.context.clearRect(cord.x, cord.y, 1, 1);
  this.context.fillRect(cord.x, cord.y, 1, 1);
};
Layer.prototype.paintPrevAt = function (cord, color) {
  this.canvas.previewAt(cord, color);
};
Layer.prototype.paintAt = function (cord, color) {
  this.context.fillStyle = color;
  this.context.clearRect(cord.x, cord.y, 1, 1);
  this.context.fillRect(cord.x, cord.y, 1, 1);
  this.canvas.paintAt(cord, color);
};
Layer.prototype.paintStroke = function (listCords) {
  let oldStroke = new Array(listCords.length), item;
  for (let i = 0; i < oldStroke.length; i++) {
    oldStroke[i] = [];
  }
  for (let x = 0; x < listCords.length; x++) {
    for (let y = 0; y < listCords[x].length; y++) {
      if (item = listCords[x][y]) {
        if (item == TRANSPARENT_COLOR) {
          oldStroke[x][y] = this.cleanAt({x : x, y : y});
        } else {
          oldStroke[x][y] = this.paintAt({x : x, y : y}, item);
        }
      }
    }
  }
  Layers.paintLayer(this.index);
  this.frame.paint();
  return {layer : this, stroke : oldStroke};
};
Layer.prototype.paintEverywhere = function () {
  Layers.updateLayers(this.index);
  this.frame.paint();
  Editor.canvas.paintMain();
};
Layer.prototype.restoreState = function (state) {
  this.saveStatus();
  this.context.canvas.width = state.height;
  this.context.drawImage(state, 0, 0, state.width, state.height, 0, 0, state.width, state.height);
  this.paintEverywhere();
  return {layer : this, data : this.prevStatus};
};
Layer.prototype.paint = function () {
  Layers.updateLayers(this.index);
  this.frame.paint();
};
Layer.prototype.generatePreview = function (scale) {
  return this.context;
};
Layer.prototype.prevSelect = function (x, y, width, height) {
  Editor.canvas.prevSelect(x, y, width, height);
};
Layer.prototype.getSelect = function (x, y, width, height) {
  let select;
  select = new Select({x : x, y: y}, width, height, this);
  this.paintEverywhere();
  Editor.canvas.addAreaSelect(select);
};
Layer.prototype.paintSelect = function (select) {
  this.context.clearRect(select.originalCord.x, select.originalCord.y, select.originalWidth, select.originalHeight);
  this.context.drawImage(select.context.canvas, select.cord.x, select.cord.y, select.width, select.height);
  Actions.addUndo(new Action(Action.PAINT, {layer : this, data : this.prevStatus}, 0));
};
module.exports = Layer;
