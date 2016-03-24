'use strict';

const Panel = require('../prototypes/Panel.js'),
	Range = require('../prototypes/Palette/Range.js'),
	{imageSmoothingDisabled, make} = require('../utils.js'),
	{ CHANGE_SPRITE, DELETE_FRAME } = require('../constants').events,
	{ SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
	{ TRANSPARENT_IMG } = require('../constants'),
	Preview = new Panel('Preview', SNAP, undefined, 15, 40, TR);
let time = 0.5 * 1000, loop, index = 0, ctx;

Preview.mainInit = function () {
	this.background = make(['canvas', {className : 'background'}]).getContext('2d');
	this.preview = make(['canvas', {className : 'preview'}]).getContext('2d');

	this.contentPreview = make(['div',
		{parent : this.el, className : 'content-preview'},
		this.background.canvas,
		this.preview.canvas
	]);
	this.FPSRange = new Range(2, 0, 12, 'FPS', this.changeFPS.bind(this));
	this.FPSRange.appendTo(this.el);
	$(this.preview.canvas).on('click.animator', this.changeStatus.bind(this));
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
	this.scale;
	if (this.contentPreview.clientWidth > this.contentPreview.clientHeight) {
		this.scale = this.contentPreview.clientHeight / sprite.height;
	}else {
		this.scale = this.contentPreview.clientWidth / sprite.width;
	}
	this.background.canvas.width = this.preview.canvas.width =	sprite.width * this.scale;
	this.background.canvas.height = this.preview.canvas.height =	sprite.height * this.scale;
	this.background.canvas.style.marginTop = this.preview.canvas.style.marginTop = ((this.contentPreview.clientHeight - this.preview.canvas.height) / 2) + 'px';
	this.background.canvas.style.marginLeft = this.preview.canvas.style.marginLeft = ((this.contentPreview.clientWidth - this.preview.canvas.width) / 2) + 'px';
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
	console.log(this.started);
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
Preview.clean = function () {
	this.preview.clearRect(0, 0,  this.preview.canvas.width, this.preview.canvas.height);
};
module.exports = Preview;