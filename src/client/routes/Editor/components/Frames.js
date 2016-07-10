const React = require('react');
const { connect } = require('react-redux');

const Panel = require('./Panel.js');
const List = require('./List.js');
const Frame = require('./Frame.js');
const { setCurrentFrame, setCurrentLayer, addFrame, addFrameSprite, addLayerFrame, addLayer } = require('../ducks').actions;

const obj = {};
obj.displayName = 'Frames';

obj.getDefaultProps = function() {
  return {
    frames : [],
    sprite : {
      frames : []
    }
  };
};

obj.onClickAddFrame = function() {
  let sprite = this.props.sprite.index;
  let numLayers = this.props.frames[this.props.frame].layers.length;
  let frame = this.createFrame({sprite});
  console.info(frame, numLayers);
  for (let j = 0; j < numLayers; j++) {
    let layer = this.createLayer({
      sprite,
      frame
    });
    if (j == 0) {
      this.props.setCurrentLayer(layer);
    }
  }
  this.props.setCurrentFrame(frame);
};

obj.createFrame = function({sprite, context}){
  let width = this.props.frames[this.props.frame].width;
  let height = this.props.frames[this.props.frame].height;
  console.log(width,height, this.props.frame);
  let frame = this.props.addFrame({
    width,
    height,
    sprite,
    context
  });
  this.props.addFrameSprite(sprite, frame);
  return frame;
};

obj.render = function() {
  return <Panel name='frames' dragBar={false} style={this.props.style}>
    <button className="add-frame" onClick={this.onClickAddFrame}>add frame</button>
    <List name='frames' component={Frame} filter={this.props.sprite.frames} items={this.props.frames} current={this.props.frame}/>
  </Panel>;
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var layer;
  width = width || this.props.frames[this.props.frame].width;
  height = height || this.props.frames[this.props.frame].height;
  layer = this.props.addLayer({
    width,
    height,
    sprite,
    frame,
    context
  });
  this.props.addLayerFrame(frame, layer);
  return layer;
};

const Frames = React.createClass(obj);

module.exports = connect(
  null,
  {setCurrentFrame, setCurrentLayer, addFrame, addFrameSprite, addLayerFrame, addLayer}
)(Frames);
