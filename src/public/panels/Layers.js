'use strict';

const Panel = require('../prototypes/Panel.js'),
			//{CHANGE_LAYER} = require('../constants').sprite
			{ defineGetter, createBtn, createSpan} = require('../utils.js'),
			btnAddLayer = createBtn('add layer'),
			Layers = new Panel('Layers');

defineGetter(Layers, 'layers', function () {
	return Editor.canvas.artboard.layer.frame.layers;
});
Layers.mainInit = function () {
	this.el.style['z-index'] = '9999';
	this.el.style.height = '50px';
	this.el.style.width = '200px';
	this.el.style.left = '600px';
	this.el.style.top = '0';
	this.el.appendChild(btnAddLayer);
	this.createPreviewLayer();
};
Layers.createPreviewLayer = function () {
	for (let i = 0; i < this.layers.length; i++) {
		//this.layers[i];

		this.el.appendChild(createSpan(this.layers[i].index + 1));
	}
};
module.exports = () => Editor.addPanel(Layers);
