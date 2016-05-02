const AppendObject = require('./AppendObject.js'),
	make = require('make'),
	{createDiv, createSpan, defineGetter, inheritanceObject } = require('../utils.js');


function Menu(name, structure, cb) {
	this.$type = 'li';
	AppendObject.call(this, 'menu', 'menu-' + name);
	this.name = name;
	this.structure = structure;
	this.el.textContent = this.name;
	this.submenus = make(['ul',{
		parent : this.el,
		className : 'submenus'
	}]);
	this.cb = cb;
	this.init();
}
inheritanceObject(Menu, AppendObject);

Menu.prototype.init = function () {
	this.createSubmenus(this.structure, this.submenus);
};
Menu.prototype.createSubmenus = function (submenu, el) {
	let keys = Object.keys(submenu),
		item, newSubmenus;
	for (let i = 0; i < keys.length; i++) {
		item = submenu[keys[i]];
		console.log(item, typeof item);
		if (typeof item == 'object') {
			newSubmenus = make(['ul', {
				className : 'submenus'
			}]);
			this.createSubmenus(item, newSubmenus);
			make(['li', {
				parent : el,
				className : 'submenu ' + keys[i].replace(/ /g, '-')
			}, keys[i], newSubmenus]);
		} else {
			make(['li', {
				parent : el,
				className : 'submenu ' + keys[i].replace(/ /g, '-')
			}, keys[i]]);
		}
	}
};
module.exports = Menu;
