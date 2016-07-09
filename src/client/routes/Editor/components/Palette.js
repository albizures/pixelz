const React = require('react');

const Panel = require('./Panel.js');

const obj = {};
obj.displayName = 'Palette';

obj.getInitialState = function () {
  return {
    style : {
      position: 'initial',
      width : '100%',
    }
  };
};

obj.render = function () {
  return <Panel name="Palette" style={this.state.style}>
    <button >=</button>
  </Panel>;
};
const Palette = React.createClass(obj);

module.exports = Palette;