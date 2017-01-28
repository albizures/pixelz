const AppendObject = require('./AppendObject'),
  make = require('make'),
  { inheritanceObject } = require('utils/object'),
  MENU = 'MENU', MENUS = 'MENUS';


function Menu(name, type, data, float = false) {
  this.$type = float ? 'ul' : 'li';
  AppendObject.call(this, 'menu', 'menu-' + name.replace(/ /g, '-'), float ? 'context-menu' : 'menu');
  this.name = name;
  this.type = type;
  this.float = float;
  if (!float) {
    this.el.textContent = this.name;
  }
  if (type == MENUS) {
    this.structure = data.structure;
    if (float) {
      this.addClass('list-menus');
      this.ul = this.el;
    } else {
      this.ul = make(['ul',{
        parent : this.el,
        className : 'list-menus'
      }]);
    }
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
  this.ul.innerHTML = '';
  for (let i = 0; i < this.structure.length; i++) {
    let item = this.structure[i];
    item.appendTo(this.ul);
  }
};
Menu.prototype.setStructure = function (structure) {
  this.structure = structure;
  this.init();
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
Menu.createContext = function (structure = []) {
  return new Menu('context', MENUS, {
    structure : structure
  }, true);
};
module.exports = Menu;
