import defaults from 'lodash.defaults';
import pick from 'lodash.pick';
import { store } from '../store';
import { getNewContext } from './canvas';
import { actions as spriteActions } from '../ducks/sprites';
import { actions as editorActions } from '../routes/Editor/ducks/index';

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

  const frame = store.dispatch(editorActions.addFrame({
    width,
    height,
    sprite,
    context
  }));

  store.dispatch(spriteActions.addFrameSprite(sprite, frame));
  for (let x = 0; x < layers; x++) {
    store.dispatch(editorActions.addLayerFrame(
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

  return store.dispatch(editorActions.addLayer({
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
  const sprite = store.dispatch(spriteActions.addSprite(dataSprite));

  const context = getNewContext({width: width * layers, height});
  
  // editor action!!!
  store.dispatch(editorActions.openSprite(sprite));
  
  if (current) {
    store.dispatch(editorActions.setCurrentSprite(sprite));
  }

  if (image) {
    context.drawImage(image,
      0, 0, width, height,
      0, 0, width, height
    );
  }
  store.dispatch(spriteActions.selectSpriteFrame(
    sprite,
    createFrame({sprite, context, width, height, layers})
  ));
  store.dispatch(spriteActions.selectSpriteLayer(sprite, 0));
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