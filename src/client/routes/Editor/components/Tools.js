import React from 'react';
import { connect } from 'react-redux';
import { register } from 'react-dynamic-layout';
import { Tooltipy } from '../../../components/Tooltipy';
import Color from './Color';
import {
  setCurrentTool
} from '../../../ducks';

const obj = {};

obj.displayName = 'Tools';

obj.componentDidMount = function() {
  if (!this.props.tool) {
    this.props.setCurrentTool(this.props.tools[0]);
  }
};

obj.shouldComponentUpdate = function(nextProps) {
  return nextProps.tools.length !== this.props.tools.length
    || nextProps.tool !== this.props.tool
    || nextProps.secondaryColor !== this.props.secondaryColor
    || nextProps.primaryColor !== this.props.primaryColor;
};
obj.onClickPrimary = function (evt) {
  evt.preventDefault();
  this.props.rdChangeProps(
    this.props.elementColorPickerId,
    {
      color: this.props.primaryColor,
      action: 'setSpritePrimaryColor',
      sprite: this.props.sprite
    }
  );
  this.props.rdOpenFloat(this.props.modalColorPickerId);
};

obj.onClickSecondary = function (evt) {
  evt.preventDefault();
  this.props.rdChangeProps(
    this.props.elementColorPickerId,
    {
      color: this.props.secondaryColor,
      action: 'setSpriteSecondaryColor',
      sprite: this.props.sprite
    }
  );
  this.props.rdOpenFloat(this.props.modalColorPickerId);
};

obj.onClickTool = function (name) {
  this.props.setCurrentTool(name);
};

obj.render = function() {
  return <div className='panel-tools'>
    <div className='colors'>
      <Color onClick={this.onClickSecondary} color={this.props.secondaryColor} size={35} className={'secondary'}/>
      <Color onClick={this.onClickPrimary} color={this.props.primaryColor} size={35} className={'primary'}/>
    </div>
    <div className='tools'>
      {
        this.props.tools.map((item, index) =>
          <Tooltipy key={index} text={item} mode="top">
            <button 
              onClick={this.onClickTool.bind(this, item)}
              className={this.props.tool === item ? 'active' : '' } >
              {item.slice(0, 1) }
            </button>
          </Tooltipy>
        )
      }
    </div>
  </div>;
};


function mapStateToProps(state) {
  let sprite = state.sprites[state.editor.sprite];
  return {
    sprite: sprite.id,
    tools: state.editor.tools,
    tool: state.editor.tool,
    primaryColor: sprite.primaryColor,
    secondaryColor: sprite.secondaryColor
  };
}

const Tools = connect(
  mapStateToProps,
  { setCurrentTool}
)(React.createClass(obj));

register(Tools, obj.displayName);

export default Tools;
