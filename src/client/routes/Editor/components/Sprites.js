const React = require('react');
const { connect } = require('react-redux');

const { currentActions, actions: {setEditorId} } = require('../ducks');
const { register } = require('./Layout.js');
const http = require('http');
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

obj.shouldComponentUpdate = function(nextProps) {
  return nextProps.filter.length !== this.props.filter.length || 
    nextProps.sprite !== this.props.sprite ||
    nextProps.editorId !== this.props.editorId;
};


obj.componentDidUpdate = function(prevProps) {
  console.log('didupdate', this.props.editorId);
  if (prevProps.filter.length !== this.props.filter.length) {
    let sprites = this.props.filter
      .filter(index => !!this.props.sprites[index]._id)
      .map(index => this.props.sprites[index]._id);
    //this.props.filter.map(index => this.props.sprites[index]));
    if (this.props.editorId) {
      http.put('/api/editor/' + this.props.editorId, {
        sprites
      });
    } else {
      http.post('/api/editor/', {
        sprites
      }).then(id => this.props.setEditorId(id)).catch(console.log);
    }
  }
};


obj.getTabs = function () {
  let tabs = [];
  for (let j = 0; j < this.props.filter.length; j++) {
    let sprite = this.props.sprites[this.props.filter[j]];
    let className = (sprite.index === this.props.sprite ? 'active' : '') + ' tab ' + sprite.name.replace(' ', '-').toLowerCase(); 
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
    editorId: state.Editor._id,
    sprites: state.sprites,
    sprite: state.Editor.sprite
  };
}

const Sprites = connect(
  mapStateToProps,
  Object.assign({}, currentActions, {setEditorId})
)(React.createClass(obj));

register(Sprites, obj.displayName);

module.exports = Sprites;