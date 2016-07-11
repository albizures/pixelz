const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');
const { floor } = Math;

const { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK } = require('constants/index.js');
const { currentActions } = require('../../ducks');
const { calculatePosition, validCord } = require('utils/canvas.js');
const tools = require('./tools');
const $window = $(window);
const obj = {};
let canvas;
obj.displayName = 'Preview';

obj.componentDidMount = function () {
  canvas = ReactDOM.findDOMNode(this);
  this.setState({
    context : canvas.getContext('2d')
  });
  canvas.addEventListener('mousedown', this.onMouseDown);
  $(canvas).off('mousemove.preview').on('mousemove.preview', evt => this.onMouseMove(evt));
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.onMouseMove = function (evt) {
  let cord;
  if (evt.target.tagName == 'CANVAS') {
    evt.preventDefault();
    cord = calculatePosition(this.props.artboard, evt.clientX, evt.clientY);
    if (validCord(this.props.layer, cord)) {
      this.paintPreview(cord, this.state.context, this.props.artboard);
    } else {
      this.clean(this.state.context);
    }
  }
};

obj.paintPreview = function (cord, context, artboard) {
  this.clean(context);
  if (artboard.select) {
    console.log('select');
    //this.paintAreaSelect();
  }
  let realCord = {
    x : cord.x * artboard.scale + artboard.x,
    y : cord.y * artboard.scale + artboard.y
  };
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)';//COLOR_POINTER_PREW_DEF;
  context.fillStyle = this.props.primaryColor;
  context.strokeRect(realCord.x - 1, realCord.y - 1, artboard.scale + 2, artboard.scale + 2);
  context.fillRect(realCord.x, realCord.y, artboard.scale, artboard.scale);
};

obj.onMouseDown = function(evt) {
  var cord;
  evt.preventDefault();
  cord = calculatePosition(this.props.artboard, evt.clientX, evt.clientY);
  if (!validCord(this.props.layer, cord)) {
    console.log('contextMenu');
  }
  if (evt.which === RIGHT_CLICK || evt.which === LEFT_CLICK) {
    this.clean(this.state.context);
    $(canvas).off('mousemove.preview').off('mouseup.preview').on('mouseup.preview', () => {
      $(canvas).off('mouseup.preview').on('mousemove.preview', evt => this.onMouseMove(evt));
    });
    tools[this.props.tool].onMouseDown(
      evt,
      cord,
      this.state.context,
      this.props.layer,
      this.props.artboard
    );
  }
  if (evt.which === MIDDLE_CLICK) {
    this.lastDragX = evt.clientX;
    this.lastDragY = evt.clientY;
    this.clean(this.state.context);
    $window
      .off('mousemove.canvas')
      .on('mousemove.canvas', evt => this.onDragMove(evt))
      .off('mouseup.canvas').on('mouseup.canvas', () => {
        $window
          .off('mouseup.canvas')
          .off('mousemove.canvas');
      });
  }
};
obj.onDragMove = function (evt) {
  evt.preventDefault();
  let diffX = evt.clientX - this.lastDragX;
  let diffY = evt.clientY - this.lastDragY;
  this.lastDragX = evt.clientX;
  this.lastDragY = evt.clientY;
  this.shiftDiff(diffX, diffY);
};
obj.shiftDiff = function (diffX, diffY) {
  this.props.setCurrentArtboard({
    scale : this.props.artboard.scale,
    x : this.props.artboard.x + diffX,
    y : this.props.artboard.y + diffY
  });
};

obj.getInitialState = function() {
  return {};
};

obj.componentWillUpdate = function(nextProps, nextState) {
  //return false;
};

obj.render = function() {
  return <canvas
      width={this.props.size.width}
      height={this.props.size.height}
      className='preview'>
  </canvas>;
};

const Preview = React.createClass(obj);

module.exports = connect(
  function (state, props) {
    return {
      primaryColor : state.Editor.primaryColor
    };
  },
  currentActions
)(Preview);