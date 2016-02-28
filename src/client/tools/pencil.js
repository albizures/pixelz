'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ MIDDLE_CLICK, RIGHT_CLICK,LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			pencil = new Tool('pencil');
let lastPixel;
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		lastPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		lastPixel.color = evt.which === RIGHT_CLICK ? Editor.getPanel('Tools').getSecondColor() : Editor.getPanel('Tools').getPrimaryColor();
	}
};
pencil.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		newPixel.color = evt.which === RIGHT_CLICK ? Editor.getPanel('Tools').getSecondColor() : Editor.getPanel('Tools').getPrimaryColor();
		if (lastPixel.cord.importantDiff(newPixel.cord)) {
			this.paintLineBetween(lastPixel, newPixel);
		} else {
			this.layer.paintAt(newPixel.cord, newPixel.color);
		}
		lastPixel = newPixel;
	}
};
pencil.onMouseUp = function (evt) {
	if (this.clicked) {
		this.clicked = false;
		lastPixel = undefined;
	}
};
module.exports = () => Editor.addTool(pencil);
