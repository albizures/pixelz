'use strict';
const Panel = require('../../prototypes/Panel.js'),
			{ make } = require('../../utils.js'),
			Vector = require('../../prototypes/Vector.js'),
			{TRANSPARENT_COLOR} = require('../../constants/index.js'),
			{SNAP, FLOAT, T, B} = require('../../constants/index.js').panels,
			{ SELECT_TOOL } = require('../../constants').events,
			Menus = new Panel('Menus', SNAP, undefined, 100, 25, T, true);


Menus.mainInit = function () {
	var top = make('div', {
		className : 'top',
		parent : this.el
	});
	this.isDown = false;
	this.btnStatus = $(make('button', {parent : top}, 'down')).on('click.menu', this.changeStatus.bind(this))[0];
	make('input', {
		parent : top,
		value : 'New Project*'
	});
	this.inputScale = make('input', {
		parent : this.el,
		type : 'number',
		value : 2
	});
	$(make('button', {parent : this.el}, 'Generate gif')).on('click.generate', this.onGenerateGif.bind(this));
};
Menus.onGenerateGif = function () {
	Editor.sprite.generateGif(parseInt(this.inputScale.value));
};
Menus.changeStatus = function () {
	if (this.isDown) {
		this.btnStatus.textContent = 'down';
		this.isDown = false;
		this.el.classList.remove('down');
		this.el.style.height = this.height + 'px';
	} else {
		this.btnStatus.textContent = 'up';
		this.el.classList.add('down');
		this.isDown = true;
		this.el.style.height = 400 + 'px';
	}
};

module.exports = Menus;
