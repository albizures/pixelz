'use strict';
const {
		SCALE_DEF,
		WIDTH_DEF,
		HEIGHT_DEF,
		PALETTE,
		FRAMES
	} = require('./constants'),
	{CHANGE_SPRITE, ADD_FRAME, SELECT_FRAME} = require('./constants').events,
	{CHANGE_FRAME, ADD} = require('./constants').frames,
	Canvas = require('./prototypes/Canvas.js'),
	Sprite = require('./prototypes/Sprite.js'),
	Vector = require('./prototypes/Vector.js');

let Editor = (function () {
	let sprite,
			scale = SCALE_DEF,
			panels = {},
			canvas,
			tools = {},
			addFrame = $('#add-frame');
	return {
		get sprite () {
			return sprite;
		},
		set sprite (val) {
			sprite = val;
			//Editor.events.fire(CHANGE_SPRITE, sprite);
			//Editor.events.fire(CHANGE_FRAME, ADD, 0, sprite);
		},
		get canvas () {
			return canvas;
		},
		get palette () {
			return this.getPanel(PALETTE);
		},
		get frames () {
			return this.getPanel(FRAMES);
		},
		// panel area
		addPanel (panel) {
			panels[panel.name] = panel.appendTo(document.body);
		},
		getPanel (name) {
			return panels[name];
		},
		initPanels () {
			// TODO: Change for a Object.keys
			for (let i in panels) {
				panels[i].init();
			}
		},
		get panels () {
			return panels;
		},
		addTool (tool) {
			panels.Tools.addTool(tool);
		},
		events : {
			_events : {},
			on (name, handler, that) {
				var suffix = name.split('.')[1];
				name = name.split('.')[0];
				if (!hasVal(suffix)) {
					return console.error('Event error name');
				}
				if (!hasVal(this._events[name])) {
					this._events[name] = {};
				}
				if (!hasVal(this._events[name][suffix])) {
					this._events[name][suffix] = hasVal(that) ? handler.bind(that) : handler;
					return this;
				}else {
					console.error('Event wrong name');
				}
			},
			off () {
				// TODO: make off of events
			},
			fire (name, val) {
				//console.log(arguments);
				let suffix = name.split('.')[1];
				if (arguments.length > 2) {
					val = Array.prototype.slice.call(arguments, 1);
				}else if (arguments.length == 2) {
					val = [val];
				}
				name = name.split('.')[0];
				if (!hasVal(suffix) && hasVal(this._events[name])) {
					// TODO: Change for a Object.keys
					for (let i in this._events[name]) {
						this._events[name][i](...val);
					}
				}else if (hasVal(this._events[name]) && hasVal(this._events[name][suffix])) {
					this._events[name][suffix](...val);
				}
			}
		},
		init () {

			this.sprite = new Sprite(WIDTH_DEF, HEIGHT_DEF);
			let index = this.frames.getIndex();
			index = 0;
			canvas = new Canvas(this.sprite.frames[index].layers[0], SCALE_DEF, new Vector (Math.round(window.innerWidth / 4), Math.round(window.innerHeight / 16)));
			this.initPanels();
			Editor.events.fire(CHANGE_SPRITE, sprite);
			Editor.events.fire(ADD_FRAME, 0, sprite);
			Editor.events.fire(SELECT_FRAME, this.sprite.frames[index]);
			console.timeEnd('canvas');
		}
	};
})();
module.exports = Editor;
