'use strict';
const Panel = require('../../prototypes/Panel.js'),
	{ make } = require('../../utils.js'),
	Vector = require('../../prototypes/Vector.js'),
	Menu = require('../../prototypes/Menu.js'),
	{TRANSPARENT_COLOR} = require('../../constants/index.js'),
	{SNAP, FLOAT, T, B} = require('../../constants/index.js').panels,
	{ SELECT_TOOL } = require('../../constants').events,
	Menus = new Panel('Menus', SNAP, undefined, 100, 25, T, true);


Menus.mainInit = function () {
	this.logo = make(['image', {
		parent : this.el,
		className : 'logo'
	}]);
	this.inputName = make('input', {
		parent : this.el,
		value : 'New Project*',
		className : 'name-project'
	});
	this.listMenus = make(['ul', {
		parent : this.el,
		className : 'list-menus'
	}]);
	// this.spriteMenu = make(['li', {
	// 	parent : this.listMenus,
	// 	className : 'menu'
	// }, 'Sprite']);
	this.randomMenu = new Menu('random', {
		'just a test' : ''
	}).appendTo(this.listMenus);
	this.projectMenu = new Menu('project', {
		'new project' : '',
		'save project' : '',
		'new sprite' : '',
		'this is a large name menu' : '',
		'test' : {
			'test' : '',
			'test2' : {
				'inside test' : ''
			}
		}
	}).appendTo(this.listMenus);
};
Menus.onGenerateGif = function () {
	Editor.sprite.generateGif(parseInt(this.inputScale.value));
};

module.exports = Menus;
