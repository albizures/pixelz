const React = require('react');
const { connect } = require('react-redux');

const Panel = require('./Panel.js');
const List = require('./List.js');
const Layer = require('./Layer.js');
const { setCurrentLayer, addLayerFrame, addLayer } = require('../ducks').actions;

const obj = {};
obj.displayName = 'Layers';

obj.getDefaultProps = function() {
  return {
    layers : [],
    frame : {
      layers : []
    }
  };
};
obj.render = function() {
  return <Panel name='layers' dragBar={false} style={this.props.style}>
    <button className="add-layer" onClick={this.onClickAddLayer}>add layer</button>
    <List name='layers' component={Layer} filter={this.props.frame.layers} items={this.props.layers} current={this.props.layer}/>
  </Panel>;
};
const Layers = React.createClass(obj);

module.exports = connect(
  null,
  { setCurrentLayer, addLayerFrame, addLayer }
)(Layers);