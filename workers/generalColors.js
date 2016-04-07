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

	eval("'use strict';\r\n\r\nconst walkBitmap = __webpack_require__(1);\r\n\r\nself.addEventListener('message', onMessage);\r\n\r\nfunction onMessage(evt) {\r\n\tlet colors = getColors(evt.data);\r\n\tthis.postMessage(colors);\r\n}\r\n\r\nfunction getColors(bitmaps) {\r\n\tlet obj = {}, array = [];\r\n\tfor (let i = 0; i < bitmaps.length; i++) {\r\n\t\twalkBitmap(bitmaps[i], onWalk);\r\n\t}\r\n\tfunction onWalk(item, x, y) {\r\n\t\tif (!obj[item]) {\r\n\t\t\tarray.push(item);\r\n\t\t\tobj[item] = true;\r\n\t\t}\r\n\t}\r\n\treturn {obj : obj, array : array};\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/eslint-loader!./~/jscs-loader!./src/client/workers/generalColors.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/workers/generalColors.js?./~/eslint-loader!./~/jscs-loader");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\nmodule.exports = function (bitmap, fn) {\n\tfor (var x = 0; x < bitmap.length; x++) {\n\t\tfor (var y = 0; y < bitmap[x].length; y++) {\n\t\t\tfn(bitmap[x][y], x, y);\n\t\t}\n\t}\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/client/utils/walkBitmap.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/utils/walkBitmap.js?");

/***/ }
/******/ ]);