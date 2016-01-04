'use strict';
const Vector = require('./Vector.js');
const { imageSmoothingDisabled } = require('../utils.js');
const {
		SCALE_DEF,
		SIZE_POINTER_DEF,
		MIDDLE_CLICK,
		RIGHT_CLICK,
		LEFT_CLICK,
		COLOR_POINTER_PREW_DEF
	} = require('../constants');

function createCanvas() {
	let params = arguments;
	return (function () {
		// TODO: create the prototype of the artboard
		let artboard = {
					get width(){
						return this.frame.width * this.scale;
					},
					get height(){
						return this.frame.height * this.scale;
					}
				},
				sizePointer,
				tool,
				drag = false,
				main = {},
				preview = {},

				clicked,imageData,
				mouseDown = false,
				lastDragX,
				lastDragY,
				parent = document.body;


		function Canvas(frame,scale,cord,tool,sizePointer) {
			this.artboard.scale = scale || SCALE_DEF;
			this.artboard.frame = frame;
			this.artboard.cord = cord;
			this.sizePointer = (sizePointer || SIZE_POINTER_DEF) * scale;
			this.tool = tool;
			this.init();
		}
		Canvas.prototype = {
			constructor : Canvas,
			get artboard(){return artboard;},
			get tool (){return tool;},
			set tool(val){
				tool = val;
				tool.canvas = this;
			},
			get sizePointer (){return sizePointer;},
			set sizePointer(val){
				sizePointer = val;
			}
		};

		Canvas.prototype.init = function () {
			main = document.createElement('canvas').getContext('2d');

			preview = document.createElement('canvas').getContext('2d');
			imageSmoothingDisabled(preview);

			main.canvas.width = preview.canvas.width = window.innerWidth;
			main.canvas.height = preview.canvas.height = window.innerHeight;
			imageSmoothingDisabled(main);

			main.canvas.classList.add('canvas');
			preview.canvas.classList.add('preview');

			parent.appendChild(main.canvas);
			parent.appendChild(preview.canvas);

			this.cleanPrev();
			this.cleanMain();
			$(preview.canvas).on('mousewheel.canvas',this.onScroll.bind(this));
			$(preview.canvas).on('mousedown.canvas',this.onMouseDown.bind(this));
			$(preview.canvas).on('mouseup.canvas',this.onMouseUp.bind(this));
			$(preview.canvas).on('mousemove.canvas',this.onMouseMove.bind(this));

			Editor.events.on('paint.canvas',this.drawAt,this);
		};
		Canvas.prototype.changeFrame = function (newFrame) {
			console.log(newFrame);
			artboard.frame = newFrame;
			this.paintMain();
		};
		Canvas.prototype.onScroll = function (evt) {
			let diff = 1;
			if(evt.deltaY > 0){
				diff = -1;//0.9;
			}else if(evt.deltaY < 0){
				diff = 1;//1.1;
			}
			this.scaleTo(artboard.scale + diff);
			//this.scaleTo(artboard.scale * diff);
		};
		Canvas.prototype.scaleTo = function (scale) {
			// TODO: stabilize speed of scaling
			if(scale < 1) return;
			sizePointer = (sizePointer/artboard.scale) * scale;
			artboard.scale = scale;
			this.cleanPrev();

			// TODO: scale from center
			this.paintMain();

		};
		Canvas.prototype.onMouseDown = function (evt) {
			if (evt.which === LEFT_CLICK) {
				mouseDown = true;
				this.cleanPrev();
				tool.onMouseDown(evt);
			}else if(evt.which === MIDDLE_CLICK){
				evt.preventDefault();
				drag = true;
				this.cleanPrev();
			}else if(evt.which === RIGHT_CLICK){
				// TODO: add acction with right click
			}
		};
		Canvas.prototype.onMouseUp = function (evt) {
			if(evt.which === LEFT_CLICK){
				mouseDown = false;
				tool.onMouseUp(evt);
			}else if(evt.which === MIDDLE_CLICK){
				drag = false;
				evt.preventDefault();
			}else if(evt.which === RIGHT_CLICK){
				// TODO: add acction with right click
			}
		};
		Canvas.prototype.onMouseMove = function (evt) {
			if(drag){
				let diffX = evt.clientX - lastDragX;
				let diffY = evt.clientY - lastDragY;
				lastDragX = evt.clientX;
				lastDragY = evt.clientY;
				this.shiftDiff(new Vector(isNaN(diffX)? 0 : diffX,diffY = isNaN(diffY)? 0 : diffY));
			}else{
				if(mouseDown){
					tool.onMouseMove(evt);
				}else{
					this.drawPreview(evt);
				}
			}
		};
		Canvas.prototype.shiftDiff = function (cord) {
			artboard.cord.sum(cord);
			this.paintMain();
		};
		Canvas.prototype.calculatePosition = function (cord) {
			// TODO: Add support many sizes pointer
			let outside = false;
			let diffTemp;
			let relativeTemp;
			let framePosition = new Vector(),
					paintPosition = new Vector();
			if (cord.x <= artboard.cord.x || cord.x >= artboard.cord.x + artboard.width ) {
				outside = true;
				cord.x = cord.x <= artboard.cord.x? artboard.cord.x  + (sizePointer / 2)  : artboard.cord.x + artboard.width  - (sizePointer / 2) ;
			}
			diffTemp = cord.x - artboard.cord.x;
			relativeTemp = diffTemp - (diffTemp % sizePointer );
			paintPosition.x = relativeTemp + artboard.cord.x;
			framePosition.x = Math.round(relativeTemp / artboard.scale);
			if (cord.y <= artboard.cord.y || cord.y >= artboard.cord.y + artboard.height ) {
				outside = true;
				cord.y = cord.y <= artboard.cord.y? artboard.cord.y + (sizePointer / 2)  : artboard.cord.y + artboard.height - (sizePointer / 2) ;
			}
			diffTemp = cord.y - artboard.cord.y;
			relativeTemp = diffTemp - (diffTemp % sizePointer );
			paintPosition.y = relativeTemp + artboard.cord.y;
			framePosition.y = Math.round(relativeTemp / artboard.scale);
			if(framePosition.x < 0 || framePosition.y < 0 || framePosition.x > 59 || framePosition.y > 59){
				debugger;
			}
			return {
				out : outside,
				frame : framePosition,
				paint : paintPosition
			};
		};
		Canvas.prototype.cordFrameToPaint = function (cord) {
			let newCord = new Vector(
				(cord.x * artboard.scale) + artboard.cord.x,
				(cord.y * artboard.scale) + artboard.cord.y
			);
			return newCord;
		};
		Canvas.prototype.previewAt = function (cord,color) {
			preview.fillStyle = color;
			preview.clearRect(cord.x,cord.y,sizePointer,sizePointer);
			main.clearRect(cord.x,cord.y,sizePointer,sizePointer);
			preview.fillRect(cord.x,cord.y,sizePointer,sizePointer);
		};
		Canvas.prototype.drawPreview = function (evt) {
			this.cleanPrev();
			let temp = new Vector(Math.floor(((evt.clientX - artboard.cord.x) / artboard.scale) ),Math.floor(((evt.clientY - artboard.cord.y) / artboard.scale) ));
			let cord = new Vector(temp.x * artboard.scale + artboard.cord.x, temp.y * artboard.scale + artboard.cord.y);
			preview.strokeStyle = COLOR_POINTER_PREW_DEF;
			preview.strokeRect(cord.x - 1,cord.y - 1,sizePointer + 2,sizePointer + 2);
		};
		Canvas.prototype.paintMain = function () {
			this.cleanMain();
			imageSmoothingDisabled(main);
			main.drawImage(artboard.frame.context.canvas,
				0,0, artboard.frame.width, artboard.frame.height,
				artboard.cord.x,artboard.cord.y,artboard.frame.width * artboard.scale, artboard.frame.height * artboard.scale
			);
		};
		Canvas.prototype.drawAt = function (cord,color) {
			main.fillStyle = color;
			main.clearRect(cord.x,cord.y,sizePointer,sizePointer);
			main.fillRect(cord.x,cord.y,sizePointer,sizePointer);
		};
		Canvas.prototype.cleanMain = function () {
			main.canvas.height = main.canvas.height;
			main.canvas.width = main.canvas.width;
			main.fillStyle = 'rgba(0 ,0 , 0, 0.1)';
			console.log('clean');
			// TODO: create canvas background
			main.fillRect(artboard.cord.x,artboard.cord.y,artboard.width,artboard.height);
		};
		Canvas.prototype.cleanPrev = function () {
			preview.canvas.height = preview.canvas.height;
			preview.canvas.width = preview.canvas.width;
		};
		return new Canvas(...params);
	})();
}



module.exports = createCanvas;
