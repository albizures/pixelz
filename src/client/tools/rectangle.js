'use strict';
const Tool = require('../prototypes/Tool.js'),
	{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
	Vector = require('../prototypes/Vector.js'),
	Tools = require('../panels/Tools.js'),
	rectangle = new Tool('rectangle');
let firstPixel, lastPixel, color, at;
rectangle.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		firstPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
		at = 'paintPrevAt';
		$(window).on('mouseup.up', this.onMouseUp.bind(this));
		//$(window).on('mouseout.leave', this.onMouseLeave.bind(this));
	}
};
rectangle.onMouseMove = function (evt) {
	lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	if (firstPixel.x != lastPixel.x || firstPixel.y != lastPixel.y) {
		this.getRectangle(firstPixel, lastPixel, color, at);
	}
	//Editor.canvas.cleanPrev();
	// for (let i = 0; i < this.stroke.length; i++) {
	// 	this.stroke[i]
	// 	previewAt
	// }
};
rectangle.onMouseUp = function (evt) {
	$(window).off('mouseup.up');
	//$(window).off('mouseout.leave');
	if (color == TRANSPARENT_COLOR) {
		at = 'cleanAt';
	} else {
		at = 'paintAt';
	}
	lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	this.getRectangle(firstPixel, lastPixel, color, at);
	console.log(firstPixel, lastPixel);
};

module.exports = () => Editor.addTool(rectangle);
