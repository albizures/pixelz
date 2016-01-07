'use strict';

const Panel = require('../prototypes/Panel.js'),
			{imageSmoothingDisabled} = require('../utils.js'),
			{CHANGE_FRAME, DELETE} = require('../constants').frames,
			{CHANGE_SPRITE} = require('../constants').sprite,
			preview = document.createElement('canvas'),
			Animator = new Panel('Animator');
let time = 0.5 * 1000, loop, index = 0, ctx;


Animator.mainInit = function () {

	preview.id = 'preview-animate';
	ctx = preview.getContext('2d');

	this.div.appendChild(preview);
	Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
	Editor.events.on(CHANGE_FRAME + '.' + this.name, this.changeFrame, this);

};
Animator.changeFrame = function (type) {
	if (type == DELETE) {
		index = 0;
	}
};
Animator.changeSprite = function (sprite) {
	let perc; //percent
	if (sprite.width > sprite.height) {
		perc = $(this.div).width() / sprite.width;
	}else {
		perc = $(this.div).height() / sprite.height;
	}
	preview.width =  sprite.width * perc;
	preview.height =  sprite.height * perc;
	preview.style.marginTop = (($(this.div).height() - preview.height) / 2) + 'px';
	preview.style.marginLeft = (($(this.div).width() - preview.width) / 2) + 'px';
	this.start();
};
Animator.start = function () {
	loop = setInterval(function () {
		Animator.loop();
	}, time);
};
Animator.stop = function () {
	clearInterval(loop);
};
Animator.loop = function () {
	if (index == Editor.sprite.frames.length - 1) {
		index = -1;
	}
	index++;
	this.clean();
	imageSmoothingDisabled(ctx);
	ctx.drawImage(Editor.sprite.frames[index].getIMG(), 0, 0, preview.width, preview.height);
};
Animator.clean = function () {
	preview.height = preview.height;
};
module.exports = () => Editor.addPanel(Animator);
