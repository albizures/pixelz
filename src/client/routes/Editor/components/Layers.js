const React = require('react');
const { connect } = require('react-redux');

const Panel = require('./Panel.js');
const List = require('./List.js');
const Layer = require('./Layer.js');
const { setCurrentLayer, addLayerFrame, addLayer } = require('../ducks').actions;

const obj = {};
obj.displayName = 'Layers';

obj.onClickAddLayer = function() {
  for (var j = 0; j < this.props.sprite.frames.length; j++) {
    var element = this.props.sprite.frames[j];
    let layer = this.createLayer({
      sprite : this.props.frame.sprite,
      frame : element
    });
    if (this.props.frame.index == element) {
      this.props.setCurrentLayer(layer);
    }
  }
};

obj.createLayer = function({sprite, frame, context, width, height}) {
  var layer;
  width = width || this.props.frame.width;
  height = height || this.props.frame.height;
  layer = this.props.addLayer({
    width,
    height,
    sprite,
    frame,
    context
  });
  this.props.addLayerFrame(frame, layer);
  return layer;
};

obj.getDefaultProps = function() {
  return {
    layers : [],
    frame : {
      layers : []
    }
  };
};
obj.getList = function() {
  if (this.props.layer) {
    return <List name='layers' component={Layer} filter={this.props.frame.layers} items={this.props.layers} current={this.props.layer.index}/>;
  }
  return <div className='list-content'></div>;
};
obj.render = function() {
  return <Panel name='layers' dragBar={false} style={this.props.style}>
    <button className="add-layer" onClick={this.onClickAddLayer}>add layer</button>
    {
      this.getList()
    }
  </Panel>;
};
const Layers = React.createClass(obj);

module.exports = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
      layer : state.Editor.layers[state.Editor.layer],
      layers : state.Editor.layers,
      frame : state.Editor.frames[state.Editor.frame]
    };
  },
  { setCurrentLayer, addLayerFrame, addLayer }
)(Layers);