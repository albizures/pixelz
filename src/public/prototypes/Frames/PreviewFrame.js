'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
			{SELECT_FRAME} = require('../../constants').frames,
			{inheritanceObject, createBtn, createSpan, imageSmoothingDisabled} = require('../../utils.js');

function PreviewFrame(frame,selected) {
	this.$type = 'li';
	AppendObject.call(this, 'preview-frame');
	this.frame = frame;
	this.frame.selected = selected;
	this.context = document.createElement('canvas').getContext('2d');
	//this.el.style.width = this.el.style.width = size;
	this.btnClone = createBtn('C', 'btn-clone', 'btn');// TODO: Create action clone frame
	this.btnHidden = createBtn('H', 'btn-hidden', 'btn');// TODO: Create action hidden frame
	this.btnDelete = createBtn('D', 'btn-delete', 'btn');
	this.spanIndex = createSpan(this.frame.index + 1, 'index');


	this.el.appendChild(this.btnClone);
	this.el.appendChild(this.context.canvas);
	this.el.appendChild(this.btnHidden);
	this.el.appendChild(this.btnDelete);
	this.el.appendChild(this.spanIndex);

	if (selected) {
		this.el.classList.add('active');
	}
	$(this.el).on('click.frame', this.onClick.bind(this));
	$(this.btnDelete).on('click.frame', this.deleteFrame.bind(this));
	$(this.btnClone).on('click.frame', this.cloneFrame.bind(this));
}
inheritanceObject(PreviewFrame, AppendObject);
PreviewFrame.prototype.onClick = function (evt) {
	Editor.events.fire(SELECT_FRAME, this.frame);
};
PreviewFrame.prototype.cloneFrame = function (evt) {
	evt.stopPropagation();
	this.frame.sprite.addFrame(this.frame.index);
};
PreviewFrame.prototype.deleteFrame = function (evt) {
	evt.stopPropagation();
	this.frame.delete();
};
PreviewFrame.prototype.selectFrame = function () {
	this.frame.selected = true;
	this.el.classList.add('active');
};
PreviewFrame.prototype.unSelectFrame = function () {
	this.frame.selected = false;
	this.el.classList.remove('active');
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
	this.el.classList.remove('active');
	this.spanIndex.textContent = this.frame.index + 1;
};
PreviewFrame.prototype.updatePreview = function () {
	imageSmoothingDisabled(this.context);
	this.context.drawImage(this.frame.context.canvas, 0, 0, this.frame.width * this.scale, this.frame.height * this.scale);
};
module.exports = PreviewFrame;
