'use strict';
const AppendObject = require("./AppendObject.js"),
	{ GRADIENT, RAINBOW } = require('../constants'),
	{ hsvToRgb, rgbToHsv, getRGBAComponents} = require('../utils/colorConverts.js'),
	inheritanceObject = require("inheritanceObject"),
	make = require("make");

function CanvasPicker(size, cbChange) {
	var contentCanvas, contentRainbow, contentAlpha;
	AppendObject.call(this, 'canvas-picker');
	this.size = size;
	this.change = false;
	this.el.style.width = (this.size + 25) + 'px';
	this.onChange = cbChange;
	contentCanvas = make('div', {
		parent: this.el,
		className: 'content-canvas'
	});
	contentRainbow = make('div', {
		parent: this.el,
		className: 'content-rainbow'
	});
	contentAlpha = make(['div', {
		parent : this.el,
		className : 'content-alpha'
	}]);

	this.canvas = make('canvas', {
		parent: contentCanvas,
		className: 'canvas'
	}).getContext('2d');
	this.rainbow = make('canvas', {
		parent: contentRainbow,
		className: 'rainbow'
	}).getContext('2d');
	this.alpha = make(['div', {
		parent : contentAlpha,
		className : 'alpha'
	}]);

	this.canvasPicker = make('div', {
		parent: contentCanvas,
		className: 'canvas-picker'
	});
	this.rainbowPicker = make('div', {
		parent: contentRainbow,
		className: 'rainbow-picker'
	});

	this.alphaPicker = make('div', {
		parent : contentAlpha,
		className: 'alpha-picker'
	});

	this.rainbow.canvas.height = this.canvas.canvas.width = this.canvas.canvas.height = this.size;
	this.rainbow.canvas.width = 20;
	this.alpha.style.height = '20px';
	this.canvas.drawImage(GRADIENT, 0, 0, 255, 255, 0, 0, this.size, this.size);
	this.rainbow.drawImage(RAINBOW, 0, 0, 20, 255, 0, 0, 20, this.size);

	$(this.canvas.canvas).on('mousedown.mouse', this.onMouseDownCanvas.bind(this));
	$(this.rainbow.canvas).on('mousedown.mouse', this.onMouseDownRainbow.bind(this));
	$(this.alpha).on('mousedown.mouse', this.onMouseDownAlpha.bind(this));
}

inheritanceObject(CanvasPicker, AppendObject);

CanvasPicker.prototype.onMouseDownAlpha = function (evt) {
	this.isDragAlpha = true;
	this.alpha.stats = this.alpha.getBoundingClientRect();
	this.onMouseMoveCanvas(evt);
	$(window).on('mouseup.pickerAlpha', this.onMouseUpAlpha.bind(this));
	$(window).on('mousemove.pickerAlpha', this.onMouseMoveAlpha.bind(this));
};
CanvasPicker.prototype.onMouseMoveAlpha = function (evt) {
	var x;
	if (this.isDragAlpha) {
		console.log(evt.clientX);
		x = (evt.clientX - this.alpha.stats.left);
		x = x < 0 ? 0 : x > this.alpha.stats.width ? this.alpha.stats.width : x;
		this.alphaPicker.style.left = (x - 4) + 'px';
		this.setColor(this.hue, this.saturation, this.value, x / this.alpha.stats.width);
	}
};
CanvasPicker.prototype.onMouseUpAlpha = function (evt) {
	this.onMouseMoveAlpha(evt);
	$(window).off('mouseup.pickerAlpha');
	$(window).off('mousemove.pickerAlpha');
	this.isDragAlpha = false;
};

