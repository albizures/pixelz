'use strict';

const Panel = require('../prototypes/Panel.js'),
			PreviewLayer = require('../prototypes/Layers/PreviewLayer.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
			{createBtn, createSpan, make} = require('../utils.js'),
			btnAddLayer = createBtn('add layer', 'add-layer'),
			Layers = new Panel('Layers', SNAP, undefined, 120, undefined, BL);


Layers.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.el.appendChild(btnAddLayer);
	this.ul = document.createElement('ul');
	this.ul = make(['ul', {className : 'layers-list', parent : this.el}]);
	this.createPreviewLayer();
	$(btnAddLayer).on('click.add', this.createLayer.bind(this));
};
Layers.createLayer = function () {
	console.log(this);
	this.frame.addLayer();
	this.createPreviewLayer();
};
Layers.createPreviewLayer = function () {
	this.ul.innerHTML = '';
	for (let i = 0; i < this.layers.length; i++) {
		//this.layers[i];
		new PreviewLayer(this.layers[i]).appendTo(this.ul);
		//this.el.appendChild(createSpan(this.layers[i].index + 1));
	}
};
module.exports = () => Editor.addPanel(Layers);
