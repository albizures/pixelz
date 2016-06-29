const React = require('react');
const ReactDOM = require('react-dom');

const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');
const Range = require('./Range.js');

const style = {};
const Preview = React.createClass({
  getInitialState(){
    return {
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
    style.marginTop = this.state.marginTop || '0px';
    style.marginLeft = this.state.marginLeft || '0px';
    return <div style={this.props.style} onClick={this.onClick}>
      <Context interval={1000 / this.state.fps} style={style} width={this.state.width} height={this.state.height} images={this.props.frames}/>
      <div>
        <span>FPS</span>
        <Range value={this.state.fps} handleChange={this.onChangeRange} min={1} max={24}/>
        <span>{this.state.fps}</span>
      </div>
    </div>;
  }
});

module.exports = Preview;
