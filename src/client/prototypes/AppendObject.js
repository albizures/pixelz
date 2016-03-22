'use strict';
const { defineGetter } = require('../utils.js');

function AppendObject() {
	this.el = document.createElement(this.$type);
	for (let i = 0; i < arguments.length; i++) {
		this.el.classList.add(arguments[i]);
	}
}
defineGetter(AppendObject.prototype, 'parent', function () {
	return this.el.parentNode;
});
AppendObject.prototype.appendTo = function (parent) {
	parent.appendChild(this.el);
	return this;
};
AppendObject.prototype.remove = function () {
	this.el.remove();
};
AppendObject.prototype.addClass = function (cls) {
	this.el.classList.add(cls);
	return this;
};
AppendObject.prototype.removeClass = function (cls) {
	this.el.classList.remove(cls);
	return this;
};
AppendObject.prototype.$type = 'div';
module.exports = AppendObject;
