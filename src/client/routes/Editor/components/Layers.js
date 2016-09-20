const React = require('react');
const { connect } = require('react-redux');

const { register } = require('./Layout');

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

obj.getInitialState = function() {
  return {
    size : 0
  };
};
obj.componentDidMount = function () {
  this.setState({
    size : this.refs.list.clientWidth
  });
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
  if (this.props.layer !== null) {
    let children = [];
    for (let j = 0; j < this.props.frame.layers.length; j++) {
      let layer = this.props.layers[this.props.frame.layers[j]];
      let className = 'preview-layer ' + (this.props.layer == j? 'active' : '');
      children.push(
        <li className={className} style={{width: this.state.size, height: this.state.size}} key={j}>
          <Layer data={layer} size={this.state.size} index={j}/>
        </li>
      );
    }
    return children;
  } 
  return [];
};

obj.render = function() {
  return <div className={'layers ' + this.props.className} style={this.props.style}>
    <button className="btn add-layer" onClick={this.onClickAddLayer}>add layer</button>
    <div className='list-content'>
      <ul className='list layers-list' ref='list'>
        {this.getList()}
      </ul>
    </div>
  </div>;
};

const Layers = connect(
  function (state, props) {
    return {
      sprite : state.sprites[state.Editor.sprite],
      layer : state.Editor.layer,
      layers : state.Editor.layers,
      frame : state.Editor.frames[state.Editor.frame]
    };
  },
  { setCurrentLayer, addLayerFrame, addLayer }
)(React.createClass(obj));

register(Layers, obj.displayName);

module.exports =  Layers;