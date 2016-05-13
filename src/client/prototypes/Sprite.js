'use strict';
const Frame = require('./Frame.js'),
	Palette = require('../panels/Palette'),
	Gif = require('./gif/gif.js'),
	colors = require('../workers/colors.js')(),
	{ downloadBlob } = require('../utils'),
	Preview = require('../panels/Preview.js');

function Sprite(width, height) {
	this.width = width;
	this.height = height;
	this.frames = [];
	this.frames.push(new Frame(this, 0, true));
	Preview.selectSprite(this);
}
Sprite.prototype.getFrame = function (index) {
	return this.frames[index];
};
Sprite.prototype.deleteFrame = function (index) {
	if (this.frames.length == 1) {
		// TODO: create alert
		alert('can\'t delete last frames');
		return false;
	} else {
		let frameDelete = this.frames.splice(index, 1)[0];
		this.reIndexing();
		if (frameDelete && frameDelete.index == Editor.canvas.artboard.layer.frame.index) {
			if (this.frames.length <= index) {
				index--;
			}
			this.frames[index].select();
		}
		return true;
	}
};
Sprite.prototype.getTransparentColor = function (cb) {
	let dataList = [], self = this;
	for (let i = 0; i < this.frames.length; i++) {
		dataList.push(this.frames[i].imageData.data);
	}
	colors.postMessage({type : 'transparent', data : dataList});
	colors.onmessage = onGetTransparentColor.bind(this);

	function onGetTransparentColor(evt) {
		if (cb) {
			self.transparentColor = evt.data;
			cb(evt.data);
		}
	}
};
Sprite.prototype.getAllDataImage = function () {
	let dataList = [];
	for (let i = 0; i < this.frames.length; i++) {
		dataList = dataList.concat(this.frames[i].getDataList());
	}
	return dataList;
};
Sprite.prototype.getGeneralColors = function (cb) {
	let dataList = this.getAllDataImage();
	colors.postMessage({type : 'general', data : dataList});
	colors.onmessage =  onGetGeneralColors.bind(this);

	function onGetGeneralColors(evt) {
		cb(evt.data);
	}
};
Sprite.prototype.generateGif = function (scale) {
	let gif = new Gif({
		quality: 1,
		repeat: 0,
		height: this.height * scale,
		width: this.width * scale,
		preserveColors: true
	});
	gif.on('finished', function (blob) {
		//downloadBlob(blob, 'test');
		window.open(URL.createObjectURL(blob));
	});
	if (Editor.timeoutGetTransparentColor) {
		Editor.addCallbackGetColor(generate.bind(this));
	} else {
		//transparent = parseInt(this.transparentColor.substring(1), 16);
		generate.call(this, this.transparentColor);
	}

	function generate(color) {
		let transparent = color;
		for (let i = 0; i < this.frames.length; i++) {
			gif.addFrame(this.frames[i].generatePreview(scale, transparent), {
				transparent : parseInt(transparent.substring(1), 16)
			});
		}
		gif.render();
	}

};
Sprite.prototype.reIndexing = function () {
	for (let i = 0; i < this.frames.length; i++) {
		this.frames[i].index = i;
	}
};
Sprite.prototype.resize = function (width, height, content, x, y) {
	this.width = width;
	this.height = height;
	for (let i = 0; i < this.frames.length; i++) {
		this.frames[i].resize(content, x, y);
	}
	Preview.selectSprite(this);
};
Sprite.prototype.moveFrame = function (oldIndex, newIndex) {
	let frame = this.frames.splice(oldIndex, 1),
		tempFrames;
	Preview.stop();
	tempFrames = this.frames.splice(newIndex);
	this.frames = this.frames.concat(frame, tempFrames);
	this.reIndexing();
	Preview.selectFrame();
	Preview.start();
};
Sprite.prototype.paint = function () {};
Sprite.prototype.selectFrame = function (frame) {
	if (Number.isInteger(frame)) {
		frame = this.frames[frame];
	} else if (!(frame instanceof Frame)) {
		throw new Error();
	}
	frame.select();
};
Sprite.prototype.addFrame = function (frameClone, newIndex) {
	let clone = false,
		newFrame;
	if (frameClone instanceof Frame) {
		clone = true;
	} else if (Number.isInteger(frameClone)) {
		clone = true;
		frameClone = this.frames[frameClone];
	}
	if (!Number.isInteger(newIndex)) {
		newIndex = clone ? frameClone.index + 1 : this.frames.length;
	}
	newFrame = clone ? frameClone.clone() : new Frame(this, newIndex, true);
	if (clone) {
		newFrame.index = newIndex;
		newFrame.layers = frameClone.cloneLayers(newFrame);
	}

	let tempFrames = this.frames.splice(newIndex);

	if (tempFrames.length !== 0) {
		this.frames = this.frames.concat([newFrame], tempFrames);
		this.reIndexing();
	} else {
		this.frames.push(newFrame);
	}
	if (clone) {
		newFrame.init();
	}
	newFrame.select();
	newFrame.paint();
	return newFrame;
};
Sprite.prototype.putImagesData = function (data) {
	for (let f = 0; f < data.length; f++) {
		let layers = data[f];
		for (let l = 0; l < layers.length; l++) {
			this.frames[f].layers[l].context.putImageData(layers[l], 0, 0);
		}
	}
};

module.exports = Sprite;
