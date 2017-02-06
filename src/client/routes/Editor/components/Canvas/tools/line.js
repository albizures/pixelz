import Tool from './Tool';
import { calculatePosition, validCord } from 'utils/canvas';
import { isTransparent } from 'utils/color';


const obj = {};
let lastPixel, color, at;

obj.onMouseDown = function (evt) {
  this.clicked = true;
  lastPixel = this.initCord;
  color = this.getColor(evt.which);
  if (isTransparent(color)) {
    at = this.previewClean;
  } else {
    at = this.previewPaint;
  }
  $window.off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp, false);
  $window.off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove, false);
};
obj.previewClean = function (x, y) {
  this.preview.clearRect(
    (x * this.artboard.scale) + this.artboard.x,
    (y * this.artboard.scale) + this.artboard.y,
    this.artboard.scale, this.artboard.scale);
};
obj.previewPaint = function (x, y) {
  this.preview.fillStyle = color;
  this.preview.fillRect(
    (x * this.artboard.scale) + this.artboard.x,
    (y * this.artboard.scale) + this.artboard.y,
    this.artboard.scale, this.artboard.scale);
};
obj.onMouseMove = function (evt) {
  if (this.clicked) {
    let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    if (validCord(this.layer, newPixel) || validCord(this.layer, lastPixel)) {
      this.preview.canvas.width = this.preview.canvas.width;
      this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, at);
    }
  }
};
obj.clean = function (x, y) {
  this.layer.context.clearRect(x, y, 1, 1);
};
obj.paint = function (x, y) {
  this.layer.context.fillStyle = color;
  this.layer.context.fillRect(x, y, 1, 1);
};
obj.onMouseUp = function (evt) {
  $window.off('mouseup.upCanvas');
  $window.off('mouseout.leaveCanvas');
  $window.off('mousemove.moveCanvas');
  if (this.clicked) {
    this.clicked = false;
    if (isTransparent(color)) {
      at = this.clean;
    } else {
      at = this.paint;
    }
    let newPixel = calculatePosition(this.artboard, evt.clientX, evt.clientY);
    if (validCord(this.layer, newPixel) || validCord(this.layer, lastPixel)) {
      this.preview.canvas.width = this.preview.canvas.width;
      this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, at);
    }
    lastPixel = undefined;
    this.newVersion(this.layer);
    this.addUndo({
      layer: this.layer,
      prevStatus: this.prevStatus
    });
  }
};

const pencil = Tool.create('pencil', obj);

export default pencil;
