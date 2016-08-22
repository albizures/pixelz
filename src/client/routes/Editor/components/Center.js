const React = require('react');

const { Layout, register } = require('./Layout');

let windowSize = {
  width : window.innerWidth,
  height : window.innerHeight
};

const conf = {
  mode : 'col',
  name : 'Center',
  active : 0,
  children : [
    {name: 'Canvas', width: 100, component: 'Canvas', props: windowSize}
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