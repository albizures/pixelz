const React = require('react');
const ReactDOM = require('react-dom');

const obj = {};

obj.getInitialState = function() {
  return {};
};

obj.componentDidMount = function() {
  this.setState({
    context : ReactDOM.findDOMNode(this).getContext('2d')
  });
};

obj.componentWillUpdate = function(nextProps, nextState) {
  return nextProps.size.width !== this.props.size.width
    || nextProps.size.height !== this.props.size.height;
};

obj.paint = function(context, artboard, layer){
  let width = (layer.width * artboard.scale);
  let height = (layer.height * artboard.scale);
  context.fillStyle = 'gray';
  context.fillRect(0, 0, context.canvas.width, context.canvas.width);
  context.clearRect(artboard.x, artboard.y, width, height);
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
      className='mask'>
  </canvas>;
};

const Mask = React.createClass(obj);

module.exports = Mask;