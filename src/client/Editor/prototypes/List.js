'use strict';
const AppendObject = require('./AppendObject.js'),
			Vector = require('./Vector.js'),
			abs = Math.abs,
			{ inheritanceObject, defineGetter} = require('utils/object.js');
let height;
function List(name, elements, margin) {
	this.$type = 'ul';
	AppendObject.call(this, 'list', name.toLowerCase() + '-list');
	this.name = name;
	if (elements && !Array.isArray(elements)) {
		elements = [elements];
	}
	this.margin = margin;
	this.elements = elements || [];
}
inheritanceObject(List, AppendObject);
List.prototype.init = function () {
	for (let i = 0; i < this.elements.length; i++) {
		this.elements[i].appendTo(this.el);
	}
};
List.prototype.remove = function (index) {
	if (this.elements[index]) {
		this.elements[index].remove();
		this.elements.splice(index, 1);
		this.order();
	}
};
List.prototype.add = function (item, index) {
	item.appendTo(this.el);
	item.on('mousedown.drag', onMouseDown.bind(item));
	if (this.elements[index]) {
		let tempElement = this.elements.splice(index);
		this.elements = this.elements.concat([item], tempElement);
	} else {
		if (!this.height) {
			this.height = item.el.clientHeight;
			this.realHeight = this.height + this.margin;
		}
		this.elements.push(item);
	}
	item.el.style.position = 'absolute';
	this.order();
};
List.prototype.order = function () {
	for (let i = 0; i < this.elements.length; i++) {
		this.elements[i].el.style.top = (i *  (this.realHeight)) + 'px';
		this.elements[i].updateIndex();
	}
};
List.prototype.removeAll = function () {
	for (let i = 0; i < this.elements.length; i++) {
		this.elements[i].remove();
	}
	this.elements.length;
};
List.prototype.orderDrag = function (item, index) {
	var top = 0;
	for (let i = 0; i < this.elements.length; i++) {
		if (i == 0 && 0 === index) {
			top += this.realHeight;
		}
		if (this.elements[i] != item) {
			if (item.index > i && index !== 0 && index === i) {
				top += this.realHeight;
			}
			this.elements[i].el.style.top = top + 'px';
			top += this.realHeight;
			if (item.index < i && index !== 0 && index === i) {
				top += this.realHeight;
			}
		}
	}
};
function onMouseDown(evt) {
	if (evt.target.tagName === 'CANVAS') {
		this.el.classList.add('drag');
		$(window).off('mouseup.drag').on('mouseup.drag', onMouseUp.bind(this));
		$(window).off('mousemove.drag').on('mousemove.drag', onMouseMove.bind(this));
	}
}
function onMouseUp(evt) {
	let stats = this.list.el.getBoundingClientRect(),
		maxY = this.list.realHeight * (this.list.elements.length - 1),
		y = (evt.clientY - stats.top + this.list.el.scrollTop) - (this.list.realHeight / 2),
		newIndex = Math.floor((y + (this.list.realHeight / 2)) / (this.list.realHeight)),
		oldIndex = this.index, item, tempItems;
	if (maxY < y) {
		y = maxY;
	} else if (y < 0) {
		y = 0;
	}
	if (newIndex < 0) {
		newIndex = 0;
	} else if (newIndex > this.list.elements - 1) {
		newIndex = this.list.elements - 1;
	}
	$(window).off('mousemove.drag');
	$(window).off('mouseup.drag');
	if (newIndex !== oldIndex) {
		this.setIndex(newIndex);
		item = this.list.elements.splice(oldIndex, 1);
		tempItems = this.list.elements.splice(newIndex);
		this.list.elements = this.list.elements.concat(item, tempItems);
	}
	this.list.order();
	this.el.classList.remove('drag');
}
function onMouseMove(evt) {
	let stats = this.list.el.getBoundingClientRect(),
		maxY = this.list.realHeight * (this.list.elements.length - 1),
		y = (evt.clientY - stats.top + this.list.el.scrollTop) - (this.list.realHeight / 2),
		index = Math.floor((y + (this.list.realHeight / 2)) / (this.list.realHeight));
	if (maxY < y) {
		y = maxY;
	} else if (y < 0) {
		y = 0;
	}
	if (index < 0) {
		index = 0;
	} else if (index > this.list.elements - 1) {
		index = this.list.elements - 1;
	}
	this.list.orderDrag(this, index);
	this.el.style.top = y + 'px';
}
module.exports = List;
