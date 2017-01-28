import React from 'react';
import { register } from 'react-dynamic-layout';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { actions as actionsSprite } from '../../../ducks/sprites';
import { currentActions, actions } from '../ducks';
import http from '../../../utils/http';

const {setEditorId} = actions;
const { selectSpriteLayer, selectSpriteFrame } = actionsSprite;

const obj = {};

obj.displayName = 'Sprites';

obj.render = function () {
  return <div style={this.props.style} className={this.props.className + ' stack layout'}>
    {this.getTabs()}
  </div>;
};

obj.onClickTab = function (evt, sprite) {
  this.props.selectSpriteFrame(sprite, this.props.sprites[sprite].frames[0]);
  this.props.selectSpriteLayer(sprite, 0);
  this.props.setCurrentSprite(sprite);
};

obj.shouldComponentUpdate = function(nextProps) {
  return nextProps.filter.length !== this.props.filter.length || 
    nextProps.sprite !== this.props.sprite ||
    nextProps.editorId !== this.props.editorId;
};


obj.componentDidUpdate = function(prevProps) {
  if (prevProps.filter.length !== this.props.filter.length) {
    let sprites = this.props.filter
      .filter(index => !!this.props.sprites[index]._id)
      .map(index => this.props.sprites[index]._id);
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
    let className = classNames(
      'tab',
      sprite.name.replace(' ', '-').toLowerCase(),
      { 'active': sprite.index === this.props.sprite }
    );
    tabs.push(
      <div 
        className={className} 
        key={j} 
        onClick={evt => this.onClickTab(evt, sprite.index)}>
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
  Object.assign({}, currentActions, {setEditorId, selectSpriteLayer, selectSpriteFrame})
)(React.createClass(obj));

register(Sprites, obj.displayName);

export default Sprites;