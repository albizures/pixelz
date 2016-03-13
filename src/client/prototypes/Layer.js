'use strict';
const { imageSmoothing } = require('../utils.js'),
	Layers = require('../panels/Layers.js'),
	{	TRANSPARENT_COLOR } = require('../constants');
//console.log(new Frame(), Frame.prototype);
function Layer(frame, index, status, context) {
	this.frame = frame;
	this.index = index;
	this.status = status;
	this.context = context || document.createElement('canvas').getContext('2d');
	this.bitmap = new Array(this.frame.width);
	for (let i = 0; i < this.bitmap.length; i++) {
		this.bitmap[i] = new Array(this.frame.height).fill(TRANSPARENT_COLOR);
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
	Layers.addPreview(this);
};
Layer.prototype.delete = function () {
	if (this.frame.deleteLayer(this.index)) {
		Layers.deletePreview(this.index);
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
	Layers.createPreviewLayer();
	Layers.selectLayer(this.index);
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
	return this.bitmap[cord.x][cord.y];
};
Layer.prototype.cleanAt = function (cord) {
	let tempColor;
	if (!this.validCord(cord)) {
		return;
	}
	tempColor = this.bitmap[cord.x][cord.y];
	this.context.clearRect(cord.x, cord.y, 1, 1);
	this.bitmap[cord.x][cord.y] = TRANSPARENT_COLOR;
	this.canvas.cleanAt(cord, TRANSPARENT_COLOR);
	return tempColor;
};
Layer.prototype.fillCleanAt = function (cord) {
	let tempColor;
	tempColor = this.bitmap[cord.x][cord.y];
	this.context.clearRect(cord.x, cord.y, 1, 1);
	this.bitmap[cord.x][cord.y] = TRANSPARENT_COLOR;
	return tempColor;
};
Layer.prototype.fillAt = function (cord, color) {
	let tempColor;
	tempColor = this.bitmap[cord.x][cord.y];
	this.context.fillStyle = color;
	this.context.fillRect(cord.x, cord.y, 1, 1);
	this.bitmap[cord.x][cord.y] = color;
	return tempColor;
};
Layer.prototype.paintAt = function (cord, color) {
	let tempColor;
	if (!this.validCord(cord)) {
		return;
	}
	tempColor = this.bitmap[cord.x][cord.y];
	this.context.fillStyle = color;
	this.context.fillRect(cord.x, cord.y, 1, 1);
	this.bitmap[cord.x][cord.y] = color;
	this.canvas.paintAt(cord, color);
	return tempColor;
};
Layer.prototype.paintStroke = function (listCords) {
	let oldStroke = new Array(listCords.length), item;
	for (let i = 0; i < oldStroke.length; i++) {
		oldStroke[i] = [];
	}
	for (let x = 0; x < listCords.length; x++) {
		for (let y = 0; y < listCords[x].length; y++) {
			if (item = listCords[x][y]) {
				if (item == TRANSPARENT_COLOR) {
					oldStroke[x][y] = this.cleanAt({x : x, y : y});
				} else {
					oldStroke[x][y] = this.paintAt({x : x, y : y}, item);
				}
			}
		}
	}
	Layers.paintLayer(this.index);
	this.frame.paint();
	return {layer : this, stroke : oldStroke};
};
Layer.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Layer;
