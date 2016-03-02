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
Frames.deletePreview = function (index) {
	if (!previewFrames[index]) {
		return;
	}
	if (previewFrames[index + 1] && previewFrames[index + 1].frame.index == index) {
		previewFrames[index].changeFrame(this.sprite.frames[index]);
		this.deletePreview(index + 1);
	} else {
		previewFrames[index].remove();
		previewFrames.splice(index, 1);
	}
};
Frames.paintFrame = function (index) {
	previewFrames[index].paint();
};
Frames.addFrame = function () {
	console.info('addFrame');
	this.sprite.addFrame();
};
Frames.selectFrame = function (index) {
	console.log(previewFrames, index);
	if (previewFrames[currentFrame]) {
		previewFrames[currentFrame].unSelectFrame();
	}
	previewFrames[index].selectFrame();
	currentFrame = index;
};
Frames.addPreview = function (frame) {
	if (previewFrames[frame.index]) {
		if (previewFrames[frame.index].frame.index !== frame.index) {
			this.addPreview(previewFrames[frame.index].frame);
			previewFrames[frame.index].changeFrame(frame);
		} else {
			return;
		}
	} else {
		previewFrames[frame.index] = new PreviewFrame(frame, frame.index == currentFrame).appendTo(ul);
	}
};
Frames.reAppend = function () {
	for (let i = 0; i < previewFrames.length; i++) {
		previewFrames[i].remove();
		previewFrames[i].appendTo(ul);
	}
};
module.exports = () => Editor.addPanel(Frames);
