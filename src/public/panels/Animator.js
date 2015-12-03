'use strict';

const Panel = require("../prototypes/Panel.js");

const preview = document.createElement('canvas');
let time = 0.5 * 1000,loop,index = 0,ctx;

const Animator = new Panel('Animator');
Animator.mainInit = function () {
	let perc; //percent

	preview.id = 'preview-animate';
	ctx = preview.getContext('2d');
	if(Editor.sprite.width > Editor.sprite.height){
		perc = $(this.div).width() / Editor.sprite.width;

	}else{
		perc = $(this.div).height() / Editor.sprite.height;
	}
	preview.width =  Editor.sprite.width * perc;
	preview.height =  Editor.sprite.height * perc;
	preview.style.marginTop = (($(this.div).height() - preview.height) / 2) + 'px';
	preview.style.marginLeft = (($(this.div).width() - preview.width) / 2) + 'px';
	this.div.appendChild(preview);
	this.start();
}
Animator.start = function () {
	loop = setInterval(function () {
		Animator.loop();
	},time);
}
Animator.stop = function () {
	clearInterval(loop);
}
Animator.loop = function () {
	if(index == Editor.sprite.frames.length - 1) index = -1;
	index++;
	this.clean();
	ctx.drawImage(Editor.sprite.frames[index].getIMG(),0,0,preview.width,preview.height);
}
Animator.clean = function () {
	preview.height = preview.height;
}
module.exports = () => Editor.addPanel(Animator);
