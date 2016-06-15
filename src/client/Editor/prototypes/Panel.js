'use strict';
const {createDiv, createSpan, defineGetter, inheritanceObject } = require('../utils.js'),
	AppendObject = require('./AppendObject.js'),
	Vector = require('../prototypes/Vector.js');//,
//ResizeBar = require('../prototypes/ResizeBar.js'),
//7resizeBars = [T, L, B, R, TL, BL, BR, TR];
// IDEA: http://codepen.io/zz85/pen/gbOoVP?editors=001

/**
 * Creates a new panel
 * @class
 * @param {string} name - Name of the panel
 * @param {string} type - Type of the panel
 * @param {object} position
 * @param {number} width
 * @param {number} height
 * @param {string} snapType
 * @param {boolean} notDragbar Visibility of dragbar
 * @param {boolean} hidden - Init visibility
 */
function Panel(name, type, position, width, height, snapType, notDragbar, hidden) {
	AppendObject.call(this, 'panel', 'panel-' + name.toLowerCase(), 'panel-' + type);
	this.name = name;
	this.type = type;
	this.position = position || new Vector();
	this.snapType = snapType;
	this.notDragbar = notDragbar;
	this.hidden = hidden;
	this.width = width;
	this.height = height;
}
inheritanceObject(Panel, AppendObject);

defineGetter(Panel.prototype, 'layers', function () {
	return Editor.canvas.artboard.layer.frame.layers;
});
defineGetter(Panel.prototype, 'frame', function () {
	return Editor.canvas.artboard.layer.frame;
});
defineGetter(Panel.prototype, 'sprite', function () {
	return Editor.canvas.artboard.layer.frame.sprite;
});

Panel.SNAP = 'snap';
Panel.MODAL = 'modal';
Panel.FLOAT = 'float';
Panel.T = 'T'; // top
Panel.B = 'B'; // bottom
Panel.L = 'L'; // left
Panel.R = 'R'; // right
Panel.TL = 'TL'; // top left
Panel.TR = 'TR'; // top right
Panel.BL = 'BL'; // bottom left
Panel.BR = 'BR'; // bottom right
Panel.M = 'M'; // middle

Panel.prototype.hide = function () {
	this.el.style.opacity = 0;
	this.el.style.pointerEvents = 'none';
};
Panel.prototype.show = function (width, height) {
	this.el.style.width = width || this.el.style.width;
	this.el.style.height = height || this.el.style.height;
	this.el.style.opacity = 1;
	this.el.style.pointerEvents = 'initial';
	this.onShow();
};
Panel.prototype.onShow = function () {};
Panel.prototype.heightDragBar = 20;
Panel.prototype.init = function (width, height) {
	if (this.hidden) {
		this.hide();
	}
	if (!hasVal(this.parent)) {
		return console.error('parent undefined');
	}
	console.log(this.el.parentElement);
	if (Panel.SNAP === this.type && this.el.parentElement.dataset.hasOwnProperty('reactroot')) {
		this.setSnapPosition();
	}else if (Panel.FLOAT === this.type) {
		this.changeSize(this.width, this.height, this.position.x, this.position.y);
	} else if (this.el.parentElement.dataset.hasOwnProperty('reactroot')) {
		let heightMenus = (Editor.panels.Menus.height * 100) / window.innerHeight;
		this.el.style.top = 0; //heightMenus + '%';
		this.el.style.height = '100%';//(100 - heightMenus) + '%';
	}
	if (!this.notDragbar) {
		this.dragBar = createDiv('drag-bar');
		this.dragBar.style.height = this.heightDragBar + 'px';
		this.dragBar.appendChild(createSpan(this.name));
		this.el.appendChild(this.dragBar);
		$(this.dragBar).on('mousedown.drag', this.onDragStart.bind(this));
	}
	if (hasVal(this.mainInit)) {
		this.mainInit();
	}
	this.isInit = true;
};
Panel.prototype.isLeft = function () {
	return this.type === Panel.SNAP && this.snapType === Panel.TL || this.snapType === Panel.BL || this.snapType == Panel.L;
};
Panel.prototype.isRight = function () {
	return this.type === Panel.SNAP && this.snapType === Panel.TR || this.snapType === Panel.BR || this.snapType == Panel.R;
};
Panel.prototype.isBottom = function () {
	return this.type === Panel.SNAP && this.snapType === Panel.BL || this.snapType === Panel.BR || this.snapType == Panel.B;
};
Panel.prototype.isTop = function () {
	return this.type === Panel.SNAP && this.snapType === Panel.TR || this.snapType === Panel.TL || this.snapType == Panel.T;
};
Panel.prototype.setSnapPosition = function () {
	if (this.isLeft() || this.isRight()) {
		this.el.style.width = this.width + '%';
		let heightMenus = (Editor.panels.Menus.height * 100) / window.innerHeight;
		if (this.isLeft()) {
			this.el.style.left = '0';
			if (this.isTop()) {
				this.position.y = heightMenus;
				this.el.style.top = heightMenus + '%';
				this.height -= heightMenus;
			}else {
				this.el.style.top = this.position.y + '%';
			}
		}else if (this.isRight()) {
			this.position.x = 100 - this.width;
			this.el.style.left = this.position.x + '%';
			if (this.isTop()) {
				this.position.y = heightMenus;
				this.el.style.top = heightMenus + '%';
				this.height -= heightMenus;
			}else {
				this.el.style.top = this.position.y + '%';
			}
		}
		this.el.style.height = this.height + '%';
	} else {
		this.el.style.width = this.width + '%';
		if (this.name == 'Menus') {
			this.el.style.height = this.height + 'px';
		} else {
			this.el.style.height = this.height + '%';
		}
		if (this.isTop()) {
			this.el.style.top = 0;
		} else {
			this.el.style.bottom = 0;
		}
	}
};
Panel.prototype.$add = function () {
	Editor.addPanel(this);
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
	localStorage.setItem('panel-' + this.name.toLowerCase(), position.toString());
	this.el.style.top = position.y + 'px';
	this.el.style.left = position.x + 'px';
};
Panel.prototype.onDragStart = function (evt) {
	if (this.type === Panel.SNAP) {
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
	if (this.type === Panel.SNAP) {
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

Panel.createFloatPanel = function (name, position, hidden, width, height) {
	return new Panel(name, Panel.FLOAT, position, width, height, undefined, false, hidden);
};

Panel.createModalPanel = function (name, hidden) {
	return new Panel(name, Panel.MODAL, undefined, 0, 0, undefined, true, hidden);
};

module.exports = Panel;
