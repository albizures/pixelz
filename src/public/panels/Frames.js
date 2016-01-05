'use strict';

const Panel = require('../prototypes/Panel.js'),
			PreviewFrame = require('../prototypes/Frames/PreviewFrame.js'),
			Frames = new Panel('Frames'),
			{CHANGE_SPRITE} = require('../constants').sprite,
			{ADD, DELETE, UPDATE, CHANGE_FRAME} = require('../constants').frames,
			ul =  document.createElement('ul'),
			btnAdd = document.createElement('button');
let index = 0, frames = {};
Frames.mainInit = function () {
	btnAdd.textContent = 'add frame';
	ul.id = 'preview-frames';

	this.div.appendChild(btnAdd);
	this.div.appendChild(ul);
	Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
	Editor.events.on(CHANGE_FRAME + '.' + this.name, this.changeFrame, this);
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
			break;
		}
		case UPDATE : {
			this.updateFrame(index, sprite);
			break;
		}
	}
};
Frames.updateFrame = function (index, sprite) {
	//imageSmoothingDisabled(frames[index].context);
	frames[index].updatePreview();

};
Frames.addPreview = function () {
	sprite.addFrame(true);
};
Frames.getIndex = function () {
	return index;
};
Frames.addFrame = function (index, sprite) {
	//let li = document.createElement('li');
	//ul.appendChild(li);
	//let context = document.createElement('canvas').getContext('2d');
	//console.log(new PreviewFrame(sprite.frames[index],ul.clientWidth));
	// if(sprite.width > sprite.height){
	// 	context.canvas.width = sizePreview;
	// 	percentPreview = sizePreview / sprite.width;
	// 	context.canvas.height = sprite.height * percentPreview;
	// }else {
	// 	context.canvas.height = sizePreview;
	// 	percentPreview = sizePreview / sprite.height;
	// 	context.canvas.width = sprite.width * percentPreview;
	// }
	//li.appendChild(context.canvas);
	//$(li).on('click.frame',changeFrame(sprite.frames[index]).bind(Editor.canvas));
	//context.canvas.width = sprite.width;
	//context.canvas.height = sprite.height;
	frames[index] = new PreviewFrame(sprite.frames[index]);
	frames[index].appendTo(ul);
};
module.exports = () => Editor.addPanel(Frames);
