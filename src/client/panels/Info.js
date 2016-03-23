'use strict';

const Panel = require('../prototypes/Panel.js'),
	Vector = require('../prototypes/Vector.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
	{CHANGE_SPRITE} = require('../constants').events,
	Info = new Panel('Info', SNAP, new Vector(100, 80), 15, 20, R);

Info.mainInit = function () {
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
module.exports = Info;
