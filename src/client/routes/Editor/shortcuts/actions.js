const { actions } = require('../ducks/index.js');
const { store } = require('../../../store.js');
const { cloneContext } = require('utils/canvas.js');

module.exports = {
  PAINT: function({
    layer,
    prevStatus
  }, state, isUndo = false) {
    var status = cloneContext(layer.context);
    layer.context.canvas.width = layer.context.canvas.width;
    layer.context.drawImage(prevStatus.canvas,
      0, 0, layer.width, layer.height,
      0, 0, layer.width, layer.height
    );
    var frame = state.Editor.frames[layer.frame];
    var layers = state.Editor.layers;
    var context = frame.context;
    context.canvas.width = context.canvas.width;
    frame.layers.forEach(function(index) {
      context.drawImage(layers[index].context.canvas,
        0, 0, frame.width, frame.height,
        0, 0, frame.width, frame.height
      );
    });
    store.dispatch(actions.newLayerVersion(layer.index));
    store.dispatch(actions.newFrameVersion(layer.frame));
    store.dispatch(actions[isUndo ? 'addRedoPaint' : 'addUndoPaint']({
      layer,
      prevStatus: status
    }, true));
    //return data.layer.restoreState(data.data);
  },
  resize: function(data) {
    let newData = {
      width: data.sprite.width,
      height: data.sprite.height,
      sprite: data.sprite,
      data: data.sprite.frames.map((frame) => frame.layers.map((layer) => layer.imageData))
    };
    data.sprite.resize(data.width, data.height);
    data.sprite.putImagesData(data.data);
    // if (Editor.canvas.artboard.layer.frame.sprite === data.sprite) {
    //   Editor.canvas.center();
    // }
    return newData;
  },
  'delete_layer': function(data) {
    data.sprite.addLayer(data.layer, data.layer[0].index, true);
    return data;
  },
  'add_layer': function(data) {
    data.sprite.deleteLayer(data.layer[0].index, true);
    return data;
  },
  'delete_frame': function(data) {
    data.frame.sprite.addFrame(data.frame, data.frame.index, true);
    return data;
  },
  'add_frame': function(data) {
    data.frame.delete(true);
    return data;
  }
};