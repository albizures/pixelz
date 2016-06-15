'use strict';
console.log(require('../constants/index.js'));
const {defineGetter, inheritanceObject } = require('../utils/object.js'),
			{SNAP, FLOAT, T, B, L, R, TL, TR, BL, BR} = require('../constants/index.js').panels,
			resizeBars = [T, L, B, R],
			resizeCorners = [TL, BL, BR, TR],
			AppendObject = require('./AppendObject.js'),
			Vector = require('../prototypes/Vector.js');

function ResizeBar(panel, type) {
	AppendObject.call(this, 'resize-bar', type);
	this.type = type;
	this.panel = panel;
	this.appendTo(this.panel.el);
	$(this.el).on('mousedown.resize', this.onResizeStart.bind(this));
}
inheritanceObject(ResizeBar, AppendObject);

ResizeBar.prototype.onResizeStart = function (evt) {
	this.isResized = true;
	$(window).off('mousemove.drag')
					.on('mousemove.drag', this.onResize.bind(this))
					.off('mouseup.drag')
					.on('mouseup.drag', this.onResizeEnd.bind(this));
};
ResizeBar.prototype.onResize = function (evt) {
	let cords = new Vector(evt.clientX, evt.clientY);
	if (resizeBars.indexOf(this.type) !== -1) {
		if (this.type == T) {
			this.panel.changeSize(undefined, (this.panel.position.y - cords.y) + this.panel.height, undefined, cords.y);
		} else if (this.type == B) {
			this.panel.changeSize(undefined, cords.y - this.panel.position.y);
		} else if (this.type == L) {
			this.panel.changeSize((this.panel.position.x - cords.x) + this.panel.width, undefined, cords.x, undefined);
		} else if (this.type == R) {
			this.panel.changeSize(cords.x - this.panel.position.x, undefined);
		}
	} else {
		if (this.type == TL) {
			this.panel.changeSize((this.panel.position.x - cords.x) + this.panel.width, (this.panel.position.y - cords.y) + this.panel.height, cords.x, cords.y);
		} else if (this.type == TR) {
			this.panel.changeSize(cords.x - this.panel.position.x, (this.panel.position.y - cords.y) + this.panel.height, undefined, cords.y);
		} else if (this.type == BR) {
			this.panel.changeSize(cords.x - this.panel.position.x, cords.y - this.panel.position.y, undefined, undefined);
		} else if (this.type == BL) {
			this.panel.changeSize((this.panel.position.x - cords.x) + this.panel.width, cords.y - this.panel.position.y, cords.x, undefined);
		}
	}
};
ResizeBar.prototype.onResizeEnd = function (evt) {
	$(window).off('mousemove.drag')
					.off('mouseup.drag');
};
module.exports = ResizeBar;
