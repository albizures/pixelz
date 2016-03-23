'use strict';
const {TRANSPARENT_COLOR, PALETTE} = require('../../constants/index.js'),
			{CHANGE_COLOR} = require('../../constants/index.js').palette,
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../../constants/index.js').panels,
			Panel = require('../../prototypes/Panel.js'),
			Tools = require('../Tools.js'),
			Vector = require('../../prototypes/Vector.js'),
			Color = require('../../prototypes/Palette/Color.js'),
			pickers = require('./pickers.js'),
			divColors = document.createElement('div'),
			inputColor = document.createElement('input'),
			Palette = new Panel(PALETTE, SNAP, new Vector(100, 60), 20, 20, R);

let time = 0.5 * 1000, loop, index = 0, ctx,
		colors = ['rgba(26, 188, 156, 1)', 'rgba(241, 196, 15, 1)', 'rgba(52, 152, 219, 1)', 'rgba(230, 126, 34, 1)', 'rgba(231, 76, 60, 1)', 'rgba(189, 195, 199, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(127, 140, 141, 1)'];
inputColor.classList.add('input-color');

Palette.mainInit = function () {
	inputColor.id = 'palette';

	this.el.appendChild(divColors);
	this.el.appendChild(inputColor);
	Tools.setSecudaryColor(TRANSPARENT_COLOR);
	inputColor.style.background = Tools.setPrimaryColor(colors[0]);
	this.generateColors();
	pickers.callbackUpdate = this.changeColor;
	pickers.appendTo(this.el);
};
Palette.generateColors = function () {
	for (let i = 0; i < colors.length; i++) {
		let color = new Color(colors[i], i == 0);
		color.appendTo(divColors);
	}
};

module.exports = Palette;
