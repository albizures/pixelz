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

	eval("'use strict';\r\n\r\nconst rgbToHex = __webpack_require__(1),\r\n\tunusedColor = __webpack_require__(2);\r\n\r\nself.addEventListener('message', onMessage);\r\n\r\nfunction onMessage(evt) {\r\n\tlet colors = getColors(evt.data), transparent;\r\n\ttransparent = unusedColor(colors);\r\n\tthis.postMessage(rgbToHex(transparent.r, transparent.g, transparent.b));\r\n}\r\nfunction getColors(listData) {\r\n\tlet obj = {}, array = [];\r\n\tfor (let b = 0; b < listData.length; b++) {\r\n\t\tlet data = listData[b];\r\n\t\tfor (let i = 0, n = data.length; i < n; i += 4) {\r\n\t\t\tlet r  = data[i],\r\n\t\t\tg = data[i + 1],\r\n\t\t\tb = data[i + 2],\r\n\t\t\tcolor = r + '.' + g + '.' + b;\r\n\t\t\tif (!obj[color]) {\r\n\t\t\t\tarray.push(color);\r\n\t\t\t\tobj[color] = true;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\treturn {obj : obj, array : array};\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/eslint-loader!./~/jscs-loader!./src/client/workers/transparentColor.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/workers/transparentColor.js?./~/eslint-loader!./~/jscs-loader");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nfunction componentToHex(c) {\n\tvar hex = c.toString(16);\n\treturn hex.length == 1 ? \"0\" + hex : hex;\n}\n\nmodule.exports = function (r, g, b) {\n\treturn \"#\" + componentToHex(r) + componentToHex(g) + componentToHex(b);\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/rgbToHex.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/rgbToHex.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar colors = ['255.0.255', '0.255.0', '255.255.0', '0.255.255'];\n\nmodule.exports = function (usedColors) {\n\n\tfor (var i = 0; i < colors.length; i++) {\n\t\tif (!usedColors.obj[colors[i]]) {\n\t\t\tvar components = colors[i].split('.');\n\t\t\treturn { r: components[0], g: components[1], b: components[2] };\n\t\t}\n\t}\n\n\tfor (var r = 0; r < 255; r++) {\n\t\tfor (var g = 0; g < 255; g++) {\n\t\t\tfor (var b = 0; b < 255; b++) {\n\t\t\t\tif (!usedColors.obj[r + '.' + g + '.' + b]) {\n\t\t\t\t\treturn { r: r, g: g, b: b };\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/unusedColor.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/unusedColor.js?");

/***/ }
/******/ ]);