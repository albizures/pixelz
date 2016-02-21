'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			bucket = new Tool('bucket');

bucket.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		let positions = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		positions.color = evt.which === RIGHT_CLICK ? Editor.palette.getSecondColor() : Editor.palette.getMainColor();
		if (!positions.out && positions.color !== this.layer.bitmap[positions.layer.x][positions.layer.y]) {
			this.getConnectedColors(positions.layer, positions.color);
			this.layer.frame.paint();
		}
	}
};
bucket.onMouseMove = function (evt) {};
bucket.onMouseUp = function (evt) {};

module.exports = () => Editor.addTool(bucket);
