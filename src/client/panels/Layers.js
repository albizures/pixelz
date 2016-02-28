'use strict';

const Panel = require('../prototypes/Panel.js'),
			PreviewLayer = require('../prototypes/Layers/PreviewLayer.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
			{createBtn, createSpan, make} = require('../utils.js'),
			btnAddLayer = createBtn('add layer', 'add-layer'),
			Layers = new Panel('Layers', SNAP, undefined, 120, undefined, BL);

let currentLayer = 0, layersPreview = [];
Layers.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.el.appendChild(btnAddLayer);
	this.ul = document.createElement('ul');
	this.ul = make(['ul', {className : 'layers-list', parent : this.el}]);
	//this.createPreviewLayer();
	$(btnAddLayer).on('click.add', this.createLayer.bind(this));
};
Layers.createLayer = function () {
	this.frame.addLayer();
};
Layers.createPreviewLayer = function () {
	this.ul.innerHTML = '';
	for (let i = 0; i < this.layers.length; i++) {
		//this.layers[i];
		layersPreview[this.layers[i].index] = new PreviewLayer(this.layers[i]).appendTo(this.ul);
		//this.el.appendChild(createSpan(this.layers[i].index + 1));
	}
};
Layers.addPreview = function (layer) {
	if (layersPreview[layer.index]) {
		if (layersPreview[layer.index].layer.index !== layer.index) {
			layersPreview[layer.index].changeLayer(layer);
		} else {
			return;
		}
	} else {
		layersPreview[layer.index] = new PreviewLayer(layer).appendTo(this.ul);
	}
};
Layers.selectLayer = function (index) {
	if (layersPreview[currentLayer]) {
		layersPreview[currentLayer].unSelectLayer();
	}
	layersPreview[index].selectLayer();
	currentLayer = index;
};
Layers.updateLayers = function () {
	this.createPreviewLayer();
};
Layers.paintLayer = function () {};
module.exports = () => Editor.addPanel(Layers);
