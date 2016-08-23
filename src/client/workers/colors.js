const colors = require('./colors.worker.js')();
const { getImageData } = require('utils/canvas.js');
const { store } = require('../store.js');

const cbs = {
  transparent : [],
  palette : []
}; 

colors.onmessage = onMessage;

exports.getTransparentColor = function (sprite, cb) {
  const state = store.getState().Editor;
  const frames = state.sprites[sprite].frames;

  let dataList = [];
  for (let i = 0; i < frames.length; i++) {
    dataList.push(getImageData(state.frames[frames[i]].context));
  }
  colors.postMessage({type : 'transparent', data : dataList});
  cbs.transparent.push(cb);
};

function onMessage(evt) {
  let cbsT = cbs[evt.data.type];
  for (let j = 0; j < cbsT.length; j++) {
    cbsT[j](evt.data.data);
  }
  cbs[evt.data.type].length = 0;
}



exports.getSpritePalette = function (sprite, cb) {
  const state = store.getState().Editor;
  const frames = state.sprites[sprite].frames;

  let dataList = [];
  for (let i = 0; i < frames.length; i++) {
    let layers = state.frames[frames[i]].layers;
    for (let j = 0; j < layers.length; j++) {
      //console.log(typeof state.frames[layers[j]], layers[j], j, layers, );
      dataList.push(getImageData(state.layers[layers[j]].context));
    }
  }

  colors.postMessage({type : 'palette', data : dataList});
  cbs.palette.push(cb);
};

exports.worker = colors;