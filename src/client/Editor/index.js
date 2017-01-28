'use strict';
import { WIDTH_DEF, HEIGHT_DEF} from './constants';
import make from '../utils/make';
import {SNAP, FLOAT, B, L, R, TL, TR, BL, BR} from './prototypes/Panel';
import Canvas from './prototypes/Canvas';
import Sprite from './prototypes/Sprite';
import Menu from './prototypes/Menu';
import Vector from './prototypes/Vector';

import Left from './panels/Left';
import Preview from './panels/Preview';
import Palette from './panels/Palette';
import Palettes from './panels/Palette/Palettes';
import Frames from './panels/Frames';
import Info from './panels/Info';
import Menus from './panels/Me';
import Actions from './panels/Actions';
import NewProject from './panels/NewProject';
import ColorPicker from './panels/ColorPicker';
import Tools from './panels/Tools';
import Layers from './panels/Layers';
import Resize from './panels/Resize';
import BackgroundLayer from './panels/BackgroundLayer';

import bucket from './tools/bucket';
import eraser from './tools/eraser';
import pick from './tools/pick';
import rectangle from './tools/rectangle';
import line from './tools/line';
import select from './tools/select';
import pencil from './tools/pencil';


function Editor(parent) {
  this.panels = {};
  this.parent = parent;
  this.addPanel(Menus);
  this.addPanel(Left);
  this.addPanel(Preview);
  this.addPanel(Tools);
  this.addPanel(Frames, Left);
  this.addPanel(Actions);
  this.addPanel(Palette);
  this.addPanel(Info);
  this.addPanel(NewProject);
  this.addPanel(Layers, Left);
  this.addPanel(ColorPicker);
  this.addPanel(Resize);
  this.addPanel(Palettes);
  this.addPanel(BackgroundLayer);

  //tools
  this.addTool(pencil);
  this.addTool(bucket);
  this.addTool(eraser);
  this.addTool(pick);
  this.addTool(rectangle);
  this.addTool(line);
  this.addTool(select);
  this.sprites = [];
}

Editor.prototype.addTool = function (tool) {
  this.panels.Tools.addTool(tool);
};
// panel area
Editor.prototype.addPanel = function (panel, parent) {
  if (parent) {
    this.panels[panel.name] = panel;
    parent.addPanel(panel);
  } else {
    this.panels[panel.name] = panel.appendTo(this.parent);
  }
};
Editor.prototype.onResizePanel = function (type) {
  if (type === L || type === TL || type === BL) {
    this.onResizeL(arguments[1]);
  }else if (type === R || type == TR) {
    this.onResizeR(arguments[1]);
  }
};
Editor.prototype.onResizeL = function (width) {
  let panels = Object.keys(this.panels);
  for (let i = 0; i < panels.length; i++) {
    let panel = this.panels[panels[i]];
    if (panel.type === SNAP && (panel.position === L || panel.position === BL || panel.position === TL)) {
      panel.changeWidth(width);
    }
  }
};
Editor.prototype.onResizeR = function (height) {
  let panels = Object.keys(this.panels);
  for (let i = 0; i < panels.length; i++) {
    let panel = this.panels[panels[i]];
    if (panel.type === SNAP && (panel.position === R || panel.position === BR || panel.position === TR)) {
      panel.changeWidth(height);
    }
  }
};
Editor.prototype.getRightPanels = function () {
  var size = {height : 0, panels : []};
  for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
    let panel = this.panels[panels[i]];
    if (panel.isRight() && panel.isInit) {
      if (!size.width) {
        size.width = panel.width;
      }
      size.height += panel.heightPerc;
      size.panels.push(panel);
    }
  }
  return size;
};
Editor.prototype.getLeftPanels = function () {
  var size = {height : 0, panels : []};
  for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
    let panel = this.panels[panels[i]];
    if (panel.isLeft() && panel.isInit) {
      if (!size.width) {
        size.width = panel.width;
      }
      size.height += panel.heightPerc;
      size.panels.push(panel);
    }
  }
  return size;
};
Editor.prototype.initPanels = function () {
  for (let i = 0, panels = Object.keys(this.panels); i < panels.length; i++) {
    let panel = this.panels[panels[i]];
    panel.init();
  }
};
Editor.prototype.init = function (sprite) {
  this.shortcuts.init();
  this.initPanels();
  this.contextMenu.init(this.parent);
  var init = (sprite) => {
    this.initSprite({
      width : sprite.width,
      height: sprite.height
    }, sprite);
    this.panels.NewProject.hide();
  };
  if (sprite) {
    this.sprites.push(new Sprite(0, 0, sprite, init));
  }
};

