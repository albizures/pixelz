const React = require('react');
const { connect } = require('react-redux');

const Panel = require('./Panel.js');

const {
  setCurrentSprite, setCurrentFrame, setCurrentLayer, 
  addSprite, addFrameSprite,
  addFrame, addLayerFrame,
  addLayer 
} = require('../ducks/index.js').actions;

const obj = {};

obj.displayName = 'NewSprite';

obj.onSubmit = function (evt) {
  evt.preventDefault();
  let sprite = this.createSprite(
    evt.target.name.value,
    Number(evt.target.width.value),
    Number(evt.target.height.value)
  );
  this.props.onClose(sprite);
};

obj.createSprite = function(name, width, height) {
  let sprite, frame;
  sprite = this.props.addSprite({
    name,
    width,
    height
  });
  frame = this.props.addFrame({
    width,
    height,
    sprite
  });
  this.props.addFrameSprite(sprite, frame);

  this.props.setCurrentSprite(sprite);
  this.props.setCurrentFrame(frame);
  this.createLayer({sprite, frame, width, height});
  this.props.setCurrentLayer(0);
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

const style = { width : 200 };
obj.render = function () {
  return <Panel name='New Sprite' modal style={style} modalOpen={this.props.modalOpen}>
    <form className='form' onSubmit={this.onSubmit}>
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
          <input className='input' type='number' name='height' defaultValue='10'/>
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
    setCurrentSprite, setCurrentFrame, setCurrentLayer, 
    addSprite, addFrameSprite,
    addFrame, addLayerFrame,
    addLayer
  }
)(React.createClass(obj));

module.exports = NewSprite;


