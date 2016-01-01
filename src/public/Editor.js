'use strict';
const {
		SCALE_DEF,
		WIDTH_DEF,
		HEIGHT_DEF,
		PALETTE,
		FRAMES
	} = require('./constants.js');
const { CHANGE_SPRITE	} = require('./constants.js').sprite;
const { CHANGE_FRAME,ADD	} = require('./constants.js').frames;
const Canvas = require('./prototypes/Canvas.js'),
			Sprite = require('./prototypes/Sprite.js'),
			Vector = require('./prototypes/Vector.js'),
 			Editor = (function () {
	let sprite,
			scale = SCALE_DEF;

	let panels = {},
			canvas,
			tools = {};
	let addFrame = $('#add-frame');
	return  {
		get sprite(){return sprite;},
		set sprite(val){
			sprite = val;
			Editor.events.fire(CHANGE_SPRITE,sprite);
			Editor.events.fire(CHANGE_FRAME,ADD,0,sprite);
		},
		get palette(){
			return this.getPanel(PALETTE);
		},
		get frames(){
			return this.getPanel(FRAMES);
		},
		// panel area
		addPanel(panel){
			panel.parent = document.body;
			panels[panel.name] = panel;
		},
		getPanel(name){
			return panels[name];
		},
		initPanels(){
			for (var i in panels) {
				panels[i].init();
			}
		},
		get panels() {
			return panels;
		},
		// frame area
		addTool(tool){
			if(hasVal(tools[tool.name])) return console.error('Invalid name tool');
			tools[tool.name] = tool;
		},
		setTool(name){
			canvas.tool = tools[name];
		},
		events : {
			_events : {},
			on(name,handler,that){
				var suffix = name.split('.')[1];
			 	name = name.split('.')[0];
				if(!hasVal(suffix)) return console.error('Event error name');
				if(!hasVal(this._events[name])) this._events[name] = {};
				if(!hasVal(this._events[name][suffix])){
					this._events[name][suffix] = hasVal(that)? handler.bind(that) : handler;
					return this;
				}else{
					console.error('Event wrong name');
				}
			},
			off(){
			},
			fire(name,val){
				if(arguments.length > 2){
					val = Array.prototype.slice.call(arguments,1);
				}else if (arguments.length == 2){
					val = [val];
				}
				var suffix = name.split('.')[1];
				name = name.split('.')[0];
				if(!hasVal(suffix) && hasVal(this._events[name])) {
					for(let i in this._events[name]){
						this._events[name][i](...val);
					}
				}else if(hasVal(this._events[name]) && hasVal(this._events[name][suffix])){
					this._events[name][suffix](...val);
				}
			}
		},
		init(){

			this.sprite = Sprite(WIDTH_DEF ,HEIGHT_DEF);
			let index  = this.frames.getIndex();
			index = 0;
			canvas = Canvas(this.sprite.frames[index],SCALE_DEF, new Vector(Math.round(window.innerWidth/4),Math.round(window.innerHeight/16)),tools.pencil);
			this.initPanels();
			Editor.events.fire(CHANGE_SPRITE,sprite);
			Editor.events.fire(CHANGE_FRAME,ADD,0,sprite);
			console.timeEnd('canvas');
		}
	};
})();
module.exports = Editor;
