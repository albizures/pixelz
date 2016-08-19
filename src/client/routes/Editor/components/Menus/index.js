const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');

const { actions } = require('../../ducks');
const Name = require('./Name.js');
const Panel = require('../Panel.js');
const { noopF, noopA } = require('utils/noop.js');
const obj = require('./events.js');

obj.displayName = 'Menus';

obj.getInitialState = function () {
  return {
    style : {
      top : 0,
      left : 0,
      width : '100%',
      height : '25px'
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
      children.lenngth == 0? '' : <ul className='list-menus'>
        {children}
      </ul>
    }
  </li>;
};
obj.shouldComponentUpdate = function (nextProps, nextState) {
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
    <ul className='list-menus'>
      {[
        this.getMenu('project',undefined, [
          this.getMenu('new project'),
          this.getMenu('save project', this.onSave),
          this.getMenu('new sprite')
        ]),
        this.getMenu('sprite',undefined, [
          this.getMenu('resize', this.onResize),
          this.getMenu('set background', this.onSetBackground)
        ])
      ]}
    </ul>
    <Name name={this.getName() } onSubmit={this.onSubmitName}/>
  </Panel>;
};


const Menus = React.createClass(obj);


function mapStateToProps(state, props) {
  return {
    spriteIndex: state.Editor.sprite,
    sprite: state.Editor.sprites[state.Editor.sprite],
    frames: state.Editor.frames,
    layers: state.Editor.layers
  };
}

module.exports = connect(
  mapStateToProps,
  actions//ducks.actions
)(Menus);