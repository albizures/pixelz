const React = require('react');
const { connect } = require('react-redux');

const { register } = require('./Layout');

const List = require('./List.js');
const Layer = require('./Layer.js');
const { setCurrentLayer, addLayerFrame, addLayer } = require('../ducks').actions;

const obj = {};
obj.displayName = 'Layers';

obj.onClickAddLayer = function() {
  for (var j = 0; j < this.props.sprite.frames.length; j++) {
    var element = this.props.sprite.frames[j];
    var index = this.props.frame.layers.length;
    let layer = this.createLayer({
      sprite : this.props.frame.sprite,
      frame : element
    });
    if (this.props.frame.index == element) {
      this.props.setCurrentLayer(index);
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
  return <div className={'layers ' + this.props.className} style={this.props.style}>
    <button className="btn add-layer" onClick={this.onClickAddLayer}>add layer</button>
    {
      this.getList()
    }
  </div>;
};

const Layers = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
      layer : state.Editor.layers[state.Editor.layer],
      layers : state.Editor.layers,
      frame : state.Editor.frames[state.Editor.frame]
    };
  },
  { setCurrentLayer, addLayerFrame, addLayer }
)(React.createClass(obj));

register(Layers, obj.displayName);

module.exports =  Layers;