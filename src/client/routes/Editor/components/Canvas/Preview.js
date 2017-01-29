import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {

} from '../../../../ducks';


const obj = {};
let canvas;
let context;
obj.displayName = 'Preview';

obj.componentDidMount = function () {
  canvas = ReactDOM.findDOMNode(this);
  context = canvas.getContext('2d');
  this.setState({context});
  this.props.setContext('preview', context);
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.paintPreview = function (cord, context, artboard) {
  this.clean(context);
  if (artboard.select) {
    
    //this.paintAreaSelect();
  }
  let realCord = {
    x: cord.x * artboard.scale + artboard.x,
    y: cord.y * artboard.scale + artboard.y
  };
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)';//COLOR_POINTER_PREW_DEF;
  context.fillStyle = this.props.primaryColor;
  context.strokeRect(realCord.x - 1, realCord.y - 1, artboard.scale + 2, artboard.scale + 2);
  context.fillRect(realCord.x, realCord.y, artboard.scale, artboard.scale);
};


obj.getInitialState = function() {
  return {};
};

obj.render = function() {
  return <canvas
    style={this.props.style}
    width={this.props.size.width}
    height={this.props.size.height}
    className='preview'>
  </canvas>;
};

const Preview = React.createClass(obj);

export default connect(
  function (state) {
    return {
      primaryColor: state.sprites[state.editor.sprite].primaryColor
    };
  }
)(Preview);