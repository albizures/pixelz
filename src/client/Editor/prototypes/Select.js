'use strict';
const {imageSmoothing} = require('utils/canvas.js');

/**
 * Prototype of select
 * @class
 * @param {object} cord
 * @param {number} width
 * @param {number} height
 * @param {object} source
 */
function Select(cord, width, height, source) {
	if (width < 0) {
		cord.x += width;
		width = Math.abs(width);
	}
	if (height < 0) {
		cord.y += height;
		height = Math.abs(height);
	}
	this.originalCord = this.cord = cord;
	this.originalWidth = this.width = width;
	this.originalHeight = this.height = height;
	this.source = source;
	this.context = document.createElement('canvas').getContext('2d');
	imageSmoothing(this.context, false);
	this.context.canvas.width = Math.abs(width);
	this.context.canvas.height = Math.abs(height);
	this.context.drawImage(source.context.canvas,
		cord.x, cord.y, width, height,
		0, 0, width, height
	);
}
Select.prototype.insideSelect = function (cord) {
	return cord.x >= this.cord.x && cord.x <= this.cord.x + this.width && cord.y >= this.cord.y && cord.y <= this.cord.y + this.height;
};

module.exports = Select;
