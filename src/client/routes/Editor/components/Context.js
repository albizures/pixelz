
const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');

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
    if(props.image) {
      this.paint(props.image.canvas? props.image.canvas : props.image);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.width !== nextProps.width
      || this.props.height !== nextProps.height
      || this.props.image !== nextProps.image
      || this.props.style !== nextProps.style
      || this.state.context !== nextState.context;
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