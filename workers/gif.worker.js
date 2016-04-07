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

	eval("const GIFEncoder = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"./GIFEncoder.js\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\n\r\nlet renderFrame = function (frame) {\r\n\tvar encoder, page, stream, transfer;\r\n\tencoder = new GIFEncoder(frame.width, frame.height);\r\n\tif (frame.index === 0) {\r\n\t\tencoder.writeHeader();\r\n\t} else {\r\n\t\tencoder.firstFrame = false;\r\n\t}\r\n\tencoder.setTransparent(frame.transparent);\r\n\tencoder.setRepeat(frame.repeat);\r\n\tencoder.setDelay(frame.delay);\r\n\tencoder.setQuality(frame.quality);\r\n\tencoder.setDither(frame.dither);\r\n\tencoder.setGlobalPalette(frame.globalPalette);\r\n\tencoder.setPreserveColors(frame.preserveColors);\r\n\tencoder.addFrame(frame.data);\r\n\tif (frame.last) {\r\n\t\tencoder.finish();\r\n\t}\r\n\tif (frame.globalPalette === true) {\r\n\t\tframe.globalPalette = encoder.getGlobalPalette();\r\n\t}\r\n\tstream = encoder.stream();\r\n\tframe.data = stream.pages;\r\n\tframe.cursor = stream.cursor;\r\n\tframe.pageSize = stream.constructor.pageSize;\r\n\tif (frame.canTransfer) {\r\n\t\ttransfer = (function () {\r\n\t\t\tvar i, len, ref, results;\r\n\t\t\tref = frame.data;\r\n\t\t\tresults = [];\r\n\t\t\tfor (i = 0, len = ref.length; i < len; i++) {\r\n\t\t\t\tpage = ref[i];\r\n\t\t\t\tresults.push(page.buffer);\r\n\t\t\t}\r\n\t\t\treturn results;\r\n\t\t})();\r\n\t\treturn self.postMessage(frame, transfer);\r\n\t} else {\r\n\t\treturn self.postMessage(frame);\r\n\t}\r\n};\r\n\r\nself.onmessage = function (event) {\r\n\treturn renderFrame(event.data);\r\n};\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/eslint-loader!./~/jscs-loader!./src/client/libs/gif/gif.worker.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/client/libs/gif/gif.worker.js?./~/eslint-loader!./~/jscs-loader");

/***/ }
/******/ ]);