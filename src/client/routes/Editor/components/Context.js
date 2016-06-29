
const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');

let index = 0, interval;
const Context = React.createClass({
  propTypes : {
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    let context = ReactDOM.findDOMNode(this).getContext('2d');
    this.setState({
      context : context
    });
    this.initContext(this.props);
  },
  initContext(props) {
    if (!this.state.context) {
      return;
    }
    if (props.interval, props.images && props.images[index]) {
      this.initInterval(props);
    } else if(props.image) {
      this.paint(props.image.canvas? props.image.canvas : props.image);
    } else if(props.images && props.images[index]) {
      this.paint(props.images[index].context.canvas);
    }
  },
  initInterval(props) {
    this.setInterval(props);
  },
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.interval !== nextProps.interval) {
      this.setInterval(nextProps);
    }
    return this.props.width !== nextProps.width
      || this.props.height !== nextProps.height
      || this.props.image !== nextProps.image
      || this.props.images !== nextProps.images
      || this.state.context !== nextState.context;
  },
  setInterval(props) {
    console.log(interval);
    this.clearInterval();
    interval = setInterval(this.onInterval, props.interval);
  },
  clearInterval() {
    clearInterval(interval);
    interval = undefined;
  },
  onInterval() {
    index = index + 1;
    if (index > this.props.images.length - 1) {
      index = 0;
    }
    this.paint(this.props.images[index].context.canvas);
  },
  paint(image) {
    var context = this.state.context;
    imageSmoothingDisabled(context);
    context.drawImage(image,
      0, 0, image.width, image.height,
      0, 0, this.props.width, this.props.height
    );
  },
  componentDidUpdate(prevProps, prevState) {
    this.initContext(this.props);
  },
  render() {
    return <canvas style={this.props.style} height={this.props.height} width={this.props.width}></canvas>;
  }
});

module.exports = Context;