const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const { register } = require('./Layout.js');
const { getPreviewSize } = require('utils/canvas.js');
const Sprite = require('./Sprite.js');
const Panel = require('./Panel.js');
const Range = require('./Range.js');

const obj = {};

obj.displayName = 'Preview';

obj.getInitialState = function(){
  return {
    style : {
      position : 'initial',
      top: 0,
      left: 0,
      width: '100%'
    },
    fps : this.props.fps
  };
};
obj.initPreivew = function(props) {
  if (props.frames[0]) {
    let el = ReactDOM.findDOMNode(this);
    let size = getPreviewSize(
      el.clientWidth,
      el.clientHeight - (25 + 20),
      props.frames[0].width,
      props.frames[0].height
    );
    this.setState(size);
  }
};

obj.componentWillReceiveProps = function(nextProps) {
  this.initPreivew(nextProps);
};

obj.onChangeRange = function(value) {
  this.setState({
    fps : value
  });
};
  
obj.getSprite = function() {
  var style = {}, interval = 1000 / this.state.fps;
  style.width = this.state.maxWidth;
  style.height = this.state.maxHeight;
  console.log(this.state);
  if (this.state.width && this.state.height && this.props.frames.length > 0) {
    return <div style={style} className='context-preview'> 
      <Sprite 
        interval={interval}
        style={{marginTop : this.state.marginTop, marginLeft : this.state.marginLeft}}
        width={this.state.width}
        height={this.state.height}
        frames={this.props.frames}
        filter={this.props.sprite.frames}
      />
    </div>;
  }
  return <div></div>;
};

obj.render = function(){
  return <Panel name='Preview' className={'preview ' + this.props.className} style={this.props.style}>
    {
      this.getSprite()
    }
    <div className='fps-range input-group'>
      <div className='span'>
        <span>FPS</span>
      </div>
      <Range value={this.state.fps} large onChange={this.onChangeRange} min={1} max={24}/>
      <div className='span'>
        <span>{this.state.fps}</span>
      </div>
    </div>
  </Panel>;
};

const Preview = connect(
  function (state, props) {
    return {
      sprite : state.Editor.sprites[state.Editor.sprite],
      frames : state.Editor.frames,
      fps : 5
    };
  }
)(React.createClass(obj));

register(Preview, obj.displayName);

module.exports = Preview;
