'use strict';
const Panel = require('../prototypes/Panel.js'),
  Vector = require('../prototypes/Vector.js'),
  make = require('make'),
  Action = require('../prototypes/Action.js'),
  Range = require('../prototypes/Range.js'),
  Actions = require('./Actions.js'),
  BackgroundLayer = Panel.createFloatPanel('BackgroundLayer', new Vector((window.innerWidth / 2) - 100, 100), true);

BackgroundLayer.mainInit = function () {
  let grid;
  this.el.style['z-index'] = '10';
  this.body = make('div', {parent : this.el, className : 'body'});
  this.body.style.width = '200px';
  //this.body.style.height = '400px';

  this.inputImage = make('input', {
    parent : make('div', {parent : this.body}, make('label', 'Image: ')),
    type : 'file'
  });
  this.contenteData = make(['div', { parent: this.body }]);
  this.inputX = make(['input', { parent: this.contenteData, type: 'number', value : 0}]);
  this.inputY = make(['input', { parent: this.contenteData, type: 'number', value : 0 }]);
  this.inputWith = make(['input', { parent: this.contenteData, type: 'number', value : 100}]);
  this.inputHeight = make(['input', { parent: this.contenteData, type: 'number', value: 100 }]);
  this.inputRatio = make(['input', { parent: this.contenteData, type: 'checkbox', checked : false }]);

  this.alphaRange = new Range(50, 0, 100, 'alpha', this.onDataChange.bind(this)).appendTo(this.contenteData);

  $(this.inputImage).on('change.input', this.onInputImage.bind(this));
  $(this.inputX).on('input.input', this.onDataChange.bind(this));
  $(this.inputY).on('input.input', this.onDataChange.bind(this));
  $(this.inputWith).on('input.input', this.onDataChange.bind(this));
  $(this.inputHeight).on('input.input', this.onDataChange.bind(this));
};
BackgroundLayer.onDataChange = function () {
  Editor.canvas.previewBackground(this.image, {
    x: Number(this.inputX.value),
    y: Number(this.inputY.value),
    width: Number(this.inputWith.value),
    height: Number(this.inputHeight.value),
    alpha: this.alphaRange.value / 100
  });
};
BackgroundLayer.onShow = function () {
  if (Editor.canvas.artboard.layer.background) {
    this.contenteData.style.display = 'block';
  } else {
    this.contenteData.style.display = 'none';
  }
};
BackgroundLayer.onInputImage = function (evt) {
  this.image = new Image();
  this.image.onload = onLoad.bind(this);
  this.image.src = URL.createObjectURL(evt.target.files[0]);
  function onLoad() {
    this.contenteData.style.display = 'block';
    Editor.canvas.previewBackground(this.image, {
      x: this.inputX.value,
      y: this.inputY.value,
      width: Number(this.inputWith.value),
      height: Number(this.inputHeight.value),
      alpha : this.alphaRange.value
    });
  }
};

module.exports = BackgroundLayer;
