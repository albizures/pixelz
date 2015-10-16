console.time('canvas');
const HEIGHT_DEF = 20,
			WIDTH_DEF = 20,
			SCALE_DEF = 22,
			SIZE_POINTER_DEF = 1,
			COLOR_POINTER_PREW_DEF = 'rgba(255,255,255,0.2)';

window._events = {};
window.on = function (name,handler) {
	HTMLElement.prototype.on.call(this,name,handler);
}
window.off = function (name) {
	HTMLElement.prototype.off.call(this,name);
}

Object.defineProperty(HTMLElement.prototype, '_events', {
	value : {},
	enumerable : false
});
HTMLElement.prototype.on = function (name,handler) {
	var suffix = name.split('.')[1];
 	name = name.split('.')[0];
	if(!hasVal(suffix)) return console.error('Event error name');
	if(!hasVal(this._events[name])) this._events[name] = {};
	if(!hasVal(this._events[name][suffix])){
		this._events[name][suffix] =  handler.bind(this);
		this.addEventListener(name,this._events[name][suffix]);
		return this;
	}else{
		console.error('Event wrong name');
	}
};
HTMLElement.prototype.off = function (name) {
	console.log(name);
	var suffix = name.split('.')[1];
 	name = name.split('.')[0];

	if(!hasVal(suffix)){
		this.removeEventListener(name);
	}else if(hasVal(this._events[name]) && hasVal(this._events[name][suffix])){
		this.removeEventListener(name,this._events[name][suffix]);
		delete this._events[name][suffix];
	}
	return this;
};

(function ($) {
	'use strict';
	let Editor = (function () {
		let sprite,
				scale = SCALE_DEF;

		let frames = [],
				index = -1,
				canvas;

		return  {
			previewFrames (){
				let ul = $.getElementById('list-preview-frames');
				for(let item of sprite.frames){
					let li = $.createElement('li');
					let cv = $.createElement('canvas');
					cv.width = sprite.width;
					cv.height = sprite.height;
					cv.classList.add('frame-preview');

					li.appendChild(cv);
					ul.appendChild(li);
				}
			},
			addFrame(frame){
				frames.push(frame);
				return frames.length - 1;
			},
			setCurrentFrame(indexF){
				index = indexF;
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
					console.log(canvas.scale);
				},
				onClick(evt){
					let pos = canvas.calcPos(evt.clientX,evt.clientY);
					if(hasVal(pos)){
						canvas.drawAt(pos.x,pos.y);
					}
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
						console.log('moueve');
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
			setEvents(){
				canvas.on('mousewheel.canvas',this.handlers.onScroll)
					.on('mousedown.canvas',this.handlers.onMouseDown)
					.on('mousemove.canvas',this.handlers.onMouseMove)
					.on('mouseup.canvas',this.handlers.onMouseUp)
					.on('click.canvas',this.handlers.onClick);
			},
			init(){
				//var canvas = $.createElement('canvas');
				//canvas.id = 'main-cv';
				sprite = Sprite(WIDTH_DEF,HEIGHT_DEF);

				canvas = Canvas(sprite.frames[0],SCALE_DEF,window.innerWidth/2,window.innerHeight/2);
				//canvas.height = window.innerHeight;
				//canvas.width = window.innerWidth;


				// var frame = new Frame(canvas);
				// frame.index = this.addFrame(frame);
				//this.setCurrentFrame(frame.index);
				this.previewFrames();
				this.setEvents();
				console.timeEnd('canvas');
			}
		}
	})();

	// this.preview = $.createElement('canvas');
	// this.previewCx = this.cv.getContext('2d');
	// this.preview.height = window.innerHeight;
	// this.preview.width = window.innerWidth;
	// cv.classList.add('preview');
	// $.body.appendChild(this.preview);
	window.Editor = Editor
})(document);
