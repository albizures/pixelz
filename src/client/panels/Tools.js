'use strict';

const Panel = require('../prototypes/Panel.js'),
	ColorPicker = require('./ColorPicker.js'),
	{ make } = require('../utils.js'),
	Vector = require('../prototypes/Vector.js'),
	{TRANSPARENT_COLOR, RIGHT_CLICK, LEFT_CLICK} = require('../constants/index.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel,
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
	this.primaryColor.on('click.primary', () => {
		ColorPicker.changeColor(Tools.getPrimaryColor(), Tools.setPrimaryColor.bind(this));
	});
	this.secondaryColor.on('click.secondary', () => {
		ColorPicker.changeColor(Tools.getSecondColor(), Tools.setSecudaryColor.bind(this));
	});
	
	$(make(['button', {parent : this.el}, 'S'])).on('click.switch', this.switchColors.bind(this));
	$(make(['button', {parent : this.el}, '+'])).on('mouseup.add', this.onAddColor.bind(this));
	$(make(['button', {parent : this.el}, '-'])).on('mouseup.remove', this.onRemoveColor.bind(this));
	
	make(['hr', {parent : this.el}]);

	this.changePosition(new Vector(position.x, position.y));

	this.currentTool = this.tools.pencil;
	for (let i = 0, keys = Object.keys(this.tools); i < keys.length; i++) {
		this.tools[keys[i]].appendTo(this.el);
	}
};
Tools.onRemoveColor = function (evt) {
	if (evt.which === LEFT_CLICK) {
		Editor.panels.Palette.removeColor(Tools.getPrimaryColor());
	} else if(evt.which === RIGHT_CLICK){
		Editor.panels.Palette.removeColor(Tools.getSecondColor());
	}
};
Tools.onAddColor = function (evt) {
		if (evt.which === LEFT_CLICK) {
		Editor.panels.Palette.addColor(Tools.getPrimaryColor());
	} else if(evt.which === RIGHT_CLICK){
		Editor.panels.Palette.addColor(Tools.getSecondColor());
	}
};
Tools.switchColors = function (evt) {
	let tempColor = this.getPrimaryColor();
	this.setPrimaryColor(this.getSecondColor());
	this.setSecudaryColor(tempColor);
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
	this.currentTool.active();
};
Tools.addTool = function (tool) {
	if (hasVal(this.tools[tool.name])) {
		return console.error('Invalid name tool');
	}
	this.tools[tool.name] = tool;
};
module.exports = Tools;
