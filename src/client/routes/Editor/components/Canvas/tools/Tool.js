const { store } = require('../../../../../store.js');
const frameActions = require('../../../ducks/frames.js').actions;
const layerActions = require('../../../ducks/layers.js').actions;
const {setSpriteSecundaryColor, setSpritePrimaryColor, newSpriteVersion} = require('../../../../../ducks/sprites.js').actions;
const historyActions = require('../../../ducks/history.js').actions;
const { cloneContext } = require('utils/canvas.js');

const { RIGHT_CLICK } = require('constants/index.js');

const { abs } = Math;
const common = {};

common.RIGHT_CLICK = RIGHT_CLICK;

common.getColor = function (which) {
  let state = store.getState();
  let sprite = state.sprites[this.layer.sprite];
  return which === RIGHT_CLICK ? sprite.secondaryColor : sprite.primaryColor;
};

common.addUndo = function (data) {
  store.dispatch(historyActions.addUndoPaint(data));
};

common.setPrimaryColor = function (color) {
  store.dispatch(
    setSpritePrimaryColor(
      this.layer.sprite,
      color
    )
  );
};

common.setSecondaryColor = function (color) {
  store.dispatch(
    setSpriteSecundaryColor(
      this.layer.sprite,
      color
    )
  );
};

common.newVersion = function (layer) {
  var state = store.getState();
  var frame = state.Editor.frames[layer.frame];
  var layers = state.Editor.layers;
  var context = frame.context;
  context.canvas.width = context.canvas.width; // clean
  frame.layers.forEach(function(index) {
    context.drawImage(layers[index].context.canvas,
      0, 0, frame.width, frame.height,
      0, 0, frame.width, frame.height
    );
  });
  store.dispatch(layerActions.newLayerVersion(layer.index));
  store.dispatch(frameActions.newFrameVersion(layer.frame));
  store.dispatch(newSpriteVersion(layer.sprite));
};

common.lineBetween = function (x1, y1, x2, y2, fn) {
  var dx = abs(x2 - x1),
    dy = abs(y2 - y1),
    sx = (x1 < x2) ? 1 : -1,
    sy = (y1 < y2) ? 1 : -1,
    err = dx - dy, e2;
  while (x1 !== x2 || y1 !== y2) {
    fn(x1, y1);
    e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy; x1 += sx;
    }
    if (e2 < dx) {
      err += dx; y1 += sy;
    }
  }
  fn(x1, y1);
};

common.onMouseDown = () => console.log('Create onMouseDown function');

common.onMouseDownInit = function (evt, initCord, layer, artboard, main, preview, background, mask) {
  this.layer = layer;
  this.prevStatus = cloneContext(this.layer.context);
  this.artboard = artboard;
  this.initCord = initCord;
  this.main = main;
  this.preview = preview;
  this.background = background;
  this.mask = mask;
  this.onMouseDown(evt);
};

exports.create = function (name, custom) {
  let tool = Object.create(common);
  let keys = Object.keys(custom);
  for (var j = 0; j < keys.length; j++) {
    if (typeof custom[[keys[j]]] === "function") {
      tool[keys[j]] = custom[[keys[j]]].bind(tool);
    }
  }
  tool.name = name;
  return tool;
};