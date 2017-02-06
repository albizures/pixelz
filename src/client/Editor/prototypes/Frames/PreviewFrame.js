'use strict';
const AppendObject = require('../../prototypes/AppendObject'),
  { TRANSPARENT_IMG } = require('../../constants'),
  make = require('make'),
  {imageSmoothingDisabled} = require('utils/canvas'),
  {inheritanceObject, defineGetter} = require('utils/object');

function PreviewFrame(frame, selected, list) {
  this.$type = 'li';
  AppendObject.call(this, 'preview-frame');
  this.frame = frame;
  this.selected = selected;
  this.list = list;

  this.background = make('canvas', {parent : this.el}).getContext('2d');
  this.context = make('canvas', {parent : this.el}).getContext('2d');
  this.spanIndex = make('span', {parent : this.el,className : 'index'}, this.frame.index + 1);

  this.btnClone = make('button', {parent : this.el, className : 'btn btn-clone'}, 'C');
  this.btnHidden = make('button', {parent : this.el, className : 'btn btn-hidden'}, 'H');// TODO: Create action hidden frame
  this.btnDelete = make('button', {parent : this.el, className : 'btn btn-delete'}, 'D');

  if (selected) {
    this.el.classList.add('active');
  }
  $(this.el).on('click.frame', this.onClick.bind(this));
  $(this.btnDelete).on('click.frame', this.deleteFrame.bind(this));
  $(this.btnClone).on('click.frame', this.cloneFrame.bind(this));
}
inheritanceObject(PreviewFrame, AppendObject);
defineGetter(PreviewFrame.prototype, 'index', function () {
  return this.frame.index;
});
PreviewFrame.prototype.onClick = function (evt) {
  this.frame.select();
};
PreviewFrame.prototype.cloneFrame = function (evt) {
  evt.stopPropagation();
  this.frame.sprite.addFrame(this.frame.index);
};
PreviewFrame.prototype.setIndex = function (index) {
  this.frame.sprite.moveFrame(this.index, index);
};
PreviewFrame.prototype.deleteFrame = function (evt) {
  evt.stopPropagation();
  this.frame.delete();
};
PreviewFrame.prototype.selectFrame = function () {
  this.selected = true;
  this.el.classList.add('active');
};
PreviewFrame.prototype.unSelectFrame = function () {
  this.selected = false;
  this.el.classList.remove('active');
};
PreviewFrame.prototype.resize = function () {
  let size = this.el.clientWidth;
  this.el.style.height = size + 'px';
  this.el.style.width = size + 'px';
  if (this.frame.width > this.frame.height) {
    this.background.canvas.width = this.context.canvas.width = size;
    this.scale = size / this.frame.width;
    this.background.canvas.height = this.context.canvas.height = this.frame.height * this.scale;
    this.background.canvas.style.marginTop = this.context.canvas.style.marginTop = (size - this.background.canvas.height) / 2 + 'px';
  }else {
    this.background.canvas.height = this.context.canvas.height = size;
    this.scale = size / this.frame.height;
    this.background.canvas.width = this.context.canvas.width = this.frame.width * this.scale;
    this.background.canvas.style.marginLeft = this.context.canvas.style.marginLeft = (size - this.background.canvas.width) / 2 + 'px';
  }
  this.paintBackground();
  this.paint();
};
PreviewFrame.prototype.paintBackground = function () {
  let pattern = this.background.createPattern(TRANSPARENT_IMG, "repeat");
  this.background.rect(0, 0, this.background.canvas.width, this.background.canvas.height);
  this.background.fillStyle = pattern;
  this.background.fill();
};
PreviewFrame.prototype.appendTo = function (el) {
  el.appendChild(this.el);
  this.resize();
  this.el.classList.remove('active');
  this.spanIndex.textContent = this.frame.index + 1;
  return this;
};
PreviewFrame.prototype.updateIndex = function () {
  this.spanIndex.textContent = this.frame.index + 1;
};
PreviewFrame.prototype.paint = function () {
  this.clean();
  imageSmoothingDisabled(this.context);
  this.context.drawImage(this.frame.context.canvas,
    0, 0, this.frame.width, this.frame.height,
    0, 0, this.context.canvas.width, this.context.canvas.height
  );
};
PreviewFrame.prototype.clean = function () {
  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};
module.exports = PreviewFrame;
