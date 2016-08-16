const React = require('react');
const { connect } = require('react-redux');

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

obj.render = function () {
  return <Panel name='Menus' style={this.state.style} dragBar={false}>
    <image className='logo'/>
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
  </Panel>;
};


const Menus = React.createClass(obj);


function mapStateToProps(state, props) {
  return state.Editor;
}

module.exports = connect(
  mapStateToProps,
  undefined//ducks.actions
)(Menus);