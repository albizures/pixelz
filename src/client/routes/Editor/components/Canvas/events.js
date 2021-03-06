import { calculatePosition, validCord, getPreviewSize } from 'utils/canvas';
import { MIDDLE_CLICK, RIGHT_CLICK, LEFT_CLICK } from '../../../../constants';
import * as tools from './tools';

const { ceil, floor } = Math;
let lastDragX, lastDragY;
export const onMouseMove = function (evt) {
  let cord;
  if (evt.target.tagName === 'CANVAS') {
    evt.preventDefault();
    cord = calculatePosition(this.props.sprite.artboard, evt.clientX, evt.clientY);
    if (validCord(this.props.layer, cord)) {
      this.paintPreview(cord, this.state.preview.context, this.props.sprite.artboard);
    } else {
      this.clean(this.state.preview.context);
    }
  }
};

export const clean = function(context) {
  context.canvas.width = context.canvas.width;
};

export const paintPreview = function (cord, context, artboard) {
  this.clean(context);
  if (artboard.select) {
    
    //this.paintAreaSelect();
  }
  let realCord = {
    x: cord.x * artboard.scale + artboard.x,
    y: cord.y * artboard.scale + artboard.y
  };
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)';//COLOR_POINTER_PREW_DEF;
  context.fillStyle = this.props.primaryColor;
  context.strokeRect(realCord.x - 1, realCord.y - 1, artboard.scale + 2, artboard.scale + 2);
  context.fillRect(realCord.x, realCord.y, artboard.scale, artboard.scale);
};

export const openContextMenu = function (evt) {
  this.setState({
    activeContextMenu: true,
    contextMenuPosition: {
      x: evt.clientX,
      y: evt.clientY
    }
  });
};
export const center = function (stats) {
  stats = stats || this.state.stats;
  let { sprite } = this.props;
  let size = getPreviewSize(stats.width, stats.height, sprite.width, sprite.height);
  console.log(size, stats, sprite);
  this.props.setSpriteArtboard(this.props.sprite.id, {
    scale: floor(size.scale),
    x: Number.parseInt(stats.left + size.marginLeft),
    y: floor(stats.top + size.marginTop)
  });
};
export const onCenter = function () {
  this.setState({
    activeContextMenu: false
  });
  this.center();
};

export const onMouseDown = function (evt) {
  let cord; 
  let {$canvas, context} = this.state.preview;
  evt.stopImmediatePropagation();
  evt.preventDefault();
  cord = calculatePosition(this.props.sprite.artboard, evt.clientX, evt.clientY);
  if (!validCord(this.props.layer, cord)) {
    if (evt.which === RIGHT_CLICK) {
      this.openContextMenu(evt);
    } else if (this.state.activeContextMenu){
      this.setState({
        activeContextMenu: false
      });
    }
    return;
  } else if (this.state.activeContextMenu){
    this.setState({
      activeContextMenu: false
    });
  }
  if (evt.which === RIGHT_CLICK || evt.which === LEFT_CLICK) {
    this.clean(context);
    this.offMousePreview($canvas);
    
    tools[this.props.tool].onMouseDownInit(
      evt,
      cord,
      this.props.layer,
      this.props.sprite.artboard,
      {
        main: this.refs.active.context,
        preview: this.state.preview.context,
        background: this.state.background.context,
        mask: this.state.mask.context
      }
    );
  }
  if (evt.which === MIDDLE_CLICK) {
    lastDragX = evt.clientX;
    lastDragY = evt.clientY;
    this.clean(context);
    this.onDrag();
  }
};

export const onDrag = function () {
  $window
    .off('mousemove.canvas')
    .on('mousemove.canvas', this.onDragMove, false)
    .off('mouseup.canvas').on('mouseup.canvas', () => {
      $window
        .off('mouseup.canvas')
        .off('mousemove.canvas');
    });
};

export const offMousePreview = function ($canvas) {
  $canvas.off('mousemove.preview').off('mouseup.preview').on('mouseup.preview', () => {
    $canvas.off('mouseup.preview').on('mousemove.preview', this.onMouseMove, false);
  }, false);
};

export const onDragMove = function (evt) {
  evt.preventDefault();
  let diffX = evt.clientX - lastDragX;
  let diffY = evt.clientY - lastDragY;
  lastDragX = evt.clientX;
  lastDragY = evt.clientY;
  this.shiftDiff(diffX, diffY);
};
export const shiftDiff = function (diffX, diffY) {
  this.props.setSpriteArtboard(this.props.sprite.id, {
    scale: this.props.sprite.artboard.scale,
    x: ceil(this.props.sprite.artboard.x + diffX),
    y: ceil(this.props.sprite.artboard.y + diffY)
  });
};