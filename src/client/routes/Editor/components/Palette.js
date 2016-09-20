const React = require('react');

const { register } = require('./Layout.js');
const { getTransparentColor, getSpritePalette } = require('workers/colors.js');
const { connect } = require('react-redux');
const { actions: {setStyle, setParams} } = require('../ducks/panels.js');
const { actions: {savePalette} } = require('../../../ducks/palettes.js');
const { actions: {setTransparentColor, setCurrentPalette}} = require('../../../ducks/sprites.js');
const { currentActions: {setSecondaryColor, setPrimaryColor} } = require('../ducks');
const Panel = require('./Panel.js');
const ContentColors = require('./ContentColors.js');
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

obj.shouldComponentUpdate = function (nextProps) {
  if (this.props.sprite && this.props.sprite.version !== nextProps.sprite.version) {
    let spriteIndex = nextProps.sprite.index;
    if (this.props.sprite.frames.length > 1) {
      getTransparentColor(
        spriteIndex,
        result => this.props.setTransparentColor(spriteIndex, result)
      );
    }
    getSpritePalette(
      spriteIndex,
      result => this.props.setCurrentPalette(spriteIndex, result.array)
    );
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
  return <Panel name='Palette' className={'palette ' + this.props.className} style={this.props.style}>
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
      setPrimaryColor={this.props.setPrimaryColor} 
      setSecondaryColor={this.props.setSecondaryColor} 
      colors={this.getPalette()}/>
  </Panel>;
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
    return {
      sprite: state.sprites[state.Editor.sprite],
      palettes: state.palettes,
      palette: state.Editor.palette,
      primaryColor: state.Editor.primaryColor
    };
  },
  {setTransparentColor, setCurrentPalette, setPrimaryColor, setSecondaryColor, setStyle, setParams, savePalette}
)(React.createClass(obj));

register(Palette, obj.displayName);

module.exports = Palette;