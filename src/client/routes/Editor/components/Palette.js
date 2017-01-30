import React from 'react';
import { register } from 'react-dynamic-layout';
import { connect } from 'react-redux';

import { getTransparentColor, getSpritePalette } from '../../../workers/colors';
import ContentColors from './ContentColors';

import {
  setTransparentColor,
  setCurrentPalette,
  setSpriteSecondaryColor,
  setSpritePrimaryColor,
  savePalette,
  setStyle,
  setParams
} from '../../../ducks';


const obj = {};

obj.displayName = 'Palette';

obj.getInitialState = function () {
  return {
    style: {
      position: 'initial',
      width: '100%'
    },
    current: this.props.palettes.length < 1
  };
};

obj.componentDidMount = function () {
  if (this.props.sprite) {
    let spriteIndex = this.props.sprite.id;
    getSpritePalette(
      spriteIndex
    ).then(result => this.props.setCurrentPalette(spriteIndex, result.array));
  }
};


obj.shouldComponentUpdate = function (nextProps) {
  if (this.props.sprite && this.props.sprite.version !== nextProps.sprite.version) {
    let spriteIndex = nextProps.sprite.id;
    if (this.props.sprite.frames.length > 1) {
      getTransparentColor(
        spriteIndex,
        result => this.props.setTransparentColor(spriteIndex, result)
      );
    }
    getSpritePalette(
      spriteIndex
    ).then(result => this.props.setCurrentPalette(spriteIndex, result.array));
  } 
  return true;
};

obj.toggleCurrent = function () {
  this.setState({
    current: !this.state.current
  });
};

obj.onAddColor = function () {
  this.props.setStyle('colorPicker', {
    visibility: 'visible'
  });
  

  this.props.setParams('colorPicker', {
    color: this.props.primaryColor,
    action: 'addColor',
    palette: this.props.palette,
    position: this.getNextPosition()
  });
};

obj.onSave = function () {
  this.props.savePalette(this.props.palette);
};

obj.getNextPosition = function() {
  let nextPosition = {};
  let palette = this.props.palettes[this.props.palette];
  let max = 6;
  
  Object.assign(nextPosition, palette.colors[palette.colors.length - 1].position);
  nextPosition.x++;
  if (nextPosition.x > max) {
    nextPosition.x = 0;
    nextPosition.y++;
  }
  return nextPosition;
};

obj.render = function () {
  return <div className={'panel-palette palette ' + this.props.className} style={this.props.style}>
    <button className='btn' >=</button>
    <button 
      disabled={this.props.palettes.length < 1}
      className={'btn ' + (this.state.current ? 'active' : '') } 
      title="Current Palette"
      onClick={this.toggleCurrent}
    >C</button>
    <button 
      className='btn'
      disabled={this.state.current}
      onClick={this.onAddColor}
    >+</button>
    {this.getPalette().unsaved ? <span onClick={this.onSave}>!¡</span> : null}
    <ContentColors 
      setPrimaryColor={color => this.props.setSpritePrimaryColor(this.props.sprite.id, color)}
      setSecondaryColor={color => this.props.setSpriteSecondaryColor(this.props.sprite.id, color)}
      colors={this.getPalette()}/>
  </div>;
};
obj.getPalette = function () {
  if (this.state.current) {
    if (!this.props.sprite || !this.props.sprite.palette) {
      return [];
    }
    return this.props.sprite.palette.map((item, index) => {
      return {
        color: item,
        position: {
          x: index,
          y: 0
        }
      };
    });
  }
  return this.props.palettes[this.props.palette].colors;
};

const Palette = connect(
  function (state) {
    const sprite = state.sprites[state.editor.sprite];
    return {
      sprite,
      palettes: state.palettes,
      palette: sprite.palette,
      primaryColor: sprite.primaryColor
    };
  },
  {setTransparentColor, setCurrentPalette, setSpriteSecondaryColor, setSpritePrimaryColor, setStyle, setParams, savePalette}
)(React.createClass(obj));

register(Palette, obj.displayName);

export default Palette;