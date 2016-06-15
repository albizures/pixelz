'use strict';
const AppendObject = require('./AppendObject.js'),
	Actions = require('../panels/Actions.js'),
	{inheritanceObject, defineGetter} = require('utils/object.js');

let actions = {
	paint : function (data) {
		return data.layer.restoreState(data.data);
	},
	resize : function (data) {
		let newData = {
			width : data.sprite.width,
			height : data.sprite.height,
			sprite : data.sprite,
			data : data.sprite.frames.map((frame) => frame.layers.map((layer) => layer.imageData))
		};
		data.sprite.resize(data.width, data.height);
		data.sprite.putImagesData(data.data);
		if (Editor.canvas.artboard.layer.frame.sprite == data.sprite) {
			Editor.canvas.center();
		}
		return newData;
	},
	'delete_layer' : function (data) {
		data.layer.frame.addLayer(data.layer, data.layer.index, true);
		return data;
	},
	'add_layer' : function (data) {
		data.layer.delete(true);
		return data;
	},
	'delete_frame' : function (data) {
		data.frame.sprite.addFrame(data.frame, data.frame.index, true);
		return data;
	},
	'add_frame' : function (data) {
		data.frame.delete(true);
		return data;
	}
};
let execute = {
	_redo : function (action) {
		Actions.removeRedo(action.index);
		action.redo = false;
		Actions.addUndo(action.setIndex(0), true);
	},
	_undo : function (action) {
		Actions.removeUndo(action.index);
		action.redo = true;
		Actions.addRedo(action.setIndex(0));
	},
	_ : function (action) {
		action.redo ? this._redo(action) : this._undo(action);
	},
	paint : function (action) {
		this._(action);
	},
	resize : function (action) {
		this._(action);
	},
	'delete_layer' : function (action) {
		action.type = 'add_layer';
		this._(action);
	},
	'add_layer' : function (action) {
		action.type = 'delete_layer';
		this._(action);
	},
	'delete_frame' : function (action) {
		action.type = 'add_frame';
		this._(action);
	},
	'add_frame' : function (action) {
		action.type = 'delete_frame';
		this._(action);
	}
};

function Action(type, data, index, redo) {
	this.$type = 'li';
	AppendObject.call(this, 'action');
	this.type = type;
	this.data = data;
	this.index = index;
	this.redo = redo;
	$(this.el).on('click.undo', this.onClick.bind(this));
}
inheritanceObject(Action, AppendObject);
Action.prototype.onClick = function (evt) {
	Actions.undo(this.index);
};
Action.PAINT = 'paint';
Action.RESIZE = 'resize';
Action.DELETE_LAYER = 'delete_layer';
Action.DELETE_FRAME = 'delete_frame';
Action.ADD_LAYER = 'add_layer';
Action.ADD_FRAME = 'add_frame';
Action.prototype.changeEl = function (el) {
	this.el = el;
	this.el.textContent = this.type;
};
Action.prototype.execute = function () {
	console.log(this.type);
	this.data = actions[this.type](this.data);
	execute[this.type](this);
};
Action.prototype.setIndex = function (index) {
	this.index = index;
	return this;
};
Action.prototype.init = function (parent) {
	this.el.textContent = this.type;
	this.appendTo(parent);
	return this;
};
Action.prototype.newEl = function () {
	AppendObject.call(this, 'action');
	$(this.el).on('click.undo', this.onClick.bind(this));
};
module.exports = Action;
