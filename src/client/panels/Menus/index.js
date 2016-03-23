'use strict';
const Panel = require('../../prototypes/Panel.js'),
			{ make } = require('../../utils.js'),
			Vector = require('../../prototypes/Vector.js'),
			{TRANSPARENT_COLOR} = require('../../constants/index.js'),
			{SNAP, FLOAT, T, B} = require('../../constants/index.js').panels,
			{ SELECT_TOOL } = require('../../constants').events,
			Menus = new Panel('Menus', SNAP, undefined, 100, 25, T, true);


module.exports = Menus;
