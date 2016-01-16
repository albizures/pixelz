'use strict';
const Frame = require('./Frame.js'),
			{ADD_FRAME, DELETE_FRAME, UPDATE_FRAME, SELECT_FRAME} = require('../constants').events;
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
Sprite.prototype.addFrame = function (indexClone, newIndex) {
	let frame;

	if (hasVal(indexClone) && hasVal(this.frames[indexClone])) {
		if (!hasVal(newIndex)) {
			newIndex = indexClone + 1;
		}
	}

	if (hasVal(newIndex)) {
		// TODO: clone layers
		frame = new Frame(this, newIndex);
		frame.layers = this.frames[indexClone].cloneLayers(frame);
		let tempFrames = this.frames.splice(newIndex);
		this.frames = this.frames.concat([frame], tempFrames);
		this.reIndexing();
	}else {
		newIndex = this.frames.length;
		frame = new Frame(this, newIndex, bitmap);
		this.frames[newIndex] = frame;
	}
	frame.paint(true);
	Editor.events.fire(ADD_FRAME, newIndex, this);
	Editor.events.fire(SELECT_FRAME, this.frames[newIndex]);
	return frame;
};

module.exports = Sprite;
