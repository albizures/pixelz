'use strict';
const AppendObject = require('./AppendObject.js'),
	inheritanceObject = require('../utils/inheritanceObject.js'),
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

module.exports = Palette;
