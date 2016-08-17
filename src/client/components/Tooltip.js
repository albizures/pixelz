const React = require('react');
const { onSetStatusTooltip } = require('./Tooltipy.js');
const obj = {};

obj.displayName = 'Tooltip';

obj.getInitialState = function () {
  console.log('getInitialState', require('./Tooltipy.js'));
  onSetStatusTooltip(this.onSetStatus);
  return {
    top: 0,
    left: 0,
    active : false
  };
};

obj.onSetStatus = function (active, text, stats, mode) {
  let top;
  let left;
  if (stats) {
    top = stats.top;
    left = stats.left ;
  }
  if (mode === 'top') {
    top -= 30;
    left -= stats.width / 2;
  }
  if (mode === 'bottom') {
    top += 30;
    left -= stats.width / 2;
  }
  this.setState({
    active,
    top,
    left,
    mode,
    text
  });
};

obj.render = function () {
  let style = {
    top: this.state.top,
    left: this.state.left
  };
  let classState = this.state.mode || '';
  classState += this.state.active ? ' active ' : '';
  return <div className={'tooltip ' + classState  } style={style}>
    {this.state.text}
  </div>;
};

const Tooltip = React.createClass(obj);

module.exports = Tooltip;