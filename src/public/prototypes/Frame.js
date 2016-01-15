'use strict';
const { imageSmoothing } = require('../utils.js'),
			{ TRANSPARENT_COLOR } = require('../constants'),
			Layer = require('./Layer.js'),
			{ UPDATE, CHANGE_FRAME } = require('../constants').frames;

function Frame(sprite, index, status, layers) {
	this.sprite = sprite;
	this.index = index;
	this.status = status;
	this.layers = layers || [new Layer(this, 0)];
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
Frame.prototype.cloneBitmap = function (index) {
	let newBitmap = [];
	for (let i = 0; i < this.bitmap.length; i++) {
		newBitmap.push(this.bitmap[i].slice(0));
	}
	return newBitmap;
};
Frame.prototype.validCord = function (cord) {
	return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Frame.prototype.paintAt = function (cord, color, realCord,index) {
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
	for (let i = 0; i < this.layers.length; i++) {
		let layer = this.layers[i];
		this.context.drawImage(layer.context.canvas,
			0, 0, this.width, this.height,
			0, 0, this.width, this.height
		);
	}
	Editor.events.fire(CHANGE_FRAME, UPDATE, this.index, this.sprite);
};
Frame.prototype.paintStroke = function (listCords,index) {
	for (let i = 0; i < listCords.length; i++) {
		this.paintAt(listCords[i].frame, listCords[i].color, listCords[i].paint);
	}
	Editor.events.fire(CHANGE_FRAME, UPDATE, this.index, this.sprite);
};
Frame.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Frame;
