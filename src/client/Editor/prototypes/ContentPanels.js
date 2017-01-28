'use strict';
const Panel = require("./Panel"),
  {inheritanceObject} = require("utils/object"),
  make = require("make");

function ContentPanels(name, type, position, width, height, snapType, notDragbar, hidden, typeContent) {
  Panel.call(this, name, type, position, width, height, snapType, notDragbar, hidden);
  this.panels = [];
  this.typeContent = typeContent;
  if (ContentPanels.TABS == typeContent) {
    this.tabs = [];
  }

}

inheritanceObject(ContentPanels, Panel);
ContentPanels.NORMAL = 'normal';
ContentPanels.TABS = 'tabs';
ContentPanels.prototype.addPanel = function (panel) {
  panel.appendTo(this.el);
  this.panels.push(panel);
  return panel;
};

module.exports = ContentPanels;
