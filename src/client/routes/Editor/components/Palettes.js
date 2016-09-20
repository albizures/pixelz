const React = require('react');

const Panel = require('./Panel.js');

const obj = {};
obj.displayName = 'Palettes';

obj.getInitialState = function () {
  return {
    style: {
      top: '100px',
      left: '400px',
      visibility: 'hidden'
    }
  };
};

obj.render = function () {
  return <Panel name="Palettes" style={this.state.style}>
  </Panel>;
};

const Palettes = React.createClass(obj);

module.exports = Palettes;