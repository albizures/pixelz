import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { register } from 'react-dynamic-layout';

import Frame from './Frame';

import {
  addFrameSprite,
  selectSpriteFrame,
  addFrame,
  addLayerFrame,
  addLayer
} from '../../../ducks';

const obj = {};

obj.displayName = 'Frames';

obj.propTypes = {
  sprite: React.PropTypes.object.isRequired,
  frames: React.PropTypes.array.isRequired
};

obj.getDefaultProps = function() {
  return {
    frames: [],
    sprite: {
      frames: []
    }
  };
};
obj.getInitialState = function() {
  return {
    size: 0
  };
};
obj.componentDidMount = function () {
  console.log(this.list.clientWidth);
  this.setState({
    size: this.list.clientWidth
  });
};

obj.componentWillReceiveProps = function (nextProps) {
  if (this.props.rdWidth !== nextProps.rdWidth) {
    this.setState({
      size: this.list.clientWidth
    });
  }
};

obj.onClickAddFrame = function() {
  let sprite = this.props.sprite.index;
  let numLayers = this.props.frames[0].layers.length;
  let frame = this.createFrame({sprite});
  for (let j = 0; j < numLayers; j++) {
    this.createLayer({
      sprite,
      frame
    });
  }
  this.props.selectSpriteFrame(this.props.sprite.index, frame);
};

obj.createFrame = function({sprite, context}){
  var currentFrame = this.props.frames[this.props.sprite.frame];
  let width = currentFrame.width;
  let height = currentFrame.height;
  let frame = this.props.addFrame({
    width,
    height,
    sprite,
    context
  });
  this.props.addFrameSprite(sprite, frame);
  return frame;
};

obj.onSelect = function (frame) {
  this.props.selectSpriteFrame(this.props.sprite.index, frame);
};

obj.getList = function() {
  if (!this.props.sprite || !Number.isInteger(this.props.sprite.frame)) return [];

  let children = [];
  for (let j = 0; j < this.props.sprite.frames.length; j++) {
    let frame = this.props.frames[this.props.sprite.frames[j]];
    let className = classNames(
      'preview-frames',
      { 'active': this.props.sprite.frame === frame.index }
    );
    children.push(
      <li className={className} style={{width: this.state.size, height: this.state.size}} key={j}>
        <Frame data={frame} onSelect={this.onSelect} size={this.state.size} index={j}/>
      </li>
    );
  }
  return children;
};

obj.render = function() {
  return <div className={'frames ' + this.props.className} style={this.props.style}>
    <button className="add-frame btn" onClick={this.onClickAddFrame}>add frame</button>
    <div className='list-content'>
      <ul className='list frames-list' ref={list => this.list = list }>
        {this.getList()}
      </ul>
    </div>
  </div>;
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var currentFrame = this.props.frames[this.props.sprite.frame];
  var layer;
  width = width || currentFrame.width;
  height = height || currentFrame.height;
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
  function (state) {
    return {
      sprite: state.sprites[state.editor.sprite],
      frames: state.frames
    };
  },
  {selectSpriteFrame, addFrame, addFrameSprite, addLayerFrame, addLayer}
)(React.createClass(obj));

register(Frames, obj.displayName);

export default Frames;