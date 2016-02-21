'use strict';
const AppendObject = require("../../prototypes/AppendObject.js"),
			{R, G, B, A} = require('../../constants').palette.picker,
			{RGBA} = require('../../constants').colors,
			Picker = require('../../prototypes/Palette/Picker.js'),
			pickers = new AppendObject();
pickers.init = function () {
	this.rgbaPicker = new Picker(RGBA, this.onChangeValueRGBAPicker, R, G, B, A);
	this.rgbaPicker.rangeA.input.min = 0;
	this.rgbaPicker.rangeA.input.max = 100;
	this.rgbaPicker.rangeA.spanValue.textContent = this.rgbaPicker.rangeA.value = this.rgbaPicker.rangeA.input.value = 100;
	this.rgbaPicker.appendTo(this.el);
	return this;
};
pickers.onChangeValueRGBAPicker = function () {
	let a = this.rangeA.spanValue.textContent = this.rangeA.value = this.rangeA.input.value / 100;
	let color = 'rgba(' + this.rangeR.value + ',' + this.rangeG.value + ',' + this.rangeB.value + ',' + a  + ')';
	if (pickers.callbackUpdate) {
		pickers.callbackUpdate(color);
	}
};
module.exports = pickers.init();
