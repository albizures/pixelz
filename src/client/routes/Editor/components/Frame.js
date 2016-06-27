const React = require('react');
const { connect } = require('react-redux');

const { actions } = require('../ducks/frames.js');
const { currentActions} = require('../ducks');
const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');

const style = {};
const Frame = React.createClass({
  getInitialState(){
    return {};
  },
  componentDidMount() {
    this.setState(
      getPreviewSize(this.props.size, this.props.data.width, this.props.data.height)
    );
  },
  onClick() {
    this.props.setCurrentFrame(
      this.props.data.index
    );
  },
  render(){
    style.height = this.props.size;
    style.width = this.props.size;
    return <div style={style} onClick={this.onClick}>
      <Context width={this.state.width} height={this.state.height} image={this.props.data.context}/>
      <button className="btn btn-clone">c</button>
      <button className="btn btn-hidden">h</button>
      <button className="btn btn-delete">d</button>
      <span>{this.props.data.index}</span>
    </div>;
  }
});

module.exports = connect(
  null,
  Object.assign({}, actions.frames, currentActions)
)(Frame);
