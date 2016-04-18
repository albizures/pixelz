'use strict';

const Panel = require('../prototypes/Panel.js'),
	PreviewLayer = require('../prototypes/Layers/PreviewLayer.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
	{createBtn, createSpan, make} = require('../utils.js'),
	Vector = require('../prototypes/Vector.js'),
	List = require('../prototypes/List.js'),
	btnAddLayer = createBtn('add layer', 'add-layer'),
	Layers = new Panel('Layers', SNAP, new Vector(0, 0), 100, 100, L, true);

let currentLayer = 0, layersPreview = [];
Layers.mainInit = function () {
	//this.el.appendChild(btnAddLayer);
	this.list = new List('layers',[], 15);
	make(this.el, btnAddLayer, this.list.el);
	//this.ul = document.createElement('ul');
	//this.ul = make(['ul', {className : 'layers-list', parent : this.el}]);
	//this.createPreviewLayer();
	$(btnAddLayer).on('click.add', this.createLayer.bind(this));
};
Layers.$add = function () {
	Editor.addPanel(this, require('./Left.js'));
};
Layers.createLayer = function () {
	this.frame.addLayer();
};
Layers.createPreviewLayer = function () {
	// this.ul.innerHTML = '';
	// for (let i = 0; i < this.layers.length; i++) {
	// 	layersPreview[this.layers[i].index] = new PreviewLayer(this.layers[i]).appendTo(this.ul);
	// }
};
Layers.deletePreview = function (index) {
	// if (!layersPreview[index]) {
	// 	return;
	// }
	// if (layersPreview[index + 1] && layersPreview[index + 1].layer.index == index) {
	// 	layersPreview[index].changeLayer(this.layers[index]);
	// 	this.deletePreview(index + 1);
	// } else {
	// 	layersPreview[index].remove();
	// 	layersPreview.splice(index, 1);
	// }
};
Layers.addPreview = function (layer) {
	this.list.add(new PreviewLayer(layer, layer.index == currentLayer, this.list), layer.index);
	// if (layersPreview[layer.index]) {
	// 	if (layersPreview[layer.index].layer.index !== layer.index) {
	// 		layersPreview[layer.index].changeLayer(layer);
	// 	} else {
	// 		return;
	// 	}
	// } else {
	// 	layersPreview[layer.index] = new PreviewLayer(layer).appendTo(this.ul);
	// }
};
Layers.selectLayer = function (index) {
	// if (layersPreview[currentLayer]) {
	// 	layersPreview[currentLayer].unSelectLayer();
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
Layers.paintLayer = function () {};
module.exports = Layers;
