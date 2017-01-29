import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { register } from 'react-dynamic-layout';
import Canvas from './index';
const obj = {};

obj.displayName = 'ContentCanvas';

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function () {
  let el = ReactDOM.findDOMNode(this);
  let stats = el.getBoundingClientRect();
  this.setState({
    stats,
    marginTop: -stats.top,
    marginLeft: -stats.left
  });
};

obj.render = function () {
  // let style = {
  //   marginLeft: this.state.marginLeft,
  //   marginTop: this.state.marginTop,
  //   width: this.props.width,
  //   height: this.props.height
  // };
  let valid = Number.isInteger(this.props.sprite) &&
    Number.isInteger(this.props.sprites[this.props.sprite].frame) &&
    Number.isInteger(this.props.sprites[this.props.sprite].layer);
  if (!valid) {
    return <div></div>;
  }
  let sprite = this.props.sprites[this.props.sprite];
  return <div style={this.props.style} className="content-canvas">
    <Canvas
      width={this.props.width}
      height={this.props.height}
      sprite={sprite}
      frame={this.props.frames[sprite.frame]}
      layer={this.props.layers[this.props.frames[sprite.frame].layers[sprite.layer]]}
      layers={this.props.layers}
      primaryColor={sprite.primaryColor}
      secondaryColor={sprite.secondaryColor}
      tool={this.props.tool}
    ></Canvas>
  </div>;
  // artboard={this.props.sprites[this.props.sprite].artboard}
};


function mapStateToProps(state) {
  return {
    sprite: state.editor.sprite,
    sprites: state.sprites,
    frames: state.frames,
    layers: state.layers,
    tool: state.editor.tool,
    artboard: state.editor.artboard
  };
}

const ContentCanvas = connect(
  mapStateToProps//,
  // {setSpriteArtboar}
)(React.createClass(obj));

register(ContentCanvas, obj.displayName);

export default ContentCanvas;