'use strict';

const walkBitmap = require("../utils/walkBitmap.js");

//self.onmessage = onMessage;
self.addEventListener('message', onMessage);

function onMessage(evt) {
	let colors = getColors(evt.data);
	this.postMessage(colors);
}

function getColors(bitmaps) {
	let obj = {}, array = [];
	for (let i = 0; i < bitmaps.length; i++) {
		walkBitmap(bitmaps[i], onWalk);
	}
	function onWalk(item, x, y) {
		if (!obj[item]) {
			array.push(item);
			obj[item] = true;
		}
	}
	return {obj : obj, array : array};
}
