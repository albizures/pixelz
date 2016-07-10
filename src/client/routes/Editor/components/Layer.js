const React = require('react');
const { connect } = require('react-redux');

const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');
const { setCurrentLayer } = require('../ducks').actions;

const style = {};
const obj = {};

obj.displayName = 'Layer';

obj.getInitialState = function(){
  return {};
};

obj.componentDidMount = function() {
  this.setState(
    getPreviewSize(this.props.size, this.props.data.width, this.props.data.height)
  );
};

obj.onClick = function() {
  this.props.setCurrentLayer(
    this.props.data.index
  );
};

obj.render = function(){
  style.height = this.props.size;
  style.width = this.props.size;
  return <div style={style} onClick={this.onClick}>
    <Context width={this.state.width} height={this.state.height} image={this.props.data.context} version={this.props.data.version}/>
    <button className="btn btn-clone">c</button>
    <button className="btn btn-hidden">h</button>
    <button className="btn btn-delete">d</button>
    <span>{this.props.data.index}</span>
  </div>;
};

const Layer = React.createClass(obj);

module.exports = connect(
  null,
  { setCurrentLayer }
)(Layer);