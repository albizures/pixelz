'use strict';
const AppendObject = require('../../prototypes/AppendObject'),
  { TRANSPARENT_IMG } = require('../../constants'),
  make = require('make'),
  { inheritanceObject, defineGetter } = require('utils/object'),
  { imageSmoothingDisabled} = require('utils/canvas');

function PreviewLayer(layer, selected, list) {
  this.$type = 'li';
  AppendObject.call(this, 'preview-layer');
  this.layer = layer;
  this.selected = selected;
  this.list = list;

  this.background = make('canvas', {parent : this.el}).getContext('2d');
  this.context = make('canvas', {parent : this.el}).getContext('2d');
  this.spanIndex = make('span', {parent : this.el,className : 'index'}, this.layer.index + 1);

  this.btnClone = make('button', {parent : this.el, className : 'btn btn-clone'}, 'C');
  this.btnHidden = make('button', {parent : this.el, className : 'btn btn-hidden'}, 'H');
  this.btnDelete = make('button', {parent : this.el, className : 'btn btn-delete'}, 'D');

  if (selected) {
    this.el.classList.add('active');
  }
  $(this.btnDelete).on('click.delete', this.onDelete.bind(this));
  $(this.btnClone).on('click.clone', this.onClone.bind(this));
  $(this.el).on('click.layer', this.onClick.bind(this));
}
inheritanceObject(PreviewLayer, AppendObject);
defineGetter(PreviewLayer.prototype, 'index', function () {
  return this.layer.index;
});
PreviewLayer.prototype.onClone = function (evt) {
  evt.stopPropagation();
  this.layer.frame.sprite.addLayer(this.layer);
};
PreviewLayer.prototype.onDelete = function (evt) {
  evt.stopPropagation();
  this.layer.frame.sprite.deleteLayer(this.layer.index);
};
PreviewLayer.prototype.selectLayer = function () {

};
PreviewLayer.prototype.unSelectLayer = function () {

};
PreviewLayer.prototype.setIndex = function (index) {
  this.layer.frame.moveFrame(this.index, index);
};
PreviewLayer.prototype.resize = function () {
  let size = this.el.clientWidth;
  this.el.style.height = size + 'px';
  this.el.style.width = size + 'px';
  if (this.layer.width > this.layer.height) {
    this.background.canvas.width = this.context.canvas.width = size;
    this.scale = size / this.layer.width;
    this.background.canvas.height = this.context.canvas.height = this.layer.height * this.scale;
    this.background.canvas.style.marginTop = this.context.canvas.style.marginTop = (size - this.background.canvas.height) / 2 + 'px';
  }else {
    this.background.canvas.height = this.context.canvas.height = size;
    this.scale = size / this.layer.height;
    this.background.canvas.width = this.context.canvas.width = this.layer.width * this.scale;
    this.background.canvas.style.marginLeft = this.context.canvas.style.marginLeft = (size - this.background.canvas.width) / 2 + 'px';
  }
  this.paintBackground();
  this.paint();
};
PreviewLayer.prototype.appendTo = function (el) {
  el.appendChild(this.el);
  this.resize();
  this.el.classList.remove('active');
  this.spanIndex.textContent = this.layer.index + 1;
  return this;
};
PreviewLayer.prototype.paintBackground = function () {
  let pattern = this.background.createPattern(TRANSPARENT_IMG, "repeat");
  this.background.rect(0, 0, this.background.canvas.width, this.background.canvas.height);
  this.background.fillStyle = pattern;
  this.background.fill();
};
PreviewLayer.prototype.changeLayer = function (layer) {
  this.layer = layer;
};
PreviewLayer.prototype.updateIndex = function () {
  this.spanIndex.textContent = this.layer.index + 1;
};
PreviewLayer.prototype.update = function () {};

PreviewLayer.prototype.onClick = function () {
  this.layer.frame.selectLayer(this.layer);
};
PreviewLayer.prototype.paint = function () {
  this.clean();
  imageSmoothingDisabled(this.context);
  this.context.drawImage(this.layer.context.canvas, 0, 0, this.layer.width * this.scale, this.layer.height * this.scale);
};
PreviewLayer.prototype.clean = function () {
  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  //this.context.canvas.width = this.context.canvas.width;
};

module.exports = PreviewLayer;
