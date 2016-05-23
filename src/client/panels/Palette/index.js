'use strict';
const {TRANSPARENT_COLOR, PALETTE} = require('../../constants/index.js'),
	{CHANGE_COLOR} = require('../../constants/index.js').palette,
	make = require('make'),
	Panel = require('../../prototypes/Panel.js'),
	Tools = require('../Tools.js'),
	Vector = require('../../prototypes/Vector.js'),
	Color = require('../../prototypes/Color.js'),
	Palettes = require('./Palettes.js'),
	Palette = new Panel('Palette', Panel.SNAP, new Vector(100, 60), 15, 20, Panel.R);

let divColors;

Palette.mainInit = function () {
	let contentTools = make(['div', {parent : this.el, className: 'content-tools'}]);
	this.addButton = make(['button', {
		parent : contentTools,
		className : 'btn add-button'
	}, '+']);
	this.optionsButton = make(['button', {
		parent : contentTools,
		className: 'btn option-button'
	}, '=']);
	this.palette = Palettes.currentColorsPalette.appendTo(this.el);
	Tools.setPrimaryColor('rgba(0, 0, 0, 1)');
	Tools.setSecudaryColor(TRANSPARENT_COLOR);
	$(this.addButton).on('click.add', this.onClickAddButton.bind(this));
	$(this.optionsButton).on('click.add', () => {
		Palettes.changePalette(this.palette, this.setPalette.bind(this));
	});
};
Palette.onClickAddButton = function (evt) {
	this.palette.addColor();
};
Palette.setCurretColors = function (colors) {
	Palettes.currentColorsPalette.setColors(colors.array);
};
Palette.getCurrentColors = function () {
	return currentColors;
};
Palette.setPalette = function (palette = this.palette) {
	console.log(palette);
	this.palette.remove();
	this.palette = palette.appendTo(this.el);
};

module.exports = Palette;
