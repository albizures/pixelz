const React = require('react');
const ReactDOM = require('react-dom');
const http = require('http');
const { connect } = require('react-redux');

//const EditorClass = require('../../Editor');
const ducks = require('./ducks');
const Canvas = require('./components/Canvas');
const Panel = require('./components/Panel.js');
const Frame = require('./components/Frame.js');
const Layer = require('./components/Layer.js');
const List = require('./components/List.js');
const Preview = require('./components/Preview.js');

const Editor = React.createClass({
  render () {
    var frameFilter;
    var layerFilter;
    if (this.props.sprite !== null && this.props.frame !== null && this.props.layer !== null) {
      frameFilter = this.props.sprites[this.props.sprite].frames;
      layerFilter = this.props.frames[this.props.frame].layers;
    }
    return <div className="editor-content">
      <Canvas/>
      <Panel name='Menus' style={this.state.style.Menus} dragBar={false}>
        {'Menus'}
      </Panel>
      <Panel name='Left' contentPanels tabs style={this.state.style.Left} tabDefault={0} dragBar={false}>
        <Panel name='frames' dragBar={false}>
          <button className="add-frame">add frame</button>
          <List name='frames' component={Frame} filter={frameFilter} items={this.props.frames} current={this.props.frame}/>
        </Panel>
        <Panel name='layers' dragBar={false}>
          <button className='add-layer'>add layer</button>
          <List name='layers' component={Layer} filter={layerFilter} items={this.props.layers} current={this.props.layer}/>
        </Panel>
      </Panel>
      <Panel name="Right" contentPanels style={this.state.style.Right} dragBar={false}>
        <Panel name="Preview" style={this.state.style.Preview}>
          <Preview frames={this.props.frames} fps={12}/>
        </Panel>
      </Panel>
    </div>;
  },
  getInitialState () {
    return {
      style: {
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
        },
        Preview : {
          top: 0,
          left: 0,
          width: '100%',
          height : '30%'
        }
      }
    };
  },
  componentDidMount() {
    this.setState({
      width : window.innerWidth,
      height : window.innerHeight
    });
    http.get('/api/sprites/' + this.props.params.id, this.onGetSprite);
  },
  onGetSprite (result) {
    let sprite, image = new Image(), width, height; 
    let context = document.createElement('canvas').getContext('2d');
    if (result.code !== 0) {
      return; // TODO: create toast alerts
    }
    sprite = result.data;
    context.canvas.width = width = sprite.width * sprite.layers;
    context.canvas.height = height = sprite.height;
    sprite.index = this.props.addSprite(sprite);
    this.props.setCurrentSprite(sprite.index);
    image.onload = () => {
      context.drawImage(image,
        0, 0, width, height,
        0, 0, width, height
      );
      this.props.setCurrentFrame(
        this.createFrame(sprite, context)
      );
      for (let j = 1; j < sprite.frames; j++) {
        context.drawImage(image,
          0, j * height, width, height,
          0, 0, width, height
        );
        this.createFrame(sprite, context);
      }
    };
    image.src = '/api/images/sprite/' + sprite._id;
  },
  createFrame (sprite, image) {
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
      layerIndex = this.createLayers(sprite, contextTemp, index);
      this.props.addLayerFrame(
        index,
        layerIndex
      );
      if (j == 0) {
        this.props.setCurrentLayer(layerIndex);
      }
    }
    return index;
  },
  createLayers(sprite, image, frame) {
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
  }
});

function mapStateToProps(state, props) {
  return {
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