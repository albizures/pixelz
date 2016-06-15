'use strict';

const Panel = require('../prototypes/Panel.js'),
  PreviewFrame = require('../prototypes/Frames/PreviewFrame.js'),
  {SNAP, FLOAT, B, L, R, TL, TR, BL, BR} = Panel,
  make = require('make'),
  Vector = require('../prototypes/Vector.js'),
  List = require('../prototypes/List.js'),
  btnAdd = make('button', {className : 'add-frame'}, 'add frame'),
  Frames = new Panel('Frames', SNAP, new Vector(0, 0), 100, 100, TL, true);

let previewFrames = [], currentFrame = 0;
Frames.mainInit = function () {
  this.list = new List('frames',[], 15);
  make([this.el, btnAdd, this.list.el]);
  $(btnAdd).on('click.add', this.createFrame.bind(this));
};
Frames.createFrame = function () {
  this.sprite.addFrame();
};
Frames.changeFrame = function (type, index, sprite) {
  // switch (type) {
  //   case ADD : {
  //     this.addFrame(index, sprite);
  //     break;
  //   }
  //   case DELETE : {
  //
  //     break;
  //   }
  //   case UPDATE : {
  //     this.updateFrame(index, sprite);
  //     break;
  //   }
  // }
};
Frames.deletePreview = function (index) {
  this.list.remove(index);
};
Frames.paintFrame = function (index) {
  this.list.elements[index].paint();
};
Frames.addFrame = function () {
  console.info('addFrame');
  this.sprite.addFrame();
};
Frames.selectFrame = function (index) {
  // console.log(previewFrames, index);
  // if (previewFrames[currentFrame]) {
  //   previewFrames[currentFrame].unSelectFrame();
  // }
  // previewFrames[index].selectFrame();
  // currentFrame = index;
};
Frames.addPreview = function (frame) {
  this.list.add(new PreviewFrame(frame, frame.index == currentFrame, this.list), frame.index);
};
Frames.reAppend = function () {
  // for (let i = 0; i < previewFrames.length; i++) {
  //   previewFrames[i].remove();
  //   previewFrames[i].appendTo(ul);
  // }
};
Frames.resizeFrame = function (index) {
  this.list.elements[index].resize();
};
module.exports = Frames;
