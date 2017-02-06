'use strict';
const Tool = require('../prototypes/Tool'),
  { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR} = require('../constants'),
  abs = Math.abs,
  Tools = require('../panels/Tools'),
  Actions = require('../panels/Actions'),
  Layers = require('../panels/Layers'),
  actions = require('../constants').actions,
  Action = require('../prototypes/Action'),
  Vector = require('../prototypes/Vector'),
  pencil = new Tool('pencil');
let lastPixel, color, lineBetween, at;
pencil.onMouseDown = function (evt) {
  if (evt.target.nodeName == 'CANVAS') {
    this.layer.saveStatus();
    this.clicked = true;
    lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
    if (color == TRANSPARENT_COLOR) {
      at = 'cleanAt';
    } else {
      at = 'paintAt';
    }
    $(window).off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp.bind(this));
    $(window).off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave.bind(this));
    $(window).off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove.bind(this));
  }
};
pencil.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
pencil.onMouseMove = function (evt) {
  if (this.clicked) {
    let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    if (this.layer.validCord(newPixel) || this.layer.validCord(lastPixel)) {
      if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) { // importantDiff
        this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, color, at);
      } else {
        this.layer[at]({x : newPixel.x, y : newPixel.y}, color);
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
    let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    this.layer[at]({x : newPixel.x, y : newPixel.y}, color);
    lastPixel = undefined;
    this.layer.paint();
    Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, data : this.layer.prevStatus}, 0));
  }
};
module.exports = pencil;
