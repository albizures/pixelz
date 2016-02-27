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
		console.log(positions.color, this.layer.getColorPixel(positions.layer), positions.color !== this.layer.getColorPixel(positions.layer));
		if (!positions.out && positions.color !== this.layer.getColorPixel(positions.layer)) {
			this.fill(positions.layer, positions.color, this.layer.getColorPixel(positions.layer));
			this.layer.frame.paint();
		}
	}
};
bucket.onMouseMove = function (evt) {};
bucket.onMouseUp = function (evt) {};

module.exports = () => Editor.addTool(bucket);
