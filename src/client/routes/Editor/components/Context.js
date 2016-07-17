
const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');

const obj = {};
obj.displayName = 'Context';

obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.getInitialState = function() {
  return {};
};
obj.getInitialProps = function () {
  return {
    className : ''
  };
};

obj.componentDidMount = function() {
  let context = ReactDOM.findDOMNode(this).getContext('2d');
  this.setState({
    context : context
  });
  this.initContext(this.props);
};
obj.initContext = function(props) {
  if (!this.state.context) {
    return;
  }
  if(props.image) {
    this.paint(props.image.canvas? props.image.canvas : props.image);
  }
};
obj.shouldComponentUpdate = function(nextProps, nextState) {
  if (this.props.version !== nextProps.version) {
    this.paint(this.props.image.canvas);
      
  }
  return this.props.width !== nextProps.width
    || this.props.height !== nextProps.height
    || this.props.image !== nextProps.image
    || this.props.style !== nextProps.style
    || this.state.context !== nextState.context;
};
obj.paint = function(image) {
  var context = this.state.context;
  this.clean(context);
  imageSmoothingDisabled(context);
  context.drawImage(image,
    0, 0, image.width, image.height,
    0, 0, this.props.width, this.props.height
  );
};
obj.componentDidUpdate = function(prevProps, prevState) {
  this.initContext(this.props);
};
obj.render = function() {
  return <canvas className={this.props.className} style={this.props.style} height={this.props.height} width={this.props.width}></canvas>;
};
  
const Context = React.createClass(obj);

module.exports = Context;