'use strict';

const ContentPanels =  require("../prototypes/ContentPanels");
const Panel = require("../prototypes/Panel");
const Vector = require("../prototypes/Vector");
const Menus = require("./Menus");
const make = require("make");
const Left = new ContentPanels('Left', Panel.SNAP, new Vector(0, 0), 13, 100, Panel.TL, true, false, ContentPanels.TABS);

Left.mainInit = function () {
  var stats = this.el.getBoundingClientRect();
  var numTabs = this.panels.length;
  this.el.style.borderWidth = 0;
  for (let i = 0; i < numTabs; i++) {
    this.tabs[i] = {
      el : make('div', {parent : this.el, className : 'content-panel-tab'}, this.panels[i].name),
      panel : this.panels[i],
      parent : this
    };
    this.tabs[i].el.style.lineHeight = this.panels[i].el.style.top = this.tabs[i].el.style.height = Menus.height + 'px';
    this.panels[i].el.style.width = '100%';
    this.panels[i].el.style.height = 'calc(100% - ' + this.panels[i].el.style.top + ')';
    this.panels[i].hide();

    this.tabs[i].el.style.width = (stats.width / numTabs) + 'px';
    $(this.tabs[i].el).on('click.tabs', this.onClick.bind(this.tabs[i]));
  }
  this.panels[0].show();
  this.tabs[0].el.classList.add('active');
};
Left.onClick = function (evt) {
  for (let i = 0; i < this.parent.panels.length; i++) {
    this.parent.panels[i].hide();
    this.parent.tabs[i].el.classList.remove('active');
  }
  this.el.classList.add('active');
  this.panel.show();
};

module.exports = Left;
