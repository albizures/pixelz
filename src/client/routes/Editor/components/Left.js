const React = require('react');

const { Layout, register } = require('./Layout');

const conf = {
  mode : 'stack',
  name : 'Left',
  active : 0,
  children : [
    {name: 'Frames', component: 'Frames'},
    {name: 'Layers', component: 'Layers'}
  ]
};

const obj = {};

obj.displayName = 'Left';

obj.render = function () {
  return <Layout {...conf} style={this.props.style}/>;
};

const Left = React.createClass(obj);

register(Left);

module.exports = Left;
