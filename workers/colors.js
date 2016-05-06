/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\nconst walkBitmap = __webpack_require__(1),\n\trgbToHex = __webpack_require__(2),\n\tunusedColor = __webpack_require__(3);\n\nself.onmessage = function (evt) {\n\tvar dataReturn;\n\tswitch (evt.data.type) {\n\t\tcase 'general': {\n\t\t\tdataReturn = getColors(evt.data.data);\n\t\t\tbreak;\n\t\t}\n\t\tcase 'transparent': {\n\t\t\tdataReturn = getTransparent(evt.data.data);\n\t\t\tbreak;\n\t\t}\n\t}\n\tthis.postMessage(dataReturn);\n};\n\nfunction getColors(bitmaps) {\n\tlet obj = {},\n\t\tarray = [];\n\tfor (let i = 0; i < bitmaps.length; i++) {\n\t\twalkBitmap(bitmaps[i], onWalk);\n\t}\n\n\tfunction onWalk(item, x, y) {\n\t\tif (!obj[item]) {\n\t\t\tarray.push(item);\n\t\t\tobj[item] = true;\n\t\t}\n\t}\n\treturn {\n\t\tobj: obj,\n\t\tarray: array\n\t};\n}\n\n\nfunction getTransparent(listData) {\n\tlet obj = {},\n\t\ttransparent;\n\tfor (let b = 0; b < listData.length; b++) {\n\t\tlet data = listData[b];\n\t\tfor (let i = 0, n = data.length; i < n; i += 4) {\n\t\t\tlet r = data[i],\n\t\t\t\tg = data[i + 1],\n\t\t\t\tb = data[i + 2],\n\t\t\t\tcolor = r + '.' + g + '.' + b;\n\t\t\tif (!obj[color]) {\n\t\t\t\tobj[color] = true;\n\t\t\t}\n\t\t}\n\t}\n\ttransparent = unusedColor(obj);\n\treturn rgbToHex(transparent.r, transparent.g, transparent.b);\n}\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/eslint-loader!./~/jscs-loader!./src/client/workers/colors.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/workers/colors.js?./~/eslint-loader!./~/jscs-loader");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\nmodule.exports = function (bitmap, fn) {\n\tfor (var x = 0; x < bitmap.length; x++) {\n\t\tfor (var y = 0; y < bitmap[x].length; y++) {\n\t\t\tfn(bitmap[x][y], x, y);\n\t\t}\n\t}\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/walkBitmap.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/walkBitmap.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nfunction componentToHex(c) {\n\tvar hex = Number(c).toString(16);\n\treturn hex.length == 1 ? \"0\" + hex : hex;\n}\n\nmodule.exports = function (r, g, b) {\n\tconsole.log(r, g, b);\n\treturn \"#\" + componentToHex(r) + componentToHex(g) + componentToHex(b);\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/rgbToHex.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/rgbToHex.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar colors = ['255.0.255', '0.255.0', '255.255.0', '0.255.255'];\n\nmodule.exports = function (usedColors) {\n\n\tfor (var i = 0; i < colors.length; i++) {\n\t\tif (!usedColors[colors[i]]) {\n\t\t\tvar components = colors[i].split('.');\n\t\t\treturn { r: components[0], g: components[1], b: components[2] };\n\t\t}\n\t}\n\n\tfor (var r = 0; r < 255; r++) {\n\t\tfor (var g = 0; g < 255; g++) {\n\t\t\tfor (var b = 0; b < 255; b++) {\n\t\t\t\tif (!usedColors[r + '.' + g + '.' + b]) {\n\t\t\t\t\treturn { r: r, g: g, b: b };\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/unusedColor.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/unusedColor.js?");

/***/ }
/******/ ]);