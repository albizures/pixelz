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
		this.stroke = new Array(this.layer.width);
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
		lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	}
};
eraser.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) {
			this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, TRANSPARENT_COLOR, 'cleanAt');
		} else if (!this.stroke[newPixel.x][newPixel.y] && TRANSPARENT_COLOR !== this.layer.getColorPixel(newPixel)){
			this.stroke[newPixel.x][newPixel.y] = this.layer.cleanAt({x : newPixel.x, y : newPixel.y}, TRANSPARENT_COLOR);
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
