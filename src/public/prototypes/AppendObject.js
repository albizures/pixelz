'use strict';
function AppendObject() {
  this.el = document.createElement(this.$type);
  for (var i = 0; i < arguments.length; i++) {
    this.el.classList.add(arguments[i]);
  }
}
AppendObject.prototype.appendTo = function (el) {
  el.appendChild(this.el);
};
AppendObject.prototype.$type = 'div';
module.exports = AppendObject;
