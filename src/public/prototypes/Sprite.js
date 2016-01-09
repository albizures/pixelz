'use strict';
const Frame = require('./Frame.js'),
			{ADD, DELETE, UPDATE, CHANGE_FRAME,SELECT_FRAME} = require('../constants').frames;
function Sprite(width, height) {
	this.width = width;
	this.height = height;
	this.frames = [];
	this.frames.push(new Frame(this, 0, undefined, true));
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
				currentIndex = Editor.canvas.artboard.frame.index;
		this.reIndexing();
		Editor.events.fire(CHANGE_FRAME, DELETE, index, this);
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
Sprite.prototype.addFrame = function (indexClone, newIndex) {
	let bitmap, frame;

	if (hasVal(indexClone) && hasVal(this.frames[indexClone])) {
		bitmap = this.frames[indexClone].cloneBitmap();
		if (!hasVal(newIndex)) {
			newIndex = ++indexClone;
		}
	}

	if (hasVal(newIndex)) {
		frame = new Frame(this, newIndex, bitmap, true);
		let tempFrames = this.frames.splice(newIndex);
		this.frames = this.frames.concat([frame], tempFrames);
		this.reIndexing();
	}else {
		newIndex = this.frames.length;
		frame = new Frame(this, newIndex, bitmap, true);
		this.frames[newIndex] = frame;
	}
	Editor.events.fire(CHANGE_FRAME, ADD, newIndex, this);
	Editor.events.fire(SELECT_FRAME, this.frames[newIndex]);
	return frame;
};

module.exports = Sprite;
