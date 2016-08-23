const React = require('react');
const { connect } = require('react-redux');

const { register } = require('./Layout.js');
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
  let numLayers = this.props.frame.layers.length;
  let frame = this.createFrame({sprite});
  for (let j = 0; j < numLayers; j++) {
    let layer = this.createLayer({
      sprite,
      frame
    });
  }
  this.props.setCurrentFrame(frame);
};

obj.createFrame = function({sprite, context}){
  let width = this.props.frame.width;
  let height = this.props.frame.height;
  let frame = this.props.addFrame({
    width,
    height,
    sprite,
    context
  });
  this.props.addFrameSprite(sprite, frame);
  return frame;
};

obj.getList = function() {
  if (this.props.frame) {
    return <List name='frames' component={Frame} filter={this.props.sprite.frames} items={this.props.frames} current={this.props.frame.index}/>;
  } 
  return <div className='list-content'></div>;
};

obj.render = function() {
  return <div className={'frames ' + this.props.className} style={this.props.style}>
    <button className="add-frame btn" onClick={this.onClickAddFrame}>add frame</button>
    {
      this.getList()
    }
  </div>;
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var layer;
  width = width || this.props.frame.width;
  height = height || this.props.frame.height;
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

const Frames = connect(
  function (state, props) {
    return {
      frame : state.Editor.frames[state.Editor.frame],
      sprite : state.Editor.sprites[state.Editor.sprite],
      frames : state.Editor.frames
    };
  },
  {setCurrentFrame, setCurrentLayer, addFrame, addFrameSprite, addLayerFrame, addLayer}
)(React.createClass(obj));

register(Frames, obj.displayName);

module.exports = Frames;