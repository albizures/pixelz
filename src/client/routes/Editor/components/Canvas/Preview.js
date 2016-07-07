const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');


const { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK } = require('constants/index.js');
const { currentActions } = require('../../ducks');
const { calculatePosition, validCord } = require('utils/canvas.js');

const $window = $(window);
const obj = {};

obj.componentDidMount = function () {
  var canvas = ReactDOM.findDOMNode(this);
  this.setState({
    context : canvas.getContext('2d')
  });
  canvas.addEventListener('mousedown', this.onMouseDown);
};
obj.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

obj.onMouseDown =  function(evt) {
  var cord;
  evt.preventDefault();
  cord = calculatePosition(this.props.artboard, evt.clientX, evt.clientY);
  if (!validCord(this.props.layer, cord)) {
    console.log('contextMenu');
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
  null,
  currentActions
)(Preview);