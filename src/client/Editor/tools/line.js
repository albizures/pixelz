'use strict';
const Tool = require('../prototypes/Tool.js'),
	{ RIGHT_CLICK, LEFT_CLICK, TRANSPARENT_COLOR } = require('../constants'),
	Vector = require('../prototypes/Vector.js'),
	Tools = require('../panels/Tools.js'),
	Action = require('../prototypes/Action.js'),
	actions = require('../constants').actions,
	Actions = require('../panels/Actions.js'),
	line = new Tool('line');
let firstPixel, lastPixel, color, at;
line.onMouseDown = function (evt) {
	if (evt.target.nodeName == 'CANVAS') {
		this.clicked = true;
		this.layer.saveStatus();
		this.stroke = new Array(this.layer.width);
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
		firstPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
		color = evt.which === RIGHT_CLICK ? Tools.getSecondColor() : Tools.getPrimaryColor();
		at = 'paintPrevAt';
		$(window).off('mouseup.upCanvas').on('mouseup.upCanvas', this.onMouseUp.bind(this));
		$(window).off('mouseout.leaveCanvas').on('mouseout.leaveCanvas', this.onMouseLeave.bind(this));
		$(window).off('mousemove.moveCanvas').on('mousemove.moveCanvas', this.onMouseMove.bind(this));
	}
};
line.onMouseLeave = function (evt) {
	let e = evt.toElement || evt.relatedTarget;
	if (e !== document.children[0]) {
		return;
	}
	let newPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	lastPixel = newPixel;
};
line.onMouseMove = function (evt) {
	lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	if (firstPixel.x != lastPixel.x || firstPixel.y != lastPixel.y) {
		Editor.canvas.cleanPrev();
		for (let i = 0; i < this.stroke.length; i++) {
			this.stroke[i] = [];
		}
		this.lineBetween(firstPixel.x, firstPixel.y, lastPixel.x, lastPixel.y, color, at);
	}
	//Editor.canvas.cleanPrev();
	// for (let i = 0; i < this.stroke.length; i++) {
	// 	this.stroke[i]
	// 	previewAt
	// }
};
line.onMouseUp = function (evt) {
	$(window).off('mouseup.upCanvas');
	$(window).off('mouseout.leaveCanvas');
	$(window).off('mousemove.moveCanvas');
	if (color == TRANSPARENT_COLOR) {
		at = 'cleanAt';
	} else {
		at = 'paintAt';
	}
	lastPixel = this.canvas.calculatePosition(evt.clientX, evt.clientY);
	for (let i = 0; i < this.stroke.length; i++) {
		this.stroke[i] = [];
	}
	this.lineBetween(firstPixel.x, firstPixel.y, lastPixel.x, lastPixel.y, color, at);
	Actions.addUndo(new Action(actions.PAINT, {layer : this.layer, data : this.layer.prevStatus}, 0));
	this.layer.paint();
};

module.exports = line;
