'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			bucket = new Tool('bucket');

bucket.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		let newPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		newPixel.color = evt.which === RIGHT_CLICK ? Editor.getPanel('Tools').getSecondColor() : Editor.getPanel('Tools').getPrimaryColor();
		if (newPixel.color !== this.layer.getColorPixel(newPixel.cord)) {
			this.fill(newPixel.cord, newPixel.color, this.layer.getColorPixel(newPixel.cord));
			this.layer.frame.paint();
		}
	}
};
bucket.onMouseMove = function (evt) {};
bucket.onMouseUp = function (evt) {};

module.exports = () => Editor.addTool(bucket);
