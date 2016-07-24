'use strict';
const { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR} = require('constants/index.js');
const { abs } = Math;
const { store } = require('../../../../../store.js');
const {actions} = require('../../../ducks/layers.js');
const Tool = require('./Tool.js');
const { calculatePosition, validCord, cloneContext } = require('utils/canvas.js');
//const Actions = require('../panels/Actions.js');
//const Layers = require('../panels/Layers.js');
//const actions = require('../constants').actions;
//const Action = require('../prototypes/Action.js');
//const Vector = require('../prototypes/Vector.js');
const pencil = Tool.create('pencil');

let lastPixel, color, lineBetween, at;
let preview, layer, artboard;
let prevStatus;

pencil.onMouseDown = function (evt, cord, _preview, _layer,  _artboard) {
  preview = _preview;
  layer = _layer;
  artboard = _artboard;
  prevStatus = cloneContext(layer.context);
  this.clicked = true;
  lastPixel = cord;
  color = this.getColor(evt.which);
  if (color == TRANSPARENT_COLOR) {
    at = pencil.clean;
  } else {
    at = pencil.paint;
  }
  $(window).off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp.bind(this));
  $(window).off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave.bind(this));
  $(window).off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove.bind(this));
};
pencil.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = calculatePosition(artboard, evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
pencil.clean = function (x, y) {
  preview.clearRect(
    (x * artboard.scale) + artboard.x,
    (y * artboard.scale) + artboard.y,
    artboard.scale, artboard.scale);
  layer.context.clearRect(x, y, 1, 1);
};
pencil.paint = function (x, y) {
  preview.fillStyle = color;
  preview.fillRect(
    (x * artboard.scale) + artboard.x,
    (y * artboard.scale) + artboard.y,
    artboard.scale, artboard.scale);
  layer.context.fillStyle = color;
  layer.context.fillRect(x, y, 1, 1);
};
pencil.onMouseMove = function (evt) {
  if (this.clicked) {
    let newPixel = calculatePosition(artboard, evt.clientX, evt.clientY);
    if (validCord(layer, newPixel) || validCord(layer, lastPixel)) {
      if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) { // importantDiff
        this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, at);
      } else {
        at(newPixel.x, newPixel.y);
      }
    }
    lastPixel = newPixel;
  }
};
pencil.onMouseUp = function (evt) {
  $(window).off('mouseup.upCanvas');
  $(window).off('mouseout.leaveCanvas');
  $(window).off('mousemove.moveCanvas');
  if (this.clicked) {
    this.clicked = false;
    let newPixel = calculatePosition(artboard, evt.clientX, evt.clientY);
    lastPixel = undefined;
    this.newVersion(layer);
    this.addUndo({
      layer,
      prevStatus
    });
  }
};
module.exports = pencil;
