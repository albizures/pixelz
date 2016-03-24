'use strict';

const Panel = require('../prototypes/Panel.js'),
	ColorPicker = require('./ColorPicker.js'),
	{ make } = require('../utils.js'),
	Vector = require('../prototypes/Vector.js'),
	{TRANSPARENT_COLOR} = require('../constants/index.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants/index.js').panels,
	{ SELECT_TOOL } = require('../constants').events,
	Tools = new Panel('Tools', FLOAT, new Vector(500, 500), 60);
Tools.tools = {};
Tools.mainInit = function () {
	var position = JSON.parse(localStorage.getItem('panel-' + this.name.toLowerCase()) || '{"x": 500, "y": 500}');
	const Color = require('../prototypes/Color.js');
	this.el.style['z-index'] = '9';

	let parentColors = make('div', {parent : this.el, className : 'colors'});
	this.primaryColor = new Color(TRANSPARENT_COLOR, false, 35, true);
	this.secondaryColor = new Color(TRANSPARENT_COLOR, false, 35, true);
	this.secondaryColor.appendTo(parentColors).addClass('secondary');
	this.primaryColor.appendTo(parentColors).addClass('primary');
	this.primaryColor.on('click.primary', function () {
		ColorPicker.changeColor(Tools.getPrimaryColor(), Tools.setPrimaryColor.bind(Tools));
	});
	this.secondaryColor.on('click.secondary', function () {
		ColorPicker.changeColor(Tools.getSecondColor(), Tools.setSecudaryColor.bind(Tools));
	});

	this.changePosition(new Vector(position.x, position.y));

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
	this.primaryColor.changeColor(color);
	return color;
};
Tools.setSecudaryColor = function (color) {
	this.secondaryColor.changeColor(color);
	return color;
};
Tools.changeCurrentTool = function (name) {
	this.lastTool = this.currentTool;
	this.currentTool = this.tools[name];
};
Tools.addTool = function (tool) {
	if (hasVal(this.tools[tool.name])) {
		return console.error('Invalid name tool');
	}
	this.tools[tool.name] = tool;
};
module.exports = Tools;
