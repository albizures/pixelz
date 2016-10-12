const React = require('react');
const { connect } = require('react-redux');
const classNames = require('classnames');

const { register } = require('./Layout.js');
const Frame = require('./Frame.js');
const { actions: { addFrameSprite } } = require('../../../ducks/sprites.js');
const { setCurrentFrame, setCurrentLayer, addFrame,  addLayerFrame, addLayer } = require('../ducks').actions;

const obj = {};

obj.displayName = 'Frames';

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
  console.log(this.refs.list.clientWidth);
  this.setState({
    size: this.refs.list.clientWidth
  });
};

obj.onClickAddFrame = function() {
  let sprite = this.props.sprite.index;
  let numLayers = this.props.frame.layers.length;
  let frame = this.createFrame({sprite});
  for (let j = 0; j < numLayers; j++) {
    this.createLayer({
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
    let children = [];
    for (let j = 0; j < this.props.sprite.frames.length; j++) {
      let frame = this.props.frames[this.props.sprite.frames[j]];
      let className = classNames(
        'preview-frames',
        { 'active': this.props.frame.index === frame.index }
      );
      children.push(
        <li className={className} style={{width: this.state.size, height: this.state.size}} key={j}>
          <Frame data={frame} size={this.state.size} index={j}/>
        </li>
      );
    }
    return children;
  }
  return [];
};

obj.render = function() {
  return <div className={'frames ' + this.props.className} style={this.props.style}>
    <button className="add-frame btn" onClick={this.onClickAddFrame}>add frame</button>
    <div className='list-content'>
      <ul className='list frames-list' ref='list'>
        {this.getList()}
      </ul>
    </div>
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
  function (state) {
    return {
      frame: state.Editor.frames[state.Editor.frame],
      sprite: state.sprites[state.Editor.sprite],
      frames: state.Editor.frames
    };
  },
  {setCurrentFrame, setCurrentLayer, addFrame, addFrameSprite, addLayerFrame, addLayer}
)(React.createClass(obj));

register(Frames, obj.displayName);

module.exports = Frames;