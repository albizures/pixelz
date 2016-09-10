const React = require('react');

const { register } = require('./Layout.js');
const { getTransparentColor, getSpritePalette } = require('workers/colors.js');
const { connect } = require('react-redux');
const { actions: {setTransparentColor, setCurrentPalette}} = require('../ducks/sprites.js');
const { currentActions: {setSecondaryColor, setPrimaryColor} } = require('../ducks');
const Panel = require('./Panel.js');
const ContentColors = require('./ContentColors.js');
const obj = {};

obj.displayName = 'Palette';

obj.getInitialState = function () {
  return {
    style : {
      position: 'initial',
      width : '100%',
    }
  };
};

obj.shouldComponentUpdate = function (nextProps, nextState) {
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
    current : !this.state.current
  });
};

obj.render = function () {
  return <Panel name='Palette' className={'palette ' + this.props.className} style={this.props.style}>
    <button className='btn' >=</button>
    <button 
      disabled={this.props.palettes.length < 1}
      className={'btn ' + (this.state.current? 'active' : '') } 
      title="Current Palette"
      onClick={this.toggleCurrent}
    >C</button>
    <ContentColors 
      setPrimaryColor={this.props.setPrimaryColor} 
      setSecondaryColor={this.props.setSecondaryColor} 
      palette={this.getPalette()}/>
  </Panel>;
};
obj.getPalette = function () {
  if (this.state.current) {
    return {
      name : 'current',
      colors : this.props.sprite.palette.map((item, index) => {
        return {
          color: item,
          position : {
            x: index,
            y: 0
          }
        };
      })
    };
  }
  return this.props.palettes[this.props.palette] || {};
};

const Palette = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
      palettes: state.palettes,
      palette: state.Editor.palette
    };
  },
  {setTransparentColor, setCurrentPalette, setPrimaryColor, setSecondaryColor}
)(React.createClass(obj));

register(Palette, obj.displayName);

module.exports = Palette;