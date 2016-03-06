// 'use strict';
const { imageSmoothing } = require('../utils.js'),
	{	TRANSPARENT_COLOR } = require('../constants');
//console.log(new Frame(), Frame.prototype);
function Layer(frame, index, status, context) {
	this.frame = frame;
	this.index = index;
	this.status = status;
	this.context = context || document.createElement('canvas').getContext('2d');
	this.bitmap = new Array(this.frame.width);
	for (let i = 0; i < this.bitmap.length; i++) {
		this.bitmap[i] = new Array(this.frame.height);
		for (var b = 0; b < this.bitmap[i].length; b++) {
			this.bitmap[i][b] = TRANSPARENT_COLOR;
		}
	}
	if (!context) {
		this.init();
	}
}
Layer.prototype = {
	constructor: Layer,
	get canvas() {
		return Editor.canvas;
	},
	get imageData() {
		return this.context.getImageData(0, 0, this.sprite.width, this.sprite.height);
	},
	get width() {
		return this.frame.width;
	},
	get height() {
		return this.frame.height;
	},
	get sprite() {
		return this.frame.sprite;
	}
};
Layer.prototype.init = function () {
	let tempData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
	imageSmoothing(this.context, false);
	this.context.canvas.width = this.width;
	this.context.canvas.height = this.height;
	this.context.putImageData(tempData, 0, 0);
	Editor.getPanel('Layers').addPreview(this);
};
Layer.prototype.delete = function () {
	if (this.frame.deleteLayer(this.index)) {
		Editor.getPanel('Layers').deletePreview(this.index);
	}
};
Layer.prototype.getIMG = function () {
	let image = document.createElement('img');
	image.src = this.context.canvas.toDataURL();
	return image;
};
Layer.prototype.clone = function (frame) {
	frame = frame || this.frame;
	return new Layer(frame, this.index, this.status, this.cloneContext());
};
Layer.prototype.select = function () {
	Editor.canvas.changeLayer(this);
	Editor.getPanel('Layers').createPreviewLayer();
	Editor.getPanel('Layers').selectLayer(this.index);
};
Layer.prototype.cloneContext = function () {
	let clone = this.context.canvas.cloneNode().getContext('2d');
	clone.drawImage(this.context.canvas, 0, 0);
	return clone;
};
Layer.prototype.validCord = function (cord) {
	return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Layer.prototype.getColorPixel = function (cord) {
	if (!this.validCord(cord)) {
		return;
	}
	let color = this.bitmap[cord.x][cord.y];
	return color;
};
Layer.prototype.cleanAt = function (cord) {
	let oldPixel = {};
	if (!this.validCord(cord)) {
		return;
	}
	oldPixel.color = this.getColorPixel(cord);
	oldPixel.cord = cord.clone();
	this.context.clearRect(cord.x, cord.y, 1, 1);
	this.canvas.cleanAt(cord, TRANSPARENT_COLOR);
	this.bitmap[cord.x][cord.y] = TRANSPARENT_COLOR;
	return oldPixel;
};
Layer.prototype.paintAt = function (cord, color) {
	let oldPixel = {};
	if (!this.validCord(cord)) {
		return;
	}
	oldPixel.color = this.bitmap[cord.x][cord.y];
	oldPixel.cord = cord.clone();
	this.context.fillStyle = color;
	this.context.fillRect(cord.x, cord.y, 1, 1);
	this.canvas.paintAt(cord, color);
	this.bitmap[cord.x][cord.y] = color;
	return oldPixel;
};
Layer.prototype.paintStroke = function (listCords) {
	let oldStroke = [];
	for (let i = 0; i < listCords.length; i++) {
		if (listCords[i].color == TRANSPARENT_COLOR) {
			oldStroke.push(this.cleanAt(listCords[i].cord));
		} else {
			oldStroke.push(this.paintAt(listCords[i].cord), listCords[i].color);
		}
	}
	Editor.getPanel('Layers').paintLayer(this.index);
	this.frame.paint();
	return {layer : this, stroke : oldStroke};
};
Layer.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Layer;
