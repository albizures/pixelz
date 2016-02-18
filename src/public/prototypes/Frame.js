'use strict';
const { imageSmoothing } = require('../utils.js'),
	{ TRANSPARENT_COLOR } = require('../constants'),
	Layer = require('./Layer.js'),
	{ UPDATE_FRAME } = require('../constants').events;

function Frame(sprite, index, status, layers) {
	this.sprite = sprite;
	this.index = index;
	this.status = status;
	this.layers = layers || [new Layer(this, 0)];
	this.init();
}
Frame.prototype = {
	constructor : Frame,
	get canvas() {
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
	this.paint(true);
};
Frame.prototype.addLayer = function (indexClone, newIndex) {
	// TODO: add layers

	this.layers.push(new Layer(this, this.layers.length));
};
Frame.prototype.delete = function () {
	this.sprite.deleteFrame(this.index);
};
Frame.prototype.reIndexing = function () {
	for (let i = 0; i < this.layers.length; i++) {
		this.layers[i].index = i;
	}
};
Frame.prototype.cloneLayers = function (frame) {
	let layers = [];
	frame = frame || this;
	for (let i = 0; i < this.layers.length; i++) {
		let newLayer = this.layers[i].clone(frame);
		console.trace(newLayer.context.canvas.toDataURL());
		layers.push(newLayer);
	}
	return layers;
};
Frame.prototype.selectLayer = function (layer) {
  if (Number.isInteger(layer)) {
    layer = this.frames[layer];
  } else if (!(layer instanceof Layer)) {
    throw new Error();
  }
  layer.select();
};
Frame.prototype.select = function () {
	Editor.getPanel('Frames').selectFrame(this.index);
  this.layers[0].select();
  Editor.getPanel('Layers').updateLayers();
};
Frame.prototype.clone = function (sprite) {
	sprite = sprite || this.sprite;
	return new Frame(sprite, this.index, this.status);
};
Frame.prototype.addLayer = function (layerClone, newIndex) {
	let clone = false,
		newLayer;
	if (layerClone instanceof Layer) {
		clone = true;
	} else if (Number.isInteger(layerClone)) {
		clone = true;
		layerClone = this.layers[layerClone];
	}
	if (!Number.isInteger(newIndex)) {
		newIndex = clone? layerClone.index + 1 : this.layers.length;
	}
	newLayer = clone? layerClone.clone() : new Layer(this, newIndex, true);
	if (clone) {
		newLayer.index = newIndex;
		newLayer.context = layerClone.cloneContext(newLayer);
	}

	let tempLayers = this.layers.splice(newIndex);
	this.layers = this.layers.concat([newLayer], tempLayers);

	if (tempLayers.length !== 0) {
		this.reIndexing();
	}
	Editor.getPanel('Layers').updateLayers();
	return newLayer;
};
Frame.prototype.getIMG = function () {
	let image = document.createElement('img');
	image.src = this.context.canvas.toDataURL();
	return image;
};
Frame.prototype.paint = function (init) {
	for (let i = this.layers.length - 1; -1 < i; i--) {
		let layer = this.layers[i];
		// this.context.drawImage(layer.context.canvas,
		// 	0, 0, this.width, this.height,
		// 	0, 0, this.width, this.height
		// );
		this.context.drawImage(layer.context.canvas, 0, 0);
	}
	if (!init) {
		Editor.events.fire(UPDATE_FRAME, this.index, this.sprite);
	}
};
// Frame.prototype.paintStroke = function (listCords,index) {
// 	for (let i = 0; i < listCords.length; i++) {
// 		this.paintAt(listCords[i].frame, listCords[i].color, listCords[i].paint);
// 	}
// 	Editor.events.fire(CHANGE_FRAME, UPDATE, this.index, this.sprite);
// };
Frame.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Frame;
