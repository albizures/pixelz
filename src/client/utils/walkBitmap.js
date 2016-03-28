'use strict';

module.exports = function (bitmap, fn) {
	for (let x = 0; x < bitmap.length; x++) {
		for (let y = 0; y < bitmap[x].length; y++) {
			fn(bitmap[x][y], x, y);
		}
	}
};
