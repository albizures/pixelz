const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const { register } = require('./Layout.js');
const { getPreviewSize } = require('utils/canvas.js');
const Sprite = require('./Sprite.js');
const Panel = require('./Panel.js');
const Range = require('./Range.js');

const obj = {};

obj.displayName = 'Preview';

obj.getInitialState = function(){
  return {
    style : {
      position : 'initial',
      top: 0,
      left: 0,
      width: '100%'
    },
    fps : this.props.fps
  };
};
obj.initPreivew = function(props) {
  if (props.frames[0]) {
    let el = ReactDOM.findDOMNode(this);
    let size = getPreviewSize(
      el.clientWidth > el.clientHeight? el.clientHeight : el.clientWidth,
      props.frames[0].width,
      props.frames[0].height
    );
    this.setState({
      width : size.width - (25 + 20),
      height : size.height - (25 + 20)
    });
  }
};

obj.componentWillReceiveProps = function(nextProps) {
  this.initPreivew(nextProps);
};

obj.onChangeRange = function(value) {
  this.setState({
    fps : value
  });
};
  
obj.getSprite = function() {
  var style = {}, interval = 1000 / this.state.fps;
  style.width = this.state.width;
  //style.marginTop = this.state.marginTop || '0px';
  //style.marginLeft = this.state.marginLeft || '0px';
  if (this.state.width && this.state.height && this.props.frames.length > 0) {
    return <Sprite interval={interval} style={style} width={this.state.width} height={this.state.height} frames={this.props.frames}/>;
  }
  return <div></div>;
};

obj.render = function(){
  return <Panel name='Preview' className={'preview ' + this.props.className} style={this.props.style}>
    {
      this.getSprite()
    }
    <div className='fps-range'>
      <span>FPS</span>
      <Range value={this.state.fps} large onChange={this.onChangeRange} min={1} max={24}/>
      <span>{this.state.fps}</span>
    </div>
  </Panel>;
};

const Preview = connect(
  function (state, props) {
    return {
      frames : state.Editor.frames,
      fps : 5
    };
  }
)(React.createClass(obj));

register(Preview, obj.displayName);

module.exports = Preview;