Editor.prototype.getTransparentColor = function () {
  let self = this;
  if (this.callbacksGetColor.length == 0) {
    if (this.timeoutGetTransparentColor) {
      clearTimeout(this.timeoutGetTransparentColor);
      this.timeoutGetTransparentColor = setTimeout(timeout, 1000 * 6);
    } else {
      this.timeoutGetTransparentColor = setTimeout(timeout, 1000 * 6);
    }
  } else {
    self.sprite.getTransparentColor(onGetTransparentColor);
  }
  function timeout() {
    self.timeoutGetTransparentColor = undefined;
    self.sprite.getTransparentColor(onGetTransparentColor);
  }
  function onGetTransparentColor(color) {
    for (let i = 0; i < self.callbacksGetColor.length; i++) {
      self.callbacksGetColor[i](color);
    }
    self.callbacksGetColor.length = 0;
  }
};

Editor.prototype.timeoutGetTransparentColor = 1;
Editor.prototype.callbacksGetColor = [];
Editor.prototype.getGeneralColors = function () {
  this.sprite.getGeneralColors(onGetGeneralColors.bind(this));
  function onGetGeneralColors(colors) {
    this.panels.Palette.setCurretColors(colors);
  }
};
Editor.prototype.addCallbackGetColor = function () {
  this.callbacksGetColor.push(cb);
  clearTimeout(this.timeoutGetTransparentColor);
  self.timeoutGetTransparentColor = undefined;
  this.getTransparentColor();
};
Editor.prototype.saveCurrentSprite = function () {
  this.sprite.save();
};
Editor.prototype.initSprite = function (data, sprite) {
  var offsetLeft, offsetRight, scaleHeight, scaleWidth, scale, x, y,
    data = data || {},
    height = data.height || HEIGHT_DEF,
    width = data.width || WIDTH_DEF;
  console.log(data, sprite);
  scaleHeight = (window.innerHeight - this.panels.Menus.height) / height;
  offsetRight = this.getRightPanels().width;
  offsetLeft = this.getLeftPanels().width;
  scaleWidth = (window.innerWidth - offsetLeft - offsetRight) / width;

  scale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth;
  scale = Math.round(scale * 0.94);
  x = Math.round((window.innerWidth / 2) - (scale * width) / 2);
  y = Math.round(((window.innerHeight + this.panels.Menus.height) / 2) - (scale * height) / 2);
  this.sprite = sprite || new Sprite(width, height);
  this.canvas = new Canvas(this.parent, this.sprite.frames[0].layers[0], scale, new Vector (x, y));
  this.sprite.frames[0].select();
  if (sprite) {
     this.getGeneralColors();
  }
};
Editor.prototype.contextMenu = {

  init : function (parent) {
    this.context = Menu.createContext().appendTo(parent);
    this.backdrop = make(['div', {parent: parent, className : 'backdrop-context-menu'}]);
    this.context.on('click.hide', (evt) => {
      evt.stopPropagation();
      this.hide();
    });
    $(this.backdrop).on('click.hide', (evt) => {
      evt.stopPropagation();
      this.hide();
    });
    this.show = this.show.bind(this);
  },
  show : function () {
    this.context.addClass('active');
    this.backdrop.classList.add('active');
  },
  hide : function () {
    this.context.removeClass('active');
    this.backdrop.classList.remove('active');
  },
  add : function (context, manual = false) {
    let handler = this.onContextMenu.bind(context);
    context.context = this.context;
    context.show = this.show;
    if (!manual) {
      $(context.el).on('contextmenu.options', handler);
    }
    return handler;
  },
  onContextMenu : function (evt) {
    
    this.context.setStructure(this.structure);
    this.context.el.style.top = evt.clientY + 'px';
    this.context.el.style.left = evt.clientX  + 'px';
    this.show();
  }
};
Editor.prototype.shortcuts = require('./shortcuts');
Editor.prototype.events = require('./events');

export default Editor;
