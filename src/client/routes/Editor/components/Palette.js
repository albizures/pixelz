const React = require('react');

const { register } = require('./Layout.js');
const { getTransparentColor, getSpritePalette } = require('workers/colors.js');
const { connect } = require('react-redux');
const spriteActions = require('../ducks/sprites.js').actions;
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
var tempPalette = {
  name : 'test',
  colors: [
    {
      position : {
        x: 3,
        y: 3
      },
      color : 'green'
    }, {
      position : {
        x: 4,
        y: 3
      },
      color : 'whitesmoke' 
    }
  ]
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
      className={'btn ' + (this.state.current? 'active' : '') } 
      title="Current Palette"
      onClick={this.toggleCurrent}
    >C</button>
    <ContentColors palette={this.getPalette()}/>
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
  return tempPalette;
};

obj.getColors = function (colors) {
  for (let j = 0; j < colors.length; j++) {
    let element = colors[j];
    
  }
};

const Palette = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
    };
  },
  spriteActions
)(React.createClass(obj));

register(Palette, obj.displayName);

module.exports = Palette;