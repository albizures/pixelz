'use strict';
const AppendObject = require('./AppendObject.js'),
	Actions = require('../panels/Actions.js'),
	{inheritanceObject, defineGetter} = require('../utils.js');

let actions = {
	paint : function (data) {
		return data.layer.paintStroke(data.stroke);
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
Action.prototype.changeEl = function (el) {
	this.el = el;
	this.el.textContent = this.type;
};
Action.prototype.execute = function () {
	let newData = actions[this.type](this.data);
	this.data = newData;
	if (this.redo) {
		Actions.removeRedo(this.index);
		this.redo = false;
		Actions.addUndo(this.setIndex(0), true);
	} else {
		Actions.removeUndo(this.index);
		this.redo = true;
		Actions.addRedo(this.setIndex(0));
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
	AppendObject.call(this, 'action');
	$(this.el).on('click.undo', this.onClick.bind(this));
};
module.exports = Action;
