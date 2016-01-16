'use strict';
const {createDiv, createSpan} = require('../utils.js'),
			AppendObject = require('./AppendObject.js'),
			{ defineGetter, inheritanceObject } = require('../utils.js');
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001
function Panel(name) {
	this.name = name;
	AppendObject.call(this, 'panel', 'panel-' + this.name.toLowerCase());
}
inheritanceObject(Panel, AppendObject);

defineGetter(Panel.prototype, 'layers', function () {
	return Editor.canvas.artboard.layer.frame.layers;
});
defineGetter(Panel.prototype, 'frame', function () {
	return Editor.canvas.artboard.layer.frame;
});
defineGetter(Panel.prototype, 'sprite', function () {
	return Editor.canvas.artboard.layer.frame.sprite;
});
Panel.prototype.init = function () {
	if (!hasVal(this.parent)) {
		return console.error('parent undefined');
	}
	this.dragBar = createDiv('drag-bar');
	this.dragBar.appendChild(createSpan(this.name));
	this.el.appendChild(this.dragBar);
	if (hasVal(this.mainInit)) {
		this.mainInit();
	}
};

module.exports = Panel;
