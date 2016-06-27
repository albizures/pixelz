
const React = require('react');
const ReactDOM = require('react-dom');

const { imageSmoothingDisabled } = require('utils/canvas.js');

const Context = React.createClass({
  propTypes : {
  },
  componentDidMount() {
    let context = ReactDOM.findDOMNode(this).getContext('2d');
    this.setState({
      context : context
    });
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.width !== nextProps.width
      || this.props.height !== nextProps.height
      || this.props.image !== nextProps.image
      || this.state.context !== nextState.context);
    return this.props.width !== nextProps.width
      || this.props.height !== nextProps.height
      || this.props.image !== nextProps.image
      || this.state.context !== nextState.context;
  },
  paint() {
    var context = this.state.context;
    var image = this.props.image.canvas? this.props.image.canvas : this.props.image;
    imageSmoothingDisabled(context);
    context.drawImage(image,
      0, 0, image.width, image.height,
      0, 0, this.props.width, this.props.height
    );
  },
  componentDidUpdate(prevProps, prevState) {
    this.paint();
  },
  render(){
    return <canvas height={this.props.height} width={this.props.width}></canvas>;
  }
});

module.exports = Context;