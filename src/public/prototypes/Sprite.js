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
		let frameDelete = this.frames.splice(index, 1);
		Editor.events.fire(CHANGE_FRAME, DELETE, index, this);
		for (let i = 0; i < this.frames.length; i++) {
			this.frames[i].index = i;
		}
		if (frameDelete[0] && frameDelete[0].selected) {
			if (index !== 0) {
				Editor.events.fire(SELECT_FRAME, this.frames[index - 1], true);
			}else {
				Editor.events.fire(SELECT_FRAME, this.frames[index], true);
			}
		}
	}
};
Sprite.prototype.addFrame = function (indexClone, newIndex) {
	let bitmap, frame, index;

	if (hasVal(indexClone) && hasVal(this.frames[indexClone])) {
		bitmap = this.frames[index].clone();
	}

	if (hasVal(newIndex)) {
		// TODO: Add frame in a specific index
		console.log('specific index');
	}else {
		index = this.frames.length;
		console.log(index);
		frame = new Frame(this, index, bitmap, true);
		this.frames[index] = frame;
	}
	Editor.events.fire(CHANGE_FRAME, ADD, index, this);
	Editor.events.fire(SELECT_FRAME, this.frames[index]);
	return frame;
};

module.exports = Sprite;
