'use strict';

const Panel = require('../prototypes/Panel.js'),
			PreviewFrame = require('../prototypes/Frames/PreviewFrame.js'),
			Frames = new Panel('Frames'),
			{CHANGE_SPRITE} = require('../constants').sprite,
			{ADD, DELETE, UPDATE, CHANGE_FRAME, SELECT_FRAME} = require('../constants').frames,
			ul =  document.createElement('ul'),
			btnAdd = document.createElement('button');
let index = 0, frames = [], currentFrame = 0;
Frames.mainInit = function () {
	btnAdd.textContent = 'add frame';
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
	switch (type) {
		case ADD : {
			this.addFrame(index, sprite);
			break;
		}
		case DELETE : {
			frames[index].remove();
			frames.splice(index, 1);
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
Frames.selectFrame = function (frame,remove) {
	if (!remove) {
		frames[currentFrame].selectFrame();
	}
	frames[frame.index].selectFrame();
	currentFrame = frame.index;
};
Frames.getIndex = function () {
	return index;
};
Frames.addFrame = function (index, sprite) {
	frames[index] = new PreviewFrame(sprite.frames[index],index == currentFrame);
	frames[index].appendTo(ul);
};
module.exports = () => Editor.addPanel(Frames);
