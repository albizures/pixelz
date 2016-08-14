
const React = require('react');
const { connect } = require('react-redux');

const { currentActions } = require('../../ducks');
const Background = require('./Background.js');
const Main = require('./Main.js');
const Preview = require('./Preview.js');
const Mask = require('./Mask.js');

const obj = require('./events.js');

obj.displayName = 'Canvas';

var out;
obj.onWheel = function (evt, xxx, real) {
  let deltaY = evt.deltaY;
  
  if (out) {
    return;
  }
  out = setTimeout(() => {
    let diff = 1.06;
    let method = 'floor';
    out = undefined;
    if (deltaY > 0) {
      diff = 0.9;
      method = 'floor';
    }else if (deltaY < 0) {
      diff = 1.1;
      method = 'ceil';
    }
    this.setScale(Math[method](this.props.artboard.scale * diff));
  }, 40);
};
obj.setScale = function (scale) {
  var diffX, diffX;
  if (scale < 1) {
    return;
  }

  var diffX = (this.props.layer.width * scale) - (this.props.artboard.scale * this.props.layer.width);
  var diffY = (this.props.layer.height * scale) - (this.props.artboard.scale * this.props.layer.height);

  this.props.setCurrentArtboard({
    x : this.props.artboard.x - Math.round(diffX / 2),
    y : this.props.artboard.y - Math.round(diffY / 2),
    scale : scale
  });
};

obj.shouldComponentUpdate = function(nextProps, nextState) {
  return true;
};

obj.setContextType = function (type, context) {
  let state = {};
  let $canvas = $(context.canvas);
  state[type] = {
    context,
    $canvas
  };
  this.setState(state);

  if (type === 'preview') {
    $canvas.off('mousedown.preview').on('mousedown.preview', this.onMouseDown, false);
    $canvas.off('mousemove.preview').on('mousemove.preview', this.onMouseMove, false);
  }
};

obj.render = function() {
  var size = {
    width : this.props.width,
    height : this.props.height
  };
  return <div className='content-canvas' onWheel={this.onWheel}>
    <Background size={size} artboard={this.props.artboard} layer={this.props.layer} setContext={this.setContextType}/>
    <Main size={size} artboard={this.props.artboard} layer={this.props.layer} setContext={this.setContextType}/>
    <Preview size={size} artboard={this.props.artboard} layer={this.props.layer} setContext={this.setContextType}/>
    <Mask size={size} artboard={this.props.artboard} layer={this.props.layer} setContext={this.setContextType}/>
  </div>;
};

const Canvas = React.createClass(obj);

function mapStateToProps(state, props) {
  var frame = state.Editor.frames[state.Editor.frame];
  return {
    sprite : state.Editor.sprites[state.Editor.sprite],
    frame : frame,
    layer : state.Editor.layers[frame.layers[state.Editor.layer]],
    tool : state.Editor.tool,
    artboard : state.Editor.artboard
  };
}

module.exports = connect(
  mapStateToProps,
  currentActions
)(Canvas);