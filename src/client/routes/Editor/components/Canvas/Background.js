const React = require('react');
const ReactDOM = require('react-dom');
const { transparent } = require('constants/index.js');

const obj = {};

obj.displayName = 'Background';

obj.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  artboard: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired
};

obj.componentDidMount = function() {
  let canvas = ReactDOM.findDOMNode(this);
  this.context = canvas.getContext('2d');
  this.props.setContext('background', this.context);
};

obj.componentWillUpdate = function(nextProps) {
  return nextProps.width !== this.props.width
    || nextProps.height !== this.props.height;
};
obj.paint = function(context, artboard, layer) {
  context = context || this.context;
  let pattern = context.createPattern(transparent, "repeat");
  context.fillStyle = pattern;
  context.fillRect(
    artboard.x, artboard.y, layer.width * artboard.scale, layer.height * artboard.scale
  );
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};
obj.componentDidUpdate = function() {
  if (this.props.artboard) {
    this.paint(this.context, this.props.artboard, this.props.layer);
  }
};
obj.render = function() {
  return <canvas
    width={this.props.width}
    height={this.props.height}
    className='background' >
  </canvas>;
};

const Background = React.createClass(obj);

module.exports = Background;