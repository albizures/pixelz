'use strict';
const Panel = require('../../prototypes/Panel.js'),
  Vector = require('../../prototypes/Vector.js'),
  make = require('make'),
  Action = require('../../prototypes/Action.js'),
  Actions = require('../Actions.js'),
  Palette = require('../../prototypes/Palette.js'),
  Palettes = Panel.createFloatPanel('Palettes', new Vector((window.innerWidth / 2) - 100, 100), true);

let colors = [{
  id : 1,
  name: 'Default Colors',
  colors : ['rgba(26, 188, 156, 1)', 'rgba(241, 196, 15, 1)', 'rgba(52, 152, 219, 1)', 'rgba(230, 126, 34, 1)', 'rgba(231, 76, 60, 1)', 'rgba(189, 195, 199, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(127, 140, 141, 1)']
}];
Palettes.currentColorsPalette = new Palette(0, 'Current Colors');

Palettes.mainInit = function () {
  this.el.style.width = '400px';
  this.el.style.height = '200px';
  this.list = make(['div', {parent : this.el, className : 'content-palettes'}]);
  $(make('button', {parent : this.el}, 'ok')).on('click.ok', this.ok.bind(this));
  $(make('button', {parent : this.el}, 'cancel')).on('click.cancal', this.cancel.bind(this));
};

Palettes.onShow = function () {
  // get colors
  this.list.innerHTML = '';
  let palette = new Palette(this.currentColorsPalette.id, this.currentColorsPalette.name, this.currentColorsPalette.colors);
  palette
    .appendTo(this.list)
    .on('click.select', () => {
      this.selectPalette.removeClass('active');
      palette.addClass('active');
      this.selectPalette = this.currentColorsPalette;
    });
  if (this.currentColorsPalette.id == this.current.id) {
    this.selectPalette = palette.addClass('active');
  }
  for (let j = 0; j < colors.length; j++) {
    let palette = new Palette(colors[j].id, colors[j].name, colors[j].colors);
    palette
      .appendTo(this.list)
      .on('click.select', () => {
        this.selectPalette.removeClass('active');
        this.selectPalette = palette.addClass('active');
      });
    if (palette.id == this.current.id) {
      this.selectPalette = palette;
      palette.addClass('active');
    }
  }
};
Palettes.ok = function () {
  if (this.currentColorsPalette.id == this.selectPalette.id) {
    this.selectPalette = this.currentColorsPalette;
  }
  if (this.callbackChange) {
    this.callbackChange(this.selectPalette);
  }
  this.hide();
};
Palettes.cancel = function () {
  this.hide();
};
Palettes.changePalette = function (current, callback) {
  
  this.current = current;
  this.callbackChange = callback;
  this.show();
};

module.exports = Palettes;
