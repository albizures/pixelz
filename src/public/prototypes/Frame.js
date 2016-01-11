'use strict';
const { imageSmoothing } = require('../utils.js'),
			{ TRANSPARENT_COLOR } = require('../constants'),
			{ UPDATE, CHANGE_FRAME } = require('../constants').frames;

function Frame(sprite, index, bitmap, status) {
	this.sprite = sprite;
	this.index = index;
	this.status = status;
	this.bitmap = bitmap || this.newEmptyBitmap();
	this.init();
}
Frame.prototype = {
	constructor : Frame,
	get canvas () {
		return Editor.canvas;
	},
	get imageData() {
		return this.context.getImageData(0, 0, this.sprite.width, this.sprite.height);
	},
	get width() {
		return this.sprite.width;
	},
	get height() {
		return this.sprite.height;
	}
};
Frame.prototype.init = function () {
	this.context = document.createElement('canvas').getContext('2d');
	imageSmoothing(this.context, false);
	this.context.canvas.width = this.sprite.width;
	this.context.canvas.height = this.sprite.height;
	this.paint();
};
Frame.prototype.delete = function () {
	this.sprite.deleteFrame(this.index);
};
Frame.prototype.getIMG = function () {
	let image = document.createElement('img');
	image.src = this.context.canvas.toDataURL();
	return image;
};
Frame.prototype.newEmptyBitmap = function () {
	let newBitmap = new Array(this.sprite.width);

	for (let i = 0 ; i < newBitmap.length ; i++) {
		newBitmap[i] = new Array(this.sprite.height);
	}
	return newBitmap;
};
Frame.prototype.cloneBitmap = function () {
	let newBitmap = [];
	for (let i = 0; i < this.bitmap.length; i++) {
		newBitmap.push(this.bitmap[i].slice(0));
	}
	return newBitmap;
};
Frame.prototype.validCord = function (cord) {
	return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Frame.prototype.paintAt = function (cord, color, realCord) {
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
	Editor.events.fire('paint', realCord, color);
};
Frame.prototype.paint = function () {
	for (let x = 0; x < this.bitmap.length; x++) {
		for (let y = 0; y < this.bitmap[x].length; y++) {
			this.context.fillStyle = this.bitmap[x][y] || TRANSPARENT_COLOR;
			this.context.clearRect(x, y, 1, 1);
			this.context.fillRect(x, y, 1, 1);
		}
	}
};
Frame.prototype.paintStroke = function (listCords) {
	for (let i = 0; i < listCords.length; i++) {
		this.paintAt(listCords[i].frame, listCords[i].color, listCords[i].paint);
	}
	Editor.events.fire(CHANGE_FRAME, UPDATE, this.index, this.sprite);
};
Frame.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Frame;
