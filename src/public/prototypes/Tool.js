'use strict';
const AppendObject = require('../prototypes/AppendObject.js'),
		{ SELECT_TOOL } = require('../constants').events,
		{ inheritanceObject, defineGetter} = require('../utils.js');
function Tool(name) {
	this.$type = 'button';
	AppendObject.call(this, 'tool');
	this.name = name;
	this.el.textContent = this.name;
	this.stroke = [];
	this.el.addEventListener('click', this.selectTool.bind(this));
}
inheritanceObject(Tool, AppendObject);
defineGetter(Tool.prototype, 'canvas', function () {
	return Editor.canvas;
});
Tool.prototype.selectTool = function () {
	Editor.events.fire(SELECT_TOOL, this.name);
};
Tool.prototype.addPointStroke = function (point) {
	if (this.stroke.length == 0) {
		this.stroke.push(point);
	}else {
		let lastPoint = this.stroke[this.stroke.length - 1];
		if (point.frame.x !== lastPoint.frame.x || point.frame.y !== lastPoint.frame.y) {
			this.stroke.push(point);
		}
	}

};
Tool.prototype.cleanStroke = function () {
	let tempStroke = this.stroke;
	this.stroke = [];
	return tempStroke;
};
Tool.prototype.clonePoint = function (point) {
	return {
		frame : point.frame.clone(),
		paint : point.paint.clone(),
		out : point.out,
		color : point.color
	};
};
Tool.prototype.getConnectedColors = function (cord) {
	const dy = [-1, 0, 1, 0], dx = [0, 1, 0, -1], color = this.canvas.artboard.frame[cord.x][cord.y];
	for (let x = 0; x < dx.length; x++) {
		for (let y = 0; y < dy.length; y++) {
			console.log(dx[x], dy[y]);
		}
	}
};
Tool.prototype.getLineBetween = function (point1, point2) {
	point1 = this.clonePoint(point1);
	point2 = this.clonePoint(point2);
	let diff = point1.frame.diffAbs(point2.frame, true),
			err = diff.x - diff.y;

	while (true) {
		let tempPoint = this.clonePoint(point1);
		tempPoint.paint = this.canvas.cordFrameToPaint(tempPoint.frame);
		this.canvas.previewAt(tempPoint.paint, tempPoint.color);
		this.addPointStroke(tempPoint);  // Do what you need to for this
		if ((point1.frame.x == point2.frame.x) && (point1.frame.y == point2.frame.y)) {
			break;
		}
		let e2 = 2 * err;
		if (e2 > -diff.y) {
			err -= diff.y; point1.frame.x  += diff.sx;
		}
		if (e2 < diff.x) {
			err += diff.x; point1.frame.y  += diff.sy;
		}
	}
};
module.exports = Tool;
