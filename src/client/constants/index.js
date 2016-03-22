'use strict';
let img = document.createElement("img"),
		backgroundTransparent = document.createElement('canvas').getContext('2d'),
		scala = 0.3;
img.addEventListener('load', function () {
	let width = backgroundTransparent.canvas.width = this.width * scala,
			height = backgroundTransparent.canvas.height = this.height * scala;
	backgroundTransparent.drawImage(this, 0, 0, this.width, this.height, 0, 0, width, height);
});
backgroundTransparent.canvas.img = img;
img.src = '/assets/images/transparent.png';
module.exports = {
	HEIGHT_DEF : 20,
	WIDTH_DEF : 20,
	SCALE_DEF : 10,
	TRANSPARENT_IMG_URL : '/assets/images/transparent.png',
	TRANSPARENT_IMG : backgroundTransparent.canvas,
	TRANSPARENT_COLOR : 'rgba(0, 0, 0, 0)',
	TRANSPARENT_COLOR_VALUE : '',
	SIZE_POINTER_DEF : 1,
	COLOR_POINTER_PREW_DEF : 'rgba(255, 255, 255, 0.6)',
	SECOND_COLOR_POINTER_PREW_DEF : 'rgba(0, 0, 0, 0.2)',
	RIGHT_CLICK : 3,
	LEFT_CLICK : 1,
	MIDDLE_CLICK : 2,
	PALETTE : 'Palette',
	FRAMES : 'Frames'
};
module.exports.colors = {
	DEFAULT_COLOR : '#000',
	RGBA : 'rgba',
	RGBA_PER : 'rgbaPer',
	ABBR_HEX : 'abbrHex',
	HEX : 'hex',
	HSL : 'hsl',
	NAC : 'NaC'
};
module.exports.palette  = require("./palette.js");
module.exports.panels = require('./panels.js');
module.exports.events = require("./events.js");
module.exports.actions = require("./actions.js");
