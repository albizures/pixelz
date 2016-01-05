'use strict';

const Editor = require('./Editor'),
			Animator = require('./panels/Animator.js'),
			Palette = require('./panels/Palette'),
			Frames = require('./panels/Frames.js'),
			Info = require('./panels/Info.js'),
			pencil = require('./tools/pencil.js');

window.onload = () => {
	window.Editor = Editor;
	//tools
	pencil();

	//panels
	Animator();
	Frames();
	Palette();
	Info();

	//init
	Editor.init();
};
