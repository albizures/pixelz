'use strict';
const Range = require('./Range.js'),
	AppendObject = require('../prototypes/AppendObject.js'),
	{inheritanceObject} = require('../utils.js'),
	{getRGBAValues} = require('../utils.js').colors;
function Picker(name,callback) {
	AppendObject.call(this, 'picker');
	this.name = name + 'Picker';
	this.callbackUpdate = callback;
	this.types = Array.prototype.slice.call(arguments, 2);
	for (let i = 0; i < this.types.length; i++) {
		let newRange = new Range(0, 0, 255, this.types[i], this.onChangeRange.bind(this));
		newRange.appendTo(this.el);
		this['range' + this.types[i]] = newRange;
	}
	let a = this.rangeA.spanValue.textContent = this.rangeA.value = this.rangeA.input.value / 100;
	this.color = 'rgba(' + this.rangeR.value + ', ' + this.rangeG.value + ', ' + this.rangeB.value + ', ' + a  + ')';
}
inheritanceObject(Picker, AppendObject);
Picker.prototype.onChangeRange = function () {
	let a = this.rangeA.spanValue.textContent = this.rangeA.value = this.rangeA.input.value / 100;
	let color = 'rgba(' + this.rangeR.value + ',' + this.rangeG.value + ',' + this.rangeB.value + ',' + a  + ')';
	if (this.callbackUpdate) {
		this.callbackUpdate(color);
	}
	this.color = color;
};
Picker.prototype.setColor = function (color) {
	let values = getRGBAValues(color);
	this.rangeR.setValue(values[0]);
	this.rangeG.setValue(values[1]);
	this.rangeB.setValue(values[2]);
	this.rangeA.setValue(values[3] * 100);
	this.onChangeRange();
};
module.exports = Picker;