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
  for (let j = 0; j < this.props.filter.length; j++) {
    let sprite = this.props.sprites[this.props.filter[j]];
    let className = (j === this.props.sprite ? 'active' : '') + ' tab ' + sprite.name.replace(' ', '-').toLowerCase(); 
    tabs.push(
      <div 
        className={className} 
        key={j} 
        onClick={evt => this.onClickTab(evt, sprite)}>
          {sprite.name}
      </div>
    );
  }
  return tabs;
};

function mapStateToProps(state) {
  return {
    filter: state.Editor.sprites,
    sprites: state.sprites,
    sprite: state.Editor.sprite
  };
}

const Sprites = connect(
  mapStateToProps,
  currentActions
)(React.createClass(obj));

register(Sprites, obj.displayName);

module.exports = Sprites;