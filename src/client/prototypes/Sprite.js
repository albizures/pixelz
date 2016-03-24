'use strict';
const Frame = require('./Frame.js'),
	Preview = require('../panels/Preview.js'),
	{ADD_FRAME, DELETE_FRAME, UPDATE_FRAME, SELECT_FRAME} = require('../constants').events;
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
	}else {
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

Sprite.prototype.reIndexing = function () {
	for (let i = 0; i < this.frames.length; i++) {
		this.frames[i].index = i;
	}
};
Sprite.prototype.moveFrame = function (oldIndex, newIndex) {
	let frame = this.frames.splice(oldIndex, 1), tempFrames;
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

module.exports = Sprite;
