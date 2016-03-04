'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			pick = new Tool('pick');

pick.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		let newPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		newPixel.color = this.layer.getColorPixel(newPixel.cord);
		if (evt.which === RIGHT_CLICK) {
			Editor.getPanel('Tools').setSecudaryColor(newPixel.color);
		} else {
			Editor.getPanel('Tools').setPrimaryColor(newPixel.color);
		}
		Editor.getPanel('Tools').lastTool.select();
	}
};
pick.onMouseMove = function (evt) {};
pick.onMouseUp = function (evt) {};

module.exports = () => Editor.addTool(pick);
