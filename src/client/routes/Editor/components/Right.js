const React = require('react');

const { Layout, register } = require('./Layout.js');


const conf = {
  mode : 'row',
  name : 'Right',
  children : [
    {name: 'Preview', height: 30, component: 'Preview'},
    {name: 'Palette', height: 20, component: 'Palette'}
  ]
};

const obj = {};

obj.displayName = 'Right';

obj.render = function () {
  return <Layout {...conf} style={this.props.style}/>;
};

const Right = React.createClass(obj);

register(Right);

module.exports = Right;
