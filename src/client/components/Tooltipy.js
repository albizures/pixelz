const React = require('react');
const ReactDOM = require('react-dom');

let setStatusTooltip;

const obj = {};
obj.displayName = 'ToolTipy';


obj.componentDidMount = function () {
  this.elDOM = ReactDOM.findDOMNode(this);
  this.elDOM.addEventListener('mouseleave', this.onMouseLeave);
  this.elDOM.addEventListener('mouseenter', this.onMouseEnter);
};


obj.onMouseLeave = function () {
  setStatusTooltip(false);
};

obj.onMouseEnter = function () {
  setStatusTooltip(true, this.props.text ,this.elDOM.getBoundingClientRect(), this.props.mode);
};

obj.render = function () {
  let Component = this.props.children;
  let type = Component.type;
  let children = Component.props.children;
  let props = Component.props;
  return React.createElement(type, props);
};

const Tooltipy = React.createClass(obj);

exports.Tooltipy = Tooltipy;
exports.onSetStatusTooltip = function (cb) {
  console.log('set cb');
  setStatusTooltip = cb;
};