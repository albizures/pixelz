'use strict';

const Panel = require('../prototypes/Panel.js'),
			{ make } = require('../utils.js'),
			Vector = require('../prototypes/Vector.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants/index.js').panels,
			{ SELECT_TOOL } = require('../constants').events,
			Tools = new Panel('Tools', FLOAT, new Vector(500, 500), 100, 100);
Tools.tools = {};
Tools.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.changePosition(new Vector(100, 100));

	this.currentTool = this.tools.pencil;
	for (let i = 0, keys = Object.keys(this.tools); i < keys.length; i++) {
		this.tools[keys[i]].appendTo(this.el);
	}
	Editor.events.on(SELECT_TOOL + '.' + this.name, this.changeCurrentTool, this);
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
