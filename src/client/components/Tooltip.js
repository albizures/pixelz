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
obj.shouldComponentUpdate = function(nextProps, nextState) {
  return false;
};


obj.onSetStatus = function (active, text, stats, mode) {
  let el = this.refs.el;
  let top;
  let left;
  if (!stats) {
    return el.classList.remove('active');
  }

  el.className = 'tooltip active ' + mode;
  el.textContent = text;
  let { clientWidth, clientHeight } = el;

  top = stats.top;
  left = stats.left;

  if (mode === 'top') {
    top -= 30;
    left += (stats.width / 2) - (clientWidth / 2);
  }
  if (mode === 'bottom') {
    top += 30;
    left += (stats.width / 2) - (clientWidth / 2);
  }

  el.style.top = top + 'px';
  el.style.left = left + 'px';

};

obj.render = function () {
  return <div className='tooltip' ref='el'>
  </div>;
};

const Tooltip = React.createClass(obj);

module.exports = Tooltip;