'use strict';
const Tool = require('../prototypes/Tool.js'),
	{
		MIDDLE_CLICK,
		RIGHT_CLICK,
		LEFT_CLICK,
		TRANSPARENT_COLOR
	} = require('../constants'),
	abs = Math.abs,
	actions = require('../constants').actions,
	Action = require('../prototypes/Action.js'),
	Vector = require('../prototypes/Vector.js'),
	pencil = new Tool('pencil');
let lastPixel, color, lineBetween, at;
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.stroke = [];
		this.clicked = true;
		lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		color = evt.which === RIGHT_CLICK ? Editor.getPanel('Tools').getSecondColor() : Editor.getPanel('Tools').getPrimaryColor();
		if (color == TRANSPARENT_COLOR) {
			at = 'cleanAt';
		} else {
			at = 'paintAt';
		}
	}
};
pencil.onMouseMove = function (evt) {
	if (this.clicked) {
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		if (abs(lastPixel.y - newPixel.y) > 1 || abs(lastPixel.x - newPixel.x) > 1) { // importantDiff
			this.lineBetween(lastPixel.x, lastPixel.y, newPixel.x, newPixel.y, color, at);
		} else {
			if (color !== this.layer.getColorPixel(newPixel)) {
				this.addPixelStroke(this.layer[at](new Vector(newPixel.x, newPixel.y), color));
			}
		}
		lastPixel = newPixel;
	}
};
let a = 0;
pencil.onMouseUp = function (evt) {
	if (this.clicked) {
		this.clicked = false;
		lastPixel = undefined;
		Editor.getPanel('Layers').paintLayer(this.layer.index);
		this.layer.frame.paint();
		Editor.getPanel('Actions').addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke} , 0));
	}
};
module.exports = () => Editor.addTool(pencil);
