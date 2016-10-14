
const React = require('react');
const ReactDOM = require('react-dom');
const { setSpriteArtboard } = require('../../../../ducks/sprites.js').actions;
const { connect } = require('react-redux');

// const { noopFrame } = require('utils/noop.js');
// const { register } = require('../Layout.js');
// const { currentActions } = require('../../ducks');
const Menu = require('../Menu.js');
const Background = require('./Background.js');
const Main = require('./Main.js');
const Preview = require('./Preview.js');
const Mask = require('./Mask.js');

const obj = require('./events.js');

obj.displayName = 'Canvas';

obj.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  sprite: React.PropTypes.object.isRequired,
  frame: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired,
  layers: React.PropTypes.array.isRequired,
  primaryColor: React.PropTypes.string.isRequired,
  secondaryColor: React.PropTypes.string.isRequired,
  tool: React.PropTypes.string.isRequired
};

var out;
obj.onWheel = function (evt) {
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
    } else if (deltaY < 0) {
      diff = 1.1;
      method = 'ceil';
    }
    this.setScale(Math[method](this.props.sprite.artboard.scale * diff));
  }, 40);
};
obj.setScale = function (scale) {
  let {sprite: {artboard}} = this.props;
  let layer = this.props.layer;
  let diffX, diffY;
  if (scale < 1) {
    return;
  }

  diffX = (layer.width * scale) - (artboard.scale * layer.width);
  diffY = (layer.height * scale) - (artboard.scale * layer.height);

  this.props.setSpriteArtboard(this.props.sprite.index, {
    x: artboard.x - Math.round(diffX / 2),
    y: artboard.y - Math.round(diffY / 2),
    scale: scale
  });
};

obj.componentDidUpdate = function() {
  if (!this.props.sprite.artboard) {
    this.center();
  }
};

obj.getInitialState = function () {
  return {};
};
obj.componentDidMount = function () {
  let el = ReactDOM.findDOMNode(this);
  let stats = el.parentElement.getBoundingClientRect();
  this.setState({
    stats,
    marginTop: -stats.top,
    marginLeft: -stats.left
  });
  if (!this.props.sprite.artboard && this.props.layer !== undefined) {
    this.center(stats);
  }
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
  let style = {
    width: this.props.width,
    height: this.props.height,
    marginLeft: this.state.marginLeft,
    marginTop: this.state.marginTop
  };
  let size = {
    width: this.props.width,
    height: this.props.height
  };
  var props = {
    // style: {
    //   marginLeft: this.state.marginLeft,
    //   marginTop: this.state.marginTop
    // },
    size,
    artboard: this.props.sprite.artboard || {},
    layer: this.props.layer,
    setContext: this.setContextType
  };
  return <div style={style} className='canvas' onWheel={this.onWheel}>
    <Background {...props}/>
    <Main {...props}/>
    <Preview {...props}/>
    <Mask {...props}/>
    <Menu active={this.state.activeContextMenu} position={this.state.contextMenuPosition}>
      <li onClick={this.onCenter}>Center</li>
    </Menu>
  </div>;
};


// function mapStateToProps(state) {
//   var frame = state.Editor.frames[state.Editor.frame] || noopFrame;
//   return {
//     sprite: state.sprites[state.Editor.sprite],
//     frame: frame,
//     layer: state.Editor.layers[frame.layers[state.Editor.layer]],
//     tool: state.Editor.tool,
//     artboard: state.Editor.artboard,
//     primaryColor: state.Editor.primaryColor
//   };
// }

const Canvas = connect(
  null,
  { setSpriteArtboard }
)(React.createClass(obj));
// const Canvas = React.createClass(obj);

//register(Canvas, obj.displayName);

module.exports = Canvas;