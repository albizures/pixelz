import React from 'react';
import ReactDOM from 'react-dom';
import { imageSmoothingDisabled } from 'utils/canvas';

const obj = {};

obj.displayName = 'Layer';

obj.propTypes = {
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  artboard: React.PropTypes.object.isRequired,
  layer: React.PropTypes.object.isRequired/*,
  zIndex: React.PropTypes.number.isRequired*/
};


obj.componentDidUpdate = function () {
  if (this.props.layer && this.props.artboard) {
    this.paint(this.state.context, this.props.artboard, this.props.layer);
  }
};

obj.shouldComponentUpdate = function (nextProps) {
  if (this.state && this.state.context && (nextProps.layer.version !== this.props.layer.version || this.props.artboard !== nextProps.artboard || this.props.layer.index !== nextProps.layer.index)) {
    this.paint(this.state.context, nextProps.artboard, nextProps.layer);
  }
  return true;
  // console.log('shouldComponentUpdate',nextProps.size.width !== this.props.size.width
  //   || nextProps.size.height !== this.props.size.height);
  // return nextProps.size.width !== this.props.size.width
  //   || nextProps.size.height !== this.props.size.height;
};


obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.paint = function (context, artboard, layer) {
  context = context || this.state.context;
  artboard = artboard || this.props.artboard;
  layer = layer || this.props.layer;
  let width = (layer.width * artboard.scale);
  let height = (layer.height * artboard.scale);
  this.clean(context);
  imageSmoothingDisabled(context);
  context.drawImage(layer.context.canvas,
    0, 0, layer.width, layer.height,
    artboard.x, artboard.y, width, height);
};

obj.componentDidUpdate = function () {
  this.paint();
};

obj.componentDidMount = function() {
  this.setState({
    context: this.refs.canvas.getContext('2d')
  });
};

obj.render = function() {
  return <canvas
    ref='canvas'
    width={this.props.width}
    height={this.props.height}
    className='layer'>
  </canvas>;
};

const Layer = React.createClass(obj);

export default Layer;