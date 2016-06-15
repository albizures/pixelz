'use strict';
const AppendObject = require('../prototypes/AppendObject.js'),
			{ inheritanceObject, createSpan, createInputRange } = require('../utils.js');

/**
 * @param {number} value current value
 * @param {number} min
 * @param {number} max
 * @param {type} type
 * @param {function} callback
 */
function Range(value, min, max, type, callback) {
	AppendObject.call(this);
	this.value = value,
	this.max = max;
	this.min = min;
	this.type = type;
	this.input = createInputRange(value, this.min, this.max);
	this.spanName = createSpan(this.type);
	this.spanValue = createSpan(this.value);
	this.callback = callback;
	$(this.input).on('input.range' + this.type, this.onChange.bind(this));
	this.el.appendChild(this.spanName);
	this.el.appendChild(this.input);
	this.el.appendChild(this.spanValue);
}
inheritanceObject(Range, AppendObject);
Range.prototype.onChange = function () {
	this.spanValue.textContent = this.value = this.input.value;
	if (this.callback) {
		this.callback(this.type, this.value);
	}
};
Range.prototype.setValue = function (value) {
	this.input.value = value;
	this.spanValue.textContent = this.value = this.input.value;
};
module.exports = Range;