CanvasPicker.prototype.onMouseDownCanvas = function (evt) {
	this.isDragCanvas = true;
	this.canvas.stats = this.canvas.canvas.getBoundingClientRect();
	this.onMouseMoveCanvas(evt);
	$(window).on('mouseup.pickerCanvas', this.onMouseUpCanvas.bind(this));
	$(window).on('mousemove.pickerCanvas', this.onMouseMoveCanvas.bind(this));
};
CanvasPicker.prototype.onMouseUpCanvas = function (evt) {
	this.onMouseMoveCanvas(evt);
	$(window).off('mouseup.pickerCanvas');
	$(window).off('mousemove.pickerCanvas');
	this.isDragCanvas = false;
};
CanvasPicker.prototype.onMouseMoveCanvas = function (evt) {
	var x, y;
	if (this.isDragCanvas) {
		y = (evt.clientY - this.canvas.stats.top);
		x = (evt.clientX - this.canvas.stats.left);
		y = y < 0 ? 0 : y > this.size ? this.size : y;
		x = x < 0 ? 0 : x > this.size ? this.size : x;
		this.canvasPicker.style.top = (y - 4) + 'px';
		this.canvasPicker.style.left = (x - 4) + 'px';
		this.setColor(this.hue, (x / this.size), ((this.size - y) / this.size), this.opacity);
	}
};

CanvasPicker.prototype.onMouseDownRainbow = function (evt) {
	this.isDragRainbow = true;

	this.rainbow.stats = this.rainbow.canvas.getBoundingClientRect();
	this.onMouseMoveRainbow(evt);
	$(window).on('mouseup.pickerCanvas2', this.onMouseUpRainbow.bind(this));
	$(window).on('mousemove.pickerCanvas2', this.onMouseMoveRainbow.bind(this));
};
CanvasPicker.prototype.onMouseUpRainbow = function (evt) {
	this.onMouseMoveRainbow(evt);
	$(window).off('mouseup.pickerCanvas2');
	$(window).off('mousemove.pickerCanvas2');
	this.isDragRainbow = false;
};
CanvasPicker.prototype.onMouseMoveRainbow = function (evt) {
	var y;
	if (this.isDragRainbow) {
		y = (evt.clientY - this.rainbow.stats.top);
		y = y < 0 ? 0 : y > this.size ? this.size : y;
		this.rainbowPicker.style.top = (y - 4) + 'px';
		this.setColor((this.size - y) / this.size, this.saturation, this.value, this.opacity);
	}
};
CanvasPicker.prototype.setRGBColor = function (color) {
	var h, s, v, opacity;
	color = getRGBAComponents(color);
	opacity = Number(color[3]);
	color = rgbToHsv(color[0], color[1], color[2]);
	h = this.size - (color[0] * this.size);
	s = (color[1] * this.size);
	v = this.size - (color[2] * this.size);
	this.setPositions(h, s, v, opacity);
	this.setColor(color[0], color[1], color[2], opacity, true);
	this.alpha.style.background = 'linear-gradient(to right, transparent , rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + '))';
	this.setBackgroundColor();
};
CanvasPicker.prototype.setPositions = function (h, s, v, o) {
	this.rainbowPicker.style.top = (h - 4) + 'px';
	this.canvasPicker.style.left = (s - 4) + 'px';
	this.canvasPicker.style.top = (v - 4) + 'px';
	console.log("calc(" + o * 100 + "% - 4)");
	this.alphaPicker.style.left = "calc(" + o * 100 + "% - 4px)";
};
CanvasPicker.prototype.setBackgroundColor = function () {
	let temp = hsvToRgb(this.hue, 1, 1);
	this.canvas.canvas.style.backgroundColor = 'rgb(' + parseInt(temp[0]) + ', ' + parseInt(temp[1]) + ', ' + parseInt(temp[2]) + ')';
};
CanvasPicker.prototype.setColor = function (hue, saturation, value, opacity, onlySet) {
	if (hue !== this.hue) {
		this.hue = hue;
		this.setBackgroundColor();
	}
	this.saturation = saturation;
	this.value = value;
	this.opacity = opacity;
	if (!onlySet && this.onChange) {
		let temp = hsvToRgb(this.hue, this.saturation, this.value);
		this.alpha.style.background = 'linear-gradient(to right, transparent , rgb(' + parseInt(temp[0]) + ', ' + parseInt(temp[1]) + ', ' + parseInt(temp[2]) + '))';
		this.onChange('rgba(' + parseInt(temp[0]) + ', ' + parseInt(temp[1]) + ', ' + parseInt(temp[2]) + ', ' + this.opacity.toFixed(2) + ')');
	}

};
module.exports = CanvasPicker;
