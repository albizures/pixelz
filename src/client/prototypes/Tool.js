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
Tool.prototype.clonePixel = function (pixel) {
	return {
		cord : pixel.cord.clone(),
		color : pixel.color
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
		while (this.layer.getColorPixel(cord) == oldColor && cord.less(0, 1).y >= 0) {
			pixelPos -= this.layer.width * 4;
		}
		while (cord.y < this.layer.height - 1 && this.layer.getColorPixel(cord.sum(0, 1)) == oldColor) {
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
Tool.prototype.paintLineBetween = function (pixel1, pixel2) {
	pixel1 = this.clonePixel(pixel1);
	pixel2 = this.clonePixel(pixel2);
	let diff = pixel1.cord.diffAbs(pixel2.cord, true),
			err = diff.x - diff.y;

	while (true) {
		let tempPoint = this.clonePixel(pixel1);
		this.layer.paintAt(tempPoint.cord, tempPoint.color); // Do what you need to for this
		if ((pixel1.cord.x == pixel2.cord.x) && (pixel1.cord.y == pixel2.cord.y)) {
			break;
		}
		let e2 = 2 * err;
		if (e2 > -diff.y) {
			err -= diff.y; pixel1.cord.x  += diff.sx;
		}
		if (e2 < diff.x) {
			err += diff.x; pixel1.cord.y  += diff.sy;
		}
	}
};
module.exports = Tool;
