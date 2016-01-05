'use strict';
const Frame = require('./Frame.js'),
			{ADD, DELETE, UPDATE, CHANGE_FRAME} = require('../constants').frames;
function Sprite(width, height) {
	this.width = width;
	this.height = height;
	this.frames = [];
	this.frames.push(new Frame(this, 0, undefined, true));
}
Sprite.prototype.getFrame = function (index) {
	return this.frames[index];
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
	return frame;
};

module.exports = Sprite;
