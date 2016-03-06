'use strict';
const Tool = require('../prototypes/Tool.js'),
	{
		MIDDLE_CLICK,
		RIGHT_CLICK,
		LEFT_CLICK,
		TRANSPARENT_COLOR
	} = require('../constants'),
	actions = require('../constants').actions,
	Action = require('../prototypes/Action.js'),
	Vector = require('../prototypes/Vector.js'),
	pencil = new Tool('pencil');
let lastPixel;
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.stroke = [];
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
			if (newPixel.color !== this.layer.getColorPixel(newPixel.cord)) {
				this.addPixelStroke(this.layer.paintAt(newPixel.cord, newPixel.color));
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
		Editor.getPanel('Actions').addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke} , 0));
	}
};
module.exports = () => Editor.addTool(pencil);
