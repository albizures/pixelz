'use strict';
const { imageSmoothing } = require('../utils.js'),
			{ TRANSPARENT_COLOR } = require('../constants'),
			{ UPDATE_LAYER } = require('../constants').events;
//console.log(new Frame(), Frame.prototype);
function Layer(frame, index, bitmap, status) {
	this.frame = frame;
	this.index = index;
	this.status = status;
	this.bitmap = bitmap || this.newEmptyBitmap();
	this.init();
}
Layer.prototype = {
	constructor : Layer,
	get canvas () {
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
	this.context = document.createElement('canvas').getContext('2d');
	imageSmoothing(this.context, false);
	this.context.canvas.width = this.sprite.width;
	this.context.canvas.height = this.sprite.height;
	this.paint();
};
Layer.prototype.delete = function () {
	this.frame.deleteLayer(this.index);
};
Layer.prototype.getIMG = function () {
	let image = document.createElement('img');
	image.src = this.context.canvas.toDataURL();
	return image;
};
Layer.prototype.newEmptyBitmap = function () {
	let newBitmap = new Array(this.sprite.width);

	for (let i = 0 ; i < newBitmap.length ; i++) {
		newBitmap[i] = new Array(this.sprite.height);
	}
	return newBitmap;
};
Layer.prototype.cloneBitmap = function () {
	let newBitmap = [];
	for (let i = 0; i < this.bitmap.length; i++) {
		newBitmap.push(this.bitmap[i].slice(0));
	}
	return newBitmap;
};
Layer.prototype.validCord = function (cord) {
	return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Layer.prototype.paintAt = function (cord, color, realCord) {
	if (!this.validCord(cord)) {
		return;
	}
	this.bitmap[cord.x][cord.y] = color;
	this.context.fillStyle = color;
	this.context.clearRect(cord.x, cord.y, 1, 1);
	this.context.fillRect(cord.x, cord.y, 1, 1);
	if (!realCord) {
		realCord = this.canvas.cordFrameToPaint(cord);
	}
	this.canvas.drawAt(realCord, color);
	//Editor.events.fire('paint', realCord, color);
};
Layer.prototype.paint = function () {
	for (let x = 0; x < this.bitmap.length; x++) {
		for (let y = 0; y < this.bitmap[x].length; y++) {
			this.context.fillStyle = this.bitmap[x][y] || TRANSPARENT_COLOR;
			this.context.clearRect(x, y, 1, 1);
			this.context.fillRect(x, y, 1, 1);
		}
	}
	this.frame.paint(true);
};
Layer.prototype.paintStroke = function (listCords) {
	for (let i = 0; i < listCords.length; i++) {
		this.paintAt(listCords[i].layer, listCords[i].color, listCords[i].paint);
	}
	this.frame.paint();
};
Layer.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Layer;
