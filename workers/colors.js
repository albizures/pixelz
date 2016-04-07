/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const walkBitmap = __webpack_require__(1),
		rgbToHex = __webpack_require__(2),
		unusedColor = __webpack_require__(3);
	
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
		let objB = {},
			arrayB = [];
		for (let i = 0; i < bitmaps.length; i++) {
			walkBitmap(bitmaps[i], onWalk);
		}
	
		function onWalk(item, x, y) {
			if (!objB[item]) {
				arrayB.push(item);
				objB[item] = true;
			}
		}
		return {
			objB: objB,
			arrayB: arrayB
		};
	}
	
	
	function getTransparent(listData) {
		let objB = {},
			transparent;
		for (let b = 0; b < listData.length; b++) {
			let data = listData[b];
			for (let i = 0, n = data.length; i < n; i += 4) {
				let r = data[i],
					g = data[i + 1],
					b = data[i + 2],
					color = r + '.' + g + '.' + b;
				if (!objB[color]) {
					objB[color] = true;
				}
			}
		}
		transparent = unusedColor(objB);
		return rgbToHex(transparent.r, transparent.g, transparent.b);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (bitmap, fn) {
		for (var x = 0; x < bitmap.length; x++) {
			for (var y = 0; y < bitmap[x].length; y++) {
				fn(bitmap[x][y], x, y);
			}
		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	function componentToHex(c) {
		var hex = Number(c).toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	
	module.exports = function (r, g, b) {
		console.log(r, g, b);
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var colors = ['255.0.255', '0.255.0', '255.255.0', '0.255.255'];
	
	module.exports = function (usedColors) {
	
		for (var i = 0; i < colors.length; i++) {
			if (!usedColors[colors[i]]) {
				var components = colors[i].split('.');
				return { r: components[0], g: components[1], b: components[2] };
			}
		}
	
		for (var r = 0; r < 255; r++) {
			for (var g = 0; g < 255; g++) {
				for (var b = 0; b < 255; b++) {
					if (!usedColors[r + '.' + g + '.' + b]) {
						return { r: r, g: g, b: b };
					}
				}
			}
		}
	};

/***/ }
/******/ ]);