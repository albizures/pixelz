'use strict';

const Panel = require('../prototypes/Panel.js'),
			{CHANGE_SPRITE} = require('../constants').sprite,
			Info = new Panel('Info');

Info.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.el.style.height = '50px';
	this.el.style.width = '100px';
	this.el.style.right = '0';
	this.el.style.bottom = '0';
	Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
};
Info.changeSprite = function (sprite) {
	var p = document.createElement('div');
	p.textContent = 'Width: ' + sprite.width;
	this.el.appendChild(p);
	p = document.createElement('div');
	p.textContent = 'Height: ' + sprite.height;
	this.el.appendChild(p);
	p = document.createElement('div');
	p.textContent = 'Frames: ' + sprite.frames.length;
	this.el.appendChild(p);
};
module.exports = () => Editor.addPanel(Info);
