'use strict';
const AppendObject = require('../../prototypes/AppendObject.js'),
			{ SELECT_LAYER } = require('../../constants').events,
			{inheritanceObject, make} = require('../../utils.js');


function PreviewLayer(layer, selected) {
	this.$type = 'li';
	AppendObject.call(this, 'preview-layer');
	this.layer = layer;
	this.layer.selected = selected;
	this.el.textContent = 'layer ' +  (this.layer.index + 1);
	this.btnClone = make('button', {parent : this.el}, 'c');
	$(this.btnClone).on('click.clone', this.onClone.bind(this));
	$(this.el).on('click.layer', this.onClick.bind(this));
}
inheritanceObject(PreviewLayer, AppendObject);
PreviewLayer.prototype.onClone = function (evt) {
	this.layer.frame.addLayer(this.layer);
};
PreviewLayer.prototype.selectLayer = function () {

};
PreviewLayer.prototype.unSelectLayer = function () {

};
PreviewLayer.prototype.onClick = function () {
	this.layer.frame.selectLayer(this.layer);
	//Editor.events.fire(SELECT_LAYER, this.layer);
};

module.exports = PreviewLayer;
