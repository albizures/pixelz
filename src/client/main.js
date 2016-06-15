'use strict';

const Editor = require('./Editor/index.js'),



window.onload = () => {
	window.Editor = Editor;
	// panels


	//init
	Editor.init();
};
// IDEA: http://jsfiddle.net/u2kJq/241/
// TODO: create prototype pixel and pixelStroke
// TODO: repaint canvas after the stroke is done
