const React = require('react');

const obj = {};
obj.displayName = 'Range';

obj.handleChange = function(evt){
  this.props.handleChange(evt.target.value);
};
obj.render = function() {
  return <input type="range" onChange={this.handleChange} {...this.props}/>;
};

const Range = React.createClass(obj);

module.exports = Range;