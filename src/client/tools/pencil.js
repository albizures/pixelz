'use strict';
const Tool = require('../prototypes/Tool.js'),
	{
		MIDDLE_CLICK,
		RIGHT_CLICK,
		LEFT_CLICK,
		TRANSPARENT_COLOR
	} = require('../constants'),
	abs = Math.abs,
	Tools = require('../panels/Tools.js'),
	Actions = require('../panels/Actions.js'),
	Layers = require('../panels/Layers.js'),
	actions = require('../constants').actions,
	Action = require('../prototypes/Action.js'),
	Vector = require('../prototypes/Vector.js'),
	pencil = new Tool('pencil');
let lastPixel, color, lineBetween, at;
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.stroke = new Array(this.layer.width);
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
		this.clicked = true;
		lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
		if (color == TRANSPARENT_COLOR) {
			at = 'cleanAt';
		} else {
			at = 'paintAt';
		}
		$(window).on('mouseup.up', this.onMouseUp.bind(this));
		$(window).on('mouseout.leave', this.onMouseLeave.bind(this));
	}
};
pencil.onMouseLeave = function (evt) {
	let e = evt.toElement || evt.relatedTarget;
	if (e !== document.children[0]) {
		return;
	}
	let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	lastPixel = newPixel;
};
pencil.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (this.layer.validCord(newPixel) || this.layer.validCord(lastPixel)) {
			if (abs(lastPixel.yo - newPixel.yo) > 1 || abs(lastPixel.xo - newPixel.xo) > 1) { // importantDiff
				this.lineBetween(lastPixel.xo, lastPixel.yo, newPixel.xo, newPixel.yo, color, at);
			} else if (!this.stroke[newPixel.xo][newPixel.yo] && color !== this.layer.getColorPixel(newPixel)) {
				this.stroke[newPixel.xo][newPixel.yo] = this.layer[at]({x : newPixel.xo, y : newPixel.yo}, color);
			}
		}
		lastPixel = newPixel;
	}
};
pencil.onMouseUp = function (evt) {
	$(window).off('mouseup.up');
	$(window).off('mouseout.leave');
	if (this.clicked) {
		this.clicked = false;
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (!this.stroke[newPixel.xo][newPixel.yo] && color !== this.layer.getColorPixel(newPixel)) {
			this.stroke[newPixel.xo][newPixel.yo] = this.layer[at]({x : newPixel.xo, y : newPixel.yo}, color);
		}
		lastPixel = undefined;
		Layers.paintLayer(this.layer.index);
		this.layer.frame.paint();
		console.log(this.stroke);
		Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke}, 0));
	}
};
module.exports = () => Editor.addTool(pencil);
