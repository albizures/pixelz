'use strict';

const Editor = require('./Editor/index.js'),

	Left = require('./panels/Left.js'),
	Preview = require('./panels/Preview.js'),
	Palette = require('./panels/Palette/index.js'),
	Frames = require('./panels/Frames.js'),
	Info = require('./panels/Info.js'),
	Menus = require('./panels/Menus'),
	Actions = require('./panels/Actions.js'),
	NewProject = require('./panels/NewProject.js'),
	ColorPicker = require('./panels/ColorPicker.js'),
	Tools = require('./panels/Tools.js'),
	Layers = require('./panels/Layers.js'),
	Resize = require('./panels/Resize.js'),

	bucket = require('./tools/bucket.js'),
	eraser = require('./tools/eraser.js'),
	pick = require('./tools/pick.js'),
	rectangle = require('./tools/rectangle.js'),
	line = require('./tools/line.js'),
	pencil = require('./tools/pencil.js');

window.onload = () => {
	window.Editor = Editor;
	// panels
	Menus.$add();
	Left.$add();
	Preview.$add();
	Tools.$add();
	Frames.$add();
	Actions.$add();
	Palette.$add();
	Info.$add();
	NewProject.$add();
	Layers.$add();
	ColorPicker.$add();
	Resize.$add();

	//tools
	pencil();
	bucket();
	eraser();
	pick();
	rectangle();
	line();

	//init
	Editor.init();
};
// IDEA: http://jsfiddle.net/u2kJq/241/
// TODO: create prototype pixel and pixelStroke
// TODO: repaint canvas after the stroke is done
