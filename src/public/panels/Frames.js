'use strict';

const Panel = require('../prototypes/Panel.js'),
			{ make } = require('../utils.js'),
			{ADD_FRAME, DELETE_FRAME, UPDATE_FRAME, SELECT_FRAME} = require('../constants').events,
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
			PreviewFrame = require('../prototypes/Frames/PreviewFrame.js'),
			Vector = require('../prototypes/Vector.js'),
			Frames = new Panel('Frames', SNAP, new Vector(0, 0), 140, 70, TL),
			ul =	document.createElement('ul'),
			btnAdd = document.createElement('button');
let previewFrames = [], currentFrame = 0;
btnAdd.textContent = 'add frame';
btnAdd.classList.add('add-frame');
Frames.mainInit = function () {
	make([this.el,
		btnAdd,
		[ul, { id : 'preview-frames'}]
	]);
	//Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
	//Editor.events.on(CHANGE_FRAME + '.' + this.name, this.changeFrame, this);
	Editor.events.on(DELETE_FRAME + '.' + this.name, this.deleteFrame, this);
	Editor.events.on(UPDATE_FRAME + '.' + this.name, this.updateFrame, this);
	Editor.events.on(ADD_FRAME + '.' + this.name, this.addPreview, this);
	$(btnAdd).on('click.add', this.createFrame.bind(this));
};
Frames.createFrame = function () {
	this.sprite.addFrame();
};
Frames.changeFrame = function (type, index, sprite) {
	switch (type) {
		case ADD : {
			this.addFrame(index, sprite);
			break;
		}
		case DELETE : {

			break;
		}
		case UPDATE : {
			this.updateFrame(index, sprite);
			break;
		}
	}
};
Frames.deleteFrame = function (index) {
	previewFrames[index].remove();
	previewFrames.splice(index, 1);
	this.reAppend();
};
Frames.updateFrame = function (index, sprite) {
	previewFrames[index].updatePreview();
};
Frames.addFrame = function () {
	console.info('addFrame');
	sprite.addFrame(true);
};
Frames.selectFrame = function (index) {
	console.log(previewFrames, index);
	if (previewFrames[currentFrame]) {
		previewFrames[currentFrame].unSelectFrame();
	}
	previewFrames[index].selectFrame();
	currentFrame = index;
};
Frames.addPreview = function (index, sprite) {
	let newFrame = new PreviewFrame(sprite.frames[index], index == currentFrame);
	if (previewFrames[index]) {
		let tempFrames = previewFrames.splice(index);
		previewFrames = previewFrames.concat([newFrame], tempFrames);
		return this.reAppend();
	}
	previewFrames[index] = newFrame;
	previewFrames[index].appendTo(ul);
	previewFrames[index].updatePreview();
};
Frames.reAppend = function () {
	for (let i = 0; i < previewFrames.length; i++) {
		previewFrames[i].remove();
		previewFrames[i].appendTo(ul);
	}
};
module.exports = () => Editor.addPanel(Frames);
