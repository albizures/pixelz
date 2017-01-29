import defaults from 'lodash.defaults';
import pick from 'lodash.pick';
import { store } from '../store';
import { getNewContext } from './canvas';

import {
  addSprite,
  addFrame,
  addLayer,
  addFrameSprite,
  addLayerFrame,
  selectSpriteLayer,
  selectSpriteFrame,
  setCurrentSprite,
  openSprite
} from '../ducks';

const defaultsValues = {
  name: 'Untitled',
  layers: 1,
  frames: 1,
  current: false,
  colors: [],
  width: 50,
  height: 50,
  primaryColor: 'rgba(0, 0, 0, 1)',
  secondaryColor: 'rgba(0, 0, 0, 0)'
};


function createFrame (data) {
  const { sprite, width, height, layers} = data;
  const context = getNewContext({width, height});

  if (data.context) {
    for (var x = layers - 1; x >= 0; x--) {
      context.drawImage(data.context.canvas,
        //  x      y
        width * x, 0, width, height,
            0    , 0, width, height
      );
    }
  }

  const frame = store.dispatch(addFrame({
    width,
    height,
    sprite,
    context
  }));

  store.dispatch(addFrameSprite(sprite, frame));
  for (let x = 0; x < layers; x++) {
    store.dispatch(addLayerFrame(
      frame,
      createLayer({sprite, width, height, context: data.context, frame, index: x})
    ));
  }
  return frame;
}

function createLayer(data) {
  const {index, width, height, frame, sprite} = data;
  const context = getNewContext({width, height});

  if (data.context) {
    context.drawImage(data.context.canvas,
      //    x        y
      width * index, 0, width, height,
            0      , 0, width, height
    );
  }

  return store.dispatch(addLayer({
    context,
    width,
    height,
    sprite,
    frame,
    layerIndex: index
  }));
}

export function createSprite (data) {
  const newData = defaults(data, defaultsValues);
  const { image, layers, frames, current, width, height } = newData;
  const dataSprite = pick(newData, [
    '_id',
    'name',
    'width',
    'height',
    'colors',
    'primaryColor',
    'secondaryColor'
  ]);
  const sprite = store.dispatch(addSprite(dataSprite));

  const context = getNewContext({width: width * layers, height});
  
  // editor action!!!
  store.dispatch(openSprite(sprite));
  
  if (current) {
    store.dispatch(setCurrentSprite(sprite));
  }

  if (image) {
    context.drawImage(image,
      0, 0, width, height,
      0, 0, width, height
    );
  }
  store.dispatch(selectSpriteFrame(
    sprite,
    createFrame({sprite, context, width, height, layers})
  ));
  store.dispatch(selectSpriteLayer(sprite, 0));
  for (let j = 1; j < frames; j++) {
    context.canvas.height = height;// clean
    if (image) {
      context.drawImage(image,
        0, j * height, width, height,
        0, 0, width, height
      );
    }
    createFrame({sprite, context, width, height, layers});
  }
}