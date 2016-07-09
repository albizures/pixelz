const React = require('react');
const ReactDOM = require('react-dom');

const { getPreviewSize } = require('utils/canvas.js');
const Sprite = require('./Sprite.js');
const Panel = require('./Panel.js');
const Range = require('./Range.js');

const Preview = React.createClass({
  getInitialState(){
    return {
      style : {
        position : 'initial',
        top: 0,
        left: 0,
        width: '100%'
      },
      fps : this.props.fps
    };
  },
  initPreivew(props) {
    if (props.frames[0]) {
      this.setState(
        getPreviewSize(
          ReactDOM.findDOMNode(this).clientWidth,
          props.frames[0].width,
          props.frames[0].height
        )
      );
    }
  },

  componentWillReceiveProps(nextProps) {
    this.initPreivew(nextProps);
  },
  onChangeRange(value) {
    this.setState({
      fps : value
    });
  },
  
  onClick() { },
  render(){
    var style = {};
    style.marginTop = this.state.marginTop || '0px';
    style.marginLeft = this.state.marginLeft || '0px';
    return <Panel name="Preview" style={this.state.style}>
      <Sprite interval={1000 / this.state.fps} style={style} width={this.state.width} height={this.state.height} frames={this.props.frames}/>
      <div>
        <span>FPS</span>
        <Range value={this.state.fps} handleChange={this.onChangeRange} min={1} max={24}/>
        <span>{this.state.fps}</span>
      </div>
    </Panel>;
  }
});

module.exports = Preview;
