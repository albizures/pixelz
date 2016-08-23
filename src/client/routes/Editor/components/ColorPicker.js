const React = require('react');
const { connect } = require('react-redux');

const { register } = require('./Layout');
const { hsvToRgb, rgbToHsv, getRGBAComponents} = require('utils/color.js');
const { round } = Math;

const { currentActions } = require('../ducks/index.js');
const { actions } = require('../ducks/panels.js');

const Range = require('./Range.js');
const Color = require('./Color.js');
const Context = require('./Context.js');
const Panel = require('./Panel.js');

const $window = $(window);
const noop = function () {};

const obj = {};

obj.displayName = 'ColorPicker';

obj.getInitialState = function () {
  var size = 280;
  var bar = 20;
  var [r, g, b, a] = getRGBAComponents(this.props.params.color);
  var [h, s, b] = rgbToHsv(r, g, b);
  return {
    color : this.props.params.color,
    size,
    bar,
    SBPicker : {
      top : (size - bar) * (1 - b),
      left : (size - bar) * s
    },
    APicker: {
      left : size * a
    },
    HPicker: {
      top : (size - bar) * h
    },
    h,
    s,
    b,
    a
  };
};

obj.componentWillReceiveProps = function(nextProps) {
  if (this.props.params.color !== nextProps.params.color) {
    this.initColor(nextProps.params.color);
  }
};
obj.initColor = function (color) {
  var h, s, b, a, rgbaComponets;
  rgbaComponets = getRGBAComponents(color);
  a = rgbaComponets[3]; //round(color[3] * 100);
  color = rgbToHsv(rgbaComponets[0], rgbaComponets[1], rgbaComponets[2]);
  h = color[0];
  s = color[1];
  b = color[2];
  color = 'rgba(' + rgbaComponets[0].toFixed(0) + ', ' + rgbaComponets[1].toFixed(0) + ', ' + rgbaComponets[2].toFixed(0) + ', ' + a + ')';
  this.setState({h, s, b, a, color});
  this.setPositions(h, s, b, round(a * 100));
};
obj.setPositions = function (h, s, b, a) {
  var size = this.state.size - this.state.bar;
  this.setState({
    SBPicker : {
      left : size * s,
      top : size * (1 - b)
    },
    APicker : {
      left : this.state.size * a
    },
    HPicker : {
      top : size * h
    }
  });
};

obj.addHandlers = function (name) {
  $window.on('mouseup.picker', evt => this['onMouseUp'](evt));
  $window.on('mousemove.picker', evt => this['onMouseMove' + name](evt));
  $window.on('mouseleave.picker', evt => 
    $window.off('mouseup.picker').off('mousemove.picker').off('mouseleave.picker')
  );
};

obj.onMouseDownSB = function (evt) {
  this.SBStats = evt.target.getBoundingClientRect();
  this.isDragSB = true;
  this.addHandlers('SB');
};

obj.onMouseDownA = function (evt) {
  this.AStats = evt.target.getBoundingClientRect();
  this.isDragA = true;
  this.addHandlers('A');
};

obj.onMouseDownH = function (evt) {
  this.HStats = evt.target.getBoundingClientRect();
  this.isDragH = true;
  this.addHandlers('H');
};

obj.onMouseUp = function (evt) {
  this.isDragSB = false;
  this.isDragH = false;
  this.isDragA = false;
  $window.off('mouseup.picker');
  $window.off('mousemove.picker');
  $window.off('mouseleave.picker');
};

obj.onMouseMoveSB = function (evt) {
  var x, y, size = this.state.size - this.state.bar;
  var color, s, b;
  if (!this.isDragSB) {
    return;
  }
  y = (evt.clientY - this.SBStats.top);
  x = (evt.clientX - this.SBStats.left);
  y = y < 0 ? 0 : y > size ? size : y;
  x = x < 0 ? 0 : x > size ? size : x;

  s = (x / size);
  b = 1 - (y / size);

  color = hsvToRgb(this.state.h, s, b);
  color = 'rgba(' + color[0].toFixed(0) + ', ' + color[1].toFixed(0) + ', ' + color[2].toFixed(0) + ', ' + this.state.a + ')';
  this.setState({
    SBPicker : {
      left : x,
      top : y
    },
    s,
    b,
    color
  });
};

obj.onMouseMoveA = function (evt) {
  var x, size = this.AStats.width;
  var color, a;
  if (!this.isDragA) {
    return;
  }
  x = (evt.clientX - this.AStats.left);
  x = x < 0 ? 0 : x > size ? size : x;

  a = x / size;
  color = hsvToRgb(this.state.h, this.state.s, this.state.b);
  color = 'rgba(' + color[0].toFixed(0) + ', ' + color[1].toFixed(0) + ', ' + color[2].toFixed(0) + ', ' + a + ')';
  this.setState({
    APicker : {
      left : x
    },
    a,
    color
  });
  // this.setColor(this.hue, this.saturation, this.value, x / this.alpha.stats.width);
};

