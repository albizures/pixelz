'use strict';
function AppendObject() {
	this.el = document.createElement(this.$type);
	for (let i = 0; i < arguments.length; i++) {
		this.el.classList.add(arguments[i]);
	}
}
AppendObject.prototype.appendTo = function (el) {
	el.appendChild(this.el);
};
AppendObject.prototype.remove = function () {
	this.el.remove();
};
AppendObject.prototype.$type = 'div';
module.exports = AppendObject;
