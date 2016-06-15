'use strict';
const {
	HEX,
	RGBA_PER,
  RGBA,
  ABBR_HEX,
  NAC,
  DEFAULT_COLOR,
	HSL
} = require('./constants').colors,
	abbrHex = /^#([a-fA-F0-9]{3})$/,
	hex = /^#([a-fA-F0-9]{6})$/,
	rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	perRgba = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;

function isValid(color) {
	return NAC !== detectType(color);
}
function detectType(color) {
	if (isAbbrHex(color)) {
		return ABBR_HEX;
	}else if (isHex(color)) {
		return HEX;
	}else if (isRGBA(color)) {
		return RGBA;
	}else if (isRGBAPer(color)) {
		return RGBA_PER;
	}else if (isHSL(color)) {
		return HSL;
	}else {
		return NAC;
	}
}
function isAbbrHex(color) {
	return color.match(abbrHex) || false;
}
function isHex(color) {
	return color.match(hex) || false;
}
function isRGBA(color) {
	return color.match(rgba) || false;
}
function isRGBAPer(color) {
	return color.match(perRgba) || false;
}
function isHSL(color) {
	return color.match(hsl) || false;
}
function colorIsLight(r, g, b) {
	var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	console.log(a);
	return (a < 0.5);
}
module.exports = {
	colorIsLight
};
