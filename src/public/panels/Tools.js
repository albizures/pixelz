'use strict';

const Panel = require('../prototypes/Panel.js'),
			{ SELECT_TOOL } = require('../constants').events,
			Tools = new Panel('Tools');
Tools.tools = {};
Tools.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.el.style.height = '50px';
	this.el.style.width = '100px';
	this.el.style.right = '100px';
	this.el.style.bottom = '300px';
	this.currentTool = this.tools.pencil;
	for (let i = 0, keys = Object.keys(this.tools); i < keys.length; i++) {
		this.tools[keys[i]].appendTo(this.el);
	}
	Editor.events.on(SELECT_TOOL + '.' + this.name, this.changeCurrentTool, this);
};
Tools.changeCurrentTool = function (name) {
	console.log(name);
	this.currentTool = this.tools[name];
};
Tools.addTool = function (tool) {
	if (hasVal(this.tools[tool.name])) {
		return console.error('Invalid name tool');
	}
	this.tools[tool.name] = tool;
};
module.exports = () => Editor.addPanel(Tools);
