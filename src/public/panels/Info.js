'use strict';

const Panel = require('../prototypes/Panel.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
			{CHANGE_SPRITE} = require('../constants').events,
			Info = new Panel('Info', SNAP, BR);

Info.mainInit = function () {
	this.el.style['z-index'] = '9999';
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
