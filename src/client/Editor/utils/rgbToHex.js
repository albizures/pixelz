'use strict';
function componentToHex(c) {
	var hex = Number(c).toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

module.exports = function (r, g, b) {
	console.log(r, g, b);
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
