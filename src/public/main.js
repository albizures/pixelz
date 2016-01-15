'use strict';

const Editor = require('./Editor'),
			Animator = require('./panels/Animator.js'),
			Palette = require('./panels/Palette'),
			Frames = require('./panels/Frames.js'),
			Info = require('./panels/Info.js'),
			Tools = require('./panels/Tools.js'),
			Layers = require('./panels/Layers.js'),
			bucket = require('./tools/bucket.js'),
			pencil = require('./tools/pencil.js');

window.onload = () => {
	window.Editor = Editor;
	//panels
	Animator();
	Tools();
	Frames();
	Palette();
	Info();
	Layers();

	//tools
	pencil();
	bucket();

	//init
	Editor.init();
};
