'use strict';
const AppendObject = require('./AppendObject.js'),
			Vector = require('./Vector.js'),
			abs = Math.abs,
			{ TRANSPARENT_COLOR } = require('../constants'),
			{ SELECT_TOOL } = require('../constants').events,
			{ inheritanceObject, defineGetter} = require('../utils.js');
function Tool(name) {
	this.$type = 'button';
	AppendObject.call(this, 'tool');
	this.name = name;
	this.el.textContent = this.name[0];
	this.stroke = [];
	this.el.addEventListener('click', this.select.bind(this));
}
inheritanceObject(Tool, AppendObject);
defineGetter(Tool.prototype, 'canvas', function () {
	return Editor.canvas;
});
defineGetter(Tool.prototype, 'layer', function () {
	return Editor.canvas.artboard.layer;
});
Tool.prototype.onMouseUp = function () {};
Tool.prototype.onMouseMove = function () {};
Tool.prototype.onMouseDown = function () {};
Tool.prototype.addPixelStroke = function (pixel) {
	if (pixel) {
		this.stroke.push(pixel);
	}
};
Tool.prototype.select = function () {
	Editor.getPanel('Tools').changeCurrentTool(this.name);
};
Tool.prototype.clonePixel = function (pixel) {
	return {
		cord : pixel.cord.clone(),
		color : pixel.color
	};
};
Tool.prototype.fill = function (initCord, newColor, oldColor, fn) {
	// NOTE: http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
	let stack = [initCord], current, aside,
		numPixels,
		count = 0,
    dy = [-1, 0, 1, 0],
    dx = [0, 1, 0, -1];

	if (oldColor !== this.layer.getColorPixel(initCord)) {
		return;
	}
	numPixels = this.layer.width * this.layer.height;
	while (stack.length) {
		current = stack.pop();

		this.stroke[current.x][current.y] = this.stroke[current.x][current.y] || this.layer[fn]({x : current.x, y : current.y}, newColor);

		for (let i = 0; i < 4; i++) {
			aside = {x : current.x +  dx[i], y : current.y + dy[i]};
			if (oldColor === this.layer.getColorPixel(aside)) {
				stack.push(aside);
			}
		}
		if (count > 4 * numPixels) {
			break;
		}
	}
};
Tool.prototype.lineBetween = function (x1, y1, x2, y2, color, fn) {
	var dx = abs(x2 - x1),
		dy = abs(y2 - y1),
		sx = (x1 < x2) ? 1 : -1,
		sy = (y1 < y2) ? 1 : -1,
		err = dx - dy, e2;
	while (x1 !== x2 || y1 !== y2) {
		this.stroke[x1][y1] = this.stroke[x1][y1] ||  this.layer[fn]({x : x1, y : y1}, color);
		e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy; x1  += sx;
		}
		if (e2 < dx) {
			err += dx; y1  += sy;
		}
	}
	this.stroke[x1][y1] = this.stroke[x1][y1] || this.layer[fn]({x : x1, y : y1}, color);
};
module.exports = Tool;
