import React from 'react';
import { onSetStatusTooltip } from './Tooltipy';

const obj = {};

obj.displayName = 'Tooltip';

obj.getInitialState = function () {
  onSetStatusTooltip(this.onSetStatus);
  return {
    top: 0,
    left: 0,
    active: false
  };
};
obj.shouldComponentUpdate = function() {
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
  let { clientWidth } = el;

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

export default Tooltip;
