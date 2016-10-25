const React = require('react');

const obj = {};
const $window = $(window);

obj.displayName = 'Range';

obj.propTypes =  {
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired
};

obj.getDefaultProps = function () {
  return {
    large: false
  };
};

obj.onChange = function (evt) {
  this.setValue(Number(evt.target.value));
};
obj.setValue = function (value) {
  if (!Number.isInteger(value)) {
    return;
  }
  if (value > this.props.max) {
    value = this.props.max;
  } 
  if (value < this.props.min) {
    value = this.props.min;
  }
  this.props.onChange && this.props.onChange(value);
};

obj.onWheel = function (evt) {
  if (evt.deltaY < 0) {
    this.setValue(this.props.value + this.getDiff());
  } else {
    this.setValue(this.props.value - this.getDiff());
  }
};
obj.getDiff = function () {
  return window.CTRL_KEY ? this.smallDiff : this.bigDiff;
};
obj.onMouseDown = function (evt) {
  evt.preventDefault();
  var y = evt.clientY;
  var originalY = y; 
  var input = evt.target;
  document.body.style.cursor = 'ns-resize';
  $window.on('mousemove.range', evt => {
    if (y === evt.clientY) return;
    if (y > evt.clientY) {
      this.setValue(this.props.value + this.getDiff());
    } else {
      this.setValue(this.props.value - this.getDiff());
    }
    y = evt.clientY;
  }).on('mouseup.range', evt =>{
    document.body.style.cursor = '';
    $window.off('mousemove.range').off('mouseup.range');
    evt.clientY === originalY && input.focus();
  });
};

obj.getBackground = function () {
  var position = (( (this.props.value - this.props.min) / (this.props.max - this.props.min)) * 100) + '%';
  return 'linear-gradient(to right, gray, gray ' + position + ', transparent ' + position + ')';
};
obj.componentWillReceiveProps = function(nextProps) {
  this.bigDiff = Math.round(nextProps.max * 0.03);
  this.smallDiff = Math.round(nextProps.max * 0.01);
};

obj.render = function() {
  if (this.props.large) {
    return <input className='range-large span' type="range" max={this.props.max} min={this.props.min} value={this.props.value} onChange={this.onChange}/>;
  }
  return <div className='range-small' onWheel={this.onWheel} style={{backgroundImage: this.getBackground()}} onMouseDown={this.onMouseDown}>
    <input className='input' value={this.props.value} onChange={this.onChange}/>
  </div>;
};

const Range = React.createClass(obj);

module.exports = Range;