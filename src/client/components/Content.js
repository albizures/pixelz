const React = require('react');

const obj = {};

obj.displayName = 'Content';


obj.render = function () {
  return <div className={'content ' + this.props.className} style={this.props.style}>
    {this.props.children}
  </div>;
};

const Content = React.createClass(obj);

module.exports = Content;