'use strict';
const{ imageSmoothing } = require('../utils.js'),
  { TRANSPARENT_COLOR } = require('../constants'),
	{ UPDATE_LAYER } = require('../constants').events;
//console.log(new Frame(), Frame.prototype);
function Layer(frame, index, status, context) {
	this.frame = frame;
	this.index = index;
	this.status = status;
	this.context = context || document.createElement('canvas').getContext('2d');
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
	imageSmoothing(this.context, false);
	this.context.canvas.width = this.width;
	this.context.canvas.height = this.height;
};
Layer.prototype.delete = function () {
	this.frame.deleteLayer(this.index);
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
	Editor.getPanel('Layers').selectLayer(this.index);
	Editor.canvas.changeLayer(this);
};
Layer.prototype.cloneContext = function () {
	let clone = this.context.canvas.cloneNode().getContext('2d');
	clone.drawImage(this.context.canvas, 0, 0);
	return clone;
};
Layer.prototype.validCord = function (cord) {
	return cord.x >= 0 && cord.x < this.width && cord.y >= 0 && cord.y < this.height;
};
Layer.prototype.paintAt = function (cord, color, realCord) {
	if (!this.validCord(cord)) {
		return;
	}
	this.context.fillStyle = color;
	this.context.clearRect(cord.x, cord.y, 1, 1);
	this.context.fillRect(cord.x, cord.y, 1, 1);
	if (!realCord) {
		realCord = this.canvas.cordFrameToPaint(cord);
	}
	this.canvas.drawAt(realCord, color);
	//Editor.events.fire('paint', realCord, color);
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
