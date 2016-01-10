'use strict';
const {createDiv, createSpan} = require('../utils.js'),
			AppendObject = require('./AppendObject.js'),
			{ inheritanceObject } = require('../utils.js');
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001
function Panel(name) {
	this.name = name;
	AppendObject.call(this, 'panel', 'panel-' + this.name.toLowerCase());
}
inheritanceObject(Panel, AppendObject);
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
