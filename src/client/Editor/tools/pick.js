'use strict';
const Tool = require('../prototypes/Tool'),
      { RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
      Vector = require('../prototypes/Vector'),
      Tools = require('../panels/Tools'),
      pick = new Tool('pick');

pick.onMouseDown = function (evt) {
  if (evt.target.nodeName == 'CANVAS') {
    let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
    newPixel.color = this.layer.getColorPixel(newPixel);
    if (evt.which === RIGHT_CLICK) {
      Tools.setSecudaryColor(newPixel.color);
    } else {
      Tools.setPrimaryColor(newPixel.color);
    }
    Tools.lastTool.select();
  }
};

module.exports = pick;
