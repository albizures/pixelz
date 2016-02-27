'use strict';
const AppendObject = require('./AppendObject.js'),
			Vector = require('./Vector.js'),
			{ TRANSPARENT_COLOR } = require('../constants'),
			{ SELECT_TOOL } = require('../constants').events,
			{ inheritanceObject, defineGetter} = require('../utils.js');
function Tool(name) {
	this.$type = 'button';
	AppendObject.call(this, 'tool');
	this.name = name;
	this.el.textContent = this.name[0];
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
Tool.prototype.fill = function (initCord, newColor, oldColor) {
	// NOTE: http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
	let stack = [initCord];
	while (stack.length) {
		let cord = stack.pop(),
			pixelPos = (cord.y * this.layer.width + cord.x) * 4,
			reachLeft = false,
			reachRight = false;
		while (this.layer.getColorPixel(cord) == oldColor && cord.less(0, 1).y/*--*/ >= 0 ) {
			pixelPos -= this.layer.width * 4;
		}
		while (cord.y/*++*/ < this.layer.height - 1 && this.layer.getColorPixel(cord.sum(0, 1)) == oldColor) {
			// paint
			this.layer.paintAt(cord.clone(), newColor);
			if (cord.x > 0) {
				if (this.layer.getColorPixel(cord.clone().less(1, 0)) == oldColor) {
					if (!reachLeft) {
						stack.push(cord.clone().less(1, 0));
						reachLeft = true;
					}
				} else {
					reachLeft = false;
				}
			}
			if (cord.x < this.layer.width - 1) {
				if (this.layer.getColorPixel(cord.clone().sum(1, 0)) == oldColor) {
					stack.push(cord.clone().sum(1, 0));
					reachRight = true;
				} else {
					reachRight = false;
				}
			}
		pixelPos += this.layer.width * 4;
		}
	}

};
Tool.prototype.getLineBetween = function (point1, point2) {
	point1 = this.clonePoint(point1);
	point2 = this.clonePoint(point2);
	let diff = point1.layer.diffAbs(point2.layer, true),
			err = diff.x - diff.y;

	while (true) {
		let tempPoint = this.clonePoint(point1);
		tempPoint.paint = this.canvas.cordLayerToPaint(tempPoint.layer);
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
