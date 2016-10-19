const React = require('react');
const ReactDOM = require('react-dom');

const obj = {};
obj.displayName = 'Mask';

obj.getInitialState = function() {
  return {};
};

obj.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  artboard: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired
};

obj.componentDidMount = function() {
  let canvas = ReactDOM.findDOMNode(this);
  this.context = canvas.getContext('2d');
  this.props.setContext('mask', this.context);
};

obj.paint = function(context, artboard, layer){
  context = context || this.context ;
  let width = (layer.width * artboard.scale);
  let height = (layer.height * artboard.scale);
  context.fillStyle = '#494949';
  context.fillRect(0, 0, context.canvas.width, context.canvas.width);
  context.clearRect(artboard.x, artboard.y, width, height);
};

obj.componentDidUpdate = function() {
  if (this.props.layer && this.props.artboard) {
    this.paint(this.context, this.props.artboard, this.props.layer);
  }
};

obj.render = function() {
  return <canvas
    width={this.props.width}
    height={this.props.height}
    className='mask'>
  </canvas>;
};

const Mask = React.createClass(obj);

module.exports = Mask;