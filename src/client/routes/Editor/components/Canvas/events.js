const { calculatePosition, validCord } = require('utils/canvas.js');
const { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK } = require('constants/index.js');
const tools = require('./tools');
let lastDragX, lastDragY;

exports.onMouseMove = function (evt) {
  let cord;
  if (evt.target.tagName == 'CANVAS') {
    evt.preventDefault();
    cord = calculatePosition(this.props.artboard, evt.clientX, evt.clientY);
    if (validCord(this.props.layer, cord)) {
      this.paintPreview(cord, this.state.preview.context, this.props.artboard);
    } else {
      this.clean(this.state.preview.context);
    }
  }
};

exports.clean = function(context) {
  context.canvas.width = context.canvas.width;
};

exports.paintPreview = function (cord, context, artboard) {
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

exports.onMouseDown = function (evt) {
  let cord; 
  let {$canvas, context} = this.state.preview;
  evt.stopImmediatePropagation();
  evt.preventDefault();
  cord = calculatePosition(this.props.artboard, evt.clientX, evt.clientY);
  if (!validCord(this.props.layer, cord)) {
    console.info('create contextMenu');
  }
  if (evt.which === RIGHT_CLICK || evt.which === LEFT_CLICK) {
    this.clean(context);
    this.offMousePreview($canvas);
    console.log('tools');
    tools[this.props.tool].onMouseDownInit(
      evt,
      cord,
      this.props.layer,
      this.props.artboard,
      this.state.main.context,
      this.state.preview.context,
      this.state.background.context,
      this.state.mask.context
    );
  }
  if (evt.which === MIDDLE_CLICK) {
    lastDragX = evt.clientX;
    lastDragY = evt.clientY;
    this.clean(context);
    this.onDrag();
  }
};

exports.onDrag = function () {
  $window
    .off('mousemove.canvas')
    .on('mousemove.canvas', this.onDragMove, false)
    .off('mouseup.canvas').on('mouseup.canvas', () => {
      $window
        .off('mouseup.canvas')
        .off('mousemove.canvas');
    });
};

exports.offMousePreview = function ($canvas) {
  $canvas.off('mousemove.preview').off('mouseup.preview').on('mouseup.preview', () => {
    $canvas.off('mouseup.preview').on('mousemove.preview', this.onMouseMove, false);
  }, false);
};

exports.onDragMove = function (evt) {
  evt.preventDefault();
  let diffX = evt.clientX - lastDragX;
  let diffY = evt.clientY - lastDragY;
  lastDragX = evt.clientX;
  lastDragY = evt.clientY;
  this.shiftDiff(diffX, diffY);
};
exports.shiftDiff = function (diffX, diffY) {
  this.props.setCurrentArtboard({
    scale : this.props.artboard.scale,
    x : this.props.artboard.x + diffX,
    y : this.props.artboard.y + diffY
  });
};