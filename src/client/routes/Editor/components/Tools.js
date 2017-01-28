const React = require('react');
const { connect } = require('react-redux');

const { register } = require('react-dynamic-layout');
const { Tooltipy } = require('../../../components/Tooltipy.js');
const Color = require('./Color.js');
const { actions } = require('../ducks/panels.js');
const { currentActions} = require('../ducks');

const obj = {};

obj.displayName = 'Tools';

obj.getInitialState = function(){
  return {
    style: {
      top: 100,
      left: 150,
      width: 65
    }
  };
};

obj.componentDidMount = function() {
  if (!this.props.tool) {
    this.props.setCurrentTool(this.props.tools[0]);
  }
};

obj.shouldComponentUpdate = function(nextProps) {
  return nextProps.tools.length !== this.props.tools.length
    || nextProps.tool !== this.props.tool
    || nextProps.style !== this.props.style
    || nextProps.secondaryColor !== this.props.secondaryColor
    || nextProps.primaryColor !== this.props.primaryColor;
};
obj.onClickPrimary = function (evt) {
  evt.preventDefault();
  this.props.setStyle('colorPicker', {
    visibility: 'visible'
  });
  this.props.setParams('colorPicker', {
    color: this.props.primaryColor,
    action: 'setSpritePrimaryColor',
    sprite: this.props.sprite
  });
};

obj.onClickSecondary = function (evt) {
  evt.preventDefault();
  this.props.setStyle('colorPicker', {
    visibility: 'visible'
  });
  this.props.setParams('colorPicker', {
    color: this.props.secondaryColor,
    action: 'setSpriteSecondaryColor',
    sprite: this.props.sprite
  });
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
  let sprite = state.sprites[state.Editor.sprite] || {};
  return {
    sprite: sprite.index,
    tools: state.Editor.tools,
    tool: state.Editor.tool,
    style: state.Editor.panels.tools.style,
    primaryColor: sprite.primaryColor,
    secondaryColor: sprite.secondaryColor
  };
}

const Tools = connect(
  mapStateToProps,
  Object.assign({}, currentActions, actions)
)(React.createClass(obj));

register(Tools, obj.displayName);

module.exports = Tools;
