'use strict';

const Panel = require('../prototypes/Panel.js'),
			{CHANGE_SPRITE} = require('../constants').sprite,
			Info = new Panel('Info');

Info.mainInit = function () {
	this.div.style['z-index'] = '9999';
	this.div.style.height = '50px';
	this.div.style.width = '100px';
	this.div.style.right = '0';
	this.div.style.bottom = '0';
	Editor.events.on(CHANGE_SPRITE + '.' + this.name, this.changeSprite, this);
};
Info.changeSprite = function (sprite) {
	var p = document.createElement('div');
	p.textContent = 'Width: ' + sprite.width;
	this.div.appendChild(p);
	p = document.createElement('div');
	p.textContent = 'Height: ' + sprite.height;
	this.div.appendChild(p);
	p = document.createElement('div');
	p.textContent = 'Frames: ' + sprite.frames.length;
	this.div.appendChild(p);
};
module.exports = () => Editor.addPanel(Info);
