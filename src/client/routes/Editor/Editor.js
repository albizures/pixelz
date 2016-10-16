const React = require('react');
const ReactDOM = require('react-dom');
// const http = require('http');
const { connect } = require('react-redux');

const ducks = require('./ducks');
const { addSprite, addFrameSprite, selectSpriteFrame, selectSpriteLayer } = require('../../ducks/sprites.js').actions;

require('./components/Sprites.js');
require('./components/Canvas');
require('./components/Canvas/ContentCanvas.js');
require('./components/Preview.js');
require('./components/Palette.js');
require('./components/Layers.js');
require('./components/Frames.js');
require('./components/Label.js');
require('./components/Left.js');
require('./components/Center.js');
require('./components/Right.js');
require('./components/Tools.js');
require('./components/ColorPicker.js');

const { Layout } = require('./components/Layout.js');

const NewSprite = require('./components/NewSprite.js');
const Menus = require('./components/Menus');

const shortcuts = require('./shortcuts');

const conf = {
  mode: 'col',
  name: 'Main',
  style: {
    height: 'calc(100% - 25px)',
    top: '25px'
  },
  children: [
    {name: 'Left', width: 12, component: 'Left'},
    {name: 'Center', width: 73, component: 'Center'},
    {name: 'Right', width: 15, component: 'Right'}
  ],
  float: [
    {name: 'Tools', component: 'Tools'},
    {name: 'ColorPicker', component: 'ColorPicker'}
  ]
};

const obj = {};

obj.displayName = 'Editor';

obj.onClose = function () {
  this.setState({open: false});
};

obj.openNewSpriteModal = function () {
  this.setState({open: true});
};

obj.render = function () {
  return <div className='editor-content'>
    <Menus openNewSpriteModal={this.openNewSpriteModal}/>
    <Layout {...conf}/>
    <NewSprite modalOpen={this.state.open} onClose={this.onClose} />
  </div>;
};


obj.getInitialState = function () {
  return {open: false};
};

obj.componentWillUnmount = function() {
  shortcuts.off();
};


obj.componentDidMount = function() {
  shortcuts.init();
  this.setState({
    width: window.innerWidth,
    height: window.innerHeight
  });
};

function mapStateToProps(state) {
  return {
    artboard: state.Editor.artboard,
    sprite: state.Editor.sprite,
    frame: state.Editor.frame,
    layer: state.Editor.layer,
    sprites: state.sprites,
    filterSprites: state.Editor.sprites,
    frames: state.Editor.frames,
    layers: state.Editor.layers,
    palettes: state.Editor.palettes
  };
}

module.exports = connect(
  mapStateToProps,
  Object.assign({}, ducks.actions, {addSprite, addFrameSprite, selectSpriteFrame, selectSpriteLayer})
)(React.createClass(obj));