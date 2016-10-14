const React = require('react');

const { Layout, register } = require('./Layout');

let windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const conf = {
  mode: 'row',
  name: 'Center',
  active: 0,
  children: [
    {name: 'Sprites', style: {top: 0, height: 20, border: 0}, component: 'Sprites'},
    {name: 'ContentCanvas', style: {top: 20, height: 'calc(100% - 20px)', border: 0}, component: 'ContentCanvas', props: windowSize}
  ]
};

const obj = {};

obj.displayName = 'Center';

obj.render = function () {
  return <Layout {...conf} style={this.props.style}/>;
};

const Center = React.createClass(obj);

register(Center);

module.exports = Center;