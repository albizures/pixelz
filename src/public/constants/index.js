'use strict';
module.exports = {
	HEIGHT_DEF : 60,
	WIDTH_DEF : 60,
	SCALE_DEF : 10,
	TRANSPARENT_COLOR : 'rgba(0,0,0,0)',
	TRANSPARENT_COLOR_VALUE : '',
	SIZE_POINTER_DEF : 1,
	COLOR_POINTER_PREW_DEF : 'rgba(255,255,255,0.6)',
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
module.exports.frames = {
	ADD : 1,
	DELETE : 2,
	UPDATE : 3,
	CHANGE_FRAME : 'changeFrame'
};
module.exports.sprite = {
	CHANGE_SPRITE : 'changeSprite'
};
