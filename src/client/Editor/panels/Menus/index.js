'use strict';
const Panel = require('../../prototypes/Panel.js'),
  make = require('make'),
  Vector = require('../../prototypes/Vector.js'),
  Menu = require('../../prototypes/Menu.js'),
  {TRANSPARENT_COLOR} = require('../../constants/index.js'),
  {SNAP, FLOAT, T, B} = Panel,
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
  this.test = Menu.createMenus('test', [
    Menu.createMenu('test2', () => alert('hi test2')),
    Menu.createMenus('test3', [
      Menu.createMenu('test3.2', () => alert('hi test3.2'))
    ])
  ]);
  // this.projectMenu = Menu.createMenus('project', [
  //   Menu.createMenu('new project', () => alert('not yet')),
  //   //Menu.createMenu('new project', () => Editor.panels.NewProject.show()),
  //   Menu.createMenu('save project', () => alert('save project')),
  //   Menu.createMenu('new sprite', () => alert('new sprite'))
  // ]).appendTo(this.listMenus);
  this.spriteMenu = Menu.createMenus('sprite', [
    Menu.createMenu('resize', () =>  Editor.panels.Resize.show()),
    Menu.createMenu('set background', () => alert('set background'))
  ]).appendTo(this.listMenus);
  this.layerMenu = Menu.createMenus('layer', [
    Menu.createMenu('set background', () => Editor.panels.BackgroundLayer.show())
  ]).appendTo(this.listMenus);
  this.spriteMenu = Menu.createMenus('help', [
    Menu.createMenu('documentation', () => alert('not yet')),
    Menu.createMenu('about', () => alert('soon'))
  ]).appendTo(this.listMenus);
};
Menus.onGenerateGif = function () {
  Editor.sprite.generateGif(parseInt(this.inputScale.value));
};

module.exports = Menus;
