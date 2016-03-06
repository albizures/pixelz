'use strict';

const make = require('./utils.js').make,
			Editor = require('./Editor/index.js'),
			Preview = require('./panels/Preview.js'),
			Palette = require('./panels/Palette/index.js'),
			Frames = require('./panels/Frames.js'),
			Info = require('./panels/Info.js'),
			Actions = require('./panels/Actions.js'),
			Tools = require('./panels/Tools.js'),
			Layers = require('./panels/Layers.js'),
			bucket = require('./tools/bucket.js'),
			eraser = require('./tools/eraser.js'),
			pick = require('./tools/pick.js'),
			pencil = require('./tools/pencil.js');

window.onload = () => {
	window.Editor = Editor;
	// panels
	Preview();
	Tools();
	Frames();
	Palette();
	Actions();
	//Info();
	Layers();

	//tools
	pencil();
	bucket();
	eraser();
	pick();

	//init
	Editor.init();
};

// TODO: change the way of add the panels and stop using Editor.getPanel
// TODO: create prototype pixel and pixelStroke
