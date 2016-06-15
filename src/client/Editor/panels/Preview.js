'use strict';

const Panel = require('../prototypes/Panel.js'),
	Range = require('../prototypes/Range.js'),
	{imageSmoothingDisabled} = require('utils/canvas.js'),
	make = require('make'),
	{ CHANGE_SPRITE, DELETE_FRAME } = require('../constants').events,
	{ SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel,
	{ TRANSPARENT_IMG } = require('../constants'),
	Preview = new Panel('Preview', SNAP, undefined, 15, 40, TR);
let time = 1000 / 2, loop, index = 0, ctx,
	innerWidth, innerHeight, offsetTop, offsetLeft, offsetRight;
Preview.mainInit = function () {
	this.background = make(['canvas', {className : 'background'}]).getContext('2d');
	this.preview = make(['canvas', {className : 'preview'}]).getContext('2d');
	this.areaPreview = make(['div', {className : 'area-preview'}]);

	this.contentPreview = make(['div',
		{parent : this.el, className : 'content-preview'},
		this.background.canvas,
		this.preview.canvas,
		this.areaPreview
	]);
	$(this.contentPreview).on('click.stop', this.changeStatus.bind(this));
	this.FPSRange = new Range(2, 0, 12, 'FPS', this.changeFPS.bind(this));
	this.FPSRange.appendTo(this.el);
};
Preview.changeFPS = function (type, value) {
	this.stop();
	if (value != 0) {
		time = 1000 / value;
		this.start();
	}
};
Preview.paintBackground = function () {
	let pattern = this.background.createPattern(TRANSPARENT_IMG, "repeat");
	this.background.rect(0, 0, this.background.canvas.width, this.background.canvas.height);
	this.background.fillStyle = pattern;
	this.background.fill();
};
Preview.selectFrame = function (type) {
	index = 0;
};
Preview.selectSprite = function (sprite) {
	let rect = this.contentPreview.getBoundingClientRect();
	offsetTop = Editor.panels.Menus.height;
	offsetLeft = (Editor.getLeftPanels().width * window.innerWidth) / 100;
	offsetRight = (Editor.getRightPanels().width * window.innerWidth) / 100;
	innerHeight = window.innerHeight - offsetTop;
	innerWidth = window.innerWidth - offsetRight - offsetLeft;
	if (sprite.width > sprite.height) {
		this.scale = rect.width / sprite.width;
	}else {
		this.scale = rect.height / sprite.height;
	}
	this.background.canvas.width = this.preview.canvas.width = sprite.width * this.scale;
	this.background.canvas.height = this.preview.canvas.height = sprite.height * this.scale;
	this.background.canvas.style.marginTop = this.preview.canvas.style.marginTop = ((rect.height - this.preview.canvas.height) / 2) + 'px';
	this.background.canvas.style.marginLeft = this.preview.canvas.style.marginLeft = ((rect.width - this.preview.canvas.width) / 2) + 'px';
	this.start();
	this.paintBackground();
};
Preview.start = function () {
	if (this.started) {
		return;
	}
	this.started = true;
	loop = setInterval(function () {
		Preview.loop();
	}, time);
};
Preview.changeStatus = function () {
	if (this.started) {
		this.stop();
	}else {
		this.start();
	}
};
Preview.stop = function () {
	this.started = false;
	clearInterval(loop);
};
Preview.loop = function () {
	if (index >= Editor.sprite.frames.length - 1) {
		index = -1;
	}
	index++;
	this.clean();
	imageSmoothingDisabled(this.preview);
	this.preview.drawImage(Editor.sprite.frames[index].context.canvas, 0, 0, this.preview.canvas.width, this.preview.canvas.height);
};
Preview.resize = function () {
	//Preview.selectSprite(Editor.canvas.);
};
Preview.updatePosition = function () {
	let artboard = Editor.canvas.artboard, isView, scale = this.scale,
		realOffsetTop = (offsetTop / artboard.scale) * scale,
		realOffsetLeft =  (offsetLeft / artboard.scale) * scale,
		height = artboard.scale * artboard.layer.height,
		y = (artboard.cord.y / artboard.scale) * scale,
		x = (artboard.cord.x / artboard.scale) * scale,
		width = artboard.scale * artboard.layer.width;
	if (innerHeight < height) {
		isView = (height - (height - innerHeight)) / artboard.scale;
		this.areaPreview.style.height = (isView * scale) + 'px';
	} else {
		this.areaPreview.style.height = '100%';
	}
	if (innerWidth < width) {
		isView = (width - (width - innerWidth)) / artboard.scale;
		this.areaPreview.style.width = (isView * scale) + 'px';
	} else {
		this.areaPreview.style.width = '100%';
	}
	if (x - realOffsetLeft < 0) {
		this.areaPreview.style.left = Math.abs(x - realOffsetLeft) + 'px';
	} else {
		this.areaPreview.style.left = '0';
	}
	if (y - realOffsetTop < 0) {
		this.areaPreview.style.top = Math.abs(y - realOffsetTop) + 'px';
	} else {
		this.areaPreview.style.top = '0';
	}
};
Preview.clean = function () {
	this.preview.clearRect(0, 0,  this.preview.canvas.width, this.preview.canvas.height);
};
module.exports = Preview;
