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
/***/ function(module, exports) {

	eval("'use strict';\r\n\r\nself.addEventListener('message', onMessage);\r\n\r\nfunction onMessage(evt) {\r\n\tlet colors = getColors(evt.data);\r\n\tthis.postMessage(colors);\r\n}\r\nfunction getColors(data) {\r\n\tlet obj = {}, array = [];\r\n\tfor(let i = 0, n = data.length; i < n; i += 4) {\r\n\t\t let r  = data[i],\r\n\t\t\tg = data[i + 1],\r\n\t\t\tb = data[i + 2],\r\n\t\t\t//a = data[i + 3],\r\n\t\t\tcolor = r + '.' + g + '.' + b;\r\n\t\tif (!obj[color]) {\r\n\t\t\tarray.push(color);\r\n\t\t\tobj[color] = true;\r\n\t\t}\r\n\t}\r\n\treturn {obj : obj, array : array};\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/eslint-loader!./~/jscs-loader!./src/client/workers/currentColors.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/workers/currentColors.js?./~/eslint-loader!./~/jscs-loader");

/***/ }
/******/ ]);