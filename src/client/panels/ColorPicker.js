'use strict';

const Panel = require('../prototypes/Panel.js'),
	Vector = require('../prototypes/Vector.js'),
	{ make } = require('../utils.js'),
	{FLOAT} = require('../constants').panels,
	{R, G, B, A} = require('../constants').palette.picker,
	{RGBA} = require('../constants').colors,
	Picker = require('../prototypes/Picker.js'),
	{CHANGE_SPRITE} = require('../constants').events,
	ColorPicker = new Panel('ColorPicker', FLOAT, new Vector(500, 500), undefined, undefined, undefined, false, true);

ColorPicker.mainInit = function () {
	var position = JSON.parse(localStorage.getItem('panel-' + this.name.toLowerCase()) || '{"x": 500, "y": 500}');
	const Color = require('../prototypes/Color.js');
	this.changePosition(new Vector(position.x, position.y));
	this.rgbaPicker = new Picker(RGBA, this.onChangeValueRGBAPicker.bind(this), R, G, B, A);
	this.rgbaPicker.rangeA.input.min = 0;
	this.rgbaPicker.rangeA.input.max = 100;
	this.rgbaPicker.rangeA.spanValue.textContent = this.rgbaPicker.rangeA.value = this.rgbaPicker.rangeA.input.value = 100;
	this.rgbaPicker.appendTo(this.el);
	this.color = new Color(undefined, false, 100, true).appendTo(this.el);
	$(make('button', {parent : this.el}, 'ok')).on('click.ok', this.ok.bind(this));
	$(make('button', {parent : this.el}, 'cancel')).on('click.cancal', this.cancel.bind(this));
};
ColorPicker.onChangeValueRGBAPicker = function (color) {
	this.color.changeColor(color);
};
ColorPicker.cancel = function () {
	this.hide();
};
ColorPicker.ok = function () {
	if (this.callbackChange) {
		this.callbackChange(this.rgbaPicker.color);
	}
	this.hide();
};
ColorPicker.changeColor = function (color, callback) {
	this.rgbaPicker.setColor(color);
	this.color.changeColor(color);
	this.callbackChange = callback;
	this.show();
};
module.exports = ColorPicker;
