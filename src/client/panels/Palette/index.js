'use strict';
const {TRANSPARENT_COLOR, PALETTE} = require('../../constants/index.js'),
	{CHANGE_COLOR} = require('../../constants/index.js').palette,
	Panel = require('../../prototypes/Panel.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel,
	Tools = require('../Tools.js'),
	Vector = require('../../prototypes/Vector.js'),
	Color = require('../../prototypes/Color.js'),
	divColors = document.createElement('div'),
	Palette = new Panel(PALETTE, SNAP, new Vector(100, 60), 15, 20, R);

let time = 0.5 * 1000, loop, index = 0, ctx,
		colors = ['rgba(26, 188, 156, 1)', 'rgba(241, 196, 15, 1)', 'rgba(52, 152, 219, 1)', 'rgba(230, 126, 34, 1)', 'rgba(231, 76, 60, 1)', 'rgba(189, 195, 199, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(127, 140, 141, 1)'],
		currentColors;

Palette.mainInit = function () {
	this.el.appendChild(divColors);
	Tools.setPrimaryColor(colors[0]);
	Tools.setSecudaryColor(TRANSPARENT_COLOR);
	this.generateColors([]);
};
Palette.generateColors = function (colors) {
	divColors.innerHTML = '';
	for (let i = 0; i < colors.length; i++) {
		let color = new Color(colors[i], i == 0);
		color.appendTo(divColors);
	}
};
Palette.setCurretColors = function (colors) {
	currentColors = colors;
	this.generateColors(colors.array);
};
Palette.getCurrentColors = function () {
	return currentColors;
};

module.exports = Palette;
