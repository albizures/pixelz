const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');
const { editProp } = require('utils/ducks.js');

const ducks = require('./ducks');

require('./components/Canvas');
require('./components/Preview.js');
require('./components/Palette.js');
require('./components/Layers.js');
require('./components/Frames.js');
require('./components/Label.js');
require('./components/Left.js');
require('./components/Center.js');
require('./components/Right.js');
require('./components/Tools.js');
require('./components/ColorPicker.js');

const { Layout } = require('./components/Layout.js');

const Panel = require('./components/Panel.js');
const Palettes = require('./components/Palettes.js');
const History = require('./components/History.js');
const Menus = require('./components/Menus');

const shortcuts = require('./shortcuts');

const conf = {
  mode : 'col',
  name : 'Main',
  style : {
    height: 'calc(100% - 25px)',
    top: '25px'
  },
  children : [
    {name: 'Left', width: 12, component: 'Left'},
    {name: 'Center', width: 73, component: 'Center'},
    {name: 'Right', width: 15, component: 'Right'}
  ],
  float : [
    {name : 'Tools', component: 'Tools'},
    {name : 'ColorPicker', component: 'ColorPicker'}
  ]
};

const obj = {};

obj.displayName = 'Editor';

obj.render = function () {
  return <div className='editor-content'>
    <Menus/>
    <Layout {...conf}/>
  </div>;
};

obj.componentDidUpdate = function(prevProps, prevState) {
  if (this.props.layer !== null && this.props.artboard === null) {
    let scale = 15;
    let width = this.props.layers[this.props.layer].width * scale;
    let height = this.props.layers[this.props.layer].height * scale;
    this.props.setCurrentArtboard({
      x : (window.innerWidth / 2) - (width / 2),
      y : (window.innerHeight / 2) - (height / 2),
      scale : scale
    });
  }
};

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function() {
  shortcuts.init();
  this.setState({
    width : window.innerWidth,
    height : window.innerHeight
  });
  if (this.props.params.id) {
    http.get('/api/sprites/' + this.props.params.id, this.onGetSprite);
  } else {
    this.createSprite('untitle', 36, 36);
  }
};

obj.createSprite = function(name, width, height) {
  let sprite, frame;
  sprite = this.props.addSprite({
    name,
    width,
    height
  });
  frame = this.props.addFrame({
    width,
    height,
    sprite
  });
  this.props.addFrameSprite(sprite, frame);

  this.props.setCurrentSprite(sprite);
  this.props.setCurrentFrame(frame);
  this.props.setCurrentLayer(this.createLayer({sprite, frame, width, height}));
};

obj.onGetSprite = function (result) {
  let sprite, image = new Image(), width, height; 
  let context = document.createElement('canvas').getContext('2d');
  if (result.code !== 0) {
    return; // TODO: create toast alerts
  }
  sprite = result.data;
  context.canvas.width = width = sprite.width * sprite.layers;
  context.canvas.height = height = sprite.height;
  sprite.index = this.props.addSprite({
    _id : sprite._id,
    name : sprite.name,
    width : sprite.width,
    height : sprite.height,
    colors : sprite.colors,
  });
  this.props.setCurrentSprite(sprite.index);
  image.onload = () => {
    context.drawImage(image,
      0, 0, width, height,
      0, 0, width, height
    );
    this.props.setCurrentFrame(
      this.createFrameFromContext(sprite, context)
    );
    this.props.setCurrentLayer(0);
    for (let j = 1; j < sprite.frames; j++) {
      context.canvas.height = height;// clean
      context.drawImage(image,
        0, j * height, width, height,
        0, 0, width, height
      );
      this.createFrameFromContext(sprite, context);
    }
  };
  image.src = '/api/images/sprite/' + sprite._id;
};

obj.createFrameFromContext = function(sprite, image) {
  let context = document.createElement('canvas').getContext('2d');
  let contextTemp = document.createElement('canvas').getContext('2d');
  let index;
  contextTemp.canvas.width = context.canvas.width = sprite.width;
  contextTemp.canvas.height = context.canvas.height = sprite.height;
  
  for (var j = sprite.layers -1; j >= 0; j--) {
    context.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
  }
  index = this.props.addFrame({
    sprite : sprite.index,
    width : sprite.width,
    height : sprite.height,
    context : context,
    layers : []
  });
  this.props.addFrameSprite(
    sprite.index,
    index
  );
  for (let j = 0; j < sprite.layers; j++) {
    let layer;
    contextTemp.canvas.height = sprite.height;// clean
    contextTemp.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
    layer = this.createLayersFromContext(sprite, contextTemp, index, j);
    this.props.addLayerFrame(
      index,
      layer
    );
  }
  return index;
};

obj.createLayersFromContext = function(sprite, image, frame, index) {
  let context = document.createElement('canvas').getContext('2d');
  context.canvas.width = sprite.width;
  context.canvas.height = sprite.height;
  context.drawImage(image.canvas,
    0, 0, sprite.width, sprite.height,
    0, 0, sprite.width, sprite.height
  );
  return this.props.addLayer({
    context : context,
    width : sprite.width,
    height : sprite.height,
    sprite : sprite.index,
    frame : frame,
    layerIndex : index
  });
};

obj.createFrame = function({sprite, context}){
  let width = this.props.sprites[sprite].width;
  let height = this.props.sprites[sprite].height;
  let frame = this.props.addFrame({
    width,
    height,
    sprite,
    context
  });
  this.props.addFrameSprite(sprite, frame);
  return frame;
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var layer;
  width = width || this.props.sprites[sprite].width;
  height = height || this.props.sprites[sprite].height;
  layer = this.props.addLayer({
    width,
    height,
    sprite,
    frame,
    context
  });
  this.props.addLayerFrame(frame, layer);
  return layer;
};

function mapStateToProps(state, props) {
  return {
    artboard : state.Editor.artboard,
    sprite : state.Editor.sprite,
    frame : state.Editor.frame,
    layer : state.Editor.layer,
    sprites :  state.Editor.sprites,
    frames :  state.Editor.frames,
    layers :  state.Editor.layers,
    palettes :  state.Editor.palettes
  };
}

module.exports = connect(
  mapStateToProps,
  ducks.actions
)(React.createClass(obj));