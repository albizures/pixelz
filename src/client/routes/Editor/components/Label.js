import React from 'react';
import { register } from 'react-dynamic-layout';

const obj = {};

obj.displayName = 'Label';

obj.render = function () {
  return <div className={this.props.className} style={this.props.style}>
    <label>{this.props.text}</label>
  </div>;
};

const Label = React.createClass(obj);

register(Label);

export default Label;