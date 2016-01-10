'use strict';

const Panel = require('../prototypes/Panel.js'),
			PreviewFrame = require('../prototypes/Frames/PreviewFrame.js'),
			Frames = new Panel('Frames'),
			{CHANGE_SPRITE} = require('../constants').sprite,
			{ADD, DELETE, UPDATE, CHANGE_FRAME, SELECT_FRAME} = require('../constants').frames,
			ul =  document.createElement('ul'),
			btnAdd = document.createElement('button');
let index = 0, frames = [], currentFrame = 0;
btnAdd.textContent = 'add frame';
btnAdd.classList.add('add-frame');
Frames.mainInit = function () {

	ul.id = 'preview-frames';

	this.div.appendChild(btnAdd);
	this.div.appendChild(ul);
	Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
	Editor.events.on(CHANGE_FRAME + '.' + this.name, this.changeFrame, this);
	Editor.events.on(SELECT_FRAME + '.' + this.name, this.selectFrame, this);
};
Frames.changeSprite = function (sprite) {
	$(btnAdd).on('click.add', sprite.addFrame.bind(sprite));
};
Frames.changeFrame = function (type, index, sprite) {
	console.log(arguments);
	switch (type) {
		case ADD : {
			this.addFrame(index, sprite);
			break;
		}
		case DELETE : {
			frames[index].remove();
			frames.splice(index, 1);
			this.reAppend();
			break;
		}
		case UPDATE : {
			this.updateFrame(index, sprite);
			break;
		}
	}
};
Frames.updateFrame = function (index, sprite) {
	frames[index].updatePreview();
};
Frames.addPreview = function () {
	sprite.addFrame(true);
};
Frames.selectFrame = function (frame) {
	if (frames[currentFrame]) {
		frames[currentFrame].unSelectFrame();
	}
	frames[frame.index].selectFrame();
	currentFrame = frame.index;
};
Frames.getIndex = function () {
	return index;
};
Frames.addFrame = function (index, sprite) {
	let newFrame = new PreviewFrame(sprite.frames[index], index == currentFrame);
	if (frames[index]) {
		let tempFrames = frames.splice(index);
		frames = frames.concat([newFrame], tempFrames);
		return this.reAppend();
	}
	frames[index] = newFrame;
	frames[index].appendTo(ul);
};
Frames.reAppend = function () {
	for (let i = 0; i < frames.length; i++) {
		frames[i].remove();
		frames[i].appendTo(ul);
	}
};
module.exports = () => Editor.addPanel(Frames);
