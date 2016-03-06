'use strict';
const Tool = require('../prototypes/Tool.js'),
	abs = Math.abs,
	{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR, actions } = require('../constants'),
	Vector = require('../prototypes/Vector.js'),
	Action = require('../prototypes/Action.js'),
	eraser = new Tool('eraser');

let lastPixel;
eraser.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		this.stroke = [];
		lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	}
};
eraser.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) {
			this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, TRANSPARENT_COLOR, 'cleanAt');
		} else {
			if (newPixel.color !== this.layer.getColorPixel(newPixel.cord)) {
				this.addPixelStroke(this.layer.cleanAt(newPixel.cord, TRANSPARENT_COLOR));
			}
		}
		lastPixel = newPixel;
	}
};
eraser.onMouseUp = function (evt) {
	if (this.clicked) {
		this.clicked = false;
		lastPixel = undefined;
		Editor.getPanel('Layers').paintLayer(this.layer.index);
		this.layer.frame.paint();
		Editor.getPanel('Actions').addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke} , 0));
	}
};
module.exports = () => Editor.addTool(eraser);
