const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');
let canvas;
let context;
const obj = {};

obj.displayName = 'Main';

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function() {
  canvas = ReactDOM.findDOMNode(this);
  context = canvas.getContext('2d');
  this.setState({context});
  this.props.setContext('main', context);
};

obj.shouldComponentUpdate = function (nextProps, nextState) {
  if (this.state.context !== nextState.context || nextProps.layer.version !== this.props.layer.version || this.props.artboard !== nextProps.artboard || this.props.layer.index !== nextProps.layer.index) {
    this.paint(nextState.context, nextProps.artboard, nextProps.layer);
  }
  return nextProps.size.width !== this.props.size.width
    || nextProps.size.height !== this.props.size.height;
};

obj.paint = function (context, artboard, layer) {
  let width = (layer.width * artboard.scale);
  let height = (layer.height * artboard.scale);
  this.clean(context);
  imageSmoothingDisabled(context);
  context.drawImage(layer.context.canvas,
    0, 0, layer.width, layer.height,
    artboard.x, artboard.y, width, height);
};

obj.componentDidUpdate = function (prevProps, prevState) {
  if (this.state.context && this.props.layer && this.props.artboard) {
    this.paint(this.state.context, this.props.artboard, this.props.layer);
  }
};

obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.render = function() {
  return <canvas 
    style={this.props.style}
    width={this.props.size.width}
    height={this.props.size.height} 
    className='main'>
  </canvas>;
};

const Main = React.createClass(obj);

module.exports = Main;