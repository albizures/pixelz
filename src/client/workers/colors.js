import colorsWorker from './colors.worker';
import { getImageData } from 'utils/canvas';
import { store } from '../store';


const cbs = {
  transparent: [],
  palette: []
}; 
const colors = colorsWorker();

colors.onmessage = onMessage;

export const getTransparentColor = function (sprite, cb) {
  const state = store.getState();
  const frames = state.sprites[sprite].frames;

  let dataList = [];
  for (let i = 0; i < frames.length; i++) {
    dataList.push(getImageData(state.frames[frames[i]].context));
  }
  colors.postMessage({type: 'transparent', data: dataList});
  cbs.transparent.push(cb);
};

function onMessage(evt) {
  let cbsT = cbs[evt.data.type];
  for (let j = 0; j < cbsT.length; j++) {
    cbsT[j](evt.data.data);
  }
  cbs[evt.data.type].length = 0;
}


export const getSpritePalette = (sprite, transparent = false) => new Promise(resolve => {
  const state = store.getState();
  const frames = state.sprites[sprite].frames;

  let dataList = [];
  for (let i = 0; i < frames.length; i++) {
    let layers = state.frames[frames[i]].layers;
    for (let j = 0; j < layers.length; j++) {
      //console.log(typeof state.frames[layers[j]], layers[j], j, layers, );
      dataList.push(getImageData(state.layers[layers[j]].context));
    }
  }

  colors.postMessage({type: 'palette', data: dataList});
  cbs.palette.push(function (result) {
    if (!transparent) {
      result.array.splice(result.array.indexOf('rgba(0, 0, 0, 0)'), 1);
      delete result.obj['rgba(0, 0, 0, 0)'];
    }
    resolve(result);
  });
});

export const worker = colors;