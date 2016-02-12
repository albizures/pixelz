'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
			{ SELECT_LAYER } = require('../../constants').events,
			{inheritanceObject, createBtn, createSpan, imageSmoothingDisabled} = require('../../utils.js');


function PreviewLayer(layer, selected) {
	this.$type = 'li';
	AppendObject.call(this, 'preview-layer');
	this.layer = layer;
	this.layer.selected = selected;
	this.el.textContent = 'layer ' +  (this.layer.index + 1);
	$(this.el).on('click.layer', this.onClick.bind(this));
}
inheritanceObject(PreviewLayer, AppendObject);

PreviewLayer.prototype.onClick = function () {
	Editor.events.fire(SELECT_LAYER, this.layer);
};

module.exports = PreviewLayer;
