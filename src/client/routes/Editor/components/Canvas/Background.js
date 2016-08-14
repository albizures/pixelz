const React = require('react');
const ReactDOM = require('react-dom');
const { transparent } = require('constants/index.js');

const obj = {};
let canvas, context;
obj.displayName = 'Background';

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function() {
    canvas = ReactDOM.findDOMNode(this);
  context = canvas.getContext('2d');
  this.setState({context});
  this.props.setContext('background', context);
};

obj.componentWillUpdate = function(nextProps, nextState) {
  return nextProps.size.width !== this.props.size.width
    || nextProps.size.height !== this.props.size.height;
};
obj.paint = function(context, artboard, layer) {
  context = context || this.state.context;
  let pattern = context.createPattern(transparent, "repeat");
  context.fillStyle = pattern;
  context.fillRect(
    artboard.x, artboard.y, layer.width * artboard.scale, layer.height * artboard.scale
  );
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};
obj.componentDidUpdate = function(prevProps, prevState) {
  if (this.state.context && this.props.layer && this.props.artboard) {
    this.paint(this.state.context, this.props.artboard, this.props.layer);
  }
};
obj.render = function() {
  return <canvas
      width={this.props.size.width}
      height={this.props.size.height}
      className='background' >
  </canvas>;
};

const Background = React.createClass(obj);

module.exports = Background;