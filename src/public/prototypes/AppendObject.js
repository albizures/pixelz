function AppendObject() {
  this.el = document.createElement('div');
}
AppendObject.prototype.appendTo = function (el) {
  el.appendChild(this.el);
};
module.exports = AppendObject;
