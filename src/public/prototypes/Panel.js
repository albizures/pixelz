'use strict';
const {createDiv, createSpan} = require('../utils.js');
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001
function Panel(name) {
	this.name = name;
}
Panel.prototype.init = function () {
	if (!hasVal(this.parent)) {
		return console.error('parent undefined');
	}
	this.div = document.createElement('div');
	this.div = createDiv('panel', 'panel-' + this.name.toLowerCase());
	this.dragBar = createDiv('drag-bar');
	this.dragBar.appendChild(createSpan(this.name));
	this.parent.appendChild(this.div);
	this.div.appendChild(this.dragBar);
	if (hasVal(this.mainInit)) {
		this.mainInit();
	}
};

module.exports = Panel;
