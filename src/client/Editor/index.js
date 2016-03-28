'use strict';
const {
		SCALE_DEF,
		WIDTH_DEF,
		HEIGHT_DEF,
		PALETTE,
		FRAMES
	} = require('../constants'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
	{CHANGE_SPRITE, ADD_FRAME, SELECT_FRAME, RESIZE_PANEL} = require('../constants').events,
	Canvas = require('../prototypes/Canvas.js'),
	Sprite = require('../prototypes/Sprite.js'),
	Vector = require('../prototypes/Vector.js');

let Editor = {
	panels : {},
	// panel area
	addPanel (panel) {
		this.panels[panel.name] = panel.appendTo(document.body);
	},
	onResizePanel (type) {
		if (type === L || type === TL || type === BL) {
			this.onResizeL(arguments[1]);
		}else if (type === R || type == TR) {
			this.onResizeR(arguments[1]);
		}
	},
	onResizeL (width) {
		let panels = Object.keys(this.panels);
		for (let i = 0; i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			if (panel.type === SNAP && (panel.position === L || panel.position === BL || panel.position === TL)) {
				panel.changeWidth(width);
			}
		}
	},
	onResizeR (height) {
		let panels = Object.keys(this.panels);
		for (let i = 0; i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			if (panel.type === SNAP && (panel.position === R || panel.position === BR || panel.position === TR)) {
				panel.changeWidth(height);
			}
		}
	},
	initPanels () {
		for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			panel.init();
		}
	},
	getRightPanels () {
		var size = {height : 0, panels : []};
		for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			if (panel.isRight() && panel.isInit) {
				if (!size.width) {
					size.width = panel.width;
				}
				size.height += panel.heightPerc;
				size.panels.push(panel);
			}
		}
		return size;
	},
	getLeftPanels () {
		var size = {height : 0, panels : []};
		for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			if (panel.isLeft() && panel.isInit) {
				if (!size.width) {
					size.width = panel.width;
				}
				size.height += panel.heightPerc;
				size.panels.push(panel);
			}
		}
		return size;
	},
	addTool (tool) {
		this.panels.Tools.addTool(tool);
	},
	shortcuts : require('./shortcuts.js'),
	events : require('./events.js'),
	init () {
		this.shortcuts.init();
		this.initPanels();
	},
	getCurrentColors : function () {
		this.sprite.getCurrentColors(onGetCurretColors.bind(this));
		function onGetCurretColors(colors) {
			this.panels.Palette.setCurretColors(colors);
		}
	},
	initSprite (data) {
		var offsetLeft, offsetRight, scaleHeight, scaleWidth, scale, x, y,
			data = data || {},
			height = data.height || HEIGHT_DEF,
			width = data.width || WIDTH_DEF,

		scaleHeight = (window.innerHeight - this.panels.Menus.height) / height;
		offsetRight = this.getRightPanels().width;
		offsetLeft = this.getLeftPanels().width;
		scaleWidth = (window.innerWidth - offsetLeft - offsetRight) / width;

		scale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth;
		scale = Math.round(scale * 0.94);
		x = Math.round((window.innerWidth / 2) - (scale * width) / 2);
		y = Math.round(((window.innerHeight + this.panels.Menus.height) / 2) - (scale * height) / 2);
		this.sprite = new Sprite(width, height);
		this.canvas = new Canvas(this.sprite.frames[0].layers[0], scale, new Vector (x, y));
	}
};
module.exports = Editor;
