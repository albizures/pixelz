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
		this.stroke = new Array(this.layer.width);
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
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
			if (abs(lastPixel.yo - newPixel.yo) > 1 || abs(lastPixel.xo - newPixel.xo) > 1) {
				this.lineBetween(lastPixel.xo, lastPixel.yo, newPixel.xo, newPixel.yo, TRANSPARENT_COLOR, 'cleanAt');
			} else if (!this.stroke[newPixel.xo][newPixel.yo] && TRANSPARENT_COLOR !== this.layer.getColorPixel(newPixel)) {
				this.stroke[newPixel.xo][newPixel.yo] = this.layer.cleanAt({x : newPixel.xo, y : newPixel.yo}, TRANSPARENT_COLOR);
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
		lastPixel = undefined;
		Layers.paintLayer(this.layer.index);
		this.layer.frame.paint();
		Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke}, 0));
	}
};
module.exports = () => Editor.addTool(eraser);
