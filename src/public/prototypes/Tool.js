'use strict';
const AppendObject = require('./AppendObject.js'),
			Vector = require('./Vector.js'),
			{ TRANSPARENT_COLOR } = require('../constants'),
			{ CHANGE_FRAME, UPDATE } = require('../constants').frames,
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
defineGetter(Tool.prototype, 'layer', function () {
	return Editor.canvas.artboard.layer;
});
Tool.prototype.selectTool = function () {
	Editor.events.fire(SELECT_TOOL, this.name);
};
Tool.prototype.addPointStroke = function (point) {
	if (this.stroke.length == 0) {
		this.stroke.push(point);
	}else {
		let lastPoint = this.stroke[this.stroke.length - 1];
		if (point.layer.x !== lastPoint.layer.x || point.layer.y !== lastPoint.layer.y) {
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
		layer : point.layer.clone(),
		paint : point.paint.clone(),
		out : point.out,
		color : point.color
	};
};
Tool.prototype.getConnectedColors = function (cord, paintColor) {
	const dx = [0, 1, 0, -1],
				dy = [-1, 0, 1, 0],
				bitmap = this.layer.bitmap,
				color = bitmap[cord.x][cord.y];//|| TRANSPARENT_COLOR;
	let newStroke = [],
			layerClone = this.layer.newEmptyBitmap(),
			queueMatch = [cord],
			loopCount = 0,
			cellCount = this.layer.width * this.layer.height;
	while (queueMatch.length > 0) {
		loopCount++;
		let currentMatch = queueMatch.pop();
		this.layer.paintAt(currentMatch, paintColor);
		for (let i = 0; i < 4; i++) {
			let x = currentMatch.x + dx[i],
					y = currentMatch.y + dy[i];
			if (this.layer.validCord(new Vector(x, y)) && color == bitmap[x][y] && layerClone[x][y] !== paintColor) {
				//console.log(x, y,queueMatch);
				let position = new Vector(x, y);
				layerClone[x][y] = paintColor;
				queueMatch.push(position);
			}
		}
		if (loopCount > 3 * cellCount) {
			console.log("loop breaker called");
			break;
		}
	}
	//Editor.events.fire(CHANGE_FRAME, UPDATE, this.layer.index, this.layer.sprite);
};
Tool.prototype.getLineBetween = function (point1, point2) {
	point1 = this.clonePoint(point1);
	point2 = this.clonePoint(point2);
	let diff = point1.layer.diffAbs(point2.layer, true),
			err = diff.x - diff.y;

	while (true) {
		let tempPoint = this.clonePoint(point1);
		tempPoint.paint = this.canvas.cordFrameToPaint(tempPoint.layer);
		this.canvas.previewAt(tempPoint.paint, tempPoint.color);
		this.addPointStroke(tempPoint);  // Do what you need to for this
		if ((point1.layer.x == point2.layer.x) && (point1.layer.y == point2.layer.y)) {
			break;
		}
		let e2 = 2 * err;
		if (e2 > -diff.y) {
			err -= diff.y; point1.layer.x  += diff.sx;
		}
		if (e2 < diff.x) {
			err += diff.x; point1.layer.y  += diff.sy;
		}
	}
};
module.exports = Tool;
