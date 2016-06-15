'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			Tools = require('../panels/Tools.js'),
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
