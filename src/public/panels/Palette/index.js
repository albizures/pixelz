'use strict';
const {TRANSPARENT_COLOR, PALETTE} = require('../../constants'),
			{CHANGE_COLOR} = require('../../constants').palette,
			Panel = require('../../prototypes/Panel.js'),
			Color = require('../../prototypes/Palette/Color.js'),
			pickers = require('./pickers.js'),
			divColors = document.createElement('div'),
			inputColor = document.createElement('input'),
			Palette = new Panel(PALETTE);
let time = 0.5 * 1000,loop,index = 0,ctx,
		colors = ['#1abc9c','#f1c40f','#3498db','#e67e22','#e74c3c','#bdc3c7','#9b59b6','#34495e','#7f8c8d'],
		mainColor,secondColor = TRANSPARENT_COLOR;
inputColor.classList.add('input-color');

Palette.mainInit = function () {
	inputColor.id = 'palette';

	divColors.style.height = '50px';
	divColors.style.width = '200px';

	this.el.style.bottom = '100px';
	this.el.style.right = '300px';
	this.el.appendChild(divColors);
	this.el.appendChild(inputColor);
	inputColor.style.background = mainColor = colors[0];
	this.generateColors();
	pickers.callbackUpdate = this.changeColor;
	pickers.appendTo(this.el);
};
Palette.generateColors = function () {
	for (let i = 0; i < colors.length; i++) {
		let color = new Color(colors[i], i == 0);
		color.appendTo(divColors);
		$(color).on('click.color', this.onClickColor.bind(color));
	}
};
Palette.onClickColor = function (evt) {
	evt.stopImmediatePropagation();
	Editor.events.fire(CHANGE_COLOR, this.color);
	mainColor = this.color;
	return false;
};
Palette.changeColor = function (color) {
	mainColor = inputColor.style.background = inputColor.value = color;
};
Palette.getSecondColor = function () {
	return secondColor;
};
Palette.getMainColor = function () {
	return mainColor;
};

module.exports = () => Editor.addPanel(Palette);
