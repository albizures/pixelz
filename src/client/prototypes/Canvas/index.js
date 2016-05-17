'use strict';
const Vector = require('../Vector.js'),
	{ floor, round} = Math,
	Tools = require('../../panels/Tools.js'),
	Preview = require('../../panels/Preview.js'),
	make = require('make'),
	extend = require('../../utils/extend.js'),
	imageSmoothing = require('../../utils/imageSmoothing.js'),
	{SCALE_DEF, SIZE_POINTER_DEF, MIDDLE_CLICK, TRANSPARENT_IMG,
		RIGHT_CLICK,LEFT_CLICK} = require('../../constants'),
	$window = $(window);
// TODO: create the prototype of the artboard
let artboard = {
	get width() {
		return this.layer.width * this.scale;
	},
	get height() {
		return this.layer.height * this.scale;
	}
};
function Canvas(layer, scale, cord, sizePointer) {
	this.artboard = artboard;
	this.parent = document.body;
	this.artboard.scale = scale || SCALE_DEF;
	this.artboard.layer = layer;
	this.artboard.cord = cord;
	this.sizePointer = (sizePointer || SIZE_POINTER_DEF) * scale;
	this.init();
}

Canvas.prototype = {
	contructor : Canvas,
	get tool () {
		return Editor.panels.Tools.currentTool;
	}
};
Canvas.prototype.init = function () {
	this.background = make('canvas', { parent : this.parent, className : 'background'}).getContext('2d');
	this.main = make('canvas', { parent : this.parent, className : 'canvas'}).getContext('2d');
	this.preview = make('canvas', { parent : this.parent, className : 'preview'}).getContext('2d');
	this.mask = make('canvas', { parent : this.parent, className : 'mask'}).getContext('2d');

	TRANSPARENT_IMG.img.addEventListener('load', this.paintBackground.bind(this));

	$(this.preview.canvas)
		.off('mousewheel.canvas').on('mousewheel.canvas', this.onScroll.bind(this))
		.off('DOMMouseScroll.canvas').on('DOMMouseScroll.canvas', this.onScroll.bind(this))
		.off('mousedown.canvas').on('mousedown.canvas', this.onMouseDown.bind(this));


	$window.off('resize.canvas')
		.on('resize.canvas', this.resize.bind(this))
		.off('mousemove.preview').on('mousemove.preview', this.onMouseMove.bind(this));
	this.resize();
};
Canvas.prototype.resize = function () {
	this.mask.canvas.width = this.background.canvas.width = this.main.canvas.width = this.preview.canvas.width = window.innerWidth;
	this.mask.canvas.height  = this.background.canvas.height = this.main.canvas.height = this.preview.canvas.height = window.innerHeight;

	imageSmoothing(this.main, false);
	imageSmoothing(this.preview, false);
	imageSmoothing(this.background, false);
	//this.cleanPrev();
	//this.cleanMain();
	//this.cleanBackground();
	this.paintBackground();
	this.paintMask();
	this.paintMain();
};
Canvas.prototype.changeLayer = function (layer) {
	console.trace(layer);
	this.artboard.layer = layer;
	this.paintMain();
};

let out;
Canvas.prototype.onScroll = function (evt) {
	if (!out) {
		out = setTimeout(function () {
			out = undefined;
			let diff = 1.06;
			if (evt.deltaY > 0 || evt.detail > 0) {
				diff = 0.9;
				return this.scaleTo(Math.floor((this.artboard.scale * diff)));
			}else if (evt.deltaY < 0 || evt.detail < 0) {
				diff = 1.1;
				return this.scaleTo(Math.ceil((this.artboard.scale * diff)));
			}
		}.bind(this), 40);
	}
};

Canvas.prototype.scaleTo = function (scale) {
	var width, height;
	if (scale < 1) {
		return;
	}
	this.artboard.cord.x += (this.artboard.layer.width * this.artboard.scale) / 2;
	this.artboard.cord.y += (this.artboard.layer.height * this.artboard.scale) / 2;

	this.sizePointer = (this.sizePointer / this.artboard.scale) * scale;
	this.artboard.scale = scale;
	this.cleanPrev();

	this.artboard.cord.x = this.artboard.cord.x - (this.artboard.layer.width * this.artboard.scale / 2);
	this.artboard.cord.y = this.artboard.cord.y - (this.artboard.layer.height * this.artboard.scale / 2);

	this.artboard.cord.x = round(this.artboard.cord.x);
	this.artboard.cord.y = round(this.artboard.cord.y);
	this.paintMask();
	this.paintMain();
	if (this.artboard.select) {
		this.paintAreaSelect();
	}
	Preview.updatePosition();
};

