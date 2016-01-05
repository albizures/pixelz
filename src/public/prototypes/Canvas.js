'use strict';
const Vector = require('./Vector.js'),
			{imageSmoothingDisabled} = require('../utils.js'),
			{SCALE_DEF, SIZE_POINTER_DEF, MIDDLE_CLICK,
				RIGHT_CLICK,LEFT_CLICK,COLOR_POINTER_PREW_DEF} = require('../constants');
// TODO: create the prototype of the artboard
let artboard = {
	get width() {
		return this.frame.width * this.scale;
	},
	get height() {
		return this.frame.height * this.scale;
	}
};
function Canvas(frame, scale, cord, tool, sizePointer) {
	this.artboard = artboard;
	tool.canvas = this;
	this.tool = tool;
	this.parent = document.body;
	this.artboard.scale = scale || SCALE_DEF;
	this.artboard.frame = frame;
	this.artboard.cord = cord;
	this.sizePointer = (sizePointer || SIZE_POINTER_DEF) * scale;
	this.tool = tool;
	this.init();
}
 Canvas.prototype.init = function () {
	this.main = document.createElement('canvas').getContext('2d');

	this.preview = document.createElement('canvas').getContext('2d');
	imageSmoothingDisabled(this.preview);

	this.main.canvas.width = this.preview.canvas.width = window.innerWidth;
	this.main.canvas.height = this.preview.canvas.height = window.innerHeight;
	imageSmoothingDisabled(this.main);

	this.main.canvas.classList.add('canvas');
	this.preview.canvas.classList.add('preview');

	this.parent.appendChild(this.main.canvas);
	this.parent.appendChild(this.preview.canvas);

	this.cleanPrev();
	this.cleanMain();
	$(this.preview.canvas).on('mousewheel.canvas', this.onScroll.bind(this));
	$(this.preview.canvas).on('mousedown.canvas', this.onMouseDown.bind(this));
	$(this.preview.canvas).on('mouseup.canvas', this.onMouseUp.bind(this));
	$(this.preview.canvas).on('mousemove.canvas', this.onMouseMove.bind(this));

	Editor.events.on('paint.canvas', this.drawAt, this);
};
Canvas.prototype.changeFrame = function (newFrame) {
	console.log(newFrame);
	this.artboard.frame = newFrame;
	this.paintMain();
};
Canvas.prototype.onScroll = function (evt) {
	let diff = 1;
	if (evt.deltaY > 0) {
		diff = -1;//0.9;
	}else if (evt.deltaY < 0) {
		diff = 1;//1.1;
	}
	this.scaleTo(this.artboard.scale + diff);
	//this.scaleTo(artboard.scale * diff);
};
Canvas.prototype.scaleTo = function (scale) {
	// TODO: stabilize speed of scaling
	if (scale < 1) {
		return;
	}
	this.sizePointer = (this.sizePointer / this.artboard.scale) * scale;
	this.artboard.scale = scale;
	this.cleanPrev();

	// TODO: scale from center
	this.paintMain();

};
Canvas.prototype.onMouseDown = function (evt) {
	if (evt.which === LEFT_CLICK) {
		this.mouseDown = true;
		this.cleanPrev();
		this.tool.onMouseDown(evt);
	}else if (evt.which === MIDDLE_CLICK) {
		evt.preventDefault();
		this.drag = true;
		this.cleanPrev();
	}else if (evt.which === RIGHT_CLICK) {
		// TODO: add acction with right click
		console.log('right click down');
	}
};
Canvas.prototype.onMouseUp = function (evt) {
	if (evt.which === LEFT_CLICK) {
		this.mouseDown = false;
		this.tool.onMouseUp(evt);
	}else if (evt.which === MIDDLE_CLICK) {
		this.drag = false;
		evt.preventDefault();
	}else if (evt.which === RIGHT_CLICK) {
		// TODO: add acction with right click
		console.log('right click up');
	}
};
Canvas.prototype.onMouseMove = function (evt) {
	if (this.drag) {
		let diffX = evt.clientX - this.lastDragX;
		let diffY = evt.clientY - this.lastDragY;
		this.lastDragX = evt.clientX;
		this.lastDragY = evt.clientY;
		this.shiftDiff(new Vector(isNaN(diffX) ? 0 : diffX,diffY = isNaN(diffY) ? 0 : diffY));
	}else {
		if (this.mouseDown) {
			this.tool.onMouseMove(evt);
		}else {
			this.drawPreview(evt);
		}
	}
};
Canvas.prototype.shiftDiff = function (cord) {
	this.artboard.cord.sum(cord);
	this.paintMain();
};
Canvas.prototype.calculatePosition = function (cord) {
	// TODO: Add support many sizes pointer
	let outside = false,
			diffTemp,
			relativeTemp,
			framePosition = new Vector (),
			paintPosition = new Vector ();
	if (cord.x <= this.artboard.cord.x || cord.x >= this.artboard.cord.x + this.artboard.width) {
		outside = true;
		cord.x = cord.x <= this.artboard.cord.x ? this.artboard.cord.x  + (this.sizePointer / 2)  : this.artboard.cord.x + this.artboard.width  - (this.sizePointer / 2);
	}
	diffTemp = cord.x - this.artboard.cord.x;
	relativeTemp = diffTemp - (diffTemp % this.sizePointer);
	paintPosition.x = relativeTemp + this.artboard.cord.x;
	framePosition.x = Math.round(relativeTemp / this.artboard.scale);
	if (cord.y <= this.artboard.cord.y || cord.y >= this.artboard.cord.y + this.artboard.height) {
		outside = true;
		cord.y = cord.y <= this.artboard.cord.y ? this.artboard.cord.y + (this.sizePointer / 2)  : this.artboard.cord.y + this.artboard.height - (this.sizePointer / 2) ;
	}
	diffTemp = cord.y - this.artboard.cord.y;
	relativeTemp = diffTemp - (diffTemp % this.sizePointer);
	paintPosition.y = relativeTemp + this.artboard.cord.y;
	framePosition.y = Math.round(relativeTemp / this.artboard.scale);
	if (framePosition.x < 0 || framePosition.y < 0 || framePosition.x > 59 || framePosition.y > 59) {
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
		(cord.x * this.artboard.scale) + this.artboard.cord.x,
		(cord.y * this.artboard.scale) + this.artboard.cord.y
	);
	return newCord;
};
Canvas.prototype.previewAt = function (cord,color) {
	this.preview.fillStyle = color;
	this.preview.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
	this.main.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
	this.preview.fillRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
};
Canvas.prototype.drawPreview = function (evt) {
	this.cleanPrev();
	let temp = new Vector(Math.floor(((evt.clientX - this.artboard.cord.x) / this.artboard.scale)), Math.floor(((evt.clientY - this.artboard.cord.y) / this.artboard.scale)));
	let cord = new Vector(temp.x * this.artboard.scale + this.artboard.cord.x, temp.y * this.artboard.scale + this.artboard.cord.y);
	this.preview.strokeStyle = COLOR_POINTER_PREW_DEF;
	this.preview.strokeRect(cord.x - 1, cord.y - 1, this.sizePointer + 2, this.sizePointer + 2);
};
Canvas.prototype.paintMain = function () {
	this.cleanMain();
	imageSmoothingDisabled(this.main);
	this.main.drawImage(this.artboard.frame.context.canvas,
		0, 0, this.artboard.frame.width, this.artboard.frame.height,
		this.artboard.cord.x, this.artboard.cord.y, this.artboard.frame.width * this.artboard.scale, this.artboard.frame.height * this.artboard.scale
	);
};
Canvas.prototype.drawAt = function (cord,color) {
	this.main.fillStyle = color;
	this.main.clearRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
	this.main.fillRect(cord.x, cord.y, this.sizePointer, this.sizePointer);
};
Canvas.prototype.cleanMain = function () {
	this.main.canvas.height = this.main.canvas.height;
	this.main.canvas.width = this.main.canvas.width;
	this.main.fillStyle = 'rgba(0 ,0 , 0, 0.1)';
	console.log('clean');
	// TODO: create canvas background
	this.main.fillRect(artboard.cord.x, this.artboard.cord.y, this.artboard.width, this.artboard.height);
};
Canvas.prototype.cleanPrev = function () {
	this.preview.canvas.height = this.preview.canvas.height;
	this.preview.canvas.width = this.preview.canvas.width;
};




module.exports = Canvas;
