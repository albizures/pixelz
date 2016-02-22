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

let scale = SCALE_DEF,
		Editor = {
	panels : {},
	get palette () {
		return this.getPanel(PALETTE);
	},
	get frames () {
		return this.getPanel(FRAMES);
	},
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
	getPanel (name) {
		return this.panels[name];
	},
	initPanels () {
		let left, right;
		for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
			let panel = this.panels[panels[i]];
			if (left && panel.isLeft()) {
				panel.init(left.width, left.height);
			}	else if (right && panel.isRight()) {
				panel.init(right.width, right.height);
			}else {
				panel.init();
			}

			if (!left && panel.isLeft()) {
				left = {
					width : panel.width,
					height : 100 - panel.heightPerc
				};
			} else if (!right && panel.isRight()) {
				right = {
					width : panel.width,
					height : 100 - panel.heightPerc
				};
			}
		}
		this.events.on(RESIZE_PANEL + '.editor', this.onResizePanel, this);
	},
	addTool (tool) {
		this.panels.Tools.addTool(tool);
	},
	events : require('./events.js'),
  init () {

		this.sprite = new Sprite(WIDTH_DEF, HEIGHT_DEF);
		let index = 0;
		this.canvas = new Canvas(this.sprite.frames[index].layers[0], SCALE_DEF, new Vector (Math.round(window.innerWidth / 4), Math.round(window.innerHeight / 16)));
		this.initPanels();
		Editor.events.fire(CHANGE_SPRITE, this.sprite);
		this.getPanel('Frames').addPreview(this.sprite.frames[0]);
		console.timeEnd('canvas');
	}
};
module.exports = Editor;
