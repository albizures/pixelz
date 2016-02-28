'use strict';

const Panel = require('../prototypes/Panel.js'),
			{ make } = require('../utils.js'),
			Vector = require('../prototypes/Vector.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants/index.js').panels,
			{ SELECT_TOOL } = require('../constants').events,
			Tools = new Panel('Tools', FLOAT, new Vector(500, 500), 60);
Tools.tools = {};
Tools.mainInit = function () {
	this.el.style['z-index'] = '9999';

	let parentColors = make('div', {parent : this.el, className : 'colors'});
	this.primaryColor = {};
	this.secondaryColor = {};
	this.secondaryColor.el = make('div', {className : 'secondary', parent : parentColors});
	this.primaryColor.el = make('div', {className : 'primary', parent : parentColors});


	this.changePosition(new Vector(100, 100));

	this.currentTool = this.tools.pencil;
	for (let i = 0, keys = Object.keys(this.tools); i < keys.length; i++) {
		this.tools[keys[i]].appendTo(this.el);
	}
};
Tools.getPrimaryColor = function () {
	return this.primaryColor.color;
};
Tools.getSecondColor = function () {
	return this.secondaryColor.color;
};
Tools.setPrimaryColor = function (color) {
	this.primaryColor.color = color;
	this.primaryColor.el.style.background = color;
	return color;
};
Tools.setSecudaryColor = function (color) {
	this.secondaryColor.color = color;
	this.secondaryColor.el.style.background = color;
	return color;
};
Tools.changeCurrentTool = function (name) {
	this.currentTool = this.tools[name];
};
Tools.addTool = function (tool) {
	if (hasVal(this.tools[tool.name])) {
		return console.error('Invalid name tool');
	}
	this.tools[tool.name] = tool;
};
module.exports = () => Editor.addPanel(Tools);
