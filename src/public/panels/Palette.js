'use strict';
const {
		TRANSPARENT_COLOR,
		PALETTE
	} = require('../constants.js');
const Panel = require('../prototypes/Panel.js'),
			utils = require("../utils.js");

let time = 0.5 * 1000,loop,index = 0,ctx;
let colors = ['red','#53664d'], mainColor = colors[0], secondColor = TRANSPARENT_COLOR;
const inputColor = document.createElement('input');
const divColors = document.createElement('div');
const Palette = Panel(PALETTE);
Palette.mainInit = function () {
  inputColor.id = 'palette';

  divColors.style.height = '50px';
  divColors.style.width = '200px';

  this.div.style.top = '300px';
  this.div.style.right = '30px';
  this.div.appendChild(divColors);
  this.div.appendChild(inputColor);
  this.generateColors();
};
Palette.generateColors = function () {
  for (let i = 0; i < colors.length; i++) {
    let color = document.createElement('div');
    color.style.background = colors[i];
    color.style.display = 'inline-block';
    color.style.height = color.style.width = '50px';
    divColors.appendChild(color);
    $(color).on('click.color',this.changeColor);
  }
};
Palette.changeColor = function (e) {
  e.stopImmediatePropagation();
  //e.preventDefault();
  //debugger;
  Editor.color = this.style.background;
  return false;
};
Palette.getMainColor = function () {
	return mainColor;
};

module.exports = () => Editor.addPanel(Palette);
