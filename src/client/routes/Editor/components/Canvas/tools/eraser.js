const { abs } = Math;
const Tool = require('./Tool.js');
const { calculatePosition, validCord } = require('utils/canvas.js');
const $window = $(window);

const obj = {};
let lastPixel;

obj.onMouseDown = function () {
  this.clicked = true;
  lastPixel = this.initCord;
  $window.off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp, false);
  $window.off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave, false);
  $window.off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove, false);
};
obj.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
obj.clean = function (x, y) {
  this.main.clearRect(
    (x * this.artboard.scale) + this.artboard.x,
    (y * this.artboard.scale) + this.artboard.y,
    this.artboard.scale, this.artboard.scale);
  this.layer.context.clearRect(x, y, 1, 1);
};
obj.onMouseMove = function (evt) {
  if (this.clicked) {
    let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    if (validCord(this.layer, newPixel) || validCord(this.layer, lastPixel)) {
      if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) { // importantDiff
        this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, this.clean);
      } else {
        this.clean(newPixel.x, newPixel.y);
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
    let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    this.clean(newPixel.x, newPixel.y);
    lastPixel = undefined;
    this.newVersion(this.layer);
    this.addUndo({
      layer: this.layer,
      prevStatus: this.prevStatus
    });
  }
};

const pencil = Tool.create('erase', obj);

module.exports = pencil;
