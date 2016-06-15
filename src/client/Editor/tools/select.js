'use strict';
const Tool = require('../prototypes/Tool.js'),
  { RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
  Vector = require('../prototypes/Vector.js'),
  Action = require('../prototypes/Action.js'),
  Actions = require('../panels/Actions.js'),
  actions = require('../constants').actions,
  Tools = require('../panels/Tools.js'),
  select = new Tool('select');
let firstPixel, lastPixel, color, at;
select.onMouseDown = function (evt) {
  if (evt.target.nodeName == 'CANVAS') {
    this.layer.saveStatus();
    firstPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    $(window).off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp.bind(this));
    $(window).off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave.bind(this));
    $(window).off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove.bind(this));
  }
};
select.onMouseLeave = function (evt) {
  let e = evt.toElement || evt.relatedTarget;
  if (e !== document.children[0]) {
    return;
  }
  let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  lastPixel = newPixel;
};
select.onMouseMove = function (evt) {
  lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  lastPixel.x += lastPixel.x >= firstPixel.x ? 1 : 0;
  lastPixel.y += lastPixel.y >= firstPixel.y ? 1 : 0;
  if (firstPixel.x != lastPixel.x || firstPixel.y != lastPixel.y) {
    this.layer.prevSelect(firstPixel.x, firstPixel.y, lastPixel.x - firstPixel.x, lastPixel.y - firstPixel.y);
  }
};
select.onMouseUp = function (evt) {
  $(window).off('mouseup.upCanvas');
  $(window).off('mouseout.leaveCanvas');
  $(window).off('mousemove.moveCanvas');
  lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
  lastPixel.x += lastPixel.x >= firstPixel.x ? 1 : 0;
  lastPixel.y += lastPixel.y >= firstPixel.y ? 1 : 0;
  if (Math.abs(lastPixel.x - firstPixel.x) > 1 || Math.abs(lastPixel.y - firstPixel.y) > 1) {
    this.layer.getSelect(firstPixel.x, firstPixel.y, lastPixel.x - firstPixel.x, lastPixel.y - firstPixel.y);
  }
};

module.exports = select;
