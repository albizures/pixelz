'use strict';
const Canvas = require("./prototypes/Canvas.js");
const Sprite = require("./prototypes/Sprite.js");
const Editor = (function () {
	let sprite,
			scale = SCALE_DEF;

	let frames = [],
			panels = {},
			index = -1,
			canvas,
			tools = {};
	let addFrame = $('#add-frame');
	return  {
		get sprite(){return sprite},
		previewAnimate(){

		},
		set color(value){
			canvas.color = value;
		},
		get color(){
			return canvas.color;
		},
		// panel area
		addPanel(panel){
			panel.parent = document.body;
			panels[panel.name] = panel;
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
		addFrame(){
			Editor.setCurrentFrame(sprite.addFrame(true));
		},
		setCurrentFrame(f){
			index = f.index;
			canvas.frame = f;
		},
		addTool(tool){
			if(hasVal(tools[tool.name]))return console.error("Invalid name tool");
			tools[tool.name] = tool;
		},
		setTool(name){
			canvas.tool = tools[name];
		},
		handlers : {
			onScroll(evt){
				let tipo = 0;
				if(evt.deltaY > 0){
					tipo = -1;
				}else if(evt.deltaY < 0){
					tipo = 1;
				}
				canvas.scale += tipo;
			},
			onClick(evt){
				// let pos = canvas.calcPos(evt.clientX,evt.clientY);
				// if(hasVal(pos)){
				// 	canvas.drawAt(pos.x,pos.y);
				// }
			},
			onMouseDown(){
				//console.log('down');
				canvas.clicked = true;

			},
			onMouseUp(){
				//console.log('up');
				canvas.clicked = false;
			},
			onMouseMove(evt){
				if(canvas.clicked){
					console.log(evt.clientX,evt.clientY);
					let pos = canvas.calcPos(evt.clientX,evt.clientY);
					if(hasVal(pos)){
						canvas.drawAt(pos.x,pos.y);
					}
				}else{
					canvas.cleanPrev();
					let pos = canvas.calcPos(evt.clientX,evt.clientY);
					if(hasVal(pos)){
						canvas.prevAt(pos.x,pos.y);
					}
				}
			}
		},
		getCurrentFrame (){
			return frames[index];
		},
		getFrame(indexF){
			if(hasVal(frames[indexF])) return console.error('wrong index');
			return frames[indexF];
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
				var suffix = name.split('.')[1];
				name = name.split('.')[0];
				if(!hasVal(suffix) && hasVal(this._events[name])) {
					for(let i in this._events[name]){
						this._events[name][i](val);
					}
				}else if(hasVal(this._events[name]) && hasVal(this._events[name][suffix])){
					this._events[name][suffix](val);
				}
			}
		},
		setEvents(){
			addFrame.on('click.preview',this.addFrame);

			canvas.on('mousewheel.canvas',this.handlers.onScroll)
		},
		init(){
			//var canvas = _.createElement('canvas');
			//canvas.id = 'main-cv';
			sprite = Sprite(WIDTH_DEF ,HEIGHT_DEF);
			index = 0;
			canvas = Canvas(sprite.frames[index],SCALE_DEF,window.innerWidth/2,window.innerHeight/2,tools.pencil);
			//canvas.height = window.innerHeight;
			//canvas.width = window.innerWidth;
			this.initPanels();
			Editor.events.fire('addFrame.frame',sprite.frames[index]);
			this.events.on('selectFrame.editor',this.setCurrentFrame);

			// var frame = new Frame(canvas);
			// frame.index = this.addFrame(frame);
			//this.setCurrentFrame(frame.index);
			//this.previewFrames();

			this.setEvents();
			console.timeEnd('canvas');
		}
	}
})();

// this.preview = _.createElement('canvas');
// this.previewCx = this.cv.getContext('2d');
// this.preview.height = window.innerHeight;
// this.preview.width = window.innerWidth;
// cv.classList.add('preview');
// _.body.appendChild(this.preview);
module.exports = Editor;
