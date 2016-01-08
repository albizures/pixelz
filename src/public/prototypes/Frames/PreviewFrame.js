'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
			{SELECT_FRAME} = require('../../constants').frames,
			{inheritanceObject, createBtn, imageSmoothingDisabled} = require('../../utils.js');

function PreviewFrame(frame,selected) {
	this.$type = 'li';
	AppendObject.call(this, 'preview-frame');
	this.frame = frame;
	this.frame.selected = selected;
	this.context = document.createElement('canvas').getContext('2d');
	//this.el.style.width = this.el.style.width = size;
	this.btnClone = createBtn('C', 'btn-clone', 'btn');// TODO: Create action clone frame
	this.btnHidden = createBtn('H', 'btn-hidden', 'btn');// TODO: Create action hidden frame
	this.btnDelete = createBtn('D', 'btn-delete', 'btn');// TODO: Create action delete frame
	this.el.appendChild(this.context.canvas);
	this.el.appendChild(this.btnClone);
	this.el.appendChild(this.btnHidden);
	this.el.appendChild(this.btnDelete);

	if (selected) {
		this.el.classList.add('active');
	}
	$(this.el).on('click.frame', this.onClick.bind(this));
	$(this.btnDelete).on('click.frame', this.deleteFrame.bind(this));
}
inheritanceObject(PreviewFrame, AppendObject);
PreviewFrame.prototype.onClick = function (evt) {
	Editor.events.fire(SELECT_FRAME, this.frame);
};
PreviewFrame.prototype.deleteFrame = function (evt) {
	evt.stopPropagation();
	this.frame.delete();
};
PreviewFrame.prototype.selectFrame = function () {
	this.frame.selected = !this.frame.selected;
	this.el.classList.toggle('active');
};
PreviewFrame.prototype.resize = function () {
	let size = this.el.clientWidth;
	this.el.style.height = size + 'px';
	if (this.frame.width > this.frame.height) {
		this.context.canvas.width = size;
		this.scale = size / this.frame.width;
		this.context.canvas.height = this.frame.height * this.scale;
	}else {
		this.context.canvas.height = size;
		this.scale = size / this.frame.height;
		this.context.canvas.width = this.frame.width * this.scale;
	}
	this.updatePreview();
};
PreviewFrame.prototype.appendTo = function (el) {
	el.appendChild(this.el);
	this.resize();
};
PreviewFrame.prototype.updatePreview = function () {
	imageSmoothingDisabled(this.context);
	this.context.drawImage(this.frame.context.canvas, 0, 0, this.frame.width * this.scale, this.frame.height * this.scale);
};
module.exports = PreviewFrame;
