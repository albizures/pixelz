const React = require('react');
const { connect } = require('react-redux');

const { actions } = require('../ducks/frames.js');
const { currentActions} = require('../ducks');
const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');

const obj = {};
obj.displayName = 'Frame';

obj.getInitialState = function(){
  return {};
};
obj.componentDidMount = function() {
  this.setState(
    getPreviewSize(this.props.size, this.props.data.width, this.props.data.height)
  );
};
obj.onClick = function() {
  this.props.setCurrentFrame(
    this.props.data.index
  );
};
obj.render = function(){
  let style = {};
  style.height = this.props.size + 'px';
  style.width = this.props.size + 'px';
  return <div style={style} onClick={this.onClick} className='transparent-bkg'>
    <Context width={this.state.width} height={this.state.height} image={this.props.data.context} version={this.props.data.version}/>
    <button className="btn btn-clone">c</button>
    <button className="btn btn-hidden">h</button>
    <button className="btn btn-delete">d</button>
    <span>{this.props.data.index}</span>
  </div>;
};
const Frame = React.createClass(obj);

module.exports = connect(
  null,
  Object.assign({}, actions.frames, currentActions)
)(Frame);
