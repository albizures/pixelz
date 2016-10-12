const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');

const { actions } = require('../../ducks');
const { setSpriteId } = require('../../../../ducks/sprites.js').actions;
const Name = require('./Name.js');
const Menu = require('../Menu.js');
const Panel = require('../Panel.js');
const { noopF } = require('utils/noop.js');
const obj = require('./events.js');

obj.displayName = 'Menus';

obj.getInitialState = function () {
  return {
    style: {
      top: 0,
      left: 0,
      width: '100%',
      height: '25px'
    }
  };
};

obj.getName = function () {
  if (this.props.sprite) {
    return this.props.sprite.name;
  }
  return '';
};

let menuCount = -1;
obj.getMenu = function (name = 'menu unname', handle = noopF, children = []) {
  menuCount++;
  return <li key={menuCount} className={'menu ' + name.toLowerCase().replace(/ /g, '-')} onClick={handle}>
    {name}
    {
      children.length === 0 ? '' : <ul className='list-menus'>
        {children}
      </ul>
    }
  </li>;
};
obj.shouldComponentUpdate = function (nextProps) {
  return nextProps.spriteIndex !== this.props.spriteIndex;
};

obj.onSubmitName = function (name) {
  console.log(this.props.putName(this.props.sprite, name));
};

obj.render = function () {
  return <Panel name='Menus' style={this.state.style} dragBar={false}>
    <Link to='/'>
      <image className='logo'/>
    </Link>
    <Menu active inline>
      <Menu child>
        Project
        <li >new project</li>
        <li onClick={this.onSave}>save sprite</li>
        <li onClick={this.props.openNewSpriteModal}>new sprite</li>
      </Menu>
      <Menu child>
        Sprite
        <li onClick={this.onResize}>resize</li>
        <li onClick={this.onSetBackground}>set background</li>
      </Menu>
    </Menu>
    <Name name={this.getName() } onSubmit={this.onSubmitName}/>
  </Panel>;
};


const Menus = React.createClass(obj);


function mapStateToProps(state) {
  return {
    spriteIndex: state.Editor.sprite,
    sprite: state.sprites[state.Editor.sprite],
    frames: state.Editor.frames,
    layers: state.Editor.layers,
    user: state.user
  };
}

module.exports = connect(
  mapStateToProps,
  Object.assign({}, actions, {setSpriteId})
)(Menus);