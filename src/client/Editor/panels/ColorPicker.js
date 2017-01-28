'use strict';

const
  heightCanvasPicker = 250,
  Panel = require('../prototypes/Panel'),
  Vector = require('../prototypes/Vector'),
  CanvasPicker = require('../prototypes/CanvasPicker'),
  make = require('make'),
  {FLOAT} = Panel,
  {R, G, B, A} = require('../constants').palette.picker,
  {RGBA} = require('utils/color'),
  Picker = require('../prototypes/Picker'),
  {RIGHT_CLICK, LEFT_CLICK} = require('../constants'),
  {CHANGE_SPRITE} = require('../constants').events,
  ColorPicker = new Panel('ColorPicker', FLOAT, new Vector(500, 500), undefined, undefined, undefined, false, true);

ColorPicker.mainInit = function () {
  var position = JSON.parse(localStorage.getItem('panel-' + this.name.toLowerCase()) || '{"x": 500, "y": 500}'),
    sizeCanvasPicker = 200,
    sizeNewColor = 50,
    sizeOldColor = 50,
    width = sizeCanvasPicker + sizeNewColor + sizeOldColor + 100;
  const Color = require('../prototypes/Color');
  this.el.style.width = width + 'px';
  this.canvasPicker = new CanvasPicker(sizeCanvasPicker, this.onChangeColorCanvasPicker.bind(this)).appendTo(this.el);
  this.color = new Color(undefined, false, sizeNewColor, true).appendTo(this.el);
  this.oldColor = new Color(undefined, false, sizeOldColor, true).appendTo(this.el);

  $(make('button', {parent : this.el}, 'add color')).on('click.add', () => Editor.panels.Palette.addColor(this.rgbaPicker.color));

  this.changePosition(new Vector(position.x, position.y));
  this.rgbaPicker = new Picker(RGBA, this.onChangeValueRGBAPicker.bind(this), R, G, B, A);
  this.rgbaPicker.rangeA.input.min = 0;
  this.rgbaPicker.rangeA.input.max = 100;
  this.rgbaPicker.rangeA.spanValue.textContent = this.rgbaPicker.rangeA.value = this.rgbaPicker.rangeA.input.value = 100;
  this.rgbaPicker.appendTo(this.el);
  $(make('button', {parent : this.el}, 'ok')).on('click.ok', this.ok.bind(this));
  $(make('button', {parent : this.el}, 'cancel')).on('click.cancel', this.cancel.bind(this));


};
ColorPicker.onChangeColorCanvasPicker = function (color) {
  this.rgbaPicker.setColor(color, true);
  this.color.changeColor(color);
};
ColorPicker.onChangeValueRGBAPicker = function (color) {
  this.color.changeColor(color);
  this.canvasPicker.setRGBColor(color);
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
  this.oldColor.changeColor(color);
  this.canvasPicker.setRGBColor(color);
  this.callbackChange = callback;
  this.show();
};
module.exports = ColorPicker;
