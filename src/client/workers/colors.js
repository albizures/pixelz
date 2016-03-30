'use strict';
const walkBitmap = require("../utils/walkBitmap.js"),
	rgbToHex = require("../utils/rgbToHex.js"),
	unusedColor = require("../utils/unusedColor.js");

self.onmessage = function (evt) {
	var dataReturn;
	switch (evt.data.type) {
		case 'general': {
			dataReturn = getColors(evt.data.data);
			break;
		}
		case 'transparent': {
			dataReturn = getTransparent(evt.data.data);
			break;
		}
	}
	this.postMessage(dataReturn);
};

function getColors(bitmaps) {
	let obj = {},
		array = [];
	for (let i = 0; i < bitmaps.length; i++) {
		walkBitmap(bitmaps[i], onWalk);
	}

	function onWalk(item, x, y) {
		if (!obj[item]) {
			array.push(item);
			obj[item] = true;
		}
	}
	return {
		obj: obj,
		array: array
	};
}


function getTransparent(listData) {
	let obj = {},
		transparent;
	for (let b = 0; b < listData.length; b++) {
		let data = listData[b];
		for (let i = 0, n = data.length; i < n; i += 4) {
			let r = data[i],
				g = data[i + 1],
				b = data[i + 2],
				color = r + '.' + g + '.' + b;
			if (!obj[color]) {
				obj[color] = true;
			}
		}
	}
	transparent = unusedColor(obj);
	return rgbToHex(transparent.r, transparent.g, transparent.b);
}
