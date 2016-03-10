'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR, actions } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			Action = require('../prototypes/Action.js'),
			bucket = new Tool('bucket');
let color,oldColor;
bucket.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.stroke = new Array(this.layer.width);
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
		let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		color = evt.which === RIGHT_CLICK ? Editor.getPanel('Tools').getSecondColor() : Editor.getPanel('Tools').getPrimaryColor();
		oldColor = this.layer.getColorPixel(newPixel);
		if (oldColor && color !== oldColor) {
			this.fill(newPixel, color, oldColor, color == TRANSPARENT_COLOR ? 'cleanAt' : 'paintAt');
			this.layer.frame.paint();
			Editor.getPanel('Actions').addUndo(new Action(actions.PAINT, {layer : this.layer, stroke : this.stroke}, 0));
		}
	}
};
bucket.onMouseMove = function (evt) {};
bucket.onMouseUp = function (evt) {};

module.exports = () => Editor.addTool(bucket);
