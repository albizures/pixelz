const { store } = require('../../../../../store.js');
const actionsFrames = require('../../../ducks/frames.js').actions;
const actionsLayers = require('../../../ducks/layers.js').actions;

const { abs } = Math;
const common = {};

common.newVersion = function (layer) {
  var state = store.getState();
  var frame = state.Editor.frames[layer.frame];
  var layers = state.Editor.layers;
  var context = frame.context;
  frame.layers.forEach(function(index) {
    context.drawImage(layers[index].context.canvas,
      0, 0, frame.width, frame.height,
      0, 0, frame.width, frame.height
    );
  });
  store.dispatch(actionsLayers.newLayerVersion(layer.index));
  store.dispatch(actionsFrames.newFrameVersion(layer.frame));
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
      err -= dy; x1  += sx;
    }
    if (e2 < dx) {
      err += dx; y1  += sy;
    }
  }
  fn(x1, y1);
};

exports.create = function (name) {
  let tool = Object.create(common);
  tool.name = name;
  return tool;
};