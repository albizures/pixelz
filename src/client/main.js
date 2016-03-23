'use strict';

const Editor = require('./Editor/index.js'),
	Preview = require('./panels/Preview.js'),
	Palette = require('./panels/Palette/index.js'),
	Frames = require('./panels/Frames.js'),
	Info = require('./panels/Info.js'),
	Menus = require('./panels/Menus'),
	Actions = require('./panels/Actions.js'),
	NewProject = require('./panels/NewProject.js'),
	Tools = require('./panels/Tools.js'),
	Layers = require('./panels/Layers.js'),
	bucket = require('./tools/bucket.js'),
	eraser = require('./tools/eraser.js'),
	pick = require('./tools/pick.js'),
	pencil = require('./tools/pencil.js');

window.onload = () => {
	window.Editor = Editor;
	// panels
	Menus.$add();
	Preview.$add();
	Tools.$add();
	Frames.$add();
	Actions.$add();
	Palette.$add();
	Info.$add();
	NewProject.$add();
	Layers.$add();

	//tools
	pencil();
	bucket();
	eraser();
	pick();

	//init
	Editor.init();
};
// TODO: fix pencil and eraser click
// TODO: create prototype pixel and pixelStroke
// TODO: separete palette and color picker
// TODO: repaint canvas after the stroke is done
