import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { register } from 'react-dynamic-layout';

import { getPreviewSize } from '../../../utils/canvas';
import Sprite from './Sprite';
import Range from './Range';

const obj = {};

obj.displayName = 'Preview';

obj.getInitialState = function(){
  return {
    fps: this.props.fps
  };
};
obj.initPreivew = function(props) {
  const frame = props.frames[props.sprite.frames[0]];
  if (frame) {
    let el = this.el;
    let size = getPreviewSize(
      el.clientWidth,
      el.clientHeight - /*size of range div*/25,
      frame.width,
      frame.height
    );
    this.setState(size);
  }
};

obj.componentWillReceiveProps = function(nextProps) {
  this.initPreivew(nextProps);
};

obj.onChangeRange = function(value) {
  this.setState({
    fps: value
  });
};

obj.getSprite = function() {
  var style = {}, interval = 1000 / this.state.fps;
  style.width = this.state.maxWidth;
  style.height = this.state.maxHeight;
  if (this.state.width && this.state.height) {
    return <div style={style} className='context-preview'> 
      <Sprite
        interval={interval}
        style={{marginTop: this.state.marginTop, marginLeft: this.state.marginLeft}}
        width={this.state.width}
        height={this.state.height}
        frames={this.props.frames}
        filter={this.props.sprite.frames}
      />
    </div>;
  }
  return <div></div>;
};

obj.setRef = function (el) {
  this.el = el;
};

obj.render = function(){
  return <div ref={this.setRef} className={'panel-preview preview ' + this.props.className} style={this.props.style}>
    {
      this.getSprite()
    }
    <div className='fps-range input-group'>
      <div className='span'>
        <span>FPS</span>
      </div>
      <Range value={this.state.fps} large onChange={this.onChangeRange} min={1} max={24}/>
      <div className='span'>
        <span>{this.state.fps}</span>
      </div>
    </div>
  </div>;
};

const Preview = connect(
  function (state) {
    return {
      sprite: state.sprites[state.editor.sprite],
      frames: state.frames,
      fps: 5
    };
  }
)(React.createClass(obj));

register(Preview, obj.displayName);

export default Preview;
