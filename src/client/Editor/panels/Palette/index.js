'use strict';
const {TRANSPARENT_COLOR, PALETTE} = require('../../constants/index'),
  {CHANGE_COLOR} = require('../../constants/index').palette,
  make = require('make'),
  Panel = require('../../prototypes/Panel'),
  Tools = require('../Tools'),
  Vector = require('../../prototypes/Vector'),
  Color = require('../../prototypes/Color'),
  Palettes = require('./Palettes'),
  Palette = new Panel('Palette', Panel.SNAP, new Vector(100, 60), 15, 20, Panel.R);

let divColors;

Palette.mainInit = function () {
  let contentTools = make(['div', { parent: this.el, className: 'content-tools' }]);
  this.optionsButton = make(['button', {
    parent : contentTools,
    className: 'btn option-button'
  }, '=']);
  this.palette = Palettes.currentColorsPalette;
  this.setPalette(Palettes.currentColorsPalette);
  Tools.setPrimaryColor('rgba(0, 0, 0, 1)');
  Tools.setSecudaryColor(TRANSPARENT_COLOR);
  $(this.optionsButton).on('click.add', () => {
    Palettes.changePalette(this.palette, this.setPalette.bind(this));
  });
};
Palette.setCurretColors = function (colors) {
  Palettes.currentColorsPalette.setColors(colors.array);
};
Palette.getCurrentColors = function () {
  return currentColors;
};
Palette.setPalette = function (palette = this.palette) {
  let disabled = palette == Palettes.currentColorsPalette;
  this.palette.remove();
  this.palette = palette.appendTo(this.el);
};
Palette.addColor = function (color) {
  this.palette.addColor(color);
};
Palette.removeColor = function (color) {
  this.palette.removeColor(undefined, color);
};
module.exports = Palette;
