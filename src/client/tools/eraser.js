'use strict';
const Tool = require('../prototypes/Tool.js'),
	abs = Math.abs,
	{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR, actions } = require('../constants'),
	Vector = require('../prototypes/Vector.js'),
	Action = require('../prototypes/Action.js'),
	Actions = require('../panels/Actions.js'),
	Layers = require('../panels/Layers.js'),
	eraser = new Tool('eraser');

let lastPixel;
eraser.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		$(window).on('mouseup.up', this.onMouseUp.bind(this));
		$(window).on('mouseout.leave', this.onMouseLeave.bind(this));
	}
};
eraser.onMouseLeave = function (evt) {
	let e = evt.toElement || evt.relatedTarget;
	if (e !== document.children[0]) {
		return;
	}
	let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	lastPixel = newPixel;
};
eraser.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (this.layer.validCord(newPixel) || this.layer.validCord(lastPixel)) {
			if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) {
				this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, TRANSPARENT_COLOR, 'cleanAt');
			} else if (!this.stroke[newPixel.x][newPixel.y] && TRANSPARENT_COLOR !== this.layer.getColorPixel(newPixel)) {
				this.stroke[newPixel.x][newPixel.y] = this.layer.cleanAt({x : newPixel.x, y : newPixel.y}, TRANSPARENT_COLOR);
			}
		}
		lastPixel = newPixel;
	}
};
eraser.onMouseUp = function (evt) {
	$(window).off('mouseup.up');
	$(window).off('mouseout.leave');
	if (this.clicked) {
		this.clicked = false;
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (!this.stroke[newPixel.x][newPixel.y] && TRANSPARENT_COLOR !== this.layer.getColorPixel(newPixel)) {
			this.stroke[newPixel.x][newPixel.y] = this.layer[at]({x : newPixel.x, y : newPixel.y}, color);
		}
		lastPixel = undefined;
		Layers.paintLayer(this.layer.index);
		this.layer.paint();
		Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke}, 0));
	}
};
module.exports = () => Editor.addTool(eraser);
