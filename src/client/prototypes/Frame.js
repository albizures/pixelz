'use strict';
const { imageSmoothing } = require('../utils.js'),
	{ TRANSPARENT_COLOR } = require('../constants'),
	Layer = require('./Layer.js'),
	{ UPDATE_FRAME } = require('../constants').events;

function Frame(sprite, index, status, layers, clone) {
	this.sprite = sprite;
	this.index = index;
	this.status = status;
	this.layers = layers || [new Layer(this, 0)];
	if (!clone) {
		this.init();
	}
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
	Editor.getPanel('Frames').addPreview(this);
	this.paint(true);
};
Frame.prototype.deleteLayer = function (index) {
	if (this.layers.length == 1) {
		// TODO: create alert
		alert('can\'t delete last frames');
		return false;
	}else {
		let layerDelete = this.layers.splice(index, 1)[0];
		this.reIndexing();
		if (layerDelete && layerDelete.index == Editor.canvas.artboard.layer.index) {
			if (this.layers.length <= index) {
				index--;
			}
			this.layers[index].select();
		}
		this.paint();
		return true;
	}
};
Frame.prototype.delete = function () {
	if (this.sprite.deleteFrame(this.index)) {
		Editor.getPanel('Frames').deletePreview(this.index);
	}
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
};
Frame.prototype.clone = function (sprite) {
	sprite = sprite || this.sprite;
	return new Frame(sprite, this.index + 1, this.status, this.cloneLayers(), true);
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
		newIndex = clone ? layerClone.index + 1 : this.layers.length;
	}
	newLayer = clone ? layerClone.clone() : new Layer(this, newIndex, true);
	if (clone) {
		newLayer.index = newIndex;
		//newLayer.context = layerClone.cloneContext();
	}

	let tempLayers = this.layers.splice(newIndex);

	if (tempLayers.length !== 0) {
		this.layers = this.layers.concat([newLayer], tempLayers);
		this.reIndexing();
	} else {
		this.layers.push(newLayer);
	}
	if (clone) {
		newLayer.init();
	}
	newLayer.select();
	Editor.getPanel('Layers').updateLayers();
	return newLayer;
};
Frame.prototype.getIMG = function () {
	let image = document.createElement('img');
	image.src = this.context.canvas.toDataURL();
	return image;
};
Frame.prototype.clean = function () {
	this.context.clearRect(0, 0,  this.context.canvas.width, this.context.canvas.height);
};
Frame.prototype.paint = function (init) {
	this.clean();
	for (let i = this.layers.length - 1; -1 < i; i--) {
		let layer = this.layers[i];
		this.context.drawImage(layer.context.canvas, 0, 0);
	}
	Editor.getPanel('Frames').paintFrame(this.index);
	this.sprite.paint();
};
Frame.prototype.generatePreview = function (scale) {
	return this.context;
};
module.exports = Frame;
