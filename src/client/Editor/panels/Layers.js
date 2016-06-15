'use strict';

const Panel = require('../prototypes/Panel.js'),
  PreviewLayer = require('../prototypes/Layers/PreviewLayer.js'),
  {SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel,
  make = require('make'),
  Vector = require('../prototypes/Vector.js'),
  List = require('../prototypes/List.js'),
  btnAdd = make('button', {className : 'add-layer'}, 'add layer'),
  Layers = new Panel('Layers', SNAP, new Vector(0, 0), 100, 100, L, true);

let currentLayer = 0, layersPreview = [];
Layers.mainInit = function () {
  this.list = new List('layers',[], 15);
  make([this.el, btnAdd, this.list.el]);
  $(btnAdd).on('click.add', this.createLayer.bind(this));
};
Layers.createLayer = function () {
  this.frame.addLayer();
};
Layers.createPreviewLayer = function () {
  // this.ul.innerHTML = '';
  // for (let i = 0; i < this.layers.length; i++) {
  //   layersPreview[this.layers[i].index] = new PreviewLayer(this.layers[i]).appendTo(this.ul);
  // }
};
Layers.deletePreview = function (index) {
  this.list.remove(index);
};
Layers.addPreview = function (layer) {
  this.list.add(new PreviewLayer(layer, layer.index == currentLayer, this.list), layer.index);
};
Layers.selectLayer = function (index) {
  // if (layersPreview[currentLayer]) {
  //   layersPreview[currentLayer].unSelectLayer();
  // }
  // layersPreview[index].selectLayer();
  // currentLayer = index;
};
Layers.changeFrame = function (frame) {
  this.list.removeAll();
  for (let i = 0; i < frame.layers.length; i++) {
    this.addPreview(frame.layers[i]);
  }
};
Layers.updateLayers = function (index) {
  this.list.elements[index].paint();
};
Layers.resizeLayer = function (index) {
  this.list.elements[index].resize();
};

Layers.paintLayer = function () {};
module.exports = Layers;
