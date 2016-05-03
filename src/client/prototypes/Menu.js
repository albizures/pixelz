const AppendObject = require('./AppendObject.js'),
	make = require('make'),
	{createDiv, createSpan, defineGetter, inheritanceObject } = require('../utils.js'),
	MENU = 'MENU', MENUS = 'MENUS';


function Menu(name, type, data) {
	this.$type = 'li';
	AppendObject.call(this, 'menu', 'menu-' + name.replace(/ /g, '-'));
	this.name = name;
	this.type = type;
	this.el.textContent = this.name;
	if (type == MENUS) {
		this.structure = data.structure;
		this.ul = make(['ul',{
			parent : this.el,
			className : 'list-menus'
		}]);
		this.init();
	} else {
		this.fn = data.fn;
		this.on('click.active', this.fn);
	}
}
inheritanceObject(Menu, AppendObject);
Menu.MENU = MENU;
Menu.MENUS = MENUS;
Menu.prototype.init = function () {
	for (let i = 0; i < this.structure.length; i++) {
		let item = this.structure[i];
		item.appendTo(this.ul);
	}
};
Menu.createMenu = function (name, fn) {
	return new Menu(name, MENU, {
		fn : fn
	});
};

Menu.createMenus = function (name, structure) {
	return new Menu(name, MENUS, {
		structure : structure
	});
};
module.exports = Menu;
