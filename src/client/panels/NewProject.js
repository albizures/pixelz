'use strict';
const Panel = require('../prototypes/Panel.js'),
	{ make } = require('../utils.js'),
	Vector = require('../prototypes/Vector.js'),
	{MODAL} = require('../constants/index.js').panels,
	{ SELECT_TOOL } = require('../constants').events,
	{WIDTH_DEF, HEIGHT_DEF} = require('../constants'),
	NewProject = new Panel('NewProject', MODAL, undefined, 0, 0, undefined, true);

NewProject.mainInit = function () {
	this.el.style['z-index'] = '10';
	this.body = make('div', {parent : this.el, className : 'body'});
	this.body.style.width = '300px';
	this.body.style.height = '400px';

	this.inputWidth = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'width')),
		type : 'number',
		value : HEIGHT_DEF
	});
	this.inputHeight = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'height')),
		type : 'number',
		value : HEIGHT_DEF
	});
	$(make('button', {parent : this.body}, 'Create Project')).on('click.new', this.onCreateProject.bind(this));
};
NewProject.onCreateProject = function () {
	Editor.initSprite({
		width : Number(this.inputWidth.value),
		height : Number(this.inputHeight.value)
	});
	this.hide();
};

module.exports = NewProject;
