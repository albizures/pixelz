import React from 'react';

const obj = {};

obj.displayName = 'Color';

obj.getDefaultProps = function() {
  return {
    click: true,
    size: 20,
    className: ''
  };
};

obj.getHandler = function() {
  return this.props.onClick || this.onClick;
};

obj.onClick = function() {
  console.log('color select');
};

obj.render = function() {
  var className = 'color transparent-bkg ' + this.props.className;
  var styleBackground = {
    width: this.props.size,
    height: this.props.size
  };
  var styleColor = {
    background: this.props.color,
    width: this.props.size,
    height: this.props.size
  };
  return <div className={className} style={styleBackground} onClick={this.getHandler()}>
    <div style={styleColor}></div>
  </div>;
};

const Color = React.createClass(obj);

export default Color;