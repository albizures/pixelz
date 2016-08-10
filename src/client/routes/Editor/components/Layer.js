const React = require('react');
const { connect } = require('react-redux');

const { getPreviewSize } = require('utils/canvas.js');
const Context = require('./Context.js');
const { changeLayerPosition } = require('../ducks/frames.js').actions;
const { setCurrentLayer } = require('../ducks').actions;


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
    this.props.index
  );
};

obj.onDragOver = function(e) {
  e.preventDefault();
};
obj.onDragStart = function(e){
  e.dataTransfer.setData('index', this.props.index);
};
obj.onDrop = function (e) {
  var toIndex = Number(e.dataTransfer.getData('index'));
  this.props.changeLayerPosition(
    this.props.data.frame,
    this.props.index,
    toIndex
  );
};

obj.render = function(){
  let style = {};
  style.height = this.props.size + 'px';
  style.width = this.props.size + 'px';
  return <div onDrop={this.onDrop} draggable="true" onDragOver={this.onDragOver} onDragStart={this.onDragStart} style={style} onClick={this.onClick} className='transparent-bkg'>
    <Context width={this.state.width} height={this.state.height} image={this.props.data.context} version={this.props.data.version}/>
    <button className="btn btn-clone">c</button>
    <button className="btn btn-hidden">h</button>
    <button className="btn btn-delete">d</button>
    <span>{this.props.index + 1}</span>
  </div>;
};

const Layer = React.createClass(obj);

module.exports = connect(
  null,
  { setCurrentLayer, changeLayerPosition }
)(Layer);