const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');

const obj = {};
obj.displayName = 'Sprite';

obj.render = function () {
    
  return <canvas
    style={this.props.style}
    className='transparent-bkg'
    width={this.props.width}
    height={this.props.height}
  ></canvas>;
};
obj.componentDidMount = function() {
  let context = ReactDOM.findDOMNode(this).getContext('2d');
  this.setState({
    context: context
  });
  if (this.props.frames && this.props.frames.length !== 0) {
    setTimeout(() => {
      this.initInterval(this.props, this.state);
    }, 500);
  }
};

obj.shouldComponentUpdate = function(nextProps, nextState) {
  var update = this.props.width !== nextProps.width
    || this.props.height !== nextProps.height
    || this.props.style !== nextProps.style;
  if (nextState.context && nextProps.frames && nextProps.frames[0]
      && (this.props.interval !== nextProps.interval || update || this.props.frames.length !== nextProps.frames.length)
  ) {
    this.index = 0;
    setTimeout(() => {
      this.initInterval(nextProps, nextState);
    }, 500);
  }

  return update;
};
obj.initInterval = function (props, state) {
  if (props.frames.length > 1) {
    this.index = 0;
    this.interval = clearInterval(this.interval);
    this.interval = setInterval(this.onInterval, props.interval);
  } else {
    this.paint(state.context, props.frames[this.props.filter[0]].context.canvas);
  }
};

obj.onInterval = function () {
  this.paint(this.state.context, this.props.frames[this.props.filter[this.index]].context.canvas);
  this.index++;
  if (this.index > this.props.filter.length - 1) {
    this.index = 0;
  }
};
obj.paint = function(context, frame) {
  this.clean(context);
  imageSmoothingDisabled(context);
  context.drawImage(frame,
    0, 0, frame.width, frame.height,
    0, 0, context.canvas.width, context.canvas.height
  );
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};
const Sprite = React.createClass(obj);

module.exports = Sprite;
