const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');
const { editProp } = require('utils/ducks.js');

const ducks = require('./ducks');
const Canvas = require('./components/Canvas');
const Panel = require('./components/Panel.js');
const Frames = require('./components/Frames.js');
const Layers = require('./components/Layers.js');
const Tools = require('./components/Tools.js');
const List = require('./components/List.js');
const Preview = require('./components/Preview.js');
const Palette = require('./components/Palette.js');
const Palettes = require('./components/Palettes.js');
const ColorPicker = require('./components/ColorPicker.js');

const obj = {};

obj.displayName = 'Editor';

obj.render = function () {
  return <div className="editor-content">
    {
      this.getCanvas()
    }
    <Panel name='Menus' style={this.state.Menus} dragBar={false}>
      {'Menus'}
    </Panel>
    <Panel name='Left' contentPanels tabs style={this.state.Left} tabDefault={1} dragBar={false}>
      <Frames name='Frames' frames={this.props.frames} frame={this.props.frame} sprite={this.props.sprites[this.props.sprite]}/>
      <Layers name='Layers' />
    </Panel>
    <ColorPicker/>
    <Palettes items={this.props.palettes}/>
    <Panel name="Right" contentPanels style={this.state.Right} dragBar={false}>
      <Preview frames={this.props.frames} fps={5}/>
      <Palette style={this.state.Palette} />
    </Panel>
    <Tools/>
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


obj.getCanvas = function () {
  if (this.props.layer !== null && this.props.artboard !== null) {
    return <Canvas width={window.innerWidth} height={window.innerHeight}/>;
  }
  return <div></div>;
};

obj.getInitialState = function () {
  return {
    Menus : {
      top : 0,
      left : 0,
      width : '100%',
      height : '25px'
    },
    Left : {
      top : '25px',
      left : 0,
      width : '12%',
      height : 'calc(100% - 25px)'
    },
    Right: {
      top : '25px',
      right : 0,
      width : '15%',
      height : 'calc(100% - 25px)'
    }
  };
};

obj.componentDidMount = function() {
  this.setState({
    width : window.innerWidth,
    height : window.innerHeight
  });
  if (this.props.params.id) {
    http.get('/api/sprites/' + this.props.params.id, this.onGetSprite);
  } else {
    this.createSprite('test', 36, 36);
  }
};

obj.onClickAddLayer = function() {
  let sprite = this.props.sprite;
  let frames = this.props.sprites[sprite].frames;
  for (let j = 0; j < frames.length; j++) {
    let frame = frames[j];
    let layer = this.createLayer({
      sprite,
      frame
    });
    if (frame == this.props.frame) {
      this.props.setCurrentLayer(layer);
    }
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

obj.onGetSprite = function(result) {
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
    for (let j = 1; j < sprite.frames; j++) {
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
    let layerIndex;
    contextTemp.canvas.height = sprite.height;// clean
    contextTemp.drawImage(image.canvas,
      sprite.width * j, 0, sprite.width, sprite.height,
      0, 0, sprite.width, sprite.height
    );
    layerIndex = this.createLayersFromContext(sprite, contextTemp, index);
    this.props.addLayerFrame(
      index,
      layerIndex
    );
    if (j == 0) {
      this.props.setCurrentLayer(layerIndex);
    }
  }
  return index;
};

obj.createLayersFromContext = function(sprite, image, frame) {
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
    frame : frame
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

const Editor = React.createClass(obj);

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

module.exports = connect(mapStateToProps, ducks.actions)(Editor);