let offsetX, offsetY;
Canvas.prototype.onMouseDown = function (evt) {
	evt.preventDefault();
	if (evt.which === LEFT_CLICK || evt.which === RIGHT_CLICK) {
		if (this.artboard.select) {
			let cord = this.calculatePosition(evt.clientX, evt.clientY);
			console.log(this.artboard.select.insideSelect(cord));
			if (this.artboard.select.insideSelect(cord)) {
				offsetX = cord.x - this.artboard.select.cord.x;
				offsetY = cord.y - this.artboard.select.cord.y;
				$window
					.off('mousemove.canvas')
					.on('mousemove.canvas', this.onDragSelect.bind(this))
					.on('mouseup.canvas', () => {
						$window
							.off('mouseup.canvas')
							.off('mousemove.canvas');
					});
			} else {
				this.artboard.layer.paintSelect(this.artboard.select);
				this.artboard.select = undefined;
				this.paintMain();
				this.cleanPrev();
				this.tool.onMouseDown(evt);
			}

		} else {
			this.cleanPrev();
			this.tool.onMouseDown(evt);
		}
	}else if (evt.which === MIDDLE_CLICK) {
		this.lastDragX = evt.clientX;
		this.lastDragY = evt.clientY;
		this.cleanPrev();
		$window
			.off('mousemove.canvas')
			.on('mousemove.canvas', this.onDragMove.bind(this))
			.off('mouseup.canvas').on('mouseup.canvas', () => {
				$window
					.off('mouseup.canvas')
					.off('mousemove.canvas');
			});
	}
};

Canvas.prototype.onDragMove = function (evt) {
	evt.preventDefault();
	let diffX = evt.clientX - this.lastDragX;
	let diffY = evt.clientY - this.lastDragY;
	this.lastDragX = evt.clientX;
	this.lastDragY = evt.clientY;
	this.shiftDiff(new Vector(diffX, diffY));
};

Canvas.prototype.onDragSelect = function (evt) {
	let cord;
	evt.preventDefault();
	cord = this.calculatePosition(evt.clientX, evt.clientY);
	cord.x -= offsetX;
	cord.y -= offsetY;
	this.artboard.select.cord = cord;

	this.paintAreaSelect();
};

Canvas.prototype.onMouseUp = function (evt) {
	evt.preventDefault();

	this.cleanPrev();

	// $window.off('mouseup.canvas')
	// 	.off('mousemove.canvas')
	// 	.on('mousemove.canvas', this.onMouseMove.bind(this));
};

Canvas.prototype.onMouseMove = function (evt) {
	evt.preventDefault();
	this.drawPreview(evt);
};

Canvas.prototype.shiftDiff = function (cord) {
	this.artboard.cord.sum(cord);
	this.paintMask();
	this.paintMain();
	Preview.updatePosition();
};

Canvas.prototype.calculatePosition = function (x, y) {
	// TODO: Add support many sizes pointer
	x = floor((x - this.artboard.cord.x) / this.artboard.scale);
	y = floor((y - this.artboard.cord.y) / this.artboard.scale);
	return {x : x, y : y};
};

Canvas.prototype.cordLayerToPaint = function (cord) {
	cord.x = (cord.x * this.artboard.scale) + this.artboard.cord.x;
	cord.y = (cord.y * this.artboard.scale) + this.artboard.cord.y;
	return cord;
};

Canvas.prototype.center = function () {
	this.artboard.cord = new Vector(
		Math.round((window.innerWidth / 2) - (this.artboard.width / 2)),
		Math.round((window.innerHeight / 2) - (this.artboard.height / 2))
	);
	this.paintMask();
	this.paintMain();
	Preview.updatePosition();
};

Canvas.prototype.addAreaSelect = function (select) {
	this.artboard.select = select;
};

extend(Canvas.prototype, require('./utils.js'));
extend(Canvas.prototype, require('./main.js'));
extend(Canvas.prototype, require('./preview.js'));
extend(Canvas.prototype, require('./mask.js'));
extend(Canvas.prototype, require('./background.js'));

module.exports = Canvas;
