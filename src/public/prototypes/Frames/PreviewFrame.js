'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
			{inheritanceObject, createBtn, imageSmoothingDisabled} = require('../../utils.js');

function PreviewFrame(frame) {
	this.$type = 'li';
	AppendObject.call(this, 'preview-frame');
	this.frame = frame;
	this.context = document.createElement('canvas').getContext('2d');
	//this.el.style.width = this.el.style.width = size;
	this.btnClone = createBtn('C', 'btn-clone');// TODO: Create action clone frame
	this.btnHidden = createBtn('H', 'btn-hidden');// TODO: Create action hidden frame
	this.btnDelete = createBtn('D', 'btn-delete');// TODO: Create action delete frame
	this.el.appendChild(this.context.canvas);
	this.el.appendChild(this.btnClone);
	this.el.appendChild(this.btnHidden);
	this.el.appendChild(this.btnDelete);
	$(this.el).on('click.frame', this.onClick.bind(this));
	//this.context.height = this.context.width
}
inheritanceObject(PreviewFrame, AppendObject);
PreviewFrame.prototype.onClick = function (evt) {
	Editor.canvas.changeFrame(this.frame);
};
PreviewFrame.prototype.appendTo = function (el) {
	el.appendChild(this.el);
	let size = this.el.clientWidth;
	if (this.frame.width > this.frame.height) {
		this.context.canvas.width = size;
		this.scale = size / this.frame.width;
		this.context.canvas.height = this.frame.height * this.scale;
	}else {
		this.context.canvas.height = size;
		this.scale = size / this.frame.height;
		this.context.canvas.width = this.frame.width * this.scale;
	}
};
PreviewFrame.prototype.updatePreview = function () {
	imageSmoothingDisabled(this.context);
	this.context.drawImage(this.frame.context.canvas, 0, 0, this.frame.width * this.scale, this.frame.height * this.scale);
};
module.exports = PreviewFrame;
