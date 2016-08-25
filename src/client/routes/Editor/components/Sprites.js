const React = require('react');
const { connect } = require('react-redux');

const { currentActions } = require('../ducks');
const { register } = require('./Layout.js');

const obj = {};

obj.displayName = 'Sprites';

obj.render = function () {
  return <div style={this.props.style} className={this.props.className + ' stack layout'}>
    {this.getTabs()}
  </div>;
};

obj.onClickTab = function (evt, sprite) {
  this.props.setCurrentFrame(sprite.frames[0]);
  this.props.setCurrentLayer(0);
  this.props.setCurrentSprite(sprite.index);
};

obj.getTabs = function () {
  let tabs = [];
  for (let j = 0; j < this.props.sprites.length; j++) {
    let element = this.props.sprites[j];
    let className = (j == this.props.sprite? 'active' : '') + ' tab ' + element.name.replace(' ', '-').toLowerCase(); 
    tabs.push(
      <div 
        className={className} 
        key={j} 
        onClick={evt => this.onClickTab(evt, element)}>
          {element.name}
      </div>
    );
  }
  return tabs;
};

function mapStateToProps(state, props) {
  return {
    sprites :state.Editor.sprites,
    sprite : state.Editor.sprite
  };
}

const Sprites = connect(
  mapStateToProps,
  currentActions
)(React.createClass(obj));

register(Sprites, obj.displayName);

module.exports = Sprites;