import React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import { actions as spriteActions } from '../../../ducks/sprites';
import { actions } from '../ducks';

const {addSprite, addFrameSprite, selectSpriteLayer, selectSpriteFrame} = spriteActions;

const {
  setCurrentSprite,
  openSprite,
  addFrame, addLayerFrame,
  addLayer
} = actions;

const obj = {};

obj.displayName = 'NewSprite';

obj.onSubmit = function (evt) {
  evt.preventDefault();
  let sprite = this.createSprite(
    evt.target.name.value,
    Number(evt.target.width.value),
    Number(evt.target.height.value)
  );
  this.resetValues();
  this.props.onClose(sprite);
};

obj.createSprite = function(name, width, height) {
  let sprite, frame;
  sprite = this.props.addSprite({
    name,
    width,
    height,
    primaryColor: 'rgba(0, 0, 0, 1)',
    secondaryColor: 'rgba(0, 0, 0, 0)'
  });
  this.props.openSprite(sprite);
  frame = this.props.addFrame({
    width,
    height,
    sprite
  });
  this.props.addFrameSprite(sprite, frame);

  this.props.setCurrentSprite(sprite);
  this.props.selectSpriteFrame(sprite, frame);
  this.createLayer({sprite, frame, width, height});
  this.props.selectSpriteLayer(sprite, 0);
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var layer;
  width = width || this.props.sprites[sprite].width;
  height = height || this.props.sprites[sprite].height;
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

obj.onClose = function (evt) {
  evt.preventDefault();
  this.props.onClose();
};

obj.resetValues = function () {
  this.refs.form.name.value = 'Untitled';
};

const style = { width: 200 };
obj.render = function () {
  return <Panel name='New Sprite' modal style={style} modalOpen={this.props.modalOpen}>
    <form className='form' onSubmit={this.onSubmit} ref='form'>
      <div className='form-group'>
        <label>Name</label>
        <input className='input' type='text' name='name' defaultValue='Untitled'/>
      </div>
      <div className='form-group'>
        <label>Width</label>
        <div className='input-group'>
          <input className='input' type='number' name='width' defaultValue='50'/>
          <span>px</span>
        </div>
      </div>
      <div className='form-group'>
        <label>Height</label>
        <div className='input-group'>
          <input className='input' type='number' name='height' defaultValue='50'/>
          <span>px</span>
        </div>
      </div>
      <button className='btn' type="submit">Create Sprite</button>
      <button className='btn' onClick={this.onClose}>Cancel</button>
    </form>
  </Panel>;
};

const NewSprite = connect(
  null,
  {   
    setCurrentSprite, selectSpriteLayer, selectSpriteFrame, 
    addSprite, addFrameSprite,
    addFrame, addLayerFrame,
    addLayer, openSprite
  }
)(React.createClass(obj));

export default NewSprite;
