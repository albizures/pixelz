const React = require('react');
// const { connect } = require('react-redux');

// const { actions } = require('../ducks/frames.js');
// const { currentActions} = require('../ducks');
const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');
const Range = require('./Range.js');

const Preview = React.createClass({
  getInitialState(){
    return {
      index: 0,
      context: document.createElement('canvas').getContext('2d')
    };
  },
  setCanvasContext(index, props) {
    var context = (props.frames[index] || { context: document.createElement('canvas').getContext('2d') }).context; 
    this.setState({
      index,
      context: context
    });
    return context; 
  },
  clearInterval() {
    clearInterval(this.state.interval);
    this.setState({
      interval : null
    });
  },
  setInterval(prop) {
    var interval = setInterval(this.onInterval, 1000 / props.fps);
    this.setState({
      interval : interval
    });
    return interval;
  },
  componentDidMount() {
    if (this.props.frames.length === 1) {
      this.setCanvasContext(0);
    } if (this.props.frames.length > 1) {
      this.setInterval();
    }
  },
  onInterval() {
    var index = this.state.index++;
    console.log(index);
    if (index > this.props.frames.length) {
      index = 0;
    }
    this.setCanvasContext(index);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.frames.length === 1) {
      this.setCanvasContext(0, nextProps);
    } if (nextProps.frames.length > 1) {
      this.setInterval(nextProps);
    }
  },
  onClick() { },
  render(){
    return <div style={this.props.style} onClick={this.onClick}>
      <Context width={180} height={180} image={this.state.context}/>
      <div>
        <span>FPS</span>
        <Range/>
        <span>{this.props.fps}</span>
      </div>
    </div>;
  }
});

module.exports = Preview;