obj.onMouseMoveH = function (evt) {
  var y, size = this.HStats.height;
  var color, h;
  if (!this.isDragH) {
    return;
  }
  y = (evt.clientY - this.HStats.top);
  y = y < 0 ? 0 : y > size ? size : y;

  h = 1 - (y / size);
  color = hsvToRgb(h, this.state.s, this.state.b);
  color = 'rgba(' + color[0].toFixed(0) + ', ' + color[1].toFixed(0) + ', ' + color[2].toFixed(0) + ', ' + this.state.a + ')';
  this.setState({
    HPicker : {
      top : y
    },
    h,
    color
  });
};
obj.getPureColor = function () {
   var color = getRGBAComponents(this.state.color);
   return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
};

obj.getHandleRGBA = function (position) {
  return value => {
    var h, s, b, a;
    var rgba = getRGBAComponents(this.state.color);
    var size = this.state.size - this.state.bar;
    rgba[position] = position === 3? value / 100 : value;
    a = rgba[3];
    [h, s, b] = rgbToHsv.apply(null, rgba);

    this.setState({
      color : 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')',
      SBPicker : {
        left : size * s,
        top : size * (1 - b)
      },
      APicker : {
        left : this.state.size * a
      },
      HPicker : {
        top : size * h
      },
      a,
      h,
      s,
      b
    });
  };
};

obj.onClickOK = function () {
  this.props.setStyle('colorPicker', {visibility : 'hidden'});
  this.props[this.props.params.action](this.state.color);
};
obj.onClickCancel = function () {
  this.props.setStyle('colorPicker', {visibility : 'hidden'});
};

obj.render = function () {
  var margin = 5;
  var totalSize = this.state.size + margin; 
  var size = this.state.size - this.state.bar;
  var bar = this.state.bar;
  var background = hsvToRgb(this.state.h, 1, 1);
  background = 'rgb(' + background[0].toFixed(0) + ', ' + background[1].toFixed(0) + ', ' + background[2].toFixed(0) + ')';
  var gradient = 'linear-gradient(to right, transparent 0%, ' + background + ' 100%)';
  var rgba = getRGBAComponents(this.state.color);
  rgba[3] = round(rgba[3] * 100);
  return <Panel style={this.props.style} name='Color Picker' float={true}>
    <div style={{width : '400px'}} className='color-picker'>
      <div className='hsla' style={{height: totalSize, width : totalSize}}>
        <div className='sl' onMouseDown={this.onMouseDownSB} style={{height: size, width: size, background : background}}>
          <div className='l'></div>
          <div className='s'></div>
          <div className='picker' style={this.state.SBPicker}></div>
        </div>
        <div className='h' onMouseDown={this.onMouseDownH} style={{height: size, width: bar}}>
          <div className='picker' style={this.state.HPicker}></div>
        </div>
        <div className='alpha' onMouseDown={this.onMouseDownA} style={{height: bar, width : totalSize}}>
          <div className='background transparent-bkg'></div>
          <div className='a' style={{'backgroundImage' : gradient}}></div>
          <div className='picker' style={this.state.APicker}></div>
        </div>
      </div>
      <Color color={this.props.params.color} size={36} onClick={noop}/>
      <Color color={this.state.color} size={36} onClick={noop}/>
      <div className='input-group' >
        <label>R</label>
        <Range value={rgba[0]} onChange={this.getHandleRGBA(0)} min={0} max={255} />
      </div>
      <div className='input-group' >
        <label>G</label>
        <Range value={rgba[1]} onChange={this.getHandleRGBA(1)} min={0} max={255} />
      </div>
      <div className='input-group' >
        <label>B</label>
        <Range value={rgba[2]} onChange={this.getHandleRGBA(2)} min={0} max={255} />
      </div>
      <div className='input-group' >
        <label>A</label>
        <Range value={rgba[3]} onChange={this.getHandleRGBA(3)} min={0} max={100} />
      </div>
      <button className='btn' onClick={this.onClickOK}>OK</button>
      <button className='btn' onClick={this.onClickCancel}>Cancel</button>
    </div>
  </Panel>;
};

const ColorPicker = connect(
  function (state, props) {
    return state.Editor.panels.colorPicker;
  },
  Object.assign({}, actions, currentActions)
)(React.createClass(obj));


register(ColorPicker, obj.displayName);

module.exports = ColorPicker;