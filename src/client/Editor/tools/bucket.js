'use strict';
const Tool = require('../prototypes/Tool'),
  { RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR, actions } = require('../constants'),
  Tools = require('../panels/Tools'),
  Actions = require('../panels/Actions'),
  Vector = require('../prototypes/Vector'),
  Action = require('../prototypes/Action'),
  bucket = new Tool('bucket');
let color,oldColor;
bucket.active = function () {
  this.layer.saveImageData();
};
bucket.onMouseDown = function (evt) {
  if (evt.target.nodeName == 'CANVAS') {
    this.layer.saveImageData();
    this.layer.saveStatus();
    let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
    oldColor = this.layer.getColorPixel(newPixel);
    if (oldColor && color !== oldColor) {
      this.fill(newPixel, color, oldColor, color == TRANSPARENT_COLOR ? 'fillCleanAt' : 'fillAt');
      this.layer.paint();
      Actions.addUndo(new Action(Action.PAINT, {layer : this.layer, data : this.layer.prevStatus}, 0));
    }
  }
};
bucket.onMouseMove = function (evt) {};
bucket.onMouseUp = function (evt) {
  this.layer.saveImageData();
};

module.exports = bucket;
