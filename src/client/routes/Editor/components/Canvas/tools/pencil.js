'use strict';
const { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR} = require('constants/index.js');
const { abs } = Math;
const { store } = require('../../../../../store.js');
const {actions} = require('../../../ducks/layers.js');
const Tool = require('./Tool.js');
const { calculatePosition, validCord, cloneContext } = require('utils/canvas.js');
const { isTransparent } = require('utils/color.js');


const obj = {};
let lastPixel, color, lineBetween, at;

obj.onMouseDown = function (evt) {
  this.clicked = true;
  lastPixel = this.initCord;
  color = this.getColor(evt.which);
  if (isTransparent(color)) {
    at = this.clean;

  } else {
    at = this.paint;
  }
  $window.off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp, false);
  $window.off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave, false);
  $window.off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove, false);
};
obj.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = calculatePosition(artboard, evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
obj.clean = function (x, y) {
  this.main.clearRect(
    (x * this.artboard.scale) + this.artboard.x,
    (y * this.artboard.scale) + this.artboard.y,
    this.artboard.scale, this.artboard.scale);
  this.layer.context.clearRect(x, y, 1, 1);
};
obj.paint = function (x, y) {
  this.main.fillStyle = color;
  this.main.fillRect(
    (x * this.artboard.scale) + this.artboard.x,
    (y * this.artboard.scale) + this.artboard.y,
    this.artboard.scale, this.artboard.scale);
  this.layer.context.fillStyle = color;
  this.layer.context.fillRect(x, y, 1, 1);
};
obj.onMouseMove = function (evt) {
  if (this.clicked) {
    let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    if (validCord(this.layer, newPixel) || validCord(this.layer, lastPixel)) {
      if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) { // importantDiff
        this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, at);
      } else {
        at(newPixel.x, newPixel.y);
      }
    }
    lastPixel = newPixel;
  }
};
obj.onMouseUp = function (evt) {
  $window.off('mouseup.upCanvas');
  $window.off('mouseout.leaveCanvas');
  $window.off('mousemove.moveCanvas');
  if (this.clicked) {
    this.clicked = false;
    //let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    lastPixel = undefined;
    this.newVersion(this.layer);
    this.addUndo({
      layer: this.layer,
      prevStatus : this.prevStatus
    });
  }
};

const pencil = Tool.create('pencil', obj);

module.exports = pencil;
