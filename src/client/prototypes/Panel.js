'use strict';
const {createDiv, createSpan, defineGetter, inheritanceObject } = require('../utils.js'),
			{SNAP, FLOAT, T, B, L, R, TL, TR, BL, BR} = require('../constants/index.js').panels,
			AppendObject = require('./AppendObject.js'),
			Vector = require('../prototypes/Vector.js'),
			ResizeBar = require('../prototypes/ResizeBar.js'),
			resizeBars = [T, L, B, R, TL, BL, BR, TR];
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001
function Panel(name, type, position, width, height, snapType) {
	AppendObject.call(this, 'panel', 'panel-' + name.toLowerCase());
	this.name = name;
	this.type = type;
	this.position = position || new Vector();
	this.snapType = snapType;
	if (this.isLeft() || this.isRight()) {
		this.width = width;
		this.heightPerc = height;
	}else if (false) {
		this.widthPerc = width;
		this.height = height;
	}else {
		this.width = width;
		this.height = height;
	}
	// for (let i = 0; i < resizeBars.length; i++) {
	// 	new ResizeBar(this, resizeBars[i]);
	// }
	//console.trace(type);

}
inheritanceObject(Panel, AppendObject);

defineGetter(Panel.prototype, 'layers', function () {
	console.trace('lele');
	return Editor.canvas.artboard.layer.frame.layers;
});
defineGetter(Panel.prototype, 'frame', function () {
	return Editor.canvas.artboard.layer.frame;
});
defineGetter(Panel.prototype, 'sprite', function () {
	return Editor.canvas.artboard.layer.frame.sprite;
});
Panel.prototype.heightDragBar = 20;
Panel.prototype.init = function (width, height) {
	if (this.isLeft() || this.isRight()) {
		this.heightPerc = height || this.heightPerc;
		this.width = width ||  this.width;
	}else {
		this.widthPerc = width || this.widthPerc;
		this.height = height || this.height;
	}

	if (!hasVal(this.parent)) {
		return console.error('parent undefined');
	}
	if (SNAP === this.type) {
		this.setSnapPosition();
	}else {
		this.changeSize(this.width, this.height, this.position.x, this.position.y);
	}
	this.dragBar = createDiv('drag-bar');
	this.dragBar.style.height = this.heightDragBar + 'px';
	this.dragBar.appendChild(createSpan(this.name));
	this.el.appendChild(this.dragBar);
	$(this.dragBar).on('mousedown.drag', this.onDragStart.bind(this));

	if (hasVal(this.mainInit)) {
		this.mainInit();
	}
};
Panel.prototype.isLeft = function () {
	return this.type === SNAP && this.snapType === TL || this.snapType === BL || this.snapType == L;
};
Panel.prototype.isRight = function () {
	return this.type === SNAP && this.snapType === TR || this.snapType === BR || this.snapType == R;
};
Panel.prototype.isBottom = function () {
	return this.type === SNAP && this.snapType === BL || this.snapType === BR || this.snapType == B;
};
Panel.prototype.isTop = function () {
	return this.type === SNAP && this.snapType === TR || this.snapType === TL || this.snapType == T;
};
Panel.prototype.setSnapPosition = function () {
	this.el.style.width = this.width + 'px';
	if (this.isLeft() || this.isRight()) {
		this.height = window.innerHeight * (this.heightPerc / 100);
		this.el.style.height = this.height + 'px';

	}
	if (this.isLeft()) {
		this.el.style.left = '0';
		if (this.isBottom()) {
			this.position.y = window.innerHeight - this.height;
			this.el.style.top = this.position.y + 'px';
		}else {
			this.position.y = this.el.style.top = 0;
		}
	}else if (this.isRight()) {
		this.position.x = window.innerWidth - this.width;
		this.el.style.left = this.position.x + 'px';
		if (this.isBottom()) {
			this.position.y = window.innerHeight - this.height;
			this.el.style.top = this.position.y + 'px';
		}else {
			this.position.y = this.el.style.top = 0;
		}
	}
};
Panel.prototype.changePosition = function (position) {
	position = position || this.position;
	let stats = this.el.getBoundingClientRect();
	if (position.x < 0) {
		position.x = 0;
	}
	if (position.x + stats.width > window.innerWidth) {
		position.x = window.innerWidth -  stats.width;
	}
	if (position.y < 0) {
		position.y = 0;
	}
	if (position.y + stats.height > window.innerHeight) {
		position.y = window.innerHeight -  stats.height;
	}
	this.position = position;
	this.el.style.top = position.y + 'px';
	this.el.style.left = position.x + 'px';
};
Panel.prototype.onDragStart = function (evt) {
	if (this.type === SNAP) {
		return;
	}
	this.offsetDrag = new Vector(evt.offsetX, evt.offsetY);
	$(window).off('mousemove.drag')
					.on('mousemove.drag', this.onDrag.bind(this))
					.off('mouseup.drag')
					.on('mouseup.drag', this.onDragEnd.bind(this));
};
Panel.prototype.onDragEnd = function (evt) {
	$(window).off('mousemove.drag').off('mouseup.drag');
};
Panel.prototype.onDrag = function (evt) {
	let newPosition = new Vector(evt.clientX, evt.clientY);
	newPosition.less(this.offsetDrag);
	this.changePosition(newPosition);
};
Panel.prototype.onResizeStart = function (evt) {
	$(window).off('mousemove.resize')
					.on('mousemove.resize', this.onResize.bind(this))
					.off('mouseup.resize')
					.on('mouseup.resize', this.onResizeEnd.bind(this));
	this.typeResize = evt.target.className.replace(/resize-bars|resize-corners/, '').trim();
};
Panel.prototype.onResize = function (evt) {
	if (this.type === SNAP) {
		if (this.typeResize == this.position) {
			return;
		}
	}
};
Panel.prototype.changeSize = function (width, height, x, y) {
	width = width || this.width;
	height = height || this.height;
	x = x || this.position.x;
	y = y || this.position.y;

	if (this.minWidth && height < this.minWidth) {
		width = this.minWidth;
	}
	if (this.minHeight && height < this.minHeight) {
		height = this.minHeight;
	}
	if (x < 0) {
		x = 0;
	}
	if (y < 0) {
		y = 0;
	}
	if (x > window.innerWidth + width) {
		x = window.innerWidth - width;
	}
	if (y > window.innerHeight + height) {
		y = window.innerHeight - height;
	}
	this.position = new Vector(x, y);
	this.width = width;
	this.height = height;
	this.el.style.top = y + 'px';
	this.el.style.left = x + 'px';
	this.el.style.width = width + 'px';
	this.el.style.height = height + 'px';
};
Panel.prototype.onResizeEnd = function (evt) {
	$(window).off('mousemove.resize').off('mouseup.resize');
};

module.exports = Panel;
