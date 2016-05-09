'use strict';
const Panel = require('../prototypes/Panel.js'),
	{ make } = require('../utils.js'),
	Resize = Panel.createModalPanel('Resize', true);

Resize.mainInit = function () {
	let grid;
	this.el.style['z-index'] = '10';
	this.body = make('div', {parent : this.el, className : 'body'});
	this.body.style.width = '200px';
	//this.body.style.height = '400px';

	this.inputWidth = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'width:')),
		type : 'number'
	});
	this.inputHeight = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'height:')),
		type : 'number'
	});

	this.checkContentResize = make('input', {
		parent : make('div', {parent : this.body}, make('label', 'Resize content')),
		type : 'checkbox'
	});
	grid = make('div', {
		parent : this.body,
		className : 'resize-grid'
	});
	this.anchor = {
		x : 0,
		y : 0
	};
	this.gridCells = [];
	for (let y = 0; y < 3; y++) {
		for (let x = 0; x < 3; x++) {
			let active = this.anchor.x == x && this.anchor.y == y, self = this, el;
			this.gridCells[x] = this.gridCells[x] || [];
			this.gridCells[x][y] = el = make('div', {
				parent : grid,
				className : 'resize-cell ' + (active ? 'active' : '')
			}, make('span'), make('span'), make('span'), make('span'));

			$(el).on('click.select', function (evt) {
				self.gridCells[self.anchor.x][self.anchor.y].classList.remove('active');
				this.classList.add('active');
				self.anchor.x = x;
				self.anchor.y = y;
				console.log(x, y);
			})[0];
		}
	}
	console.log(this.gridCells);

	$(make('button', {parent : this.body}, 'Ok')).on('click.new', this.onResize.bind(this));
	$(make('button', {parent : this.body}, 'Cancel')).on('click.cancel', this.hide.bind(this));
};
Resize.onShow = function () {
	this.inputHeight.value = Editor.sprite.height;
	this.inputWidth.value = Editor.sprite.width;
};
Resize.onResize = function (evt) {
	let x = 0, y = 0;
	this.hide();
	if (this.anchor.x == 1) {
		x = Math.round((this.inputWidth.value - Editor.sprite.width) / 2);
	} else if (this.anchor.x == 2) {
		x = this.inputWidth.value - Editor.sprite.width;
	}
	if (this.anchor.y == 1) {
		y = Math.round((this.inputHeight.value - Editor.sprite.height) / 2);
	} else if (this.anchor.y == 2) {
		y = this.inputHeight.value - Editor.sprite.height;
	}
	Editor.sprite.resize(
		Number(this.inputWidth.value),
		Number(this.inputHeight.value),
		this.checkContentResize.cheched,
		x, y
	);
};



module.exports = Resize;
