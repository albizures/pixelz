'use strict';
const AppendObject = require('./AppendObject.js'),
	{ inheritanceObject, defineGetter} = require('../utils.js');

let actions = {
	paint : function (data) {
		return data.layer.paintStroke(data.stroke);
	}
};
function Action(type, data, index, redo) {
	this.$type = 'li';
	AppendObject.call(this, 'tool');
	this.type = type;
	this.data = data;
	this.index = index;
	this.redo = redo;
	$(this.el).on('click.undo', this.onClick.bind(this));
}
inheritanceObject(Action, AppendObject);
Action.prototype.onClick = function (evt) {
	Editor.getPanel('Actions').undo(this.index);
};
Action.prototype.changeEl = function (el) {
	this.el = el;
	this.el.textContent = this.type;
};
Action.prototype.execute = function () {
	let newData = actions[this.type](this.data);
	this.data = newData;
	if (this.redo) {
		Editor.getPanel('Actions').removeRedo(this.index);
		this.redo = false;
		Editor.getPanel('Actions').addUndo(this.setIndex(0));
	} else {
		Editor.getPanel('Actions').removeUndo(this.index);
		this.redo = true;
		Editor.getPanel('Actions').addRedo(this.setIndex(0));
	}
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
	AppendObject.call(this, 'tool');
	$(this.el).on('click.undo', this.onClick.bind(this));
};
module.exports = Action;
