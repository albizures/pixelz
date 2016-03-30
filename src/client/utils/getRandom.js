'use strict';
const rand = function (max) {
	return Math.floor(Math.random() * max);
}
module.exports.RGB = function () {
	return 'rgb(' + rand(255) + ', ' + rand(255) + ', ' + rand(255) + ')';
}
module.exports.hex = function () {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[rand(16)];
	}
	return color;
}
