
const ReactDOM = require('react-dom');
const React = require('react');

const { TRANSPARENT_IMG } = require('../../../constants');
const {imageSmoothingDisabled} = require('utils/canvas.js');
const ListItemFrame = React.createClass({
  getInitialState () {
    return {};
  },
  _clean() {
    var context = this.state.context || ReactDOM.findDOMNode(this).querySelector('canvas').getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  },
  _paint() {
    var context = this.state.context || ReactDOM.findDOMNode(this).querySelector('canvas').getContext('2d');
    var frame = this.props.data;
    imageSmoothingDisabled(context);
    this._clean();
    let pattern = context.createPattern(TRANSPARENT_IMG, "repeat");
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = pattern;
    context.fill();
    context.drawImage(frame.context.canvas,
      0, 0, frame.width, frame.height,
      0, 0, context.canvas.width, context.canvas.height
    );
  },
  componentDidMount() {
    var parent = ReactDOM.findDOMNode(this);
    var size = parent.clientWidth;
    var frame = this.props.data; 
    var context = parent.querySelector('canvas').getContext('2d');
    var scale = 1;
    var width, height, marginTop = 0, marginLeft = 0; 
    if (frame.width > frame.height) {
      scale = size / frame.width;
      width = size;
      height = frame.height * this.scale;
      marginTop = (size - height) / 2 + 'px';
    } else {
      scale = size / frame.height;
      width = frame.width * scale;
      height = size;
      marginLeft = (size - width) / 2 + 'px';
    }
    this.setState({
      size,
      styleLi : {
        height : size,
        width : size,
      },
      styleCanvas : {
        marginTop,
        marginLeft
      },
      scale,
      width,
      height,
      context
    });
    
  },
  componentDidUpdate (prop,state) {
    this._paint();
  },
  render() {
    return <li className={'preview-frame'} style={this.state.styleLi}>
      <canvas style={this.state.styleCanvas}  height={this.state.height} width={this.state.width}></canvas>
      <span>{this.props.data.index}</span>
      <button className="btn btn-clone">C</button>
      <button className="btn btn-hidden">H</button>
      <button className="btn btn-delete">D</button>
    </li>;
  }
});

module.exports = ListItemFrame;