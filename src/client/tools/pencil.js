'use strict';
const Tool = require('../prototypes/Tool.js'),
			{ MIDDLE_CLICK, RIGHT_CLICK,LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
			Vector = require('../prototypes/Vector.js'),
			pencil = new Tool('pencil');
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
	}
};
pencil.onMouseMove = function (evt) {
	if (this.clicked) {
		let positions = this.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		positions.color = evt.which === RIGHT_CLICK ? Editor.palette.getSecondColor() : Editor.palette.getMainColor();
		if (positions.out && this.stroke.length == 0) {
			return;
		}
		if (positions.out && this.stroke.length > 1 && this.stroke[this.stroke.length - 1].out) {
			return;
		}
		if (this.stroke.length !== 0 && !this.stroke[this.stroke.length - 1].out && this.stroke[this.stroke.length - 1].cord.importantDiff(positions.cord)) {
			this.getLineBetween(this.stroke[this.stroke.length - 1], positions);
		}else {
			this.canvas.previewAt(positions.cord, positions.color);
			this.addPointStroke(positions);
		}

	}
};
pencil.onMouseUp = function (evt) {
	if (this.clicked) {
		let positions = this.canvas.calculatePosition(new Vector (evt.clientX, evt.clientY));
		positions.color = evt.which === RIGHT_CLICK ? Editor.palette.getSecondColor() : Editor.palette.getMainColor();
		if (!positions.out) {
			this.addPointStroke(positions);
		}
		this.canvas.artboard.layer.paintStroke(this.cleanStroke());
		this.clicked = false;
	}
};
module.exports = () => Editor.addTool(pencil);
