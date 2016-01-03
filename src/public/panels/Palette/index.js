'use strict';
const {
		TRANSPARENT_COLOR,
		PALETTE
} = require('../../constants');
const { CHANGE_COLOR } = require('../../constants').palette;
const Panel = require('../../prototypes/Panel.js'),
			Color = require('../../prototypes/Palette/Color.js'),
			pickers = require('./pickers.js');

let time = 0.5 * 1000,loop,index = 0,ctx;
let colors = ['#1abc9c','#f1c40f','#3498db','#e67e22','#e74c3c','#bdc3c7','#9b59b6','#34495e','#7f8c8d'],
		mainColor,secondColor = TRANSPARENT_COLOR;
const inputColor = document.createElement('input');
inputColor.classList.add('input-color');
const divColors = document.createElement('div');
const Palette = Panel(PALETTE);
Palette.mainInit = function () {
  inputColor.id = 'palette';

  divColors.style.height = '50px';
  divColors.style.width = '200px';

  this.div.style.bottom = '100px';
  this.div.style.right = '300px';
  this.div.appendChild(divColors);
  this.div.appendChild(inputColor);
	inputColor.style.background = mainColor = colors[0];
  this.generateColors();
	pickers.callbackUpdate = this.changeColor;
	pickers.appendTo(this.div);
};
Palette.generateColors = function () {
  for (let i = 0; i < colors.length; i++) {
		let color = new Color(colors[i], i == 0);
		color.appendTo(divColors);
    $(color).on('click.color',this.onClickColor.bind(color));
  }
};
Palette.onClickColor = function (evt) {
	e.stopImmediatePropagation();
	Editor.events.fire(CHANGE_COLOR,this.color);
  mainColor = this.color;
  return false;
};
Palette.changeColor = function (color) {
  mainColor = inputColor.style.background = inputColor.value = color;
};
Palette.getMainColor = function () {
	return mainColor;
};

module.exports = () => Editor.addPanel(Palette);
