'use strict';

const Panel = require('../prototypes/Panel.js'),
			{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
			{createBtn, createSpan} = require('../utils.js'),
			btnAddLayer = createBtn('add layer', 'add-layer'),
			Layers = new Panel('Layers', SNAP, undefined, 120, undefined, BL);


Layers.mainInit = function () {
	this.el.style['z-index'] = '9999';
	// this.el.style.height = '50px';
	// this.el.style.width = '200px';
	// this.el.style.left = '600px';
	// this.el.style.top = '0';
	this.el.appendChild(btnAddLayer);
	this.createPreviewLayer();

	$(btnAddLayer).on('click.add', this.createLayer);
};
Layers.createLayer = function () {
	this.frame.addLayer();
};
Layers.createPreviewLayer = function () {
	for (let i = 0; i < this.layers.length; i++) {
		//this.layers[i];

		this.el.appendChild(createSpan(this.layers[i].index + 1));
	}
};
module.exports = () => Editor.addPanel(Layers);
