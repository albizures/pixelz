'use strict';
const Tool = require('../prototypes/Tool.js'),
		{MIDDLE_CLICK,RIGHT_CLICK,LEFT_CLICK,TRANSPARENT_COLOR} = require('../constants'),
			Vector = require('../prototypes/Vector.js');
let lastP,
		pencil = new Tool('pencil');
pencil.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		pencil.clicked = true;
	}
};
pencil.onMouseMove = function (evt) {

	if (pencil.clicked) {
		console.log(evt);
		let positions = pencil.canvas.calculatePosition(new Vector(evt.clientX, evt.clientY));
		positions.color = evt.which === RIGHT_CLICK ? Editor.palette.getSecondColor() : Editor.palette.getMainColor();
		if (positions.out && this.stroke.length == 0) {
			return;
		}
		if (positions.out && this.stroke.length > 1 && this.stroke[this.stroke.length - 1].out) {
			return;
		}
		if (this.stroke.length !== 0 && !this.stroke[this.stroke.length - 1].out && this.stroke[this.stroke.length - 1].frame.importantDiff(positions.frame)) {
			this.getLineBetween(this.stroke[this.stroke.length - 1], positions);
		}else {
			pencil.canvas.previewAt(positions.paint, positions.color);
			this.addPointStroke(positions);
		}

	}
};
pencil.onMouseUp = function (evt) {
	if (pencil.clicked) {
		let positions = pencil.canvas.calculatePosition(new Vector (evt.clientX, evt.clientY));
		positions.color = evt.which === RIGHT_CLICK ? Editor.palette.getSecondColor() : Editor.palette.getMainColor();
		if (!positions.out) {
			this.addPointStroke(positions);
		}
		pencil.canvas.artboard.frame.paintStroke(this.cleanStroke());
		pencil.clicked = false;
	}
};
module.exports = () => Editor.addTool(pencil);
