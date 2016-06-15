'use strict';
const Tool = require('../prototypes/Tool.js'),
  { RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
  Vector = require('../prototypes/Vector.js'),
  Action = require('../prototypes/Action.js'),
  Actions = require('../panels/Actions.js'),
  actions = require('../constants').actions,
  Tools = require('../panels/Tools.js'),
  rectangle = new Tool('rectangle');
let firstPixel, lastPixel, color, at;
rectangle.onMouseDown = function (evt) {
  if (evt.target.nodeName == 'CANVAS') {
    this.layer.saveStatus();
    this.clicked = true;
    firstPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
    at = 'paintPrevAt';
    $(window).off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp.bind(this));
    $(window).off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave.bind(this));
    $(window).off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove.bind(this));
  }
};
rectangle.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
rectangle.onMouseMove = function (evt) {
  lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  if (firstPixel.x != lastPixel.x || firstPixel.y != lastPixel.y) {
    this.getRectangle(firstPixel.x, firstPixel.y, lastPixel.x, lastPixel.y, color, at);
  }
};
rectangle.onMouseUp = function (evt) {
  $(window).off('mouseup.upCanvas');
  $(window).off('mouseout.leaveCanvas');
  $(window).off('mousemove.moveCanvas');
  if (color == TRANSPARENT_COLOR) {
    at = 'cleanAt';
  } else {
    at = 'paintAt';
  }
  this.clicked = true;
  lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  this.getRectangle(firstPixel.x, firstPixel.y, lastPixel.x, lastPixel.y, color, at);
  this.layer.paint();
  Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, data : this.layer.prevStatus}, 0));
};

module.exports = rectangle;
