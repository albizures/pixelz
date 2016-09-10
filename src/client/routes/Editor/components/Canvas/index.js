
const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const { noopFrame } = require('utils/noop.js');
const { register } = require('../Layout.js');
const { currentActions } = require('../../ducks');
const Menu = require('../Menu.js');
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

obj.componentDidUpdate = function(nextProps, nextState) {
  if (!this.props.artboard && this.props.layer !== undefined) {
    this.center();
  }
};

obj.shouldComponentUpdate = function(nextProps, nextState) {
  return true;
};
obj.getInitialState = function () {
  return {};
};
obj.componentDidMount = function () {
  let el = ReactDOM.findDOMNode(this);
  let stats = el.getBoundingClientRect();
  this.setState({
    stats,
    marginTop : -stats.top,
    marginLeft: -stats.left
  });
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
  let size = {
    width : this.props.width,
    height : this.props.height
  };
  let style = {
    marginLeft: this.state.marginLeft,
    marginTop: this.state.marginTop//,
    // width: '100%',
    // height : '100%'
  };
  var props = {
    style,
    size,
    artboard: this.props.artboard,
    layer: this.props.layer,
    setContext: this.setContextType
  };
  if (this.props.layer && this.props.artboard !== null) {
    return <div style={this.props.style} className={this.props.className + ' content-canvas'} onWheel={this.onWheel}>
      <Background {...props}/>
      <Main {...props}/>
      <Preview {...props}/>
      <Mask {...props}/>
      <Menu active={this.state.activeContextMenu} position={this.state.contextMenuPosition}>
        <li onClick={this.onCenter}>Center</li>
      </Menu>
    </div>;
  }
  return <div style={this.props.style} className={this.props.className + ' content-canvas'}></div>;
};



function mapStateToProps(state, props) {
  var frame = state.Editor.frames[state.Editor.frame] || noopFrame;
  return {
    sprite : state.Editor.sprites[state.Editor.sprite],
    frame : frame,
    layer : state.Editor.layers[frame.layers[state.Editor.layer]],
    tool : state.Editor.tool,
    artboard : state.Editor.artboard,
    primaryColor: state.Editor.primaryColor
  };
}

const Canvas = connect(
  mapStateToProps,
  currentActions
)(React.createClass(obj));

register(Canvas, obj.displayName);

module.exports = Canvas;