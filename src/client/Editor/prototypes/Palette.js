'use strict';
const AppendObject = require('./AppendObject.js'),
	{inheritanceObject} = require('../utils/object.js'),
	make = require('make'),
	Color = require('./Color.js');

function Palette(id, name = 'unnamed', colors = [], offEvents = false) {
	AppendObject.call(this, 'palette', name.toLowerCase().replace(/ /, '-'));
	this.id = id;
	this.name = name || 'unnamed';
	this.colors = colors;
	this.offEvents = offEvents;
	this.generateColors();
}
inheritanceObject(Palette, AppendObject);

Palette.prototype.generateColors = function () {
	this.el.innerHTML = '';
	for (let i = 0; i < this.colors.length; i++) {
		let color = new Color(this.colors[i], undefined, undefined, this.offEvents);
		color.appendTo(this.el);
	}
};
Palette.prototype.setColors = function (colors = []) {
	this.colors = colors;
	this.generateColors();
};
Palette.prototype.addColor = function (color = 'rgba(0, 0, 0, 1)') {
	this.colors.push(color);
	this.generateColors();
};
Palette.prototype.findColor = function (color) {
	for (let j = 0; j < this.colors.length; j++) {
		if (this.colors[j] == color) {
			return j;
		}
	}
	return -1;
};
Palette.prototype.removeColor = function (index, color) {
	if (Number.isInteger(index)) {
		if (index === -1) {
			return;
		}
		this.colors = [].concat(this.colors.slice(0, index), this.colors.slice(index + 1));
		this.generateColors();
	} else if (color) {
		index = this.findColor(color);
		this.removeColor(index);
	}
};
module.exports = Palette;
