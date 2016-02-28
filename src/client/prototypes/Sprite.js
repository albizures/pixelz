'use strict';
const Frame = require('./Frame.js'),
			{ADD_FRAME, DELETE_FRAME, UPDATE_FRAME, SELECT_FRAME} = require('../constants').events;
function Sprite(width, height) {
	this.width = width;
	this.height = height;
	this.frames = [];
	this.frames.push(new Frame(this, 0, true));
	Editor.getPanel('Preview').selectSprite(this);
}
Sprite.prototype.getFrame = function (index) {
	return this.frames[index];
};
Sprite.prototype.deleteFrame = function (index) {
	if (this.frames.length == 1) {
		// TODO: create alert
		alert('can\'t delete last frames');
	}else {
		let frameDelete = this.frames.splice(index, 1),
				currentIndex = Editor.canvas.artboard.layer.frame.index;
		this.reIndexing();
		Editor.events.fire(DELETE_FRAME, index, this);
		if (frameDelete[0] && frameDelete[0].selected) {
			if (index !== 0) {
				Editor.events.fire(SELECT_FRAME, this.frames[index - 1]);
			}else {
				Editor.events.fire(SELECT_FRAME, this.frames[index]);
			}
		}else if (frameDelete[0] && frameDelete[0].index < currentIndex) {
			Editor.events.fire(SELECT_FRAME, this.frames[currentIndex - 1]);
		}
	}
};

Sprite.prototype.reIndexing = function () {
	for (let i = 0; i < this.frames.length; i++) {
		this.frames[i].index = i;
	}
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
	newFrame.select();
	newFrame.paint();
	return newFrame;
};

module.exports = Sprite;
