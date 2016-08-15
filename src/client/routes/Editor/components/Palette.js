const React = require('react');
const { getTransparentColor, getSpritePalette } = require('workers/colors.js');
const { connect } = require('react-redux');
const spriteActions = require('../ducks/sprites.js').actions;
const Panel = require('./Panel.js');
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
  return false;
};

obj.render = function () {
  return <Panel name="Palette" style={this.state.style}>
    <button className='btn' >=</button>
  </Panel>;
};
const Palette = React.createClass(obj);

module.exports = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
    };
  },
  spriteActions
)(Palette);