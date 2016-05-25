'use strict';
const Panel = require('../prototypes/Panel.js'),
	Vector = require('../prototypes/Vector.js'),
	{ make } = require('../utils.js'),
	Action = require('../prototypes/Action.js'),
	Actions = require('./Actions.js'),
	BackgroundLayer = Panel.createFloatPanel('BackgroundLayer', new Vector((window.innerWidth / 2) - 100, 100), true);

BackgroundLayer.mainInit = function () {
	let grid;
	this.el.style['z-index'] = '10';
	this.body = make('div', {parent : this.el, className : 'body'});
	this.body.style.width = '200px';
	//this.body.style.height = '400px';
	
	this.inputImage = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'Image: ')),
		type : 'file'
	});
	this.preview = make('canvas', {
		parent : this.body,
	}).getContext('2d');
	
	$(this.inputImage).on('change.input', this.onInputImage.bind(this));

};
BackgroundLayer.onShow = function () {
	if (Editor.canvas.artboard.layer.background) {
		this.preview.canvas.style.display = 'block';
	} else {
		this.preview.canvas.style.display = 'none';
	}
	this.preview.canvas.width = Editor.sprite.height * 8;
	this.preview.canvas.height = Editor.sprite.width * 8;
};
BackgroundLayer.onInputImage = function (evt) {
	let image = new Image();
	image.onload = onLoad.bind(this);
	image.src = URL.createObjectURL(evt.target.files[0]);
	function onLoad() {
		this.preview.drawImage(image, 0, 0, 200, 200);
		this.preview.canvas.style.display = 'block';
	}
};

module.exports = BackgroundLayer;
