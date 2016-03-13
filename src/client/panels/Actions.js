'use strict';

const Panel = require('../prototypes/Panel.js'),
	Vector = require('../prototypes/Vector.js'),
	{make} = require('../utils.js'),
	{SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = require('../constants').panels,
	{CHANGE_SPRITE} = require('../constants').events,
	Actions = new Panel('Actions', FLOAT, new Vector(700, 500), 100);

Actions.mainInit = function () {
	this.el.style['z-index'] = '9999';
	$(make('button', {parent : this.el}, 'u')).on('click.undo', this.undo.bind(this));
	$(make('button', {parent : this.el}, 'r')).on('click.undo', this.redo.bind(this));
	this.elRedo = make('ul', {parent : this.el, className : 'list redo'});
	this.elUndo = make('ul', {parent : this.el, className : 'list undo'});
};
Actions.listUndo = [];
Actions.listRedo = [];
Actions.redo = function (index) {
	if (!Number.isInteger(index)) {
		index = 0;
	}
	if (!this.listRedo[index]) {
		return;
	}
	for (let i = index + 1; 0 < i; --i) {
		this.listRedo[0].execute();
	}
	//console.log(this.listUndo, this.listRedo);
};

Actions.undo = function (index) {
	if (!Number.isInteger(index)) {
		index = 0;
	}
	if (!this.listUndo[index]) {
		return;
	}
	for (let i = index + 1; 0 < i; --i) {
		this.listUndo[0].execute();
	}
	//console.log(this.listUndo, this.listRedo);
};
Actions.removeAllRedo = function (index) {
	index = index || this.listRedo.length - 1;
	for (let i = index + 1; 0 < i; --i) {
		this.removeRedo(0);
		//console.log(this.listRedo);
	}
};
Actions.removeRedo = function (index) {
	if (this.listRedo[index]) {
		this.listRedo[index].remove();
		this.listRedo.splice(index, 1);
		for (let i = index; i < this.listRedo.length; i++) {
			this.listRedo[i].setIndex(i);
		}
	}
};
Actions.removeUndo = function (index) {
	if (this.listUndo[index]) {
		this.listUndo[index].remove();
		this.listUndo.splice(index, 1);
		for (let i = index; i < this.listUndo.length; i++) {
			this.listUndo[i].setIndex(i);
		}
	}
};
Actions.addRedo = function (action) {
	if (this.listRedo[action.index]) {
		action.changeEl(this.listRedo[action.index].el);
		this.listRedo[action.index].newEl();
		this.addRedo(this.listRedo[action.index].setIndex(action.index + 1));
		this.listRedo[action.index] = action;
	} else {
		this.listRedo[action.index] = action.init(this.elRedo);
	}
};
Actions.addUndo = function (action, fromRedo) {
	if (this.listUndo[action.index]) {
		action.changeEl(this.listUndo[action.index].el);
		this.listUndo[action.index].newEl();
		this.addUndo(this.listUndo[action.index].setIndex(action.index + 1), fromRedo);
		this.listUndo[action.index] = action;
	} else {
		if (!fromRedo) {
			this.removeAllRedo();
		}
		this.listUndo[action.index] = action.init(this.elUndo);
	}
};
module.exports = Actions;
