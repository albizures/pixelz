'use strict';
const Tool = require('../prototypes/Tool.js'),
	{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
	Vector = require('../prototypes/Vector.js'),
	eraser = new Tool('eraser');

let lastPixel;
eraser.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		lastPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		lastPixel.color = TRANSPARENT_COLOR;
	}
};
eraser.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		newPixel.color = TRANSPARENT_COLOR;
		if (lastPixel.cord.importantDiff(newPixel.cord)) {
			this.paintLineBetween(lastPixel, newPixel);
		} else {
			this.layer.paintAt(newPixel.cord, newPixel.color);
		}
		lastPixel = newPixel;
	}
};
eraser.onMouseUp = function (evt) {
	if (this.clicked) {
		this.clicked = false;
		lastPixel = undefined;
	}
};
module.exports = () => Editor.addTool(eraser);